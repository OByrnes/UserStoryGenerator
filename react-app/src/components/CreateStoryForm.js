import React, { useState, useEffect } from "react";
import { useStory } from "../context/StoryContext";
import { createStory } from "../helper/createStory";
import { useDispatch } from "react-redux";
import {useParams} from "react-router-dom"
import PortionOfComponent from "./PortionOfComponent";
import Preview from "./preview";
import SideBar from "./Sidebar";

import { AddUserStory, EditUserStory } from "../store/story";



const CreateStoryForm = ({story}) => {
    console.log(process.env.REACT_APP_MAPS_KEY)
    const { id } = useParams()
    const [appTitle, setAppTitle] = useState('')
    const [showPreview, setShowPreview] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [editTitle, setEditTitle] = useState(false)
    const { setStoryObj, storyObj, setMdStory, mdStory, status } = useStory()
   
    useEffect(()=> {
        if(story && storyObj.id){
            setAppTitle(story.story.title)
        }
    },[story])
    const dispatch = useDispatch()
    
    const PreviewStory = () => {
        setMdStory(createStory(storyObj))
        setShowPreview(true)
    }

    

    const saveStoryToDb = (e) => {
        e.preventDefault()
        setMdStory(createStory(storyObj))
        const formData = new FormData()
        formData.append("storyObj",JSON.stringify(storyObj))
        if(id){
            dispatch(EditUserStory(formData, story.id))
        }
        else{
        dispatch(AddUserStory(formData))}
    }

    const updateTitle = () => {
        let newObj = {...storyObj}
        newObj.title = appTitle
        setStoryObj(newObj)
    }
    useEffect(()=>{
        updateTitle()
        
    },[appTitle])

    return (
    <div className="outer_container">
    <div className="main-Content__container">
        <form className="form-Styling" onSubmit={saveStoryToDb}>
            {(editTitle || status === "new")?<div>
            <label>
                Name Of The App
            </label>
                <input tabIndex={1} type="text" value = {appTitle} onChange={(e)=>setAppTitle(e.target.value)} />
                </div>:<h2 onClick={()=>setEditTitle(true)}>{appTitle}</h2>}
            <PortionOfComponent />
            <div className='button-container' hidden={!(status==='new' && Object.keys(storyObj).length)}>
                <button hidden={!(status==='new' && Object.keys(storyObj).length)} type='button' onClick={() => {navigator.clipboard.writeText(mdStory)}} >Copy To Clipboard</button>
                {showPreview?<button onClick={()=>setShowPreview(false)}>Hide Preview</button>:<button hidden={!(status==='new' && Object.keys(storyObj).length)} type='button' onClick={PreviewStory} >Show Preview</button>}
                <button hidden={!(status==='new' && Object.keys(storyObj).length)} type="submit" onClick={saveStoryToDb} >Save Story</button>
            </div>
        </form>
        {showPreview && <div className='preview-Container'>
            <Preview />
        </div>}

    </div>
    <div className={showSidebar?"sideBar__holder active":"sideBar__holder"}>
    {showSidebar?<div onClick={()=>setShowSidebar(false)} className="sidebar__scootch"><span>&#187;</span><span>&#187;</span><span>&#187;</span></div>: <div onClick={()=>setShowSidebar(true)} className="sidebar__scootch"><span>&#171;</span><span>&#171;</span><span>&#171;</span></div>}
    {showSidebar && <SideBar />}
    </div>
    </div>
    )
    
}

export default CreateStoryForm