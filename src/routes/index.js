import {
  DashBoard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Notifications,
  NoAuth,
  Profile
} from '../views'

// 路由的配置一般是个数组 子路由和父级路由要单独配置
// mainRoutes是所有人都进的页面
export const mainRoutes = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

// adminRoutes是得有权限才能进的页面
export const adminRoutes = [{
  pathname: '/admin/dashboard',
  component: DashBoard,
  title: '仪表盘',
  isNav: true,
  icon: 'dashboard',
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/article',
  component: ArticleList,
  title: '文章列表',
  isNav: true,
  exact: true,
  icon: 'unordered-list',
  roles: ['001', '002']
}, {
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  roles: ['001','002']
}, {
  pathname: '/admin/notifications',
  component: Notifications,
  isNav: false,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/noauth',
  component: NoAuth,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/profile',
  component: Profile,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/settings',
  component: Settings,
  title: '设置',
  isNav: true,
  icon: 'setting',
  roles: ['001']
}]