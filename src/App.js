import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import Service from './components/Service/Service';
import AuthContext from './store/auth-context';

function App() {

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Login /> */}
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/service" component={Service} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;