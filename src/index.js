// Import React and necessary modules from react-dom/client
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App';

// Import BrowserRouter from react-router-dom for routing
import { BrowserRouter } from 'react-router-dom';

// Import PersistGate from redux-persist for persisting state
import { PersistGate } from 'redux-persist/integration/react';

// Import the Redux store and persistor from the store file
import { persistor, store } from './redux/store';

// Import Provider from react-redux to provide the Redux store to the entire app
import { Provider } from "react-redux";

// Create a root element using ReactDOM.createRoot, targeting the element with ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component wrapped in Provider and PersistGate, and enclosed in BrowserRouter
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
