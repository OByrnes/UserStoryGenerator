from app.forms.note_form import NoteForm
from .db import db
import json


class Story(db.Model):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    app_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    features = db.relationship("Feature", backref="Story", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "title":self.app_name,
            "featureList": {feature.just_id(): feature.to_dict() for feature in self.features} if self.features else None,
            "user_id": self.user_id,
            "story": self.create_md_string(),
            "issues": self.get_features() if self.features else None
        }
    
    def just_id(self):
        return self.id
    

    def get_features(self):
        return {feature.id: feature.format_feature() for feature in self.features if feature.format_feature()}

    def create_md_string(self):
        story = f'# {self.app_name} \r'
        if self.features:
            for feature in self.features:
                if feature.feature_in_story():
                    story += f'\n {feature.feature_in_story()}'
        return story