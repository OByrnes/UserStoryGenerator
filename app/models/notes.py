from .db import db
import json


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    test = db.Column(db.String(45))


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "text": self.text
        }

    def just_id(self):
        return self.id