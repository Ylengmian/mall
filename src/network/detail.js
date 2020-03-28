import {request} from './request';

export function getDetail(iid) { 
    return request({
        url:'/detail',
        params: {
            iid
        }
    })
 }

 export function getRecommend(){
    return request({
        url:'/recommend'
    })
 }

//  ES6语法中的创建类
/**
  *   思路： 当服务器数据杂乱时，把服务器杂乱的数据封装到到一个类，
  *          在创建这个类对应的一个对象，用这个对象传到组件里，再让组件对数据做展示
  */
 export class Goods{
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discount;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
 }

 export class GoodsParam{
     constructor(info,rule){
        //  注：image可能没有值（某些商品有值，某些没有值）
         this.image = info.image ? info.image[0] : '';
         this.infos = info.set;
         this.sizes = rule.tables;
     }
 }

 export class Shop{
     constructor(shopInfo){
         this.logo = shopInfo.logo;
         this.name = shopInfo.name;
         this.fans = shopInfo.fans;
         this.sells = shopInfo.sells;
         this.score = shopInfo.score;
         this.goodsCount = shopInfo.goodsCount;
     }
 }