import {createStore, combineReducers} from 'redux'
import { A2 , somethingReducer } from './reducer/somgthing'

const root = combineReducers({
    A2 : A2 , 
    StReducer : somethingReducer
})

export const store = createStore(root)