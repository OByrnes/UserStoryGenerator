
import { useState} from "react"
import EditActions from "./editActions"
import EditFeatureName from "./editFeatureName"
import EditQuestion from "./editQuestions"
import EditAC from "./editAC"
import { useDispatch, useSelector } from "react-redux"
import { useStory } from "../../context/StoryContext"
import { setCurrentIssue } from "../../store/issues"
import { setCurrent as setCurrentFeature } from "../../store/features"
import { setCurrent } from "../../store/story"






const SubInnerSideBar = ({content, feature, ele}) => {
    const {status} = useStory()
    const [edit, setEdit] = useState(false)
    const story = useSelector(state => state.stories.current)
    
    const dispatch = useDispatch()

    const addMoreAC = () => {
        status.current = "AC"
        dispatch(setCurrentFeature(feature))
        dispatch(setCurrentIssue(content))
        dispatch(setCurrent(story))
        
    }
    
   
    if(ele ==="questions"){
        return(<div onClick={(e)=>e.target.tagName.toUpperCase() != 'INPUT' && setEdit(!edit) } >
                {edit?
                <EditQuestion feature={feature} content={content} setEdit={setEdit}/>:
                <>
                <span>{content.question}</span>
                <span>{content.answer}</span></>}
            </div>)

}else if(ele === "actions"){
    return(
    <div onClick={(e)=>e.target.tagName.toUpperCase() != 'INPUT' && setEdit(!edit) } >
    {edit? <> 
    <EditActions content={content} setEdit={setEdit}  />
    {content.ac && content.ac.map(crit => (
        <EditAC content={crit} setEdit={setEdit} feature={feature} />
    ))}
    <button className="addACbutton" onClick={()=>addMoreAC()}>Add More Acceptance Criteria</button>
    </>:
     <>
     <h4>Story</h4>
     <span>{content.user}</span>
    <span>{content.action}</span>
    <span>{content.result}</span>
    {content.ac?<h4>Acceptance Criteria</h4>: null}
    {content.ac? content.ac.map(crit => (
        <span key={crit.id}>{crit.text}</span>
    )):null}
    
    </>}
</div>)
}else{
    return (<div onClick={(e)=>e.target.tagName.toUpperCase() != 'INPUT' && setEdit(!edit) }>
        {edit? <EditFeatureName content={content} setEdit={setEdit}/>:<h3>{content.name}</h3>}</div>
    )
}

    

}

export default SubInnerSideBar