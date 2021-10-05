import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStory } from "../../context/StoryContext"
import { AddFeature } from '../../store/features';

const AddFeatureComponent = () => {
    const dispatch = useDispatch()
    const story = useSelector(state => state.stories.current)
    const [featureName, setFeatureName] = useState('')
    const { status, setCurrentFeature } =  useStory()
    
   
    const moveToNextSection = async (nextSection) => {
        let newFeature={
                title:featureName,
                story_id: story.id
            }
           let good = await dispatch(AddFeature(newFeature))
           if(good==="good"){
            status.current = nextSection
            setCurrentFeature(featureName)

        }

    }
   

    return(
        <div>
        <label>
            Feature
        </label>
            <input type="text" value={featureName} onChange={(e)=>setFeatureName(e.target.value)}/>
        <button type='button' onClick={()=>moveToNextSection("questions")}>Add Questions</button>
        <button type='button' onClick={()=>moveToNextSection("action")}>Add Story and Acceptance Criteria</button>
        
        </div>

    )


}

export default AddFeatureComponent