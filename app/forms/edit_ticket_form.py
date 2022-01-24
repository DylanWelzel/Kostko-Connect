from wsgiref import validate
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from app.models.ticket import Ticket
from wtforms.validators import DataRequired, ValidationError


def no_changes(form, field):
    # Checking if username is already in use
    item_name = field.data
    ticket = Ticket.query.filter(
        Ticket.item_name == item_name.capitalize()).first()
    if ticket:
        raise ValidationError('Ticket already exists.')


class EditTicketForm(FlaskForm):
    item_name = StringField(
        'item_name', validators=[DataRequired()])
    location = StringField(
        'location', validators=[DataRequired()])
    description = StringField(
        'description', validators=[DataRequired()])
