/**
 * @file Ajax请求配置
 */
import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'
const service = axios.create({
  baseURL: isDev
    ? 'http://rap2api.taobao.org/app/mock/243019'
    : ''
})

// service1是没有全局拦截器
const service1 = axios.create({
  baseURL: isDev
    ? 'http://rap2api.taobao.org/app/mock/243019'
    : ''
})


// 请求拦截器 发送请求前统一处理 如：设置请求体header 这里是添加tokens来确定他是否能访问
service.interceptors.request.use((config) => {
  config.data = Object.assign({},config.data,{
    // config.data中再添加一条token
    // Todo: authToken: window.localStorage.getItem('authToken')
    authToken: 'itisatokenplaceholder'
  })
  return config
})

// 响应拦截器 根据响应的状态码进行下一步的操作
service.interceptors.response.use((resp) => {
  // 如果成功返回response.data.data
  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    // Todo:全局处理错误
    message.error(resp.data.data.errMsg)
  }
})

// 获取文章列表
export const getArticles = (offset = 0,limited = 10) => {
  return service.post('/api/v1/articlelist',{
    // TODO: 这边还是基于Mock数据的分页
    offset,
    limited
  })
}

// 通过id删除文章
export const deleteArticleById = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`)
}

// 通过id获取文章
export const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`)
}

// 保存文章
export const saveArticle = (id,data) => {
  return service.post(`/api/v1/articleEdit/${id}`,data)
}

// 获取文章阅读量
export const getArticle = () => {
  return service.post('/api/v1/articleAmount')
}

// 请求通知
export const getNotifications = () => {
  return service.post('/api/v1/notifications')
}

// 登录接口
export const loginRequest = (userInfo) => {
  return service1.post('/api/v1/login',userInfo)
}