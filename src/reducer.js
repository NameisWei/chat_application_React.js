import {combineReducers} from 'redux';
import {user} from './redux/user.redux.js'
import {chatuser} from "./redux/userlist.redux";
import {userchat} from './redux/userchat.redux.js'


export default combineReducers({user,chatuser,userchat})