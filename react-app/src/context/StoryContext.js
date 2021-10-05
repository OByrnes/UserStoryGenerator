import React, {createContext, useContext, useRef, useState} from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

export const StoryContext = createContext();
export const useStory= () => useContext(StoryContext);

export default function StoryProvider({ children }){
    const status = useRef("new")
    const feature = useRef()
    const issue = useRef()
    const [currentFeature, setCurrentFeature] = useState('')
    const [currentFeatureUser, setCurrentFeatureUser] = useState('')

    return (
        <StoryContext.Provider
        value={{
            status,
            currentFeature, 
            setCurrentFeature,
            currentFeatureUser,
            setCurrentFeatureUser,
            feature,
            issue
        }} >
            {children}
        </StoryContext.Provider>

    )
}