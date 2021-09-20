
import { useState, useEffect } from "react"
import EditActions from "./editActions"
import EditFeatureName from "./editFeatureName"
import EditQuestion from "./editQuestions"
import { useDispatch, useSelector } from "react-redux"
import { useStory } from "../../context/StoryContext"
import { setCurrentIssue } from "../../store/issues"
import { setCurrent as setCurrentFeature } from "../../store/features"
import { setCurrent } from "../../store/story"






const SubInnerSideBar = ({content, feature, ele}) => {
    const {status} = useStory()
    const [edit, setEdit] = useState(false)
    const story = useSelector(state => state.stories.current)
    const addMoreAC = (issue) => {
        status.current = "AC"
        setCurrentFeature(feature)
        setCurrentIssue(issue)
        setCurrent(story)
    }
    
    const dispatch = useDispatch()
    
   
    if(ele ==="questions"){
        return(<div onClick={()=>setEdit(true)} >
                {edit?
                <EditQuestion feature={feature} content={content} setEdit={setEdit}/>:
                <>
                <span>{content.question}</span>
                <span>{content.answer}</span></>}
            </div>)

}else if(ele === "actions"){
    return(
    <div onClick={()=>setEdit(true)} >
    {edit? <> 
    <EditActions content={content} setEdit={setEdit}  />
    {content.ac.map(crit => (
        <editAC content={crit} setEdit={setEdit} />
    ))}
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
    <button onClick={()=>addMoreAC(content)}>Add More Acceptance Criteria</button>
    </>}
</div>)
}else{
    return (<div onClick={()=>setEdit(true)}>{edit? <EditFeatureName content={content} setEdit={setEdit}/>:<h3>{content.name}</h3>}</div>
    )
}

    

}

export default SubInnerSideBar