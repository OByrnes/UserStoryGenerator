import React, { useEffect } from 'react';
import Action from './Action';
import AddFeatureComponent from './AddFormComponent';
import AddQuestion from "./AddQuestions"
import UserA from './userA';
import { useStory } from "../../context/StoryContext"
import AcceptanceCriteria from './acceptanceCriteria';
import { useSelector } from 'react-redux';


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
        }else if(status.current === "AC"){
            return <AcceptanceCriteria />
        }
    }
}

export default PortionOfComponent