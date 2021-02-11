import React from 'react';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import UserHome from './components/UserHome';
import PrivateRoute from './utils/PrivateRoute';




function App(props) {
  const [auth, setAuth] = React.useState(false);
  
  return (
    <div className="App">
      <Navigation 
        
      />
      <Switch>
        <Route exact path='/' component={SignIn} />
        <PrivateRoute path='/home' component={UserHome} />
      </Switch>
    </div>
  );
}


export default App;
