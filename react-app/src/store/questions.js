import { SetErrors } from "./session";

import { editStory } from "./story";


export const AddQuestion = (question) => async dispatch => {
    const response = await fetch('/api/questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
         question
        )
      })
      if(response.ok){
          let resJSON = await response.json()
          if(resJSON.errors){
              dispatch(SetErrors(resJSON.errors))
          }else{
            dispatch(editStory(resJSON))
            return "good"
          }
      }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  
  }
  
  export const deleteQuestion = (id, story_id) => async dispatch => {
    const response = await fetch(`/api/questions/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
          body: {story_id}
    })
    if (response.ok){
      let resJSON = await response.json()
      if(resJSON.errors){
          dispatch(SetErrors(resJSON.errors))
      }else{
          dispatch(editStory(resJSON))
          return "good"
      }
    }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  }
  
  export const EditSavedQuestion = (question) => async dispatch => {
  const response = await fetch(`/api/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        question)
    })
    if(response.ok){
        let resJSON = await response.json()
        if(resJSON.errors){
            dispatch(SetErrors(resJSON.errors))
        }else{
          dispatch(editStory(resJSON))
          return "good"
        }
    }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  
  }
  

  