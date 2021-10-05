from .db import db


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    feature_id = db.Column(db.Integer, db.ForeignKey("features.id"), nullable=False)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "question": self.question,
            "answer": self.answer
        }

    def just_id(self):
        return self.id

    def just_question(self):
        return self.question


    def just_answer(self):
        return self.answer
    