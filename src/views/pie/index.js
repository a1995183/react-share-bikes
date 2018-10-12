import React,{Component} from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import echartsTheme from './themeLight'

import EchartReact from 'echarts-for-react'//引入第三方封装好的针对react的库
 import {Card} from 'antd'
class PieDemo extends Component{
    componentWillMount(){
        this.pie1()
        this.pie2()
        echarts.registerTheme('wangcai',echartsTheme)
    }
    pie1=()=>{
    this.options1={
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top:20,
                right:20,
                data: ['周一','周二','周三','周四','周五', '周六', '周日'],
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : '60%',
                    center: ['50%', '60%'],
                    data:[
                        {value:3000, name:'周一'},
                        {value:2800, name:'周二'},
                        {value:2340, name:'周三'},
                        {value:2350, name:'周四'},
                        {value:3548, name:'周五'},
                        {value:4548, name:'周六'},
                        {value:5548, name:'周日'},
                    ]
                }
            ]
        }
        
    }
    pie2=()=>{
    this.options2={
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top:20,
                right:20,
                data: ['周一','周二','周三','周四','周五', '周六', '周日'],
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : ['60%','80%'],
                    center: ['50%', '60%'],
                    data:[
                        {value:3000, name:'周一'},
                        {value:2800, name:'周二'},
                        {value:2340, name:'周三'},
                        {value:2350, name:'周四'},
                        {value:3548, name:'周五'},
                        {value:4548, name:'周六'},
                        {value:5548, name:'周日'},
                    ]
                }
            ]
        }
        
    }
render(){
return(
<div>
    <Card title="饼状图1">
        <EchartReact option={this.options1}
        theme='wangcai'
        ></EchartReact>
    </Card>
    <Card title="饼状图2">
        <EchartReact option={this.options2}
        theme='wangcai'
        ></EchartReact>
    </Card>
</div>
)
}
}
export default PieDemo
