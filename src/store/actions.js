export default {
    addCart(context,payload){
        //payload新添加的商品
        //1.遍历购物车中是否有该商品
        //  let oldProduct = null;
        //  for (let item of state.cartList) {
        //      if (item.iid === payload.iid) {
        //          oldProduct = item;
        //      }
        //  }

        // 1.查找购物车中是否有该商品
         let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        //判断oldProduct
        if (oldProduct) {
            // oldProduct.count += 1 ;
            context.commit('addCounter',oldProduct)
        } else {
            payload.count = 1;
            // context.state.cartList.push(payload)
            context.commit('addToCart',payload)
        }
    }
}