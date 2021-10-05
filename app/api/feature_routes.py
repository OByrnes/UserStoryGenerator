from app.forms.feature_form import FeatureForm
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.helper import validation_errors_to_error_messages, story_exists
from app.models import User, Story, Feature, db

feature_routes = Blueprint('features', __name__)



@feature_routes.route('/', methods=["POST"])
@login_required
def add_new_feature():
    errors = []
    req = request.get_json()
    story = story_exists(req["story_id"],errors)
    form=FeatureForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and story:
        newFeature = Feature(
            story_id=req["story_id"],
            name=form.data["title"]
        )
        db.session.add(newFeature)
        db.session.commit()
        return {"story":story.to_dict(), "feature": newFeature.to_dict()}
    else:
        validation_errors_to_error_messages(form.errors, errors)
        return {"errors":errors }



@feature_routes.route('/<int:feature_id>', methods=["PATCH"])
@login_required
def edit_story(feature_id):
    errors = []
    req = request.get_json()
    story = story_exists(req["story_id"],errors)
    updatedFeature = Feature.query.get(feature_id)
    form = FeatureForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updatedFeature.name = form.data["title"]
        db.session.commit()
        return {"story":story.to_dict(), "feature": updatedFeature.to_dict()}
    else: 
        validation_errors_to_error_messages(form.errors, errors)
        return {"errors": errors}



   
@feature_routes.route('/<int:feature_id>', methods=["DELETE"])
@login_required
def delete_story(feature_id):
    feature = Feature.query.get(feature_id)
    db.session.delete(feature)
    db.session.commit()
    errors =[]
    req = request.get_json()
    story = story_exists(req["story_id"],errors)
    if story:
        return story.to_dict()
    return {"errors": errors}