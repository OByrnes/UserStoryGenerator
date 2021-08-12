
import SubInnerSideBar from "./SubInnerSideBar"

const InnerSideBar = ({feature}) => {
    const {questions, actions} = feature
    
    
    return (
        <div >
            <SubInnerSideBar key={feature.feature} feature={feature} index={null} ele="feature name"/>
        {questions.map((question, index)=>(
            <SubInnerSideBar key={`${questions[index]}+index`} feature={feature} index={index} ele="questions" />
        ))}
        {actions.map((action, index)=>(
            <SubInnerSideBar key={`${action}+index`} feature={feature} index={index} ele="actions" />
        ))}
        
</div>
    )

}

export default InnerSideBar