
from app.forms.department_form import DepartmentForm
from app.forms.ticket_form import TicketForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models.department import Department
from app.models.ticket import Ticket
from .auth_routes import validation_errors_to_error_messages
from app.models import db


department_routes = Blueprint('departments', __name__)


# get all departments
@department_routes.route('/', methods=['GET'])
@login_required
def get_departments():
    departments = Department.query.all()
    return {'departments': departments}

# edit department route


@department_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_department(id):
    department = Department.query.get(id)
    form = DepartmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        department.name = form.name.data
        db.session.commit()
        return department.to_dict()
    return {}

# get one department route


@department_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_one_department(id):
    dept = Department.query.get(id)
    return dept.to_dict()

# delete department


@ department_routes.route('/<int:departmentId>/delete', methods=['DELETE'])
@login_required
def deleteDepartment(departmentId):
    dept = Department.query.filter_by(
        id=departmentId).first()

    db.session.delete(dept)
    db.session.commit()
    return dept.to_dict()

# create department


@ department_routes.route('/', methods=['POST'])
@login_required
def newDepartment():
    form = DepartmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        dept = Department(
            name=form.name.data,
        )
        db.session.add(dept)
        db.session.commit()
        return dept.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# GET tickets of a department
@ department_routes.route('/<int:departmentId>/tickets')
@ login_required
def getTicket(departmentId):
    print('hiiiiiii')
    print(Ticket.query.all())
    allTickets = Ticket.query.order_by(Ticket.id.asc()).filter_by(
        department_id=departmentId).join(Department).all()
    tickets = []
    if(allTickets):
        for i in range(len(allTickets)):
            tickets.append(allTickets[i].to_dict())
    return {'tickets': tickets}


# ADD A TICKET TO A Department
@ department_routes.route('/<int:departmentId>/user/<int:userId>/tickets', methods=['POST'])
@ login_required
def newChannel(departmentId, userId):
    form = TicketForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        ticket = Ticket(
            item_name=form.item_name.data,
            location=form.location.data,
            description=form.description.data,
            department_id=departmentId,
            owner_id=userId)
        db.session.add(ticket)
        db.session.commit()
        print(ticket.to_dict(), 'ticketttttt')
        return ticket.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
