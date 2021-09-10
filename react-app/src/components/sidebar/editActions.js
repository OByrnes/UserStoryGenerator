import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditSavedIssue } from "../../store/issues"



const EditActions = ({content, setEdit}) => {
    
    const [who, setWho] = useState(content.user)
    const [action, setAction] = useState(content.action)
    const [result, setResult] = useState(content.result)
    const errors = useSelector(state => state.errors)
    const story = useSelector(state => state.story.current)
    const dispatch = useDispatch()
    // const [acceptanceCriteria, setAcceptanceCriteria] = useState(feature.acceptanceCriteria[index])
    const UpdateFeature = async(e) => {
        e.preventDefault()
        await dispatch(EditSavedIssue({story_id:story.id, user:who, action, result, id:content.id}))
        if(!errors){
            setEdit(false)
        }
    }
    return(
    <form className="edit" onSubmit={UpdateFeature}>
        <input type="text" value={who} onChange={(e)=>setWho(e.target.value)}/>
        <input type="text" value={action} onChange={(e)=>setAction(e.target.value)}/>
        <input type="text" value={result} onChange={(e)=>setResult(e.target.value)}/>
        {/* <input type="text" value={acceptanceCriteria} onChange={(e)=>setAcceptanceCriteria(e.target.value)}/> */}
        <button type="submit">Save</button>
        
    </form>
    )
}


export default EditActions