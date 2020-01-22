import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './App';
import './index.less'
import { mainRoutes } from './routes'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'

import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/admin" component ={App}/>
          {
            mainRoutes.map((route) => {
              return (
                <Route key={route.pathname} path={route.pathname} component={route.component} />
              )
            })
          }
          <Redirect to="/admin" exact from="/" />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'));

