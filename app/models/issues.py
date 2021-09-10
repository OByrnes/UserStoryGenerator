from .db import db
import json


class Issue(db.Model):
    __tablename__ = 'issues'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(100), nullable=False)
    action = db.Column(db.String(255))
    result = db.Column(db.String(255))
    feature_id = db.Column(db.Integer, db.ForeignKey("features.id"), nullable=False)
    # story_id = db.Column(db.Integer, db.ForeignKey("stories.id"), nullable=False)
    
    acceptanceCriteria = db.relationship("AcceptanceCriterium", backref="Issue", cascade="all, delete-orphan")



    def to_dict(self):
        return {
            "id": self.id,
            "user":self.user,
            "result": self.result,
            "action": self.action,
            "ac": {ac.just_id() : ac.to_dict() for ac in self.acceptanceCriteria}
            
        }

    def just_id(self):
        return self.id

    def format_issue(self):
        string = f'*{self.user_story}*'
        for ac in self.acceptanceCriteria:
            string+=f'\n {ac.checkbox()}'
        
    def to_story_issue(self):
        story = '**User Story**'
        story += f'\t* As a {self.user} I want to be able to ${self.action} so that I can {self.result} \r'
        story += "**Acceptance Criteria**"
        for ac in self.acceptanceCriteria:
            story+= f'{ac.checkbox()} \n'
