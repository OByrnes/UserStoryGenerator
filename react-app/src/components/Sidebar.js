const SideBar= () => {
    
    const {currentFeature, storyObj, setStatus, setStoryObj} = useStory()
    const featureList = storyObj.featureList
    return (
        <div className="side-bar__container">
            {featureList.map(feature => (
                
            ))}



        </div>
    )

}

export default SideBar;