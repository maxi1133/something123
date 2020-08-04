import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class GuestHome extends Component 
{
  dispatch = this.props.dispatch;
  
  componentDidMount() 
  {

    
    
  }

  render() {
    return <div>guest</div>;
  }
}
export default connect((state) => {
  return state;
})(withRouter(GuestHome));