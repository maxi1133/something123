import {createStore, combineReducers} from 'redux'
import { User } from './reducer/UserReduser'


const SocketReducer =(state = null , action) => {
    switch (action.type) 
    {
      case "SetSocket": 
      {
        return action.payload;
      }
      case "themchovui": 
      {
        return { vuicl: action.payload };
      }
      default: { return state }
    }
}

const PrevLocation = (state = '' , action) => {
  switch (action.type) 
  {
    case 'SetPrevLocation': 
    {
      return action.payload
    }
    default : return state
  }
}

const root = combineReducers({
    User : User,
    Socket : SocketReducer,
    PrevLocation : PrevLocation
})

export const store = createStore(root)