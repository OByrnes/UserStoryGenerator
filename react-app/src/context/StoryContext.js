import React, {createContext, useContext, useState} from 'react';

export const StoryContext = createContext();
export const useStory= () => useContext(StoryContext);

export default function StoryProvider({ children }){
    const [storyObj, setStoryObj] = useState({featureList:[], title:""})
    const [status, setStatus] = useState("new")
    const [currentFeature, setCurrentFeature] = useState('')
    const [mdStory, setMdStory] = useState()

    return (
        <StoryContext.Provider
        value={{
            storyObj,
            setStoryObj,
            status,
            setStatus,
            currentFeature, 
            setCurrentFeature,
            mdStory,
            setMdStory
        }} >
            {children}
        </StoryContext.Provider>

    )
}