import InnerSideBar from "./InnerSideBar";
import {useStory} from "../context/StoryContext"

const SideBar= () => {
    
    const {currentFeature, storyObj, setStatus, setStoryObj} = useStory()
    const featureList = storyObj.featureList
    return (
        <div className="side-bar__container">
            {featureList.map(feature => (
                <InnerSideBar feature={storyObj[feature]} />
                
            ))}



        </div>
    )

}

export default SideBar;