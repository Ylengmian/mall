<template>
    <tabbar>
       <TabbarItem path="/home">
          <img slot="item-icon" src="~assets/img/tabbar/home.jpg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/home_active.jpg" alt="">
          <div slot="item-text">首页</div>
       </TabbarItem>
       <TabbarItem path="/classify">
         <img slot="item-icon" src="~assets/img/tabbar/classify.jpg" alt="">
         <img slot="item-icon-active" src="~assets/img/tabbar/classify_active.jpg" alt="">
         <div slot="item-text">分类</div>
       </TabbarItem>
       <TabbarItem path="/shopc">
         <img slot="item-icon" src="~assets/img/tabbar/shopc.jpg" alt="">
         <img slot="item-icon-active" src="~assets/img/tabbar/shopc_active.jpg" alt="">
         <div slot="item-text">购物车</div>
       </TabbarItem>
       <TabbarItem path="/one">
         <img slot="item-icon" src="~/assets/img/tabbar/one.jpg" alt="">
         <img slot="item-icon-active" src="~assets/img/tabbar/one_active.jpg" alt="">
         <div slot="item-text">我的</div>
       </TabbarItem>
    </tabbar>
</template>

<script>
    import Tabbar from 'components/common/tabbar/TabBar'
    import TabbarItem from 'components/common/tabbar/TabbarItem'

    export default {
    name:'',
    components: {
        Tabbar,
        TabbarItem
    }
    }
</script>


<style scoped>

</style>