from .db import db
import json


class Story(db.Model):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    storyJSON = db.Column(db.JSON, nullable=False)
    features = db.relationship("Feature", backref="Story", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "story": json.loads(self.storyJSON),
            "features": self.get_features()
        }
    
    def just_id(self):
        return self.id
    

    def get_features(self):
        return {feature.id: feature.format_feature() for feature in self.features }