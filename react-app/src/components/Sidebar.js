import InnerSideBar from "./InnerSideBar";
import {useStory} from "../context/StoryContext"

const SideBar= () => {
    
    const { storyObj } = useStory()
    const featureList = storyObj.featureList
    return (
        <div className="side-bar__container">
            <h2>Features:</h2>
            {featureList.map(feature => (

                <InnerSideBar feature={storyObj[feature]} />
                
            ))}



        </div>
    )

}

export default SideBar;