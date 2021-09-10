import React, { useState, useEffect, useRef } from "react";
import { useStory } from "../../context/StoryContext";

import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import PortionOfComponent from "./PortionOfComponent";
import Preview from "../preview";
import SideBar from "../sidebar/Sidebar";

import { AddUserStory, editStory, EditUserStory, getCurrent } from "../../store/story";



const CreateStoryForm = () => {
    const story = useSelector(state=> state.stories.current)
    const user = useSelector(state => state.session.user)
    const errors = useSelector(state => state.errors)
    const { id } = useParams()
    const [appTitle, setAppTitle] = useState(id ? story.title: "")
    const [showPreview, setShowPreview] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [editTitle, setEditTitle] = useState(id?false:true)
    const [started, setStarted] = useState(id? true: false)
    const { status } = useStory()
   const inputTitleRef = useRef()
    useEffect(()=> {
        if(id){
            setAppTitle(story.title)
        }
        inputTitleRef.current.focus()
    },[story])
    const dispatch = useDispatch()
    
    const PreviewStory = () => {
        
        setShowPreview(true)
    }

    const startStory = async (e) => {
        e.preventDefault()
        const newStory = {app_name: appTitle, user_id: user.id}
        await dispatch(AddUserStory(newStory))
        if(!errors){
            setStarted(true)
        }
    }
    useEffect(()=> {
        if(id){
            dispatch(getCurrent(id))
        }
    },[dispatch])
    
    

    const updateTitle = async () => {
        await dispatch(editStory({
            id:story.id,
            app_name:appTitle
        }))
        if(!errors){
            setEditTitle(false)
        }
    }
    useEffect(()=>{
        updateTitle()
        
    },[appTitle])

    return (
    <div className="outer_container">
    <div className="main-Content__container">
        <form className="form-Styling">
            {(editTitle || status === "new")?<div>
            <label>
                Name Of The App
            </label>
                <input ref={inputTitleRef} tabIndex={1} type="text" value = {appTitle} onChange={(e)=>setAppTitle(e.target.value)} />
                <button type="button" onClick={startStory}>Start New Story</button>
                </div>:<h2 onClick={()=>setEditTitle(true)}>{appTitle}</h2>}
            {started ? <PortionOfComponent />: null}
            <div className='button-container' >
                <button hidden={!story.story} type='button' onClick={() => {navigator.clipboard.writeText(story.story)}} >Copy To Clipboard</button>
                {showPreview?<button onClick={()=>setShowPreview(false)}>Hide Preview</button>:<button hidden={!(status==='new' && story.story)} type='button' onClick={PreviewStory} >Show Preview</button>}

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