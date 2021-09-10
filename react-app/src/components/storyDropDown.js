import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrent } from "../store/story";



const StoryDropDown = () => {
    const [showDropDown, setShowDropDown] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    let stories = useSelector((state)=>state.stories.all?Object.values(state.stories.all):null)
    const goToTheStory = (story) => {
        dispatch(setCurrent(story))
        setShowDropDown(false)
        history.push(`/stories/${story.id}`)
    }

    const showDropDownFunc = (e) => {
        e.preventDefault()
        setShowDropDown(true)
        
    }
    const hideDropDown = (e) => {
        e.preventDefault()
        setShowDropDown(false)
        document.removeEventListener('click', hideDropDown)

        
    }
    useEffect(()=>{
        if(showDropDown){
            document.addEventListener('click', hideDropDown)
        }
        else{
             document.removeEventListener('click', hideDropDown)}
        
    },[showDropDown])
    return (
        <div className="dropdown__container">
            <button onClick={showDropDownFunc}>Stories</button>
            {showDropDown? (
                <ul className="dropdown">
                    {stories.map(story => 
                        <li key={story.id} onClick={()=>goToTheStory(story)}>{story.title}</li>
                        )}
                </ul>
            ) :null}
        </div>
    )



}

export default StoryDropDown