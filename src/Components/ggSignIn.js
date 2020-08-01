import React from "react";

import "firebase/auth";
import "firebase/storage";

import { firebase } from "../firebase/firebase";
// eslint-disable-next-line
import { lan1 } from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export function Ggsingin(props) {
  const dispatch = useDispatch();
  var somelist = useSelector(state => state.StReducer.GioHang);

  firebase.auth().onAuthStateChanged( user => { console.log(user) })

  const onSubmit = (e) => {
    e.preventDefault();

    for (let index = 0; index < 50; index++) {
      dispatch(lan1(index * 3));
    }
  };

  return (
    <div>
      <div>

        <button
          onClick={(e) => {
            firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
              .then((e) => {
                console.log(e);
              });
        }}>
          google
        </button>
        <button
          onClick={(e) => 
          {
            firebase
              .auth()
              .signOut()
              .then((e) => {
                console.log("sign out");
            });
          }}>
          sign out
        </button>
      </div>

      <div>
        <form onSubmit={onSubmit}
          onKeyDown={(e) => {
            if (e.key.includes("Escape")) {
              dispatch({ type: "delete" });
            }
          }}
          id="form"
        >
          <input type="text" id="inp" />
        </form>
      </div>
      <div>
        <ul>
          {somelist.map((val, i) => {
            return <li key={i}>{val}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
