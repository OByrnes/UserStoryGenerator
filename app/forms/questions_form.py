from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length



class QuestionForm(FlaskForm):
    question = StringField('question', validators=[DataRequired(), Length(-1, 255, "Max Length for questions is 255 characters")])
    answer = StringField("answer", validators=[DataRequired(), Length(-1, 255, "Max Length for answers is 255 characters")])
    feature_id = IntegerField("feature_id", validators=[DataRequired()])