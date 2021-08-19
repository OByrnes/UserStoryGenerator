const ADD_STORY= "stories/ADD_STORY"
const EDIT_STORY="stories/EDIT_STORY"
const SET_STORIES = "stories/SET_STORIES"
const SET_ERRORS = "stories/SET_ERRORS"
const SET_CURRENT_STORY = "stories/SET_CURRENT_STORY"
const CLEAR_CURRENT_STORY = "stories/CLEAR_CURRENT_STORY"


export const setUserStories = (stories) =>({
    type: SET_STORIES,
    payload: stories
})

const AddNewStory = (story) =>({
    type: ADD_STORY,
    payload: story
})

const SetErrors = (errors) => ({
    type: SET_ERRORS,
    payload: errors
})

const setCurrentStory = (story) => ({
  type: SET_CURRENT_STORY,
  payload: story
})

const editStory = (story) => ({
  type: EDIT_STORY,
  payload: story
})

export const clearCurrent = () => ({
  type: CLEAR_CURRENT_STORY,
  payload: null
})

export const AddUserStory = (form) => async dispatch => {
    const response = await fetch('/api/stories/', {
        method: 'POST',
        body: form
      })
      if(response.ok){
          let resJSON = await response.json()
          if(resJSON.errors){
              dispatch(SetErrors(resJSON.errors))
          }else{
            dispatch(AddNewStory(resJSON))
          }
      }

}

export const EditUserStory = (form, id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`, {
      method: 'PATCH',
      body: form
    })
    if(response.ok){
        let resJSON = await response.json()
        if(resJSON.errors){
            dispatch(SetErrors(resJSON.errors))
        }else{
          dispatch(editStory(resJSON))
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
      default:
        return state;
    }
  }