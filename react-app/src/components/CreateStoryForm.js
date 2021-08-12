import React, { useState, useEffect } from "react";
import { useStory } from "../context/StoryContext";
import { createStory } from "../helper/createStory";

import PortionOfComponent from "./PortionOfComponent";
import Preview from "./preview";
import SideBar from "./Sidebar";


const CreateStoryForm = () => {
    const [appTitle, setAppTitle] = useState('')
    const [showPreview, setShowPreview] = useState(false)
    const { setStoryObj, storyObj, setMdStory, mdStory } = useStory()

    const PreviewStory = () => {
        setMdStory(createStory(storyObj))
        setShowPreview(true)
    }

    const submitStory = (e) => {
        e.preventDefault()
        setMdStory(createStory(storyObj))
    }
    useEffect(()=>{
        let newObj = {...storyObj}
        newObj.title = appTitle
        setStoryObj(newObj)
    },[appTitle])
    return (
    <div className="outer_container">
    <div className="main-Content__container">
        <form className="form-Styling" onSubmit={submitStory}>
            <div>
            <label>
                Name Of The App
            </label>
                <input tabIndex={1} type="text" value = {appTitle} onChange={(e)=>setAppTitle(e.target.value)} />
                </div>
            <PortionOfComponent />
            <div className='button-container'>
                <button type="submit">Create Story</button>
                <button type='button' onClick={() => {navigator.clipboard.writeText(mdStory)}}>Copy To Clipboard</button>
                <button type='button' onClick={PreviewStory}>Show Preview</button>
            </div>
        </form>
        {showPreview && <div className='preview-Container'>
            <Preview />
        </div>}

    </div>
    <SideBar />
    </div>
    )
    
}

export default CreateStoryForm