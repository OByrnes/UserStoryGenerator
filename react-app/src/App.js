import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import CreateStoryForm from './components/form/CreateStoryForm'
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Splash from './components/splash/splash';
import StoryPage from './components/storypage';
import NotePage from './components/NotePage';
import ErrorComponent from './components/errors';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <ErrorComponent />
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/create' exact={true} >
         <CreateStoryForm story={null}/>
        </ProtectedRoute>
        <ProtectedRoute path="/stories/:id" exact={true}>
          <StoryPage />
        </ProtectedRoute>
        <ProtectedRoute path="/notes" exact={true}>
          <NotePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
