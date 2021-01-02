import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import NavAdmin from "./Components/Admin/NavAdmin/NavAdmin";
import NavGuest from "./Components/Guest/NavGuest/NavGuest";


const App = () => 
{
  return (
      <BrowserRouter>
        <Switch >
          
          
          <Route path="/Admin" component={ NavAdmin } />
          <Route path='/' component={ NavGuest } />


        </Switch>
      </BrowserRouter>
  )
}

export default App;