/* eslint-disable no-lone-blocks */


import React, { useState, useEffect, useCallback  } from "react";

import "firebase/storage";
import "firebase/database";
import { firebase } from "../firebase/firebase";
// eslint-disable-next-line
import Axios from "axios";



const Uphinh = () => 
{

  const [hinhs, sethinhs] = useState([]);
  
  const updateHinh = useCallback(() => {
    return new Promise(async (resolved,rejected)=> 
    {
      let listhinh = await firebase.storage().ref().listAll()
      let promises = listhinh.items.map(async val => {
      let url = await val.getDownloadURL()
        return url
      })
      let listurls = await Promise.all(promises)
      
      resolved(listurls)
    })
  }, [])

  useEffect(() => {
    updateHinh().then(e => { sethinhs(e) });

  },[updateHinh]);

  {
    // let uphinh = (e) => {
    //   const a = Math.random() * 100000
    //   const store = firebase.storage().ref().child(String(a))
    //   store.put(e).then((result) => {
    //     console.log(
    //       result.ref.getDownloadURL().then((url) => {
    //         console.log(url)
    //         updateHinh()
    //       })
    //     );
    //   });
    // };
  }
  
  let uphinh2 = (hinh) => {
    // console.log(hinh)
    // Axios.post( 'http://localhost:4000/upload', {file : Object(hinh)})
    // .then(res=>{
    //     console.log(res.data)
    // })
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          //uphinh(e.target.files.item(0));
          uphinh2(e.target.files.item(0));
        }}
      />
      {hinhs.map((val, i) => {
        return (
          <img style={{}} src={val} alt="" width={225} height={200} key={i} />
        );
      })}
    </div>
  );
};

export default Uphinh;
