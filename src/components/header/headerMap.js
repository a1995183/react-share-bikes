import React,{Component} from 'react'
import './headerMap.less'
import {Link} from 'react-router-dom'
 class headerMap extends Component{
render(){
        return(
            <div className="detail-map">
                <div className='header-left fll'>
                    <h1>共享单车后台系统</h1>
                </div>
                <div className="header-right flr">
                    <span className="usrename">
                        欢迎，江疏影
                    </span>
                    <span className="logout">
                        <Link to='/commont/login'>退出</Link>
                    </span>
                </div>
            </div>
        )
    }   
}
export default headerMap
