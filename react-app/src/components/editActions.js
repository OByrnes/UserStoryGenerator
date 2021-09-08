import { useState } from "react"
import {useStory} from "../context/StoryContext"


const EditActions = ({feature, index, setEdit}) => {
    const { storyObj, setStoryObj} = useStory()
    const [who, setWho] = useState(feature.users[index])
    const [action, setAction] = useState(feature.actions[index])
    const [result, setResult] = useState(feature.results[index])
    const [acceptanceCriteria, setAcceptanceCriteria] = useState(feature.acceptanceCriteria[index])
    const UpdateFeature = (e) => {
        e.preventDefault()

        const updatedStory = {...storyObj}
        const updatedFeature = feature
        const updatedActions = [...feature.actions]
        updatedActions[index] = action
        const updatedResults = [...feature.results]
        updatedResults[index] = result
        const updatedUsers = [...feature.users]
        updatedUsers[index] = who
        const updatedCriteria = [...feature.acceptanceCriteria]
        updatedUsers[index] = acceptanceCriteria
        updatedFeature.actions = updatedActions
        updatedFeature.results = updatedResults
        updatedFeature.users = updatedUsers
        updatedFeature.acceptanceCriteria = updatedCriteria
        updatedStory[feature.feature] = updatedFeature
        setStoryObj(updatedStory)

        setEdit(false)
    }
    return(
    <form className="edit" onSubmit={UpdateFeature}>
        <input type="text" value={who} onChange={(e)=>setWho(e.target.value)}/>
        <input type="text" value={action} onChange={(e)=>setAction(e.target.value)}/>
        <input type="text" value={result} onChange={(e)=>setResult(e.target.value)}/>
        <input type="text" value={acceptanceCriteria} onChange={(e)=>setAcceptanceCriteria(e.target.value)}/>
        <button type="submit">Save</button>
        
    </form>
    )
}


export default EditActions