// import Loadable from './loadable'
import Loadable from 'react-loadable'
import {Loading} from '../components'
// import DashBoard from './DashBoard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'

// 路由的懒加载
const DashBoard = Loadable({
    loader: () => import('./DashBoard'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading
})

const ArticleList = Loadable({
    loader: () => import('./Article'),
    loading: Loading
})

const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading
})

const Notifications = Loadable({
  loader: () => import('./Notifications'),
  loading: Loading
})


const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})

const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading
})


export {
  DashBoard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Loading,
  Notifications,
  NoAuth,
  Profile
}