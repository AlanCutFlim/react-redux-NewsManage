import React, { Component } from 'react'
import {
  Card,
  Button,
  List,
  Badge,
  Spin,
} from 'antd'

import { connect } from 'react-redux'
import { markNotificationAsReadById, markAllNotificationAsRead } from '../../actions/notifications'

const mapStateToProps = state => {
  // 这里因为用了combineReducers 所以解构一下
  const { list, isLoading } = state.notifications
  return { list, isLoading }
}


// 装饰器写法@connect()包裹组件  相当于  connect()(Target)
@connect(mapStateToProps, { markNotificationAsReadById, markAllNotificationAsRead })
class Notifications extends Component {

  render() {
    return (
      <Spin spinning={this.props.isLoading}>
        <Card
          title="通知中心"
          bordered={false}
          extra={
            <Button
              onClick={this.props.markAllNotificationAsRead}
              disabled={this.props.list.every(item => item.hasRead === true)}>
              全部标记为已读
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={item => (
              <List.Item
                extra={
                  item.hasRead
                    ? null
                    : <Button onClick={this.props.markNotificationAsReadById.bind(this, item.id)} >
                      标记为已读
                      </Button>
                }
              >
                <List.Item.Meta
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    )
  }
}

export default Notifications