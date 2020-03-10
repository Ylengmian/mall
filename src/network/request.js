import axios from 'axios'

//第四种方案最终
 export function request(config){
    //1.创建axios的实例
    const instance = axios.create({
       baseURL: 'http://106.54.54.237:8000/api/chy',
        timeout: 5000
    })

    //2.axios的拦截器  
    //2.1请求拦截的作用
    instance.interceptors.request.use(config =>{
      //  console.log(config);
       //在这里可以处理以下多种情况
       //A.比如config中的一些信息不符合服务器的要求

       //B.比如每次发送网络请求时，都希望在界面中显示一个请求的图标（*类似于loading转圈）

       //c.某些网络请求（比如登录（token）），必须携带一些特殊的信息

       return config
    }, err =>{
       console.log(err);
    }) 

    //2.2响应拦截
    instance.interceptors.response.use(res =>{
      //  console.log(res)
       return res.data
    },err =>{
       console.log(err)
    })   
   
    //3.发送真正的网络请求
    return instance(config)
   }
