import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditAcceptanceCriteria } from "../../store/acceptanceCriteria"


const editAC = ({content, setEdit}) => {
    const [ac, setAc] = useState(content.text)
    const story = useSelector(state => state.stories.current)
    const errors = useSelector(state => state.session.errors)
    const dispatch = useDispatch()
    const updateAC = async (e) => {
        e.preventDefault()
        await dispatch(EditAcceptanceCriteria({id:content.id, acceptanceCriteria:text, story_id: story.id}))
        if(!errors){
            setEdit(false)
        }
    }
    return (
        <form onSubmit={updateAC}>
            <input type="text" value={ac} onChange={(e)=>setAc(e.target.value)}/>
            <button type="submit">Save</button>
        </form>
    )
}

export default editAC