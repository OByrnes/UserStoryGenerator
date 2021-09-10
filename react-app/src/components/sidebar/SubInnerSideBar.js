
import { useState, useEffect } from "react"
import EditActions from "./editActions"
import EditFeatureName from "./editFeatureName"
import EditQuestion from "./editQuestions"
import { useDispatch, useSelector } from "react-redux"






const SubInnerSideBar = ({content,feature, ele}) => {
    const [edit, setEdit] = useState(false)
    const {questions, answers, users, results, actions, acceptanceCriteria} = feature
    const story = useSelector(state => state.stories.current)
    
    const dispatch = useDispatch()
    
   
    if(ele ==="questions"){
        return(<div onClick={()=>setEdit(true)} >
                {edit?
                <EditQuestion content={content} setEdit={setEdit}/>:
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
    <h4>Acceptance Criteria</h4>
    {content.ac.map(crit => (
        <span key={crit.id}>{crit.text}</span>
    ))}
    </>}
</div>)
}else{
    return (<div onClick={()=>setEdit(true)}>{edit? <EditFeatureName content={feature.name} setEdit={setEdit}/>:<h3>{feature.feature}</h3>}</div>
    )
}

    

}

export default SubInnerSideBar