import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import StoryProvider from './context/StoryContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <StoryProvider>
    <Provider store={store}>
        <App />
      </Provider>
    </StoryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
