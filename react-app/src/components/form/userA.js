import {useStory} from "../../context/StoryContext"
import { useEffect, useRef, useState  } from "react"


const UserA = () => {
    const {status, setCurrentFeatureUser} = useStory()
    const [userA, setUserA] = useState("")
    
    const moveToNextSection = () => {
        setCurrentFeatureUser(userA)
        setUserA('')
        status.current="action"
    }
    const goBackToQuestions= ()=>{
        if(userA){
            setCurrentFeatureUser(userA)
            setUserA('') 
        }
        status.current="questions"
    }
    const inputUserRef = useRef()
    useEffect(()=>{
        inputUserRef.current.focus()
    },[])

    return (
        <div>
            
        <label>
            Type of User that interacts with this feature:
            <span>Example: "Admin User or Logged in User"</span>
        </label>
            <input ref={inputUserRef} tabIndex={2} type='text' value={userA} onChange={(e)=>setUserA(e.target.value)} />
            
        <button tabIndex={3} type='button' onClick={goBackToQuestions}>Go Back </button>
        <button tabIndex={4} onClick={moveToNextSection}>Move To next Section</button>
        </div>
    )

}

export default UserA