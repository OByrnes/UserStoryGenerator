import { SetErrors } from "./session";

import { editStory } from "./story";


export const AddAC = (ac) => async dispatch => {
    const response = await fetch('/api/acceptancecriteria/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        ac
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
  
  export const deleteAC = (id, story_id) => async dispatch => {
    const response = await fetch(`/api/acceptancecriteria/${id}`,{
        method: 'DELETE',
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
  
  export const EditAcceptanceCriteria = (ac) => async dispatch => {
  const response = await fetch(`/api/acceptancecriteria/${ac.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        ac)
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
  

  