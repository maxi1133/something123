import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import NavAdmin from "./Components/Admin/NavAdmin/NavAdmin";
import NavGuest from "./Components/Guest/NavGuest/NavGuest";

const App = () => {
  
  return (
      <Router>
        <Switch  >
          
          <Route path="/Admin" component={NavAdmin} />
          <Route exact path='' component={NavGuest} />
          
        </Switch>
      </Router>
  )
};

export default App;