
import SubInnerSideBar from "./SubInnerSideBar"

const InnerSideBar = ({feature}) => {
    const {questions, actions} = feature
    
   
    
    return (
        <div className="innerSidebar">
        <SubInnerSideBar key={feature.feature} feature={feature} index={null} ele="feature name"/>
        {questions? <h3>questions</h3>:null}
        <ul>
        {questions.map((question, index)=>(
            <li key={`${question}+index`}><SubInnerSideBar  feature={feature} index={index} ele="questions" /></li>
        ))}
        </ul>
        {actions? <h3>Actions</h3>:null}
        {actions.map((action, index)=>(
            <li  key={`${action}+index`} ><SubInnerSideBar feature={feature} index={index} ele="actions" /></li>
            ))}
        
</div>
    )

}

export default InnerSideBar