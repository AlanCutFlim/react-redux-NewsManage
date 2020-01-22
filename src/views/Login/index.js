import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Spin
} from 'antd';

import './login.less'
import { login } from '../../actions/user'

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading,
})

@connect(mapStateToProps, { login })
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        this.props.isLogin
        ?
        <Redirect to="/admin/dashboard" />
        :
        <Card
            title="NALONG ADMIN登录"
            className="qf-login-wrapper"
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item
              >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入您的用户名!' }],
                })(
                  <Input
                    disabled={this.props.isLoading}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入您的密码' }],
                })(
                  <Input
                    disabled={this.props.isLoading}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item
              >
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox disabled={this.props.isLoading}>记住我</Checkbox>)}
                {/* <a className="login-form-forgot" href="">
              Forgot password
                  </a> */}
                <Button
                  loading={this.props.isLoading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                登录
                  </Button>
                {/* Or <a href="">register now!</a> */}
              </Form.Item>
            </Form>
          </Card>
    );
  }
}

export default Login

// const wrapperCol = {
//   xs: {
//     span: 20,
//     offset: 2
//   },
//   md: {
//     span: 8,
//     offset: 8
//   }
// }