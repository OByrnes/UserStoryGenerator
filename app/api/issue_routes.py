from app.forms.issues_form import IssueForm
from app.helper import validation_errors_to_error_messages, story_exists
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Story, Issue, db

issue_routes = Blueprint('issues', __name__)


@issue_routes.route('/', methods=["POST"])
@login_required
def add_new_issue():
    errors = []
    req = request.get_json()
    story = story_exists(req["story_id"],errors)
    form=IssueForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and story:
        newissue = Issue(
            user=form.data["user"],
            action = form.data["action"],
            result = form.data["result"],
            feature_id = req["feature_id"],
        )
        db.session.add(newissue)
        db.session.commit()
        return {"story":story.to_dict(), "issue": newissue.to_dict()}
    else:
        validation_errors_to_error_messages(form.errors, errors)
        return {"errors": errors }



@issue_routes.route('/<int:issue_id>', methods=["PATCH"])
@login_required
def edit_story(issue_id):
    updatedissue = Issue.query.get(issue_id)
    errors = []
    req = request.get_json()
    story = story_exists(req["story_id"],errors)
    form = IssueForm()
    if form.validate_on_submit():
        updatedissue.name = form.data["title"]
        db.session.commit()
        return {"issue": updatedissue.to_dict(), "story":story.to_dict()}
    else:
        validation_errors_to_error_messages(form.errors, errors) 
        return {"errors": errors}



   
@issue_routes.route('/<int:issue_id>', methods=["DELETE"])
@login_required
def delete_story(issue_id):
    issue = Issue.query.get(issue_id)
    db.session.delete(issue)
    db.session.commit()
    errors = []
    req = request.get_json()
    story = story_exists(request.data['story_id'],errors)
    if story:
        return story.to_dict()
    return {"errors": errors}