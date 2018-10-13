
import React,{Component} from 'react'
import Header from '../../components/header/headerMap'
import './details.less'
import {Card} from 'antd'
import axios from '../../axios'
 class detail extends Component{
    //  state={
    //      orderInfo:{}
    //  }
     componentDidMount(){
         this.getDetailInfo()
        //  this.initMap()
        //  this.addControl()
     }
     getDetailInfo=()=>{
         const id=this.props.match.params.id
         axios.get(`/order/detail`,{id:1}).then(res=>{
             if(res.code==0){
                 this.initMap(res.result)
                 this.setState({
                     orderInfo:res.result
                 })
             }
         })
     }
    initMap=(result)=>{
        const BMap=window.BMap
        this.map=new BMap.Map('bmap-container')
        this.addControl()
        this.drawPolayline(result.position_list)
        this.drawServiceArea(result.area)
        // const point =new BMap.Point(116.404,39,915)
        // this.map.centerAndZoom(point,15)
    }
    //添加控件
    addControl=()=>{
        const BMap=window.BMap
        const map=this.map
        map.addControl(new BMap.NavigationControl({
            anchor:window.BMAP_ANCHOR_TOP_RIGHT
        })) 
        map.addControl(new BMap.ScaleControl({
            anchor:window.BMAP_ANCHOR_TOP_RIGHT
        }))

    }
    //绘制路径折线图
    drawPolayline=(position_list)=>{
        const BMap=window.BMap
        const map=this.map
        let startPoint=position_list[0]
        let endPoint=position_list[position_list.length-1]
        let startBmapPoint=new BMap.Point(startPoint.lon,startPoint.lat)
        let endBmapPoint=new BMap.Point(endPoint.lon,endPoint.lat)
        let startIcon=new BMap.Icon('/img/start_point.png',new BMap.Size(36,42),{
        imageSize:new BMap.Size(36,42)
        })
        let endIcon=new BMap.Icon('/img/end_point.png',new BMap.Size(36,42),{
        imageSize:new BMap.Size(36,42)
        })
       let startMarker=new BMap.Marker(startBmapPoint,{icon:startIcon})
       let endMarker=new BMap.Marker(endBmapPoint,{icon:endIcon})
       map.addOverlay(startMarker) 
       map.addOverlay(endMarker) 
       map.centerAndZoom(startBmapPoint,11)
       let polyline=new BMap.Polyline(position_list.map(point=>{
           return new BMap.Point(point.lon,point.lat)
       }),
       {strokeColor:"#1869AD",strokeWeight:3,strokeOpactity:1}
       );
       map.addOverlay(polyline)
    }
    //绘制服务区
    drawServiceArea=(area)=>{
        const BMap=window.BMap
        const map=this.map
        let polygon=new BMap.Polygon(
            area.map(point=>new BMap.Point(point.lon,point.lat)),
            {
                strokeColor:"#ff0000",
                strokeWeight:3,
                fillColor:'#ff6700',
                fillOpactity:0.5
            }
        )
        map.addOverlay(polygon)
    }
render(){
    return(
        <div>
            <Header></Header>
            <Card>
                <div className="bmap-wrap" id="bmap-container"></div>
            </Card>
        </div>
    )}
}
export default detail;
