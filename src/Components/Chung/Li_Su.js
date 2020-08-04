import React, { Component } from "react";
import { connect } from "react-redux";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import { firebase } from "../../firebase/firebase";

class Li_Su extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  state = {
    goback : false,
  }

  componentDidMount() {
    // this.dispatch({
    //   type: "themchovui",
    //   payload: Math.random(),
    // });
  }

  LoginChangetoSignIn = () => {
    return this.props.adminLogging ? null : (
      <div className="row">
        <div
          className="col-6"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/Signup">Sign Up</Link>
        </div>
        <div
          className="col-6"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/Login">LogIn</Link>
        </div>
        <hr />
      </div>
    );
  };

  SingInWithGG = () => {
    return this.props.adminLogging ? null : (
      <div>
        <div>
          <button
            style={{ width: "100%" }}
            onClick={(e) => {
              firebase
                .auth()
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then((e) => {
                  this.dispatch({
                    type: "SetUser",
                    payload: e.user.toJSON(),
                  });
                });
            }}
          >
            Signup with google
          </button>
        </div>
        <div>
          <button style={{ width: "100%" }}>Signup with ....</button>
        </div>
        <hr />
      </div>
    )
  }

  DangNhap = (e) => {
    e.preventDefault()
    if (this.props.adminLogging) {
      console.log("admin dang nhap");
      this.props.AdminLogIn(document.getElementById('TK').value,document.getElementById('MK').value)

    } else {
      console.log("user dang nhap");
    }
  };

  DangKy = e => {
    e.preventDefault()
    console.log('dang ky')
  }

  SignInOrSignUpForm = () => {
    if (!this.props.toSignUp) {
      return (
        <form onSubmit={this.DangNhap}>
          <div>
            <input placeholder="tài khoản" id='TK' />
          </div>

          <div>
            <input type='password' placeholder="mật khẩu" id='MK' />
          </div>

          <div>
            <button style={{ width: "100%" }} onSubmit={this.DangNhap}>
              vôoooooo
            </button>
          </div>

          {this.props.adminLogging ? null : (
            <div>
              <button style={{ width: "100%" }} 
              onClick={(e) => { this.setState({goback : true}) }} >
                Home
              </button>
            </div>
          )}
        </form>
      );
    } 
    else 
    {
      return (
        <form onSubmit={this.DangKy}>
          <div>
            <input placeholder="email" />
          </div>
          <div>
            <input placeholder="tài khoản" />
          </div>
          <div>
            <input placeholder="mật khẩu" />
          </div>
          <div>
            <input placeholder="nhập laị mật khẩu" />
          </div>

          <div>
            <button onSubmit={this.DangKy}
              style={{ width: "100%" }}
            >
              đăng ký
            </button>
          </div>

          <div>
            <button style={{ width: "100%" }} 
            onClick={(e) => { this.setState({goback : true}) }}>
              Home
            </button>
          </div>
        </form>
      );
    }
  };

  render() {
    console.log(this.props)
    return (
      <div className="full">
        {this.props.User ? <Redirect to='/' /> : null}
        {this.state.goback ? <Redirect to='/' /> : null}
        <div>
          <this.LoginChangetoSignIn />

          <this.SingInWithGG />

          <this.SignInOrSignUpForm />
        </div>
      </div>
    );
  }
}

export default connect((state) => { return state })(Li_Su);
