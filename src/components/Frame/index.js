import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import logo from './logo.png'
import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Avatar,
  Badge
} from 'antd'

import './frame.less'
import { getNotifictionList } from '../../actions/notifications'
import { logout } from '../../actions/user'


const { Header, Content, Sider } = Layout
const mapStateToProps = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}


// withRouter(MyTestableClass)
@connect(mapStateToProps,{ getNotifictionList,logout })
@withRouter
class Frame extends Component {
  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

  onDropdownMenuClick = ({key}) => {
    if( key === '/logout') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }

  componentDidMount() {
    this.props.getNotifictionList()
  }
  
  menu =() => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item key="/admin/notifications">
        <Badge count={this.props.notificationsCount} offset={[35,7.2]}>
          {/* TODO: 将提醒也持久化 */}
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item key="/admin/profile">
          个人设置
      </Menu.Item>
      <Menu.Item key="/logout">
          退出登录
      </Menu.Item>
    </Menu>
  )

  render() {
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header className="header qf-header " >
          <div className="qf-logo">
            <img src={logo} alt="纳龙科技" />
          </div>
          <div>
            <Dropdown overlay={this.menu}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Badge count={this.props.notificationsCount} offset={[0,-1]}>
                  <Avatar src={this.props.avatar} />
                </Badge>
                <span style={{marginLeft: '10px'}}>欢迎您 {this.props.displayName}</span>
                <Icon type="down" />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              // join()连接数组元素
              selectedKeys={[selectedKeyArr.join('/')]}
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.menus.map((item) => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <Icon type={item.icon} />
                      {item.title}
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              style={{
                background: '#fff',
                margin: 0,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame