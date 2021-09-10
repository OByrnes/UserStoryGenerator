import { SetErrors } from "./session";

import { editStory } from "./story";


export const AddFeature = (feature) => async dispatch => {
    const response = await fetch('/api/features/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        feature
        )
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
  
  export const deleteFeatureFetch = (id, story_id) => async dispatch => {
    const response = await fetch(`/api/features/${id}`,{
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
  
  export const EditSavedFeature = (feature) => async dispatch => {
  const response = await fetch(`/api/feature/${note.id}`, {
      method: 'PATCH',
      body:JSON.stringify(
        feature)
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
  

  