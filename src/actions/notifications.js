/**
 * 使用actionCreators统一创建action 有利于数据的管理
 */
import actionTypes from './actionTypes'
import { getNotifications } from '../requests'

const startPost = () => {
  return {
    type: actionTypes.START_NOTIFICATION_POST
  }
}

const finishPost = () => {
  return {
    type: actionTypes.FINISH_NOTIFICATION_POST
  }
}

export const markNotificationAsReadById = (id) => {
  return dispatch => {
    dispatch(startPost())
    // setTimeout 模拟一个服务端的请求 实际上还要发送成功与否 这里简化了
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        }
      })
      dispatch(finishPost())
    }, 2000)
  }
}

// 实际上这边提交到后端还是要传参数的 可能需要传用户的id
export const markAllNotificationAsRead = () => {
  return (dispatch) => {
    dispatch(startPost())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ
      })
      dispatch(finishPost())
    }, 2000)
  }
}

export const getNotifictionList = () => {
  return (dispatch) => {
    dispatch(startPost())
    getNotifications()
      .then(resp => {
        dispatch({
          type: actionTypes.RECEIVED_NOTIFICATION,
          payload: {
            list: resp.list
          }
        })
        dispatch(finishPost())
      })
  }
}