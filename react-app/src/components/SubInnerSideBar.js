
import { useState, useEffect } from "react"
import EditActions from "./editActions"
import EditFeatureName from "./editFeatureName"
import EditQuestion from "./editQuestions"
import { useDispatch, useSelector } from "react-redux"
import {useStory} from "../context/StoryContext"
import { EditUserStory } from "../store/story"
import { createStory } from "../helper/createStory"


const SubInnerSideBar = ({feature, index, ele}) => {
    const [edit, setEdit] = useState(false)
    const {questions, answers, users, results, actions, acceptanceCriteria} = feature
    const story = useSelector(state => state.stories.current)
    const {setMdStory, storyObj } = useStory()

    const dispatch = useDispatch()
    const saveStoryToDb = () => {
        setMdStory(createStory(storyObj))
        const formData = new FormData()
        formData.append("storyObj",JSON.stringify(storyObj))
    
        if(story ){
            dispatch(EditUserStory(formData, story.id))
        }
    }
    useEffect(()=> {
        if(!edit){
            saveStoryToDb()
        }
    }, [edit])
   
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
     <>
     <h4>Story</h4>
     <span>{users[index]}</span>
    <span>{actions[index]}</span>
    <span>{results[index]}</span>
    <h4>Acceptance Criteria</h4>
    <span>{acceptanceCriteria[index]}</span></>}
</div>)
}else{
    return (<div onClick={()=>setEdit(true)}>{edit? <EditFeatureName feature={feature} setEdit={setEdit}/>:<h3>{feature.feature}</h3>}</div>
    )
}

    

}

export default SubInnerSideBar