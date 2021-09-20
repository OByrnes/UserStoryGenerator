import { SetErrors } from "./session";

import { editStory } from "./story";

const SET_CURRENTFEATURE = "features/SET_CURRENTFEATURE";

export const setCurrent = (feature) => ({
  type: SET_CURRENTFEATURE,
  payload: feature
})
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
            dispatch(editStory(resJSON.story))
            dispatch(setCurrent(resJSON.feature))
            return "good"
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
        body: JSON.stringify({story_id})
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
  
  export const EditSavedFeature = (feature) => async dispatch => {
  const response = await fetch(`/api/features/${feature.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        feature)
    })

    if(response.ok){
        let resJSON = await response.json()
        if(resJSON.errors){
            dispatch(SetErrors(resJSON.errors))
        }else{
          dispatch(editStory(resJSON.story))
          dispatch(setCurrent(resJSON.feature))
          return "good"
        }
    }else{
        dispatch(SetErrors(["Ooops, Something went wrong"]))
    }
  
  }
  

  const initialState = {}

  export default function reducer(state = initialState, action){
    let newState;
    switch (action.type){
      case SET_CURRENTFEATURE:
        newState = action.payload
        return newState
      default:
        return state
    }
  }