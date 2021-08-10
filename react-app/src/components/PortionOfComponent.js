import React from 'react';
import Action from './Action';
import AddFeatureComponent from './AddFormComponent';
import AddQuestion from "./AddQuestions"
import UserA from './userA';
import {useStory} from "../context/StoryContext"


const PortionOfComponent = () => {
    const { status, storyObj } =  useStory()
    console.log(storyObj)
 
       { if(status === "new"){
           return <AddFeatureComponent />

        }else if(status === "questions"){
            return <AddQuestion />
        }else if(status === "userA"){
            return <UserA />
        }else if(status === "action"){
            return <Action />
        }
    }
}

export default PortionOfComponent