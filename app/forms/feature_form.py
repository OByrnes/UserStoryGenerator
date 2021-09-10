from app.models.stories import Story
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length



class FeatureForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(-1, 255, "Max Length for Feature Title is 255 characters")])
    
    