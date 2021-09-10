import { useEffect, useRef, useState } from "react"
import {useStory} from "../../context/StoryContext"
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { SetErrors } from "../../store/session";
import { AddIssue } from "../../store/issues";


const Action = () => {
    const { currentFeature, status, currentFeatureUser} = useStory()
    const story = useSelector(state => state.stories.current)
    const errors = useSelector(state => state.errors)
    const [who, setWho] = useState(currentFeatureUser)
    const [action, setAction] = useState('')
    const [result, setResult] = useState('')
    const [newAcceptanceCriteria, setNewAcceptanceCriteria] = useState("")
    const [acceptanceCriteria, setAcceptanceCriteria] = useState([""])
    const dispatch = useDispatch()

    const addNewAction = async () => {
        const issue = {action, result, feature_id: currentFeature.id, story_id: story.id}
        await dispatch(AddIssue(issue, acceptanceCriteria))
        if(!errors){
            dispatch(SetErrors([`Your story and criteria was added to the ${currentFeature} feature`]))
            setAction("")
            setResult('')
            setAcceptanceCriteria('')
        }
    }
    const moveToNextSection = () => {
        addNewAction()
        status.current = "new"
    }
    const inputActionRef = useRef()
    useEffect(()=> {
        inputActionRef.current.focus()
    }, [])
    const goBackToUser = () => {
        if(action && result){
            addNewAction()
        }
        status.current = "userA"
    }
    const addAnother = () => {
        setAcceptanceCriteria(()=>[...acceptanceCriteria, " "])
    }
    
    return (
        <div>
        <label>
                Who:
                <span>Example: "User"</span>
            </label>
                <input ref={inputActionRef}  type='text' value={who} onChange={(e)=>setWho(e.target.value)} required/>
            <label>
                Action:
                <span>Example: "navigate to my profile page"</span>
            </label>
                <input tabIndex={2} type='text' value={action} onChange={(e)=>setAction(e.target.value)} required/>
            <label>
                Result:
                <span>Example: "view my recent notes"</span>
            </label>
                <input tabIndex={3} type='text' value={result} onChange={(e)=>setResult(e.target.value)} required/>
            <label>
            Acceptance Criteria:
            <span>Example: "I want to edit a note I have previously made."</span>
        </label>
            {acceptanceCriteria.map((crit, i) => (
                <input key={uuidv4()} tabIndex={4} type='text' value={newAcceptanceCriteria} onChange={(e)=>setNewAcceptanceCriteria(prevValue=> e.target.value)} />

            ))}
            <button onClick={addAnother}>Plus</button>

            <div className="button-Container__inside-form">
            <button tabIndex={5} type='button' onClick={goBackToUser}>Go Back </button>
            <button tabIndex={6} type='button' onClick={addNewAction}>Add New Action</button>
            <button tabIndex={7} type='button' onClick={moveToNextSection}>Move to Next Feature</button>
            </div>
        </div>
    )
}

export default Action