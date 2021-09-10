import React from 'react';
import Action from './Action';
import AddFeatureComponent from './AddFormComponent';
import AddQuestion from "./AddQuestions"
import UserA from './userA';
import {useStory} from "../../context/StoryContext"


const PortionOfComponent = () => {
    const { status } =  useStory()
 
       { if(status.current === "new"){
           return <AddFeatureComponent />

        }else if(status.current === "questions"){
            return <AddQuestion />
        }else if(status.current === "userA"){
            return <UserA />
        }else if(status.current === "action"){
            return <Action />
        }
    }
}

export default PortionOfComponent