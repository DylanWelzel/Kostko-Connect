from app.models import db, Department


def seed_departments():
    department_1 = Department(name='Bakery')
    department_2 = Department(name='Front Foods')
    department_3 = Department(name='Deli')

    db.session.add(department_1)
    db.session.add(department_2)
    db.session.add(department_3)

    db.session.commit()


def undo_departments():
    db.session.execute('TRUNCATE departments RESTART IDENTITY CASCADE;')
    db.session.commit()
