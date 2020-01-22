import actionTypes from './actionTypes'
import { loginRequest } from '../requests'

// 注意：只有同步的才去定义action.type 因为异步的里面会提交同步的
const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  }
}

const loginFailed = () => {
  window.localStorage.removeItem('authToken')
  window.sessionStorage.removeItem('authToken')
  window.localStorage.removeItem('userInof')
  window.sessionStorage.removeItem('userInof')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const logout = () => {
  return (dispatch) => {
    // 实际项目中，在这儿要告诉服务端用户已经退出
    dispatch(loginFailed())
  }
}


// 异步action
export const login = (userInfo) => {
  const {remember} = userInfo
  return dispatch => {
    dispatch(startLogin())
    loginRequest(userInfo)
      .then(resp => {
        if(resp.data.code === 200) {
          const {
            authToken,
            ...userInfo
          } = resp.data.data
          // 本地化存储
          if(remember) {
            window.localStorage.setItem('authToken',authToken)
            window.localStorage.setItem('userInfo',JSON.stringify(userInfo))
          }else {
            window.sessionStorage.setItem('authToken',authToken)
            window.sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
          }
          dispatch(loginSuccess(resp.data.data))
        } else {
          dispatch(loginFailed())
        }
      })
  }
}
