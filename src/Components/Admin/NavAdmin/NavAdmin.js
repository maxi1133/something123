import React, { Component } from "react";
import io from "socket.io-client";
import LiSu from "../../Chung/Login/Li_Su";
import './SideBar.css'
// eslint-disable-next-line
import AdminMainNavBar from "./AdminMainNavBar";


export let Socket = io('https://stest1152.herokuapp.com/').connect()

//   http://localhost:3001   
//   https://stest1152.herokuapp.com/



export default class NavAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logedin: true,
    };
  }

  componentWillUnmount() {
    Socket.disconnect()
  }

  componentDidMount() 
  {

    document.title = "Admin";

    Socket.on("AdminLogin_res", (data) => {
      // eslint-disable-next-line no-unused-expressions
      data.stt ? this.setState({ logedin: true }) : null
    });
  }

  AdminLogIn = (tk, mk) => {
    Socket.emit("Admin_Login", { taikhoan: tk, matkhau: mk });
  };

  render() {
    let UI;
    this.state.logedin ? 
      (UI = <AdminMainNavBar/>) 
      : 
      (UI = <LiSu adminLogging={true} AdminLogIn={this.AdminLogIn} />);

    return UI;
  }
}