from app.forms.story_form import StoryForm
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Story, db
from app.helper import validation_errors_to_error_messages

story_routes = Blueprint('stories', __name__)


@story_routes.route('/', methods=["POST"])
@login_required
def add_new_story():
    user_id = current_user.just_id()
    print("current user", current_user, user_id)
    form=StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newStory = Story(
            user_id=user_id,
            app_name=form.data["app_name"]
        )
        db.session.add(newStory)
        db.session.commit()
        return newStory.to_dict()
    else:
        errors = []
        return {"errors": validation_errors_to_error_messages(form.errors, errors)}



@story_routes.route('/<int:story_id>', methods=["PATCH"])
@login_required
def edit_story(story_id):
    updatedStory = Story.query.get(story_id)
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updatedStory.app_name = form.data["app_name"]
        db.session.commit()
        return updatedStory.to_dict()
    else: 
        errors = []
        return {"errors": validation_errors_to_error_messages(form.errors, errors)}


@story_routes.route('/<int:story_id>', methods=["GET"])
@login_required
def get_story(story_id):
    print(current_user.id)
    story = Story.query.get(story_id)
    if story:
        return story.to_dict()
    else:
        return {"errors": ["Oooops this story doesn't exist"]}
   
@story_routes.route('/<int:story_id>', methods=["DELETE"])
@login_required
def delete_story(story_id):
    updatedStory = Story.query.get(story_id)
    db.session.delete(updatedStory)
    db.session.commit()
    return {"delete": story_id}