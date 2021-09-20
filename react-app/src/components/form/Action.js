import { useEffect, useRef, useState } from "react"
import {useStory} from "../../context/StoryContext"
import { useDispatch, useSelector } from "react-redux";
import { SetErrors } from "../../store/session";
import { AddIssue } from "../../store/issues";


const Action = () => {
    const { currentFeature, status, currentFeatureUser} = useStory()
    const story = useSelector(state => state.stories.current)
    const feature = useSelector(state => state.features)
    const [who, setWho] = useState(currentFeatureUser)
    const [action, setAction] = useState('')
    const [result, setResult] = useState('')
    
    const dispatch = useDispatch()

    const addNewAction = async () => {
        const issue = {action, result, feature_id: feature.id, story_id: story.id, user:who}
        let good = await dispatch(AddIssue(issue))
        if(good==="good"){
            dispatch(SetErrors([`Your story was added to the ${currentFeature} feature`]))
            setAction("")
            setResult('')
            
        }
    }
    const moveToNextSection = () => {
        addNewAction()
        status.current = "AC"
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
    
    
    return (
        <div>
        <label>
                Who:
                <span>Example: "User"</span>
            </label>
                <input ref={inputActionRef} tabIndex={1}  type='text' value={who} onChange={(e)=>setWho(e.target.value)} required/>
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

            <div className="button-Container__inside-form">
            <button tabIndex={4} type='button' onClick={goBackToUser}>Go Back </button>
            <button tabIndex={5} type='button' onClick={addNewAction}>Add New Action</button>
            <button tabIndex={6} type='button' onClick={moveToNextSection}>Move to Acceptance Criteria</button>
            </div>
        </div>
    )
}

export default Action