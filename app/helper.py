from app.models.stories import Story
def validation_errors_to_error_messages(validation_errors, errorMessages):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    for field in validation_errors:
        for error in validation_errors[field]:
            if("required" in error):
                error = f'The {field} is required.'
            errorMessages.append(error)
    return errorMessages

    
def story_exists(story_id, errors):
    story = Story.query.get(story_id)
    if not story:
        errors.append("Story does not exist")
    return story