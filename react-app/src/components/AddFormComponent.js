import React, { useState } from 'react';
import { useStory } from "../context/StoryContext"

const AddFeatureComponent = () => {
    const [featureName, setFeatureName] = useState('')
    const { setStatus, setStoryObj, storyObj, setCurrentFeature } =  useStory()
    
   
    const moveToNextSection = () => {
        let newFeature={
                feature:featureName,
                questions: [],
                answers: [],
                userA: '',
                users:[],
                actions:[],
                results:[]
            }

        let updatedStory = {...storyObj}
        updatedStory[featureName] = newFeature
        updatedStory.featureList.push(featureName)
        
        
        setStoryObj(updatedStory)
        setStatus('questions')
        setCurrentFeature(featureName)

    }
   

    return(
        <div>
        <label>
            Feature
        </label>
            <input type="text" value={featureName} onChange={(e)=>setFeatureName(e.target.value)}/>
        <button type='button' onClick={moveToNextSection}>Add Questions</button>
        
        </div>

    )


}

export default AddFeatureComponent