import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditSavedQuestion } from "../../store/questions"



const EditQuestion = ({setEdit, content, feature}) => {
    const story = useSelector(state => state.stories.current)
    const errors = useSelector(state => state.session.errors)
    const [question, setQuestion] = useState(content.question)
    const [answer, setAnswer] = useState(content.answer)
    const dispatch = useDispatch()
    const UpdateFeature = async (e) => {
        e.preventDefault()
        await dispatch(EditSavedQuestion({story_id: story.id, question, answer, id:content.id, feature_id: feature.id}))
        if(!errors){
            setEdit(false)
        }
    }
    
    return(
    <form className="edit" onSubmit={UpdateFeature}>
        <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
        <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
        <button type="submit">Save</button>
        
    </form>
    )
}


export default EditQuestion