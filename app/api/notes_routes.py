from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import NoteForm
from app.models import User, Note, db

notes_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@notes_routes.route('/', methods=["POST"])
@login_required
def add_new_note():
    user_id = current_user.just_id()
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_note = Note(
             text=form.data['text'],
             user_id=user_id
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}
    


@notes_routes.route('/<int:note_id>', methods=["PATCH"])
@login_required
def edit_story(note_id):
    updatedNote = Note.query.get(note_id)
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updatedNote.text = request.form["storyObj"]
        db.session.commit()
        return updatedNote.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}
    


@notes_routes.route('/', methods=["GET"])
@login_required
def get_note():
    print("here________________________*************")
    user_id = current_user.to_dict()['id']
    userNotes = Note.query.filter(User.id == user_id)
    return {note.just_id(): note for note in userNotes}