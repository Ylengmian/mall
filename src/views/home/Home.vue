<template>
    <div id="home" class="wrapper">
        <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
        <TabbarControl ref="tabControl1"
                       :titles="['流行','新款','精选']"
                       @tabClick="tabClick" 
                       class="tab-control" v-show="isTabFixed"/>
        <!-- Scroll一定得有固定的额高度 -->
        <Scroll class="content" 
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <HomeRecommendView :recommends="recommends"/>
            <FeartureView/>
            <TabbarControl ref="tabControl2"
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
    import {debounce} from 'common/tools'
    import  {itemListenerMixin,backTopMixin} from "common/mixin";

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
    //混入技术
    mixins: [itemListenerMixin, backTopMixin],
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
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    computed: {
      showGoods(){
          return this.goods[this.currentType].list
      }
    },
    //当又返回时显示离开时的位置
    activated () {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0 , this.saveY , 0)
    },
    // 记录离开时的位置
    deactivated () {
        this.saveY = this.$refs.scroll.getScrollY()
        //取消全局事件的监听
        this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created () {
        //1.请求多个数据
        this.getHomeMultidata()

        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')  

        //3.赋值
        
    },
    mounted () {
    //    //1.图片加载完成的事件监听
    //    const refresh = debounce(this.$refs.scroll.refresh ,50)
    //        //3.监听item中图片加载完成
    //      this.$bus.$on('itemImageLoad',() =>{
    //           refresh()
    //       })
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
           this.$refs.tabControl1.currentIndex = index;
           this.$refs.tabControl2.currentIndex = index;
        },

        contentScroll(position){
            //1.判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1000

            //2.决定tabControl是否吸顶（position：fixed）
            this.isTabFixed = (-position.y) >this.tabOffsetTop
        },
         loadMore() {
            this.getHomeGoods(this.currentType);
        },
        swiperImageLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
                //完成上拉加载更多
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

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
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