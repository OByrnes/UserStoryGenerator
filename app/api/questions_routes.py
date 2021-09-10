from app.forms.questions_form import QuestionForm
from app.helper import validation_errors_to_error_messages, story_exists
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Story, Question, db

question_routes = Blueprint('questions', __name__)


@question_routes.route('/', methods=["POST"])
@login_required
def add_new_question():
    errors = []
    story = story_exists(request.data["story_id"], errors)
    form=QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and story:
        newquestion = Question(
            question = form.data["question"],
            answer= form.data["answer"],
            feature_id=form.data["feature_id"]
        )
        db.session.add(newquestion)
        db.session.commit()
        return story.to_dict()
    else:
        validation_errors_to_error_messages(form.errors, errors)
        return {"errors": errors }



@question_routes.route('/<int:issue_id>', methods=["PATCH"])
@login_required
def edit_story(issue_id):
    updatedquestion = Question.query.get(issue_id)
    errors = []
    story = story_exists(request.data["story_id"], errors)
    form = QuestionForm()
    if form.validate_on_submit():
        updatedquestion.question = form.data["question"]
        updatedquestion.answer = form.data["answer"]
        db.session.commit()
        return story.to_dict()
    else:
        validation_errors_to_error_messages(form.errors, errors) 
        return {"errors": errors}



   
@question_routes.route('/<int:issue_id>', methods=["DELETE"])
@login_required
def delete_story(issue_id):
    question = Question.query.get(issue_id)
    db.session.delete(question)
    db.session.commit()
    errors = []
    story = story_exists(request.data['story_id'],errors)
    if story:
        return story.to_dict()
    return {"errors": errors}