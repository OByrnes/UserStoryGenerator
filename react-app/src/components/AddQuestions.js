import {useStory} from "../context/StoryContext";
import { useState } from 'react';


const AddQuestions = () => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [alert, setAlert] = useState('')

    const {setStoryObj, storyObj, status, setStatus, currentFeature} = useStory()
    

    const addNewQuestion = () => {
        let newQuestions = [...storyObj[currentFeature].questions, question]
        let newAnswers = [...storyObj[currentFeature].answers, answer]
        setQuestion("")
        setAnswer('')
        setAlert(`Your question and answer was added to the ${currentFeature} feature`)
        let updatedFeature = storyObj[currentFeature]
        updatedFeature.questions = newQuestions
        updatedFeature.answers = newAnswers
        let updatedStory = {...storyObj}
        updatedStory[currentFeature] = updatedFeature
        setStoryObj(updatedStory)
    }
    const moveToNextSection = () => {
        addNewQuestion()
        setStatus("userA")
    }
    return (
        <div>
            {alert?<div>{alert}</div>:null}
            <label>
                Question:
                <span>Example: "Can users edit their messages?"</span>
            </label>
                <input tabIndex={2} type='text' value={question} onChange={(e)=>setQuestion(e.target.value)} required/>
            <label>
                Answer:
                <span>Example: "Users can edit messages that they made."</span>
            </label>
                <input tabIndex={3} type='text' value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
                <div className="button-Container__inside-form">
                    <button tabIndex={4} type="button" onClick={addNewQuestion}>Add Next question</button>
                    <button tabIndex={5} type='button' onClick={moveToNextSection}>Move to next section</button>
                </div>
        </div>
    )
}

export default AddQuestions