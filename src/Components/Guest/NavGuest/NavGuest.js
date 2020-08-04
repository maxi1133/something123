import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import GuestHome from "../GuestHome";
import Product from "../Product";
import LiSu from "../../Chung/Li_Su";
import NavBarGuest from "./NavBarGuest";
import Profile from '../Profile'

import io, {  } from "socket.io-client";


let navli = [
  { name: "Home", to: "/", component: GuestHome, exact: true },
  { name: "Products", to: "/Products", component: Product },
  { name: "Log in", to: "/Login", component: LiSu },
  { name: "Sign up", to: "/Signup", component: LiSu, SignUp: true },
  { name: "Profile", to: "/Profile", component: Profile},
];

 export let Socket = io("http://localhost:4000").connect();

class NavGuest extends Component 
{

  componentDidMount() 
  {
    document.title = "Guest";
    Socket.emit("ClientConnected");
  }

  render() 
  {
    return (
      <BrowserRouter>
        <NavBarGuest navli={navli} />
        <Switch>
          {
            navli.map((val, i) => 
            {
              return (
                <Route exact={val.exact} key={i} path={val.to}
                component={() => <val.component toSignUp={val.SignUp} />} />
              );
            })
          }

          <Route component={(e) => <div>notthinggggg</div>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default NavGuest;
