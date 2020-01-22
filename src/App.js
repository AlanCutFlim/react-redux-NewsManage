import React, { Component } from 'react';
import { adminRoutes } from './routes'
import { Route,Switch,Redirect } from 'react-router-dom'
import {Frame} from './components'
import { connect } from 'react-redux'
import {login}  from './actions/user'


// 这边过滤掉不是左边Nav栏的路由
const menus = adminRoutes.filter(route => route.isNav === true)

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
    role: state.user.role
})


@connect(mapStateToProps,{login})
class App extends Component {
  render() {
    return (
      // 真正在实际项目中登录页是独立于我们这个目录的
      // 是另外一个html
      this.props.isLogin
      ? 
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map((route) => {
              return (
                <Route
                  exact={route.exact}
                  key={route.pathname}
                  path={route.pathname}
                  render={(routerProps) => {
                    const hasPermission = route.roles.includes(this.props.role)
                  return hasPermission?<route.component {...routerProps}/>:<Redirect to="/admin/noauth" />
                }} />
              )
            })
          }
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact/>
          <Redirect to="/404" from="/admin" />
        </Switch>
      </Frame>
      :
      <Redirect to="/login" />
    );
  }
}

export default App;

// const testHOC = (WrappedComponnet) => {
//   return class HOCComponent extends Component {
//     render() {
//       return (
//         <>
//         <WrappedComponnet />
//         <div>这是高阶组件里的信息</div>
//         </>
//       )
//     }
//   }
// }

// @testHOC