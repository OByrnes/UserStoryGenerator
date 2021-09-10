import React, {createContext, useContext, useRef, useState} from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

export const StoryContext = createContext();
export const useStory= () => useContext(StoryContext);

export default function StoryProvider({ children }){
    const status = useRef("new")
    const [currentFeature, setCurrentFeature] = useState('')
    const [currentFeatureUser, setCurrentFeatureUser] = useState('')

    return (
        <StoryContext.Provider
        value={{
            status,
            currentFeature, 
            setCurrentFeature,
            currentFeatureUser,
            setCurrentFeatureUser
        }} >
            {children}
        </StoryContext.Provider>

    )
}