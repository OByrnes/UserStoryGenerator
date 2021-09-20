
import { SetErrors } from "./session";

import { editStory } from "./story";

const SET_CURRENTISSUE = "issues/SET_CURRENTISSUE";

export const setCurrentIssue = (issue) => ({
  type: SET_CURRENTISSUE,
  payload: issue
})
export const AddIssue = (issue) => async dispatch => {
    const response = await fetch('/api/issues/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
         issue
        )
      })
      if(response.ok){
          let resJSON = await response.json()
          if(resJSON.errors){
              dispatch(SetErrors(resJSON.errors))
          }else{
            dispatch(editStory(resJSON.story))
            dispatch(setCurrentIssue(resJSON.issue))
            return "good"
           
          }
      }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  
  }
  
  export const deleteIssue = (id, story_id) => async dispatch => {
    const response = await fetch(`/api/issues/${id}`,{
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
  
  export const EditSavedIssue = (issue) => async dispatch => {
  const response = await fetch(`/api/issue/${issue.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        issue)
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
  
  let initialState = {}

  export default function reducer(state=initialState, action){
    switch(action.type){
      case SET_CURRENTISSUE:
        return action.payload
      default:
        return state
    }
  }

  