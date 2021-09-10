from app.forms.acceptancecriteria_form import AcceptanceCriteriaForm
from app.helper import validation_errors_to_error_messages, story_exists
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Story, AcceptanceCriterium, db

acceptanceCriteria_routes = Blueprint('acceptanceCriteria', __name__)


@acceptanceCriteria_routes.route('/', methods=["POST"])
@login_required
def add_new_acceptanceCriteria():
    errors = []
    story = story_exists(request.data["story_id"], errors)
    form=AcceptanceCriteriaForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and story:
        newacceptanceCriteria = AcceptanceCriterium(
            text = form.data['acceptanceCriteria'],
            issue_id = form.data["issue_id"]
        )
        db.session.add(newacceptanceCriteria)
        db.session.commit()
        return story.to_dict()
    else:
        validation_errors_to_error_messages(form.errors, errors)
        return {"errors": errors }



@acceptanceCriteria_routes.route('/<int:acceptanceCriteria_id>', methods=["PATCH"])
@login_required
def edit_story(acceptanceCriteria_id):
    errors = []
    story = story_exists(request.data["story_id"], errors)
    updatedacceptanceCriteria = AcceptanceCriterium.query.get(acceptanceCriteria_id)
    form = AcceptanceCriteriaForm()
    if form.validate_on_submit():
        updatedacceptanceCriteria.text = form.data["acceptanceCriteria"]
        db.session.commit()
        return story.to_dict()
    else:
        validation_errors_to_error_messages(form.errors, errors) 
        return {"errors": errors}



   
@acceptanceCriteria_routes.route('/<int:acceptanceCriteria_id>', methods=["DELETE"])
@login_required
def delete_story(acceptanceCriteria_id):
    acceptanceCriteria = AcceptanceCriterium.query.get(acceptanceCriteria_id)
    db.session.delete(acceptanceCriteria)
    db.session.commit()
    errors = []
    story = story_exists(request.data["story_id"], errors)
    if story:
        return story.to_dict()
    return {"errors": errors}