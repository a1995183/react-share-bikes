import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './index.less'
import utils from '../../utils/index'
// import axios from 'axios'
const formDate=utils.formDate
 class Header extends Component{
     state={
         time:'2018-08-01 23:30:56',
         weather:'低温 3.0C - 高温16.0C 西北风 4-5级'
     }
     getTime=()=>{
         setInterval(()=>{
             let unixDate=new Date().getTime()
             let timeStr=formDate(unixDate)
             this.setState({
                 time:timeStr
             })
         },1000)
     }
     getWeather=()=>{
    //     axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`)
    // .then(res=>{
    //     console.log(res)
    //    let weatherData=res.data.data.forecast[0]
    //    let weatherStr=`${weatherData.low}~${weatherData.high}${weatherData.fx}${weatherData.fl}` 
    //     this.setState({weather:weatherStr})    
    // }) 
    utils.get('city/101010100').then(res=>{
            console.log(res)
           let weatherData=res.data.forecast[0]
           let weatherStr=`${weatherData.low}~${weatherData.high}${weatherData.fx}${weatherData.fl}` 
            this.setState({weather:weatherStr})    
        }) 
    }
     componentWillMount(){
        this.getTime()
        this.getWeather()
     }
render(){
return(
<div className="header-wrap">
    <div className="user-info clearfix">
         <div className="flr">
            <Link to='/login'>退出</Link>
        </div>
        <div className="user-detail flr">
        欢迎,{'  '}<span className="username">张怡宁</span>
        </div>
    </div>
    <div className="weather-wrap clearfix">
        <div className="breadcrumb fll"><Link to='/admin/home'>首页</Link></div>
    
        <div className="weather flr clearfix">
            <div className="date fll">
                {this.state.time}
            </div>
            <div className="weather-detail fll">
                {this.state.weather}
            </div>
        </div>
    </div>
</div>
)
}
}
export default Header
