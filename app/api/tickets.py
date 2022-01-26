
from app.forms.edit_ticket_form import EditTicketForm
from app.forms.message_form import MessageForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.message import Message
from app.models.ticket import Ticket
from app.models.user import User
from .auth_routes import validation_errors_to_error_messages
from app.models import db

ticket_routes = Blueprint('tickets', __name__)

# delete Ticket


@ticket_routes.route('/<int:ticketId>/delete', methods=['DELETE'])
@ login_required
def deleteTicket(ticketId):
    ticket = Ticket.query.filter_by(
        id=ticketId).first()

    db.session.delete(ticket)
    db.session.commit()
    return ticket.to_dict()


# edit Ticket
@ticket_routes.route('/<int:ticketId>/edit', methods=['PUT'])
@ login_required
def edit_Ticket(ticketId):
    ticket = Ticket.query.get(ticketId)
    form = EditTicketForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if ticket.item_name == form.item_name.data.capitalize() and ticket.location == form.location.data and ticket.description == form.description.data.capitalize():
            return {'errors': ['Nothing has been updated']}
        ticket.item_name = form.item_name.data.capitalize(),
        ticket.location = form.location.data,
        ticket.description = form.description.data.capitalize(),
        db.session.commit()
        return ticket.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# single ticket


@ ticket_routes.route('/<int:id>', methods=['GET'])
@ login_required
def get_one_ticket(id):
    ticket = Ticket.query.get(id)
    dict_ticket = ticket.to_dict()
    return dict_ticket


# is ticket done


@ ticket_routes.route('/<int:id>/isdone', methods=['GET'])
@ login_required
def is_ticket_done(id):
    ticket = Ticket.query.get(id)
    ticket.is_done = True
    db.session.commit()
    dict_ticket = ticket.to_dict()
    return dict_ticket


# @ ticket_routes.route('/<int:id>/isnotdone', methods=['GET'])
# @ login_required
# def ticket_not_done(id):
#     ticket = Ticket.query.get(id)
#     dict_ticket = ticket.to_dict()
#     dict_ticket['isDone'] = False
#     return dict_ticket

# get messages of a ticket


@ticket_routes.route('/<int:ticketId>/messages', methods=['GET'])
@ login_required
def get_messages(ticketId):
    messages = Message.query.join(User).filter(
        ticketId == Message.ticket_id).order_by(Message.id.desc()).all()
    msgDict = []
    for i in messages:
        msg = i.to_dict()
        msg['owner'] = i.owners.to_dict()
        msgDict.append(msg)
    return {'messages': msgDict}


# post a message
@ticket_routes.route('/<int:ticketId>/messages', methods=['POST'])
@ login_required
def createMsg(ticketId):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        new = Message(content=form.content.data,
                      ticket_id=ticketId, owner_id=current_user.id)
        owner = User.query.get(new.owner_id)
        db.session.add(new)
        db.session.commit()
        dict_message = new.to_dict()
        dict_message['owner'] = owner.to_dict()
        return dict_message
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
