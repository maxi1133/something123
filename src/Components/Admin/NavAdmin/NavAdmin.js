import React, { Component } from "react";
import io from "socket.io-client";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import AdminHomePage from "../AdminHomePage";
import LiSu from "../../Chung/Li_Su";
import './SideBar.css'
// eslint-disable-next-line
import { connect } from "react-redux";
import Admin_Product from "../Admin_Product";



export let Socket = io("http://localhost:4000").connect();



export default class NavAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logedin: true,
    };
  }

  componentDidMount() {
    document.title = "Admin";

    Socket.emit("Someone_Tryto_LogToAdmin");

    Socket.on("AdminLogin_res", (data) => {
      if (data.stt) {
        this.setState({ logedin: true });
      } else {
      }
    });
  }

  AdminLogIn = (tk, mk) => {
    Socket.emit("Admin_Login", { taikhoan: tk, matkhau: mk });
  };

  render() {
    let UI;
    this.state.logedin
      ? (UI = <AdminMainNavBar />)
      : (UI = <LiSu adminLogging={true} AdminLogIn={this.AdminLogIn} />);

    return UI;
  }
}














let adminlistRoute = [
  {name :'Home' , to : '/Admin' , component : AdminHomePage , exact : true},
  {name :'Product',to:'/Admin/Product',component : Admin_Product},

]
class AdminMainNavBar extends Component 
{
  
  componentDidMount() 
  {
    
  }

  render()
  {
    return (
      <BrowserRouter>
        <div className='sidebar'>
          <ul>
            {
              adminlistRoute.map((val,i)=> {
                return <li key={i}> <Link to={val.to}> {val.name} </Link> </li>
              })
            }
          </ul>
        </div>

        <main>
          <Switch>
            {
              adminlistRoute.map((val,i)=> {
                return <Route exact={val.exact} 
                path={val.to} component={val.component} key ={i} />
              })
            }
            <Route component={(e) => { return <div>notthing</div> }} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}