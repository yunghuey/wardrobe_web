import './App.css';
// import { useHistory  } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import React from 'react';
import Login from './component/Login';
import Dashboard from './component/Dashboard';

function App() {
  const user = localStorage.getItem('token');
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            {user ? <Redirect to="/dashboard"/> : <Login/>}
          </Route>
          <Route path="/dashboard" exact component={Dashboard}/>
        </Switch>
      </Router>
        
    </>
  )
}

export default App
