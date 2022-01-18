from flask.cli import AppGroup
from .users import seed_users, undo_users
from .departments import seed_departments, undo_departments
from .tickets import seed_tickets, undo_tickets


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_departments()
    seed_tickets()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_departments()
    undo_tickets()
