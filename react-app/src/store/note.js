import { SetErrors } from "./session"

const ADD_NOTE= "stories/ADD_NOTE"
const EDIT_NOTE="stories/EDIT_NOTE"
export const SET_NOTES = "stories/SET_NOTES"

const SET_CURRENT_NOTE = "stories/SET_CURRENT_NOTE"
const CLEAR_CURRENT_NOTE = "stories/CLEAR_CURRENT_NOTE"


export const setUserNotes = (notes) =>({
    type: SET_NOTES,
    payload: notes
})

const AddNewNote = (note) =>({
    type: ADD_NOTE,
    payload: note
})


const setCurrentNote = (note) => ({
  type: SET_CURRENT_NOTE,
  payload: note
})

const editNote = (note) => ({
  type: EDIT_NOTE,
  payload:  note
})

export const clearCurrent = () => ({
  type: CLEAR_CURRENT_NOTE,
  payload: null
})


export const AddNote = (note) => async dispatch => {
  const response = await fetch('/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       text: note
      })
    })
    if(response.ok){
        let resJSON = await response.json()
        if(resJSON.errors){
            dispatch(SetErrors(resJSON.errors))
        }else{
          dispatch(AddNewNote(resJSON))
        }
    }

}

export const GetAllNotes = () => async dispatch => {
  const response = await fetch(`/api/notes`)
  if (response.ok){
    let resJSON = await response.json()
    dispatch(setUserNotes(resJSON))
  }
}

export const EditSavedNote = (note) => async dispatch => {
const response = await fetch(`/api/notes/${note.id}`, {
    method: 'PATCH',
    body:JSON.stringify({
      text: note.text
    })
  })
  if(response.ok){
      let resJSON = await response.json()
      if(resJSON.errors){
          dispatch(SetErrors(resJSON.errors))
      }else{
        dispatch(editNote(resJSON))
      }
  }

}



export const setNoteCurrent = (note) => dispatch => {
dispatch(setCurrentNote(note))
}

const initialState = {all:{}, current:{}}
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_NOTES:
      newState = {...state, all:action.payload}
      return newState
    case ADD_NOTE:
      newState = {...state}
      let all = {...state.all, [action.payload.id]:action.payload}
      newState.current = action.payload
      newState.all = all
      return newState
    case EDIT_NOTE:
      newState = {...state}
      let allStories = {...state.all, [action.payload.id]:action.payload}
      newState.current = action.payload
      newState.all = allStories
      return newState
    case SET_CURRENT_NOTE:
      newState = {...state, current: action.payload}
      return newState
    case CLEAR_CURRENT_NOTE:
      newState = {...state, current: action.payload}
      return newState
    default:
      return state;
  }
}
