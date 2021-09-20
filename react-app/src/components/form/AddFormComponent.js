import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStory } from "../../context/StoryContext"
import { AddFeature } from '../../store/features';

const AddFeatureComponent = () => {
    const dispatch = useDispatch()
    const story = useSelector(state => state.stories.current)
    const [featureName, setFeatureName] = useState('')
    const { status, setCurrentFeature } =  useStory()
    
   
    const moveToNextSection = async () => {
        let newFeature={
                title:featureName,
                story_id: story.id
            }
           let good = await dispatch(AddFeature(newFeature))
           if(good==="good"){
            status.current = 'questions'
            setCurrentFeature(featureName)

        }

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