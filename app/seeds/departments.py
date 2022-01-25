from app.models import db, Department


def seed_departments():
    department_1 = Department(name='Bakery')
    department_2 = Department(name='Seasonal')
    department_3 = Department(name='Deli')
    department_4 = Department(name='Meat')
    department_5 = Department(name='Liquor')
    department_6 = Department(name='Frozen Food')
    department_7 = Department(name='Office Supplies')
    department_8 = Department(name='Tires')
    department_9 = Department(name='Hardware')
    department_10 = Department(name='Automotive')
    department_11 = Department(name='Candy')

    db.session.add(department_1)
    db.session.add(department_2)
    db.session.add(department_3)
    db.session.add(department_4)
    db.session.add(department_5)
    db.session.add(department_6)
    db.session.add(department_7)
    db.session.add(department_8)
    db.session.add(department_9)
    db.session.add(department_10)
    db.session.add(department_11)

    db.session.commit()


def undo_departments():
    db.session.execute('TRUNCATE departments RESTART IDENTITY CASCADE;')
    db.session.commit()
