
import SubInnerSideBar from "./SubInnerSideBar"

const InnerSideBar = ({feature}) => {
    const { questions, name, issues } = feature
    
   
    
    return (
        <div className="innerSidebar">
        <SubInnerSideBar key={feature.id} feature={feature}  ele="feature name"/>
        {questions? <h4>questions</h4>:null}
        <ul>
        {questions.map((question)=>(
            <li key={question.id+"question"}><SubInnerSideBar feature={feature} content={question}  ele="questions" /></li>
        ))}
        </ul>
        
        {issues.map((issue)=>(
            <li  key={`${issue.id}+action`} ><SubInnerSideBar feature={feature} content={issue}  ele="actions" /></li>
            ))}
        
</div>
    )

}

export default InnerSideBar