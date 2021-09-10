from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length



class AcceptanceCriteriaForm(FlaskForm):
    acceptanceCriteria = StringField('acceptanceCriteria', validators=[DataRequired(), Length(-1, 100, "Max Length for Acceptance Criteria is 255 characters")])