import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import {connect} from 'react-redux'
import './index.less'
import {bindActionCreators} from 'redux'
import action from '../../redux/action'
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
 class Navleft extends Component{
    clickMenuItem=({item,key,keyPath})=>{
console.log(item)
const text=item.props.children.props.children
this.props.action.changeMenuItem(text)

    }
render(){
return(
<div className="nav-left">
   <Menu  mode="inline" theme="dark" onClick={this.clickMenuItem}>
        <MenuItem key="/首页"> 
             <Link to="/admin/home">首页</Link>
        </MenuItem>
        <SubMenu title="订单管理">
            <MenuItem key="/admin/order">
                <Link to="/admin/order">订单管理</Link>
            </MenuItem>
        </SubMenu>
        <SubMenu title="图例">
        <MenuItem key="/admin/echarts/pie">
                <Link to="/admin/echarts/pie">饼状图</Link>
            </MenuItem>
        </SubMenu>
        <MenuItem key="/secondPage">
            <Link to="/admin/secondPage">第二页</Link>
        </MenuItem>
   </Menu>

</div>
)
}
}
export default connect(null,(dispatch)=>({
action:bindActionCreators(action,dispatch)
}))(Navleft)
