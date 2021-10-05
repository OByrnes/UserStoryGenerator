from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from wtforms.fields.html5 import DateTimeLocalField



class NoteForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])
    test = DateTimeLocalField("test", validators=[DataRequired()],  format='%Y-%m-%dT%H:%M')
    