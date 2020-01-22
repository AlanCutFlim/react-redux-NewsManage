import React, { Component, createRef } from 'react'
import {
  Card,
  Row,
  Col,
} from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import { getArticle } from '../../requests'

export default class DashBoard extends Component {
  constructor() {
    super()
    this.articleAmountRef = createRef()
  }

  initArticalChart = () => {
    const myChart = this.articalChart = echarts.init(this.articleAmountRef.current);
    getArticle()
      .then(resp => {
        const option = {
          // 后端给的数据不一定是这样，得根据自己的需要组合数据

          // 这里是dom的操作，所以没有报在组件销毁后setState的错
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: resp.amount.map(item => item.month)
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: resp.amount.map(item => item.value),
            type: 'line',
            areaStyle: {}
          }]
        }
        myChart.setOption(option)
      })
  }

  // 在componentDidMount调用才能获取到我们的dom
  componentDidMount() {
    this.initArticalChart()
  }

  render() {
    return (
      <>
        <Card
          title="概览"
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#29B6F6' }}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#29B6F6' }}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#29B6F6' }}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#29B6F6' }}>col-6</div>
            </Col>
          </Row>
        </Card>
        <Card
          title="最近浏览量"
          bordered={false}
        >
          <div style={{height: '400px'}} ref={this.articleAmountRef} />
        </Card>
      </>
    )
  }
}
