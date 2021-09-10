from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length



class StoryForm(FlaskForm):
    app_name = StringField('app_name', validators=[DataRequired(), Length(1, 100, "App Name is either too long (over 100 characters) or too short (under 1 character)")])
    
    