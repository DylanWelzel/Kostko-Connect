from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models.department import Department


def department_exists(form, field):
    # Checking if username is already in use
    name = field.data
    department = Department.query.filter(
        Department.name == name).first()
    if department:
        raise ValidationError('Department already exists.')


class DepartmentForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired(), department_exists])
