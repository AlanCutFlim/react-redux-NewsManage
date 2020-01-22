import {combineReducers} from 'redux'
import notifications from './notifications'
import user from './user'


// 参数是个对象
export default combineReducers({
  notifications,
  user
})
