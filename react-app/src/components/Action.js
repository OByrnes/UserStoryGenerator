import { useEffect, useState } from "react"
import {useStory} from "../context/StoryContext"
import { v4 as uuidv4 } from 'uuid';

const Action = () => {
    const {currentFeature, storyObj, setStatus, setStoryObj} = useStory()
    const [who, setWho] = useState(storyObj[currentFeature].userA)
    const [action, setAction] = useState('')
    const [result, setResult] = useState('')
    const [alert, setAlert] = useState('')
    const [newAcceptanceCriteria, setNewAcceptanceCriteria] = useState("")
    const [acceptanceCriteria, setAcceptanceCriteria] = useState([""])

    const addNewAction = () => {
        let newActions = [...storyObj[currentFeature].actions, action]
        let newResults= [...storyObj[currentFeature].results, result]
        let newUsers = [...storyObj[currentFeature].users, who]
        let newAcceptanceCriteria = [...storyObj[currentFeature].acceptanceCriteria, acceptanceCriteria]

        setAction("")
        setResult('')
        setWho(storyObj[currentFeature].userA)
        setAcceptanceCriteria('')
        setAlert(`Your story and criteria was added to the ${currentFeature} feature`)
        let updatedFeature = storyObj[currentFeature]
        updatedFeature.actions = newActions
        updatedFeature.results = newResults
        updatedFeature.users = newUsers
        updatedFeature.acceptanceCriteria = newAcceptanceCriteria
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
    const addAnother = () => {
        setAcceptanceCriteria(()=>[...acceptanceCriteria, " "])
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
            <label>
            Acceptance Criteria:
            <span>Example: "I want to edit a note I have previously made."</span>
        </label>
            {acceptanceCriteria.map((crit, i) => (
                <input key={uuidv4()} tabIndex={5} type='text' value={newAcceptanceCriteria} onChange={(e)=>setNewAcceptanceCriteria(prevValue=> e.target.value)} />

            ))}
            <button onClick={addAnother}>Plus</button>

            <div className="button-Container__inside-form">
            <button tabIndex={6} type='button' onClick={goBackToUser}>Go Back </button>
            <button tabIndex={7} type='button' onClick={addNewAction}>Add New Action</button>
            <button tabIndex={8} type='button' onClick={moveToNextSection}>Move to Next Feature</button>
            </div>
        </div>
    )
}

export default Action