// eslint-disable-next-line
import React, { useState, useEffect, Suspense } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import { Ggsingin } from "./Components/ggSignIn";
import Uphinh from "./Components/uphinh";

const App = () => {
  return (
    <Suspense fallback={<div>Loadinggggggggggggggggg..... </div>}>

      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Ggsingin}/>
          <Route path="/uphinh" component={Uphinh} />
        </Switch>
      </Router>
    </Suspense>
  );
};

const Navbar = (props) => 
{
  // eslint-disable-next-line
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to=''>Navbar</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link active" to='/'>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/uphinh'>
              uphinh
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default App;
