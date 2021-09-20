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
            "ac": [ac.to_dict() for ac in self.acceptanceCriteria] if self.acceptanceCriteria else None
            
        }

    def just_id(self):
        return self.id

    def format_issue(self):
        string = f'*As a {self.user} I want to {self.action} so that I can {self.result}*'
        if self.acceptanceCriteria:
            for ac in self.acceptanceCriteria:
                string+=f'\n {ac.checkbox()}'
        return string
        
    def to_story_issue(self):
        story = '**User Story** \r'
        story += f'\t* As a {self.user} I want to be able to ${self.action} so that I can {self.result} \r'
        if(self.acceptanceCriteria):
            story += "**Acceptance Criteria** \r"
            for ac in self.acceptanceCriteria:
                story+= f'{ac.checkbox()} \n'
        return story
