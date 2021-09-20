import InnerSideBar from "./InnerSideBar";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deleteStory } from "../../store/story";
import { SetErrors } from "../../store/session";

const SideBar= () => {
    
    const history = useHistory()
    const story = useSelector(state => state.stories.current)
    const featureList = story.featureList? Object.values(story.featureList) : null
    const dispatch = useDispatch()
    const deleteS = async () => {
        const good = await dispatch(deleteStory(story.id))
        if(good){
            history.push("/create")
            dispatch(SetErrors([`${story.title} was deleted.`]))
        }
    }
    return (
        <div className="side-bar__container">
            <div>
            <h2>{story.title}</h2>
            <div><button onClick={deleteS}>Delete Story</button></div>
            </div>
            <h3>Features:</h3>
            {featureList && featureList.map(feature => (

                <InnerSideBar key={feature.id} feature={feature} />
                
            ))}



        </div>
    )

}

export default SideBar;