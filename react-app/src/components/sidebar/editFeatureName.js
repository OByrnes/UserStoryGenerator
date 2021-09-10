import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"



const EditFeatureName = ({content, setEdit}) => {
    const story = useSelector(state => state.stories.current)
    const errors = useSelector(state => state.errors)
    const dispatch = useDispatch()
    const [featureName, setFeatureName] = useState(content)
    const UpdateFeature = async (e) => {
        e.preventDefault()
        await dispatch({title: featureName, story_id: story.id })
        if(!errors){
            setEdit(false)
        }
    }
    return(
    <form className="edit" onSubmit={UpdateFeature}>
        <input type="text" value={featureName} onChange={(e)=>setFeatureName(e.target.value)}/>
        <button type="submit">Save</button>
        
    </form>
    )
}


export default EditFeatureName