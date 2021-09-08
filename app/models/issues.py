from .db import db
import json


class Issue(db.Model):
    __tablename__ = 'issues'

    id = db.Column(db.Integer, primary_key=True)
    feature_id = db.Column(db.Integer, db.ForeignKey("features.id"), nullable=False)
    user_story = db.Column(db.String(255), nullable=False)
    
    questions = db.relationship("Question", backref="Issue", cascade="all, delete-orphan")
    acceptanceCriteria = db.relationship("AcceptanceCriterium", backref="Issue", cascade="all, delete-orphan")



    def to_dict(self):
        return {
            "id": self.id,
            "user_story": self.user_story,
            "question": {question.just_id(): question.to_dict() for question in self.questions},
            "ac": {ac.just_id() : ac.to_dict() for ac in self.acceptanceCriteria}
            
        }

    def just_id(self):
        return self.id

    def format_issue(self):
        string = f'*{self.user_story}*'
        for ac in self.acceptanceCriteria:
            string+=f'\n {ac.checkbox()}'
        