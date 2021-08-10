import {useStory} from "../context/StoryContext"
import { useState  } from "react"

const UserA = () => {
    const {setStatus,setStoryObj, storyObj, currentFeature} = useStory()
    const [userA, setUserA] = useState("")
    const [alert, setAlert] = useState("")
    const moveToNextSection = () => {
        setAlert(`Your user was added to the ${currentFeature} feature`)
        let updatedFeature = storyObj[currentFeature]
        updatedFeature.userA = userA
        let updatedStory = {...storyObj}
        updatedStory[currentFeature] = updatedFeature
        setUserA('')
        setStoryObj(updatedStory)
        setStatus('action')
    }

    return (
        <div>
            {alert?<div>{alert}</div>:null}
        <label>
            Type of User that interacts with this feature:
            <span>Example: "Admin User or Logged in User"</span>
        </label>
            <input tabIndex={2} type='text' value={userA} onChange={(e)=>setUserA(e.target.value)} />
        <button tabIndex={3} onClick={moveToNextSection}>Move To next Section</button>
        </div>
    )

}

export default UserA