//单独对首页的数据请求封装管理
import {request} from './request';

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type ,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }

    })
}