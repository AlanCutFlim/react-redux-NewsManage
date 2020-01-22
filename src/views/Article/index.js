import React, { Component } from 'react'
import moment from 'moment'
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd'

import {
  getArticles,
  deleteArticleById
} from '../../requests'

// 把moment挂载到window上，这样就可以在dev tools里直接调试
// window.moment = moment

const ButtonGroup = Button.Group

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: ' 创建日期',
  amount: '阅读量'
}


export default class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0, //数据项起始地方
      limited: 10,
      deleteArticleTitle: null,
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false ,
      deleteArticleId: null,
    }
  }

  // columnsKeys = ["id", "title", "author", "amount", "createAt"]
  createColumns = (columnsKeys) => {
    const columns = columnsKeys.map(item => {
      if (item === "amount") {
        return {
          // 通过titleDisplayMap将"title"转换为"标题"
          // titleDisplayMap[item] 访问titleDisplayMap 属性名为id的值
          title: titleDisplayMap[item],
          render: (record) => {
            const { amount } = record
            // 职位可以这么来 <Tag color={titleMap[titleValue]}>{record.title}</Tag>
            return (
              <Tooltip placement="top" title={amount > 230 ? '阅读量超过230' : '阅读量低于230'}>
                <Tag color={amount > 230 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
            )
          },
          key: item,
        }
      }
      if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record, index) => {
            const { createAt } = record
            return moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
          },
        }
      }
      return {
        // 对象的属性也可以通过方括号访问
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: (record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary"onClick={this.toEdit.bind(this,record.id)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.showDeleteArticleModal.bind(this,record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  toEdit = (id) => {
    // history.push()隐式传参
    // url改变,路由进行跳转
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  showDeleteArticleModal = (record) => {
    // 使用函数的方式调用，定制化没这么强
    // Modal是对话框组件
    // Modal.confirm({
    //   title: '此操作不可逆，请谨慎!!',
    //   content: <Typography>确定要删除 <span style={{color: '#f00'}}>{record.title}</span> 吗</Typography>,
    //   onOk() {
    //     deleteArticle(record.id)
    //       .then(resp => {
    //       })
    //   }
    // })

    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      deleteArticleId: record.id
    })
  }

  deleteArticle = () => {
    this.setState({
      deleteArticleConfirmLoading: true
    })
    deleteArticleById(this.state.deleteArticleId)
      .then(resp => {
        // TODO: 删除成功后，要看究竟是留在当前页还是到第一页
        // 需求是到第一页
        // 这里用全局处理错误 实际中应该用catch
        message.success(resp.msg)
        this.setState({
          offset: 0,
        },() => {
          this.getData()
        })
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowArticleModal: false,
        })
      })
  }

  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: '',
      deleteArticleConfirmLoading: false,
    })
  }

  setData = (state) => {
    if(!this.updater.isMounted(this)) return
    this.setState(state)
  }

  getData = () => {
    this.setState({
      isLoading: true
    })
    // 请求选中页的数据
    getArticles(this.state.offset,this.state.limited)
      .then(resp => {
        // columnsKeys = ["id", "title", "author", "amount", "createAt"]
        const columnsKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnsKeys)
        // 如果请求完成之后组件已经销毁，就不要再setState
        this.setData({
          total: resp.total,
          dataSource: resp.list,
          columns,
        })
      })
      .catch(err => {
        // 处理错误
      })
      .finally(() => {
        this.setData({
          isLoading: false
        })
      })
  }

  onPageChange = (page,pageSize) => {
    this.setState({
      offset: pageSize * (page-1),
      limited: pageSize
    },() => {
      this.getData()
    })
  }
  /**
   * current 当前页数
   * size 每页多少条数据
   */
  onShowSizeChange = (current,size) => {
    // 这里要确定是回到第一页，还是留在当前页
    this.setState({
      offset: 0,
      limited: size
    },() => {
      // 由于setState是异步的，如果想要获取最新的state，应该在这个回调里获取
      this.getData()
    })
  }

  toExcel = () => {
    // 在实际开发中，这个功能是前端发送一个ajax请求到后端
    // 然后后端返回一个文件的下载地址 
  }

  componentDidMount() {
    // 发送请求
    this.getData()
  }

  render() {
    return (
      <Card
        title="文章列表"
        extra={<Button onClick={this.toExcel}>导出Excel</Button>}
        bordered={false}
      >
        <Table
          rowKey={record => record.id}
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          loading={this.state.isLoading}
          pagination={{
            // 要加1,offset是0的话,要在第一页
            current: this.state.offset / this.state.limited + 1,
            total: this.state.total,
            hideOnSinglePage: true,
            onChange: this.onPageChange,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions: ['10','15','20','25']
          }}
        />
        <Modal
          title="此操作不可逆，请谨慎!!"
          visible={this.state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          maskClosable={false}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}
        >
          <Typography>确定要删除 <span style={{color: '#f00'}}>{this.state.deleteArticleTitle}</span> 吗</Typography>
        </Modal>
      </Card>
    )
  }
}
