import { SetErrors } from "./session";

import { editStory } from "./story";


export const AddQuestion = (question) => async dispatch => {
    const response = await fetch('/api/questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         question
        })
      })
      if(response.ok){
          let resJSON = await response.json()
          if(resJSON.errors){
              dispatch(SetErrors(resJSON.errors))
          }else{
            dispatch(editStory(resJSON))
          }
      }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  
  }
  
  export const deleteQuestion = (id) => async dispatch => {
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

      }
    }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  }
  
  export const EditSavedQuestion = (question) => async dispatch => {
  const response = await fetch(`/api/questions/${note.id}`, {
      method: 'PATCH',
      body:JSON.stringify(
        question)
    })
    if(response.ok){
        let resJSON = await response.json()
        if(resJSON.errors){
            dispatch(SetErrors(resJSON.errors))
        }else{
          dispatch(editStory(resJSON))
        }
    }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  
  }
  

  