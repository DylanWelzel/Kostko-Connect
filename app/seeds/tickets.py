from app.models import db, Ticket


def seed_tickets():
    ticket_1 = Ticket(
        item_name='Flour', location='124 A4', description='6 bags, fronted', department_id=1, owner_id=1)
    ticket_2 = Ticket(
        item_name='Lamps', location='125 B5', description='4 layers', department_id=2, owner_id=2)
    ticket_3 = Ticket(
        item_name='Coffee', location='122 B1', description='8 layers', department_id=3, owner_id=3)

    db.session.add(ticket_1)
    db.session.add(ticket_2)
    db.session.add(ticket_3)

    db.session.commit()


def undo_tickets():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
