from .db import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(400), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey(
        "tickets.id"), nullable=False)

    owners = db.relationship("User", back_populates="messages")
    dept_tickets = db.relationship(
        "Ticket", back_populates="ticket_messages")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'owner_id': self.owner_id,
            'ticket_id': self.ticket_id
        }
