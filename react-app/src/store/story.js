import { SetErrors } from "./session"

const ADD_STORY= "stories/ADD_STORY"
const EDIT_STORY="stories/EDIT_STORY"
const SET_STORIES = "stories/SET_STORIES"
const DELETE_STORY = "stories/DELETE_STORY"

const SET_CURRENT_STORY = "stories/SET_CURRENT_STORY"
const CLEAR_CURRENT_STORY = "stories/CLEAR_CURRENT_STORY"


const deleteStoryAction = (id) => ({
  type: DELETE_STORY,
  payload: id
})

export const setUserStories = (stories) =>({
    type: SET_STORIES,
    payload: stories
})

const AddNewStory = (story) =>({
    type: ADD_STORY,
    payload: story
})



const setCurrentStory = (story) => ({
  type: SET_CURRENT_STORY,
  payload: story
})

export const editStory = (story) => ({
  type: EDIT_STORY,
  payload: story
})

export const clearCurrent = () => ({
  type: CLEAR_CURRENT_STORY,
  payload: {}
})

export const AddUserStory = (story) => async dispatch => {
    const response = await fetch('/api/stories/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story)
      })
      if(response.ok){
          let resJSON = await response.json()
          if(resJSON.errors){
              dispatch(SetErrors(resJSON.errors))
          }else{
            dispatch(AddNewStory(resJSON))
            return "good"
          }
      }

}

export const EditUserStory = (story) => async dispatch => {
  const response = await fetch(`/api/stories/${story.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(story)
    })
    if(response.ok){
        let resJSON = await response.json()
        if(resJSON.errors){
            dispatch(SetErrors(resJSON.errors))
        }else{
          dispatch(editStory(resJSON))
          return "good"
        }
    }

}
export const deleteStory = (id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
        },
        body: {id}
  })
  if (response.ok){
    let resJSON = await response.json()
    if(resJSON.errors){
        dispatch(SetErrors(resJSON.errors))
    }else{
        dispatch(deleteStoryAction(resJSON.delete))
        return "good"
    }
  }else{
      dispatch(SetErrors(["Ooops, Something went wrong"]))
  }
}

export const getCurrent = (id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`)
  if(response.ok){
    let resJSON = await response.json()
    if(resJSON.errors){
      dispatch(SetErrors(resJSON.errors))

    }
    else{
      dispatch(setCurrent(resJSON))
      return "good"
    }
  }
}

export const setCurrent = (story) => dispatch => {
  dispatch(setCurrentStory(story))
}

const initialState = {all:{}, current:{}}
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case SET_STORIES:
        newState = {...state, all:action.payload}
        return newState
      case ADD_STORY:
        newState = {...state}
        let all = {...state.all, [action.payload.id]:action.payload}
        newState.current = action.payload
        newState.all = all
        return newState
      case EDIT_STORY:
        newState = {...state}
        let allStories = {...state.all, [action.payload.id]:action.payload}
        newState.current = action.payload
        newState.all = allStories
        return newState
      case SET_CURRENT_STORY:
        newState = {...state, current: action.payload}
        return newState
      case CLEAR_CURRENT_STORY:
        newState = {...state, current: action.payload}
        return newState
      case DELETE_STORY:
        newState = {...state, current: {}}
        delete newState.all[action.payload]
        return newState
      default:
        return state;
    }
  }