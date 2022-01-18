from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class TicketForm(FlaskForm):
    item_name = StringField(
        'item_name', validators=[DataRequired()])
    location = StringField(
        'location', validators=[DataRequired()])
    description = StringField(
        'description', validators=[DataRequired()])
