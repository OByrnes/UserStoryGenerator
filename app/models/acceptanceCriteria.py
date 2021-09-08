from .db import db
import json


class AcceptanceCriterium(db.Model):
    __tablename__ = 'acceptance_criteria'

    id = db.Column(db.Integer, primary_key=True)
    issue_id = db.Column(db.Integer, db.ForeignKey("issues.id"), nullable=False)
    text = db.Column(db.String(255), nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text
        }

    def just_id(self):
        return self.id

    def checkbox(self):
        return f'- [ ] {self.text}'