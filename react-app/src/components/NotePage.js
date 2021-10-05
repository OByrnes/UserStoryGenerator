import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditSavedNote, AddNote, GetAllNotes } from "../store/note"
import IndividualNote from "./individualNote"

const NotePage = () => {
    const [noteText, setNoteText] = useState("")
    const [date, setDate] = useState(new Date().toISOString().slice(0,12))

    const dispatch = useDispatch()
    const saveNote = (e) => {
        e.preventDefault()
        dispatch(AddNote({noteText, date:date}))
        setNoteText("")

    }
    const notes = useSelector(state => Object.values(state.notes.all))
    // useEffect(()=>{
    //     dispatch(GetAllNotes())
    // },[])

    return (
        <div className="note_outer_container">
            <div>
                {notes.map(note => (
                    <IndividualNote key={note.id} note={note} />
                ))}

            </div>
            <form onSubmit={(e)=>saveNote(e)}>
                <label>
                    Add a note ...
                </label>
                <textarea value={noteText} onChange={(e)=>setNoteText(e.target.value)} />
                <input  type="datetime-local"
       name="meeting-time" value={date} onChange={(e)=>setDate(e.target.value)} />
                <div>
                    <button type='submit'>Save Note</button>
                </div>
            </form>
        </div>
    )
}

export default NotePage