import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, join_room, leave_room, emit

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.tickets import ticket_routes
from .api.departments import department_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(ticket_routes, url_prefix='/api/tickets')
app.register_blueprint(department_routes, url_prefix='/api/departments')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)
socketIo = SocketIO(app=app, cors_allowed_origins='*')


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@socketIo.on("message")
def handleMessage(msg):
    if(msg):
        room = f"ticket {msg['ticketId']}"
        msg['allMessages']['owner'] = msg['session']
        socketIo.emit("message", {
                      'allMessages': msg['allMessages'], 'ticketId': msg['ticketId'], 'session': msg['session']}, to=room)


@socketIo.on('joinroom')
def on_join(data):
    if(data):
        room = f"ticket {data['ticketId']}"
        join_room(room)


@socketIo.on('leaveroom')
def on_leave(data):
    if(data):
        room = f"ticket {data['ticketId']}"
        leave_room(room)


clients = 0


@socketIo.on('connect')
def on_connect():
    global clients
    clients += 1

    @socketIo.on('disconnect')
    def disc():
        global clients
        clients -= 1


if __name__ == '__main__':
    socketIo.run(app)
