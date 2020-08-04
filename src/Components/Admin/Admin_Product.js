import React, { Component } from "react";
import Axios from "axios";


export default class Admin_Product extends Component {


  SendFile = async (e) => {
    e.preventDefault()

    let myFile = document.querySelector("input[type=file]").files[0];
    let data = new FormData();
    data.append("hinh", myFile);
    
    Axios.post('http://localhost:4000/upload',data)
    .then(res=>{ 
      let dataRes = res.data
      console.log(dataRes)
    })

  };

  render() {
    return (
      <form onSubmit={this.SendFile} id="formElem">
        <input
          type="file"
          onChange={(e) => { }}
        />
        <button onSubmit={this.SendFile}>OK</button>
      </form>
    );
  }
}
