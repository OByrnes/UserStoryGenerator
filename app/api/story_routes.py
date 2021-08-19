from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Story, db

story_routes = Blueprint('stories', __name__)


@story_routes.route('/', methods=["POST"])
@login_required
def add_new_story():
    user_id = current_user.to_dict().id
    if "storyObj" not in request.form:
        return {"errors": ["Story is required"]}
    newStory = Story(
        user_id=user_id,
        storyJSON=request.form["storyObj"]
    )
    db.session.add(newStory)
    db.session.commit()

    return newStory.to_dict()


@story_routes.route('/<int:story_id>', methods=["PATCH"])
@login_required
def edit_story(story_id):
    updatedStory = Story.query.get(story_id)
    print("got here", story_id, updatedStory)
    updatedStory.storyJSON = request.form["storyObj"]
    db.session.commit()
    return updatedStory.to_dict()
    
