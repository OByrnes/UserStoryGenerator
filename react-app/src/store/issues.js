import { AddAC } from "./acceptanceCriteria";
import { SetErrors } from "./session";

import { editStory } from "./story";


export const AddIssue = (issue, ac) => async dispatch => {
    const response = await fetch('/api/issues/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         issue
        })
      })
      if(response.ok){
          let resJSON = await response.json()
          if(resJSON.errors){
              dispatch(SetErrors(resJSON.errors))
          }else{
            dispatch(editStory(resJSON))
            ac.forEach(element => {
              dispatch(AddAC({acceptanceCriteria:element, story_id: issue.story_id}))
            });
          }
      }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  
  }
  
  export const deleteIssue = (id) => async dispatch => {
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
  const response = await fetch(`/api/issue/${note.id}`, {
      method: 'PATCH',
      body:JSON.stringify(
        issue)
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
  

  