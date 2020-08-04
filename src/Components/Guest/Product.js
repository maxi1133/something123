import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Product extends Component 
{

  dispatch = this.props.dispatch;

  componentDidMount() 
  {
    
  }

  render() {
    console.log(this.props);
    return <div>products</div>;
  }
}

export default connect((state) => {
  return state;
})(withRouter(Product));
