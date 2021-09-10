from app.forms import questions_form
from app.models import questions
from .db import db
import json


class Feature(db.Model):
    __tablename__ = 'features'

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey("stories.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    issues = db.relationship("Issue", backref="Feature", cascade="all, delete-orphan")
    questions = db.relationship("Question", backref="Feature", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "issues_formatted": self.format_feature(),
            "issues": {issue.just_id(): issue.to_dict() for issue in self.issues} if self.issues else None,
            "questions": {question.just_id() : question.to_dict() for question in self.questions} if self.questions else None
        }

    def just_id(self):
        return self.id

    def format_feature(self):
        return  [issue.format_issue() for issue in self.issues]

    def feature_in_story(self):
        story = f'## {self.name} \r'
        story += f'### Questions: \r'
        for question in self.questions:
            story+= f' * {question.just_question()} \r \n'
            story+= f'\t * {question.just_answer()} \r \n'
        story+= '### Stories and Acceptance criteria: \r'
        for issue in self.issues:
            story+= issue.to_story_issue()
        return story