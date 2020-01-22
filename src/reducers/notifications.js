import actionTypes from '../actions/actionTypes'

// Step1: 实现定义一个初始的状态 假数据
const initState = {
  isLoading: false,
  list: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newList = state.list.map((item) => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
      return {
        ...state,
        list: state.list.map((item) => {
          item.hasRead = true
          return item
          })
      }
    case actionTypes.START_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.RECEIVED_NOTIFICATION:
      return {
        ...state,
        list: action.payload.list
      }
    // Step1 最开始写个default就行了 初始化state
    default:
      return state
  }
}