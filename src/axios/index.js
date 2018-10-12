import axios from 'axios'
const instance=axios.create({
    baseURL:'https://www.easy-mock.com/mock/5bbb8bf854d6771eb592838d',
    timeout:1500000
})
 const Axios={
  get(url,data,config){
    return new Promise((resolve,reject)=>{
      instance.get(url,{params:data},config).then(res=>{
        resolve(res.data)
      }).catch(
          err=>{
              reject(err)
          }
      )
    })
  },
  post(url,data,config){
      return new Promise((resolve,reject)=>{
        instance.post(url,data,config).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
      })
  }
}
export default Axios