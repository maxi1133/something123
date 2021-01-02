import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux'

import GuestHome from "../GuestHome";
import Product from "../Product";
import LiSu from "../../Chung/Login/Li_Su";
import NavBarGuest from "./NavBarGuest";
import Profile from '../Profile'

import io, {  } from "socket.io-client";


let navli = [
  { name: "Home", to: "/", component: GuestHome, exact: true },
  { name: "Products", to: "/Products", component: Product , exact: true  },
  { name: "Log in", to: "/Login", component: LiSu  , exact: true },
  { name: "Sign up", to: "/Signup", component: LiSu, SignUp: true , exact: true  },
];

 export let Socket = io("http://localhost:3001/").connect();

class NavGuest extends Component 
{

  componentDidMount()
  {
    document.title = "Guest";
    Socket.emit("ClientConnected");
  }

  componentWillUnmount() {
    Socket.disconnect()
  }

  render() {

    return (
      <BrowserRouter>
        <NavBarGuest navli={navli}  />
        <Switch>
          
          {
            navli.map((val, i) => 
            {
              return <Route exact={val.exact} key={i} path={val.to} 
              render={() => <val.component toSignUp={val.SignUp} />} /> 
            })
          }

          { 
          this.props.User ? (<Route exact path='/Profile' render={()=><Profile/>} />) 
          : (null) 
          }

          <Route exact={true} render={() => <div>notthing</div> } />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(state => {return state})(NavGuest);
