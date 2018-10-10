import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import img from '../../img/img.gif'
 class NotMatch extends Component{
    render(){
        return(
            <div className="notmatch clearfix">
                <div className="notmatch-left fll">
                    <div className="title">oh My God!</div>
                    <h2 className="desc">
                    404,没有你要找的页面。
                    </h2>
                    <strong>如有不满，请联系你的领导</strong>
                    <ul>
                        <li>或者你可以去</li>
                        <li><Link to='/admin/home'>回首页</Link></li>
                    </ul>
                </div>
                <div className="img-wrap fll">
                <img src={img}/>
                </div>
            </div>
        )
    }
}
export default NotMatch