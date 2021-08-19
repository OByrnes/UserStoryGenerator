import { useState } from "react"
import {useStory} from "../context/StoryContext"

const Action = () => {
    const [who, setWho] = useState('')
    const [action, setAction] = useState('')
    const [result, setResult] = useState('')
    const [alert, setAlert] = useState('')
    const {currentFeature, storyObj, setStatus, setStoryObj} = useStory()

    const addNewAction = () => {
        let newActions = [...storyObj[currentFeature].actions, action]
        let newResults= [...storyObj[currentFeature].results, result]
        let newUsers = [...storyObj[currentFeature].users, who]
        setAction("")
        setResult('')
        setWho('')
        setAlert(`Your question and answer was added to the ${currentFeature} feature`)
        let updatedFeature = storyObj[currentFeature]
        updatedFeature.actions = newActions
        updatedFeature.results = newResults
        updatedFeature.users = newUsers
        let updatedStory = {...storyObj}
        updatedStory[currentFeature] = updatedFeature
        setStoryObj(updatedStory)
    }
    const moveToNextSection = () => {
        addNewAction()
        setStatus("new")
    }
    const goBackToUser = () => {
        if(action && result){
            addNewAction()
        }
        setStatus("userA")
    }
    
    return (
        <div>
            {alert? <div>{alert}</div>: null}
        <label>
                Who:
                <span>Example: "User"</span>
            </label>
                <input tabIndex={2} type='text' value={who} onChange={(e)=>setWho(e.target.value)} required/>
            <label>
                Action:
                <span>Example: "navigate to my profile page"</span>
            </label>
                <input tabIndex={3} type='text' value={action} onChange={(e)=>setAction(e.target.value)} required/>
            <label>
                Result:
                <span>Example: "view my recent notes"</span>
            </label>
                <input tabIndex={4} type='text' value={result} onChange={(e)=>setResult(e.target.value)} required/>
            <div className="button-Container__inside-form">
            <button tabIndex={5} type='button' onClick={goBackToUser}>Go Back </button>
            <button tabIndex={6} type='button' onClick={addNewAction}>Add New Action</button>
            <button tabIndex={7} type='button' onClick={moveToNextSection}>Move to Next Feature</button>
            </div>
        </div>
    )
}

export default Action