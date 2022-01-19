from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from app.models.ticket import Ticket
from wtforms.validators import DataRequired, ValidationError


def ticket_name_exists(form, field):
    # Checking if username is already in use
    item_name = field.data
    ticket = Ticket.query.filter(
        Ticket.item_name == item_name).first()
    if ticket:
        raise ValidationError('Ticket already exists.')


class TicketForm(FlaskForm):
    item_name = StringField(
        'item_name', validators=[ticket_name_exists, DataRequired()])
    location = StringField(
        'location', validators=[DataRequired()])
    description = StringField(
        'description', validators=[DataRequired()])
