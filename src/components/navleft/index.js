import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import './index.less'
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
 class Navleft extends Component{
render(){
return(
<div className="nav-left">
   <Menu  mode="inline" theme="dark">
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
export default Navleft
