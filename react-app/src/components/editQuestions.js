import { useState } from "react"
import { useStory } from "../context/StoryContext"


const EditQuestion = ({feature, index, setEdit}) => {
    const {setStoryObj, storyObj } = useStory()
    const [question, setQuestion] = useState(storyObj[feature.feature].questions[index])
    const [answer, setAnswer] = useState(storyObj[feature.feature].answers[index])
    const UpdateFeature = (e) => {
        e.preventDefault()

        const updatedStory = {...storyObj}
        const updatedFeature = feature
        const updatedQuestions = [...feature.questions]
        updatedQuestions[index] = question
        const updatedAnswers = [...feature.answers]
        updatedAnswers[index] = answer
        updatedFeature.questions = updatedQuestions
        updatedFeature.answers = updatedAnswers
        updatedStory[feature.feature] = updatedFeature
        setStoryObj(updatedStory)
        setEdit(false)
    }
    
    return(
    <form className="edit" onSubmit={UpdateFeature}>
        <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
        <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
        <button type="submit">Save</button>
        
    </form>
    )
}


export default EditQuestion