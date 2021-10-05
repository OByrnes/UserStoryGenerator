import { useState } from "react"
import { useDispatch } from "react-redux"
import { EditSavedNote } from "../store/note"

const IndividualNote = ({note}) => {
    const [edit, setEdit] = useState(false)
    const [newNoteText, setNewNoteText] = useState(note.text)

    const dispatch = useDispatch()
    return (
        <div>
       {!edit? <p onClick={()=>setEdit(true)}>{note.text}</p>: <>
       <input type="text" value={newNoteText} onChange={(e)=>setNewNoteText(e.target.value)} /> 
       
       <button onClick={dispatch(EditSavedNote({text:newNoteText, id:note.id}))}>Save Changes</button>
       <button onClick={()=>setEdit(false)}>Cancel Changes</button>
       </>}
    </div>
    )

}

export default IndividualNote