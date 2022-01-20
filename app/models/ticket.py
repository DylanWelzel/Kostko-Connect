from .db import db


class Ticket(db.Model):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey(
        'departments.id', ondelete='SET NULL'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship(
        "User", back_populates="department")

    departments = db.relationship("Department", back_populates="tickets")

    def to_dict(self):
        return {
            'id': self.id,
            'item_name': self.item_name,
            'location': self.location,
            'description': self.description,
            'department_id': self.department_id,
            'owner_id': self.owner_id
        }
