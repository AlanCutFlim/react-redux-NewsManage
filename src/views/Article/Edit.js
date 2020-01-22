import React, { Component, createRef } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Spin, // 加载效果
  message
} from 'antd'
import './edit.less'
import E from 'wangeditor'
import { getArticleById, saveArticle } from '../../requests'
import moment from 'moment'


const formItemLayout = {
  // Grid span加起来的总数为24
  labelCol: {
    span: 4 // labe应该就是文字部分
  },
  wrapperCol: {
    span: 16 // 输入框部分
  }
}

@Form.create()
class Edit extends Component {
  constructor() {
    super()
    this.editorRef = createRef()
    this.state = {
      isLoading: false
    }
  }

  // TODO:还差一个新建文章模块
  
  handleSubmit = (e) => {
    // 阻止e对象的默认行为
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        const data = Object.assign({}, values, {
          // valueOf将moment对象转换为时间戳
          createAt: values.createAt.valueOf()
        })
        this.setState({
          isLoading: true
        })
        // 在这里可以处理更多想要处理的逻辑
        saveArticle(this.props.match.params.id, data)
          .then(resp => {
            message.success(resp.msg)

            // 如果需求是要跳转
            this.props.history.push('/admin/article')
          })
          .finally(() => {
            this.setState({
              isLoading: false
            })
          })
      }
    });
  }

  initEditor = () => {
    // 注意:我们通过current属性来访问DOM节点
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      // 如果使用了第三方dom操作，就得手动调用setFieldsValue()把值设置上去
      this.props.form.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }

  componentDidMount() {
    // 初始化富文本编辑器
    this.initEditor()
    this.setState({
      isLoading: true
    })
    // 发送请求
    getArticleById(this.props.match.params.id)
      .then(resp => {
        // form中没有id 所以解构出没有id的data对象
        const { id, ...data } = resp

        // 将时间戳转换为moment对象
        data.createAt = moment(data.createAt)

        // 请求回来之后 初始化form
        this.props.form.setFieldsValue(data)

        // TODO:图片是相对路径，显示不出来
        this.editor.txt.html(data.content)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card
        title="编辑文章"
        // 右上角加上取消按钮
        extra={<Button onClick={this.props.history.goBack}>取消</Button>}
        bordered={false}
      >
        {/* 用spin包裹住  */}
        <Spin spinning={this.state.isLoading}>
          <Form
            onSubmit={this.handleSubmit}
            {...formItemLayout}
          >
            <Form.Item
              label="标题"
            >
              {getFieldDecorator('title', {
                // 第二个参数就是Opition对象 
                rules: [{
                  // 是否必选
                  required: true,
                  message: '标题是必填的!'
                }],
                // antd中如何获取值
              })(
                <Input
                  placeholder="title"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="作者"
            >
              {getFieldDecorator('author', {
                rules: [{
                  required: true,
                  message: '作者是必填的!'
                }],
              })(
                <Input
                  placeholder="author"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="阅读量"
            >
              {getFieldDecorator('amount', {
                rules: [{
                  required: true,
                  message: '阅读量是必填的!'
                }],
              })(
                <Input
                  placeholder="0"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="发布时间"
            >
              {getFieldDecorator('createAt', {
                rules: [{
                  required: true,
                  message: '时间是必填的!'
                }],
              })(
                <DatePicker showTime placeholder="选择时间" />
              )}
            </Form.Item>
            <Form.Item
              label="内容"
            >
              {getFieldDecorator('content', {
                rules: [{
                  required: true,
                  message: '内容是必填的!'
                }],
              })(
                <div className="qf-editor" ref={this.editorRef} />
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                保存修改
            </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default Edit
