import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import CreateStoryForm from "./form/CreateStoryForm";
import { createStory } from "../helper/createStory";
import { useStory } from "../context/StoryContext";
import Preview from "./preview";
import { getCurrent, setCurrent } from "../store/story";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { authenticate } from "../store/session";

const StoryPage = () => {
    const {id} = useParams()
    const { status } =  useStory()
    const story = useSelector(state => state.stories.current)
    const stories = useSelector(state => state.stories.all)
    const { setStoryObj, setMdStory, mdStory } = useStory()
    const [view, setView] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=> {
        if(story.id ){
            
        }else{
            dispatch(getCurrent(id))
        }
        
    },[story])

    useEffect(()=>{
        dispatch(getCurrent(id))
        status.current = "new"
        setView(false)
    },[id])
    
    const EditView = (e) => {
        e.preventDefault()
        setView(true)
    }

    return (
        <>
        {view?<CreateStoryForm story={story} /> :<>
        <Preview />
         <button onClick={() => {navigator.clipboard.writeText(story.story)}}>Copy to Clipboard</button>
         <button onClick={EditView}> Add More Features</button>
         <NavLink to={`/issues/${story.id}`} exact={true} activeClassName='active'>Issues</NavLink>
</>
        }
        </>
    )

}

export default StoryPage