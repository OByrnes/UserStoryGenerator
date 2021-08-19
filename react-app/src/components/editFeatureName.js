import { useState } from "react"
import {useStory} from "../context/StoryContext"


const EditFeatureName = ({feature, setEdit}) => {
    const {setStoryObj, storyObj} = useStory()
    const [featureName, setFeatureName] = useState(storyObj[feature.feature].feature)
    const UpdateFeature = (e) => {
        e.preventDefault()

        const updatedStory = {...storyObj}
        const updatedFeature = feature
        updatedFeature.feature = featureName
        updatedStory[feature.feature] = updatedFeature
        setStoryObj(updatedStory)
        setEdit(false)
    }
    return(
    <form className="edit" onSubmit={UpdateFeature}>
        <input type="text" value={featureName} onChange={(e)=>setFeatureName(e.target.value)}/>
        <button type="submit">Save</button>
        
    </form>
    )
}


export default EditFeatureName