from .db import db
import json


class Feature(db.Model):
    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey("stories.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    issues = db.relationship("Issue", backref="Feature", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "text": self.name,
            "issues_formatted": self.format_feature(),
            "issues": {issue.just_id(): issue.to_dict() for issue in self.issues}
        }

    def just_id(self):
        return self.id

    def format_feature(self):
        return  [issue.format_issue() for issue in self.issues]