import React, { Component } from "react";
import AdminHomePage from "../AdminHomePage";
import Admin_Product from "../Admin_Product";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

let adminlistRoute = [
  { name: "Home", to: "/Admin", component: AdminHomePage, exact: true },
  { name: "Product",to: "/Admin/Product/",component: Admin_Product,exact: true},
];

class AdminMainNavBar extends Component {
  componentDidMount() 
  {

  }

  render() 
  {
    return (
      <BrowserRouter>
        <div className="sidebar">
          <ul>
            {
              adminlistRoute.map((val, i) => {
                return (
                  <li key={i}>
                    <Link to={val.to}> {val.name} </Link> 
                  </li>
                );
              })
            }
          </ul>
        </div>

        <main>
          <div style={{marginLeft:'15px',marginRight:'15px', }} >
            <Switch>
              {
              adminlistRoute.map((val, i) => {
                return <Route exact={val.exact} path={val.to} 
                component={val.component} key={i} />
              })
              }
              <Route component={(e) => <div>notthing</div>} />
            </Switch>
          </div>
        </main>
      </BrowserRouter>
    );
  }
}
export default connect((state) => {return state})(AdminMainNavBar);
