import bobsStory from "../images/bobsStory.png";
import bobsResult from "../images/bobsResult.png";
import bobsAction from "../images/bobsAction.png";
import bobTheUser from "../images/bobTheUser.png";
import {  Redirect, useLocation, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

const Splash = () => {
    const location = useLocation()
    const user = useSelector(state => state.session.user)
    if (user) {
        return <Redirect to={{
            pathname: "/create",
            state: { user: user }
          }} />;
      }
      console.log("property_id",location);
return (
    <div className="splashPage">
        <div className="splash-header">
        <p>A user story is an informal explaination of a feature from the perspective of a user</p>
        <p>They help you answer questions about the features</p>
        <p>and save you time in development</p>
        <NavLink className='signup' to="/signup">Start Now</NavLink>
        </div>
        <p className="splash__x">User stories have three parts...</p>
        <p className="splash__b"> Who? <br></br>The User or specific type of user </p>
        <img className="splash__c" src={bobTheUser} alt="user"/>
        <p className="splash__d">Action? <br/>The Action the user takes</p>
        <img src={bobsAction} alt="action" className="splash__e"/>
        <p className="splash__f">Result? <br></br> The goal or result of the Action</p>
        <img className="splash__g" src={bobsResult} alt="result"/>
        <p className="splash__h" >User stories help to decide <em> what code to write </em> and why.</p>
        <img src={bobsStory} alt="userStory" className="splash__i"/>
    </div>
)
}

export default Splash