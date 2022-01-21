
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
    all_departments = Department.query.order_by(Department.name.asc()).all()
    departments = []
    if (all_departments):
        for i in range(len(all_departments)):
            departments.append(all_departments[i].to_dict())
    for dept in departments:
        dept_tickets = []
        tickets = Ticket.query.filter_by(
            department_id=dept['id']).join(Department).all()
        for ticket in tickets:
            dept_tickets.append(ticket.to_dict())
        dept['tickets'] = dept_tickets
    print(dept, 'ticketssssss')
    # for ticket in tickets:
    #     ticket.to_dict()
    # print(dept_tickets, 'dept_ticketsssss')
    # for ticket in dept_tickets:
    #     tickets.append(ticket.to_dict())
    # print(tickets, 'ticketssss')
    # if dept_tickets:
    #     for ticket in dept_tickets:
    #         dept['tickets'] = ticket.to_dict()
    # print(departments, 'hiiiiii')
    return {'departments': departments}
# edit department route


@ department_routes.route('/<int:id>/edit', methods=['PUT'])
@ login_required
def edit_department(id):
    department = Department.query.get(id)
    dept_tickets = Ticket.query.filter_by(
        department_id=id).join(Department).all()
    tickets = []
    if dept_tickets:
        for i in range(len(dept_tickets)):
            tickets.append(dept_tickets[i].to_dict())
    form = DepartmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        department.name = form.name.data
        db.session.commit()
        dict_dept = department.to_dict()
        dict_dept['tickets'] = tickets
        return dict_dept
    return {}

# get one department route


@ department_routes.route('/<int:id>', methods=['GET'])
@ login_required
def get_one_department(id):
    dept = Department.query.get(id)
    dict_dept = dept.to_dict()
    dept_tickets = Ticket.query.filter_by(
        department_id=id).join(Department).all()
    tickets = []
    if dept_tickets:
        for i in range(len(dept_tickets)):
            tickets.append(dept_tickets[i].to_dict())
    dict_dept['tickets'] = tickets
    return dict_dept

# delete department


@ department_routes.route('/<int:departmentId>/delete', methods=['DELETE'])
@ login_required
def deleteDepartment(departmentId):
    dept = Department.query.filter_by(
        id=departmentId).first()

    db.session.delete(dept)
    db.session.commit()
    return dept.to_dict()

# create department


@ department_routes.route('/', methods=['POST'])
@ login_required
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
def newTicket(departmentId, userId):
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
        return ticket.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
