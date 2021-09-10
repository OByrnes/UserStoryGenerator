import InnerSideBar from "./InnerSideBar";

import { useSelector } from "react-redux";

const SideBar= () => {
    
    const story = useSelector(state => state.stories.current)
    const featureList = Object.values(story.featureList)
    return (
        <div className="side-bar__container">
            <h2>Features:</h2>
            {featureList.map(feature => (

                <InnerSideBar key={feature.id} feature={feature} />
                
            ))}



        </div>
    )

}

export default SideBar;