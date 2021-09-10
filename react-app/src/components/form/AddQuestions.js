import {useStory} from "../../context/StoryContext";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AddQuestion } from "../../store/questions";
import { SetErrors } from "../../store/session";


const AddQuestions = () => {
    const dispatch = useDispatch()

    const story = useSelector(state => state.stories.current)
    const errors = useSelector(state => state.errors)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
 

    const {status, currentFeature} = useStory()
    

    const addNewQuestion = async () => {
        const newQuestion = {question, answer, story_id:story.id}
        await dispatch(AddQuestion(newQuestion))
        if(!errors){
            setQuestion("")
            setAnswer('')
            dispatch(SetErrors([`Your question and answer was added to the ${currentFeature} feature`]))
            
        }
    }
    const moveToNextSection = () => {
        addNewQuestion()
        status.current = "userA"
    }
    return (
        <div>
     
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