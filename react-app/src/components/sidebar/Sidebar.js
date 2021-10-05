import InnerSideBar from "./InnerSideBar";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deleteStory } from "../../store/story";
import { SetErrors } from "../../store/session";
import { clearCurrent } from "../../store/story";

const SideBar= () => {
    
    const history = useHistory()
    const story = useSelector(state => state.stories.current)
    const featureList = story.featureList ? Object.values(story.featureList) : null
    const dispatch = useDispatch()
    const deleteS = async () => {
        const good = await dispatch(deleteStory(story.id))
        if(good){
            history.push("/create")
            dispatch(clearCurrent())
            dispatch(SetErrors([`${story.title} was deleted.`]))
        }
    }
    return (
        <div className="side-bar__container">
            {story.id?
            <>
            <div>
                <h2>{story.title}</h2>
                <button onClick={deleteS}>Delete Story</button>
            </div>
            <h3>Features:</h3>
            </>: 
            <div><h4>No Title Yet</h4>
            </div>}
            {featureList && featureList.map(feature => (

                <InnerSideBar key={feature.id} feature={feature} />
                
            ))}



        </div>
    )

}

export default SideBar;