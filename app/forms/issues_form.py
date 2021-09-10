from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length





class IssueForm(FlaskForm):
    user = StringField('user', validators=[DataRequired(), Length(-1, 100, "Max Length for user is 255 characters")])
    action = StringField("action", validators=[DataRequired(), Length(-1, 255, "Max Length for actions is 255 characters")])
    result = StringField('result', validators=[DataRequired(), Length(-1, 100, "Max Length for result is 255 characters")])
    