import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AddAC } from "../../store/acceptanceCriteria";
import { useStory } from "../../context/StoryContext";


const AcceptanceCriteria = ()=>{
    const [newAcceptanceCriteria, setNewAcceptanceCriteria] = useState("")
    const story = useSelector(state => state.stories.current)
    const issue = useSelector(state => state.issues)
    const dispatch = useDispatch()
    
    const { status } = useStory()
    const acRef = useRef()
   
     useEffect(()=> {
         if(acRef.current){
 
             acRef.current.focus()
         }
     },[])
     const addToDB = async () => {
         let newAC = {acceptanceCriteria:newAcceptanceCriteria, story_id: story.id, issue_id: issue.id}
         let good = await dispatch(AddAC(newAC))
         return good
     }
     const addNewAC = ()=>{
        if(addToDB()){
        setNewAcceptanceCriteria("")
        }
     }
     const goBackToStory = () => {
         if (newAcceptanceCriteria){
            if(addToDB()){
                setNewAcceptanceCriteria("")
                status.current = "action"
            }
         }else{
             status.current = "action"
         }
     }
     const moveToNextSection = () => {
         if(addToDB()){
             setNewAcceptanceCriteria("")
             status.current = "new"
         }
     }
    return(
        <div>
            <label>
            Acceptance Criteria:
            <span>Example: "I want to edit a note I have previously made."</span>
        </label>
            
            <input ref={acRef}  tabIndex={4} type='text' value={newAcceptanceCriteria} onChange={(e)=>setNewAcceptanceCriteria(prevValue=> e.target.value)} />

            <div className="button-Container__inside-form">
            <button tabIndex={5} type='button' onClick={goBackToStory}>Go Back </button>
            <button tabIndex={6} type='button' onClick={addNewAC}>Add New Acceptance Criteria</button>
            <button tabIndex={7} type='button' onClick={moveToNextSection}>Move to Next Feature</button>
            </div>
    
            </div>
    )
}

export default AcceptanceCriteria