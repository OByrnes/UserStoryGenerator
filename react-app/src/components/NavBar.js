import userStory from "../images/userStory.png"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import StoryDropDown from "./storyDropDown";
import {useStory} from "../context/StoryContext"
import { clearCurrent } from "../store/story";

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const {setStoryObj} = useStory()
  const history = useHistory()
  const dispatch = useDispatch()
 const goToHome = (e) => {
  e.preventDefault()
  if(user){
    setStoryObj({featureList:[], title:""})
    dispatch(clearCurrent())

  }
  history.push("/create")

 }

  return (
    <nav>
      <ul>
        <li>
          <button className="HomeButton" onClick={goToHome} >
            <img src={userStory} alt="home" />
          </button>
        </li>
       { !user ? <><li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li></>:
        <>
        <StoryDropDown />
        <li>
          <LogoutButton />
        </li></>}
      </ul>
    </nav>
  );
}

export default NavBar;
