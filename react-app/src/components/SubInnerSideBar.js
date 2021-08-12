
import { useState } from "react"
import EditActions from "./editActions"
import EditFeatureName from "./editFeatureName"
import EditQuestion from "./editQuestions"


const SubInnerSideBar = ({feature, index, ele}) => {
    const [edit, setEdit] = useState(false)
    const {questions, answers, users, results, actions} = feature

   
    if(ele ==="questions"){
        return(<div onClick={()=>setEdit(true)} >
                {edit?
                <EditQuestion feature={feature} setEdit={setEdit} index={index} />:
                <>
                <span>{questions[index]}</span>
                <span>{answers[index]}</span></>}
            </div>)

}else if(ele === "actions"){
    return(
    <div onClick={()=>setEdit(true)} >
    {edit? <EditActions feature={feature} setEdit={setEdit} index={index} />:
     <><span>{users[index]}</span>
    <span>{actions[index]}</span>
    <span>{results[index]}</span></>}
</div>)
}else{
    return (<div onClick={()=>setEdit(true)}>{edit? <EditFeatureName feature={feature} setEdit={setEdit}/>:<span>{feature.feature}</span>}</div>
    )
}

    

}

export default SubInnerSideBar