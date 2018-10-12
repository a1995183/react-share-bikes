import React,{Component} from 'react'
import {Form ,Select,Card,DatePicker,Button,Table,message,Modal } from 'antd'
import Axios from '../../axios'
const FormItem = Form.Item
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker;
 class OrderDemo extends Component{
     
     state={
         data:[],
         pn:8,
         isLoading:false,
         endItem:{},
         pagination:{
            total:0,
            pageSize:10,
            current:1,
            onChange:(page)=>{
               
                this.setState({
                    pn:page
                })
                this.getTable()
            }
         }
     }
      cityOptions=
     [
         {
             label:'北京',
             value:0
         },
         {
             label:'上海',
             value:1
         },
         {
             label:'广州',
             value:2
         },
     ];
     orderStatus=
     [
         {
             label:'进行中',
             value:0
         },
         {
             label:'已完成',
             value:1
         },
         {
             label:'结束行程',
             value:2
         },
     ]
    
     handleChange=(value)=>{
    
        
     }
    
     getTable=()=>{
         let  params={
            page:this.state.pn
        }
        this.setState({
            isLoading:true
        },
        ()=>{
            Axios.get('/order/list',params).then(
                res=>{
                    if(res.code==0){
                        this.setState({
                                    data:res.result.item_list.map((item,index)=>{
                                    item.key = index
                                    return  item 
                                }),
                                pagination:{
                                    total:res.result.total_count,
                                    current:this.state.pn,
                                    pageSize:10,
                                    onChange:(page)=>{
                                        this.setState({
                                            pn:page
                                        },()=>this.getTable())
                                    }
                                },
                                isLoading:false
                       })
                    }
                }
            )
        }
        )
       
     }
     handleSearch=()=>{
    console.log(this.props.form.getFieldsValue()) 
     }
     resetData=()=>{
         this.props.form.resetFields()
     }
     componentWillMount(){
         this.getTable()
     }
     handleDone=()=>{
         //弹出结束订单
        let selectedItem=this.state.selectedItem
        if(selectedItem){
            Axios.get('/order/ebike_info',{id:selectedItem[0].id}).then(res=>{
                this.setState({
                    endItem:res.result,
                    isShowModel:true
                })
              }  
            )
        }else{
            message.info('请选择一项订单进行操作')
        }
    }
    handleEnd=()=>{
        //结束订单
        let id=this.state.selectedItem[0].id
        this.setState({isShowModel:false})
        Axios.get('/order/finish_order',{id}).then(res=>{
            if(res.code==0){
                message.success('该订单已结束')
                this.getTable()
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns=[
           {title:'订单编号',
            dataIndex:'order_sn',
            key:'order_sn'}, 
            {
                title:'车辆编号',
                dataIndex:'bike_sn',
                key:'bike_sn'
            },
            {
             title:'用户名',
             dataIndex:'user_name',
             key:'user_name'   
            },
            {
                title:'手机号',
                dataIndex:'mobile',
                key:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance',
                render(distance){
                    return distance/1000+'Km';
                },
                key:'distance'
            },
            {
                title:'行驶时长',
                dataIndex:'total_time',
                key:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status',
                key:'status'
            },
            {
                title:'开始时间',
                dataIndex:'start_time',
                key:'start_time'
            },
            {
             title:'结束时间',
             dataIndex:'end_time',
             key:'end_time'   
            },
            {
                title:'订单金额',
                dataIndex:'total_fee',
                key:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay',
                key:'user_pay'
            }
        ]
       const rowSelection={
            type:'radio',
            selectedRowKeys:this.state.selectedIndex,
            onChange:(selectedRowKeys, selectedRows)=>{
                console.log(selectedRowKeys, selectedRows)
                this.setState({
                    selectedItem:selectedRows,
                    selectedIndex:selectedRowKeys
                })
            },
        }
        return(
            <div className="orderDomo">
                <Card>
                <Form layout="inline">
                        <FormItem
                        label="城市">
                        {
                            getFieldDecorator('city',{initialValue:1})(
                            <Select
                            placeholder="请选择一个城市" onChange={this.handleChange} style={{width:150}}>  
                                {this.cityOptions.map(item=><Option key={item.value} value={item.value}>{item.label}</Option>)}
                            </Select>
                            )
                        }
                        </FormItem>
                        <FormItem
                        label="订单时间">
                         {
                            getFieldDecorator('date')(
                                <RangePicker></RangePicker>
                            )
                        }
                         
                        </FormItem>
                        <FormItem
                        label="订单状态">
                          {
                            getFieldDecorator('order-status')(
                                <Select style={{width:220}}>  
                                {this.orderStatus.map(item=><Option  key={item.value}  value={item.value}>{item.label}</Option>)}
                            </Select>
                            )
                        }
                          
                        </FormItem>
                    </Form>
                    <div className="btn-wrap">
                    <Button type='primary' className='mar-20' onClick={this.handleSearch}>查询</Button>
                    <Button type='danger' onClick={this.resetData}>重置</Button>
                    </div>
                </Card>
                <Card style={{marginTop:'-1px'}}>
                    <Button type="primary" className='mar-20'>订单详情</Button>
                    <Button type="primary" onClick={this.handleDone}>结束订单</Button>
                </Card>
                <Card>
                    <Table columns={columns}
                    pagination={this.state.pagination}
                    dataSource={this.state.data}
                    loading={this.state.isLoading}
                    rowSelection={rowSelection}
                    ></Table>
                
                </Card>
                <Modal
                title="结束订单"
                visible={this.state.isShowModel}
                onOk={this.handleEnd}
                onCancel={()=>this.setState({isShowModel:false})}
                >
                        <ul className="ul-data">
                        <li>
                            <span className='car-num li-title'>车辆编号</span>
                            {this.state.endItem.bike_sn}
                        </li>
                        <li>
                            <span className='car-num li-title'>剩余电量</span>
                            {this.state.endItem.battery}
                        </li>
                        <li>
                            <span className='car-num li-title'>行程开始时间:</span>
                            {this.state.endItem.start_time}
                        </li>
                        <li>
                            <span className='car-num li-title'>当前位置:</span>
                            {this.state.endItem.location}
                        </li>
                        </ul>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(OrderDemo)
