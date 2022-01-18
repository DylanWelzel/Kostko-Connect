
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
    if form.validate_on_submit():
        ticket.item_name = form.name.data,
        ticket.location = form.location.data,
        ticket.description = form.description.data,
        db.session.commit()
        return ticket.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
