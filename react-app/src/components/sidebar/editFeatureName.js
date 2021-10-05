import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditSavedFeature } from "../../store/features"



const EditFeatureName = ({content, setEdit}) => {
    const story = useSelector(state => state.stories.current)
    const dispatch = useDispatch()
    const [featureName, setFeatureName] = useState(content.name)
    const UpdateFeature = async (e) => {
        e.preventDefault()
        let good = await dispatch(EditSavedFeature({id:content.id, title: featureName, story_id: story.id }))
        if(good){
            setEdit(false)
        }
    }
    return(
    <form className="edit" onSubmit={UpdateFeature}>
        <input className="edit_input" type="text" value={featureName} onChange={(e)=>setFeatureName(e.target.value)}/>
        <button type="submit">Save</button>
        
    </form>
    )
}


export default EditFeatureName