// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.css'


// createRoot(document.getElementById('root')).render(
//   // <StrictMode>
//     <App />,
//     document.getElementById('root'),
//   {/* </StrictMode> */}
// )
import { StrictMode } from'react';
import { createRoot } from'react-dom/client';
import App from './App.jsx';
import'bootstrap/dist/css/bootstrap.css';

// Create the root and render the App component
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
    // </StrictMode>
);
