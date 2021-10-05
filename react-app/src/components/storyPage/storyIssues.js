import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getCurrent } from "../../store/story"
import "./story.css"
import Editor from "rich-markdown-editor";
import { NavLink } from "react-router-dom"

const StoryIssues = () => {
    const story = useSelector(state => state.stories.current)
    const [issues, setIssues] = useState(story && story.issues ? Object.values(story.issues).map(issue => issue).flat(): [])
    const {id} = useParams()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(!story || story.id !== id ){
            dispatch(getCurrent(id))
        }

    },[])
    useEffect(()=>{
         if(story && story.issues){
            setIssues(Object.values(story.issues).map(issue => issue).flat())
    
            }
    },[story])

    return(
        <div className="issues__container">
            <NavLink to={`/stories/${id}`}>Back to Story Page</NavLink>
            {issues && issues.map((iss,i) => (
                <div>
                    <Editor key={iss} value={iss} onChange={(e)=>console.log(e())}/>
                    <button onClick={()=>navigator.clipboard.writeText(iss)}>Copy to Clipboard</button>
                </div>
            ))}
        </div>
    )
}

export default StoryIssues