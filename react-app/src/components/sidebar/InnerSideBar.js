
import SubInnerSideBar from "./SubInnerSideBar"
import { useStory } from "../../context/StoryContext"

const InnerSideBar = ({feature}) => {
    const { questions, issues } = feature
    const { status } = useStory()
    
    
    
    return (
        
        <div className="innerSidebar">
        <SubInnerSideBar key={feature.id} content={feature}  ele="feature name"/>
        {questions? <h4>questions</h4>:null}
        <ul>
        {questions ? questions.map((question)=>(
            <li key={question.id+"question"}><SubInnerSideBar feature={feature} content={question}  ele="questions" /></li>
        )): null}
        </ul>
        
        {issues? issues.map((issue)=>(
            <li  key={`${issue.id}+action`} ><SubInnerSideBar feature={feature} content={issue}  ele="actions" /></li>
            )): null}
       </div>

    )

}

export default InnerSideBar