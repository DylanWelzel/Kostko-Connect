
from app.forms.ticket_form import TicketForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models.ticket import Ticket
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
    form = TicketForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        ticket.item_name = form.item_name.data,
        ticket.location = form.location.data,
        ticket.description = form.description.data,
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
