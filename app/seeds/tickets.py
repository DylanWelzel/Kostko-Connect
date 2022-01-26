from app.models import db, Ticket


def seed_tickets():
    ticket_1 = Ticket(
        item_name='Flour', location='124 A4', description='6 bags, fronted', department_id=1, owner_id=1, is_done=False)
    ticket_2 = Ticket(
        item_name='Christmas Lights', location='125 B5', description='4 layers', department_id=2, owner_id=2, is_done=False)
    ticket_3 = Ticket(
        item_name='Pesto', location='122 B1', description='8 layers', department_id=3, owner_id=3, is_done=False)
    ticket_4 = Ticket(
        item_name='Chicken', location='120 B4', description='2 layers', department_id=4, owner_id=1, is_done=False)
    ticket_5 = Ticket(
        item_name='Jameson', location='149 A1', description='100 Bottles', department_id=5, owner_id=3, is_done=False)
    ticket_6 = Ticket(
        item_name='Pizza', location='242 C1', description='2 layers', department_id=6, owner_id=3, is_done=False)
    ticket_7 = Ticket(
        item_name='Dunder Mifflin Paper', location='219 I2', description='23 Reams', department_id=7, owner_id=3, is_done=False)
    ticket_8 = Ticket(
        item_name='Michelin', location='122 H4', description='8 layers', department_id=8, owner_id=3, is_done=False)

    db.session.add(ticket_1)
    db.session.add(ticket_2)
    db.session.add(ticket_3)
    db.session.add(ticket_4)
    db.session.add(ticket_5)
    db.session.add(ticket_6)
    db.session.add(ticket_7)
    db.session.add(ticket_8)

    db.session.commit()


def undo_tickets():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
