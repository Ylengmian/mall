<template>
    <div id="home" class="wrapper">
        <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
        <Scroll class="content" 
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <HomeSwiper :banners="banners"/>
            <HomeRecommendView :recommends="recommends"/>
            <FeartureView/>
            <TabbarControl class="tab-control"
                           :titles="['流行','新款','精选']"
                           @tabClick="tabClick"/>
            <GoodsList :goods="showGoods"/>      
        </Scroll>
        <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import HomeRecommendView from './childComps/HomeRecommendView'
    import FeartureView from './childComps/FeartureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabbarControl from 'components/content/tabbarControl/TabbarControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'

    import {getHomeMultidata , getHomeGoods} from 'network/home'

    export default {
    name:'Home',
    components: {
        NavBar,
        TabbarControl,
        GoodsList,
        Scroll,
        BackTop,
        HomeSwiper,
        HomeRecommendView,
        FeartureView
    },
    data () {
        return {
            banners:[],
            recommends: [],
            goods: {
                'pop': {page:0, list:[]},
                'new': {page:0, list:[]},
                'sell': {page:0, list:[]},
            },
            currentType: 'pop',
            isShowBackTop: false,
        }
    },
    computed: {
      showGoods(){
          return this.goods[this.currentType].list
      }  
    },
    created () {
        //1.请求多个数据
        this.getHomeMultidata()

        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')  
    },
    mounted () {
         //3.监听item中图片加载完成
        this.$bus.$on('itemImageLoad',() =>{
            this.$refs.scroll.refresh()
        })
    },
    methods: {
        /**
         * 事件监听相关方法
         */
        tabClick(index){
           switch (index) {
               case 0:
                this.currentType = 'pop'
                break;
               case 1:
                this.currentType = 'new'
                break;
               case 2:
                this.currentType = 'sell'
                break;
           } 
        },
        backClick(){
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        contentScroll(position){
            this.isShowBackTop = (-position.y) > 1000
        },
         loadMore() {
            this.getHomeGoods(this.currentType);
        },

        /**
         * 网络请求相关的方法
         */
        getHomeMultidata(){
            getHomeMultidata().then(res =>{
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
        getHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res =>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp()
            })
        }
    }
    }
</script>
<style scoped>
    #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
    }
     .home-nav {
    background-color:  var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*z-index: 1;*/
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>