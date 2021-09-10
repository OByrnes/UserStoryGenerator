import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import CreateStoryForm from "./form/CreateStoryForm";
import { createStory } from "../helper/createStory";
import { useStory } from "../context/StoryContext";
import Preview from "./preview";
import { getCurrent, setCurrent } from "../store/story";
import { useParams } from "react-router";

const StoryPage = () => {
    const {id} = useParams()
    const story = useSelector(state => state.stories.current)
    const stories = useSelector(state => state.stories.all)
    const { setStoryObj, setMdStory, mdStory } = useStory()
    const [view, setView] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=> {
        if(Object.values(story).length){
            setMdStory(story.story)
            setStoryObj(story)
        }else{
            dispatch(getCurrent(id))
        }
    },[story])
    const EditView = (e) => {
        e.preventDefault()
        setView(true)
    }
    return (
        <>
        {view?<CreateStoryForm story={story} /> :<>
        <Preview />
         <button onClick={() => {navigator.clipboard.writeText(mdStory)}}>Copy to Clipboard</button>
         <button onClick={EditView}> Add More Features</button>
</>
        }
        </>
    )

}

export default StoryPage