import React,{Component} from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom';
import Home from '../views/home'
import Admin from '../views/admin'
import NotMath from '../views/notMatch'
import orderDemo from '../views/order_demo'
import SecondPage from '../views/secondpage'
import Pie from '../views/pie'
class Router extends Component{
    render(){
      return(
        <HashRouter>
        <div>   
            <Switch>
                <Route path="/admin" render={()=>
                    <Admin>
                        <Switch>
                            <Route path='/admin/home' component={Home}></Route>
                            <Route path='/admin/order' component={orderDemo}></Route>
                            <Route path='/admin/secondPage' component={SecondPage}></Route>
                            <Route path='/admin/echarts/pie' component={Pie}></Route>
                            <Route  component={NotMath}></Route> 
                        </Switch>
                    </Admin>}>
                </Route> 
                <Route  component={NotMath}></Route> 
            </Switch>
          
        </div>
    </HashRouter>
      ) 
    }
}
export default Router