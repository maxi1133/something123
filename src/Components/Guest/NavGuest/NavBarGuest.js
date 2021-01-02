import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "../../../firebase/firebase";
import 'firebase/auth'


class NavBarGuest extends Component {

  constructor(props){
    super(props)
    this.dispatch = this.props.dispatch;
  }

  componentDidMount()
  {

    firebase.auth().onAuthStateChanged(e => {
      if(e) 
      {
        this.dispatch({type : 'SetUser',payload : e.toJSON()})
      }
      else {  }
    });


  }

  SignOut = e => {

    firebase.auth().signOut().then(e=> {
      this.dispatch({type : 'SetUser',payload : null})
    })
  }

  render() 
  {
    let { navli ,GioHang } = this.props;
    console.log(this.props)
    return (
      <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      id="supernavguest">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {
              navli.map((val, i) => {
                if(this.props.User && ( i === 2 || i === 3) )
                {
                  return null
                }
                else if (!this.props.User && i === 4)
                {
                  return null
                }
                else {
                  return (
                    <li className="nav-item" key={i}>
                      <Link className="nav-link" to={val.to}>
                        {val.name}
                      </Link>
                    </li>
                  )
                }
              })
            }

          </ul>
          <div className="form-inline my-2 my-lg-0">
          <ul className="navbar-nav mr-auto">
            {
              this.props.User ? 
              <>
                <li className="nav-item">
                  <Link className="nav-link" >
                    {'Cart '}
                    <span style={{border:'1px solid'}} className="badge badge-secondary">
                      { GioHang.length }
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/Profile'}>
                    {'Profile'}
                  </Link>
                </li>
                <li className="nav-item" >
                  <button className="nav-link" 
                  style={{border:'none',backgroundColor:'transparent',outline:'none'}}
                  onClick={this.SignOut}>
                    Thoát
                  </button>
                </li> 
              </>
              : null
            }

          </ul>

          </div>
        </div>
      </nav>
    );
  }
}

export default connect((state) => {
  return state;
})(NavBarGuest);
