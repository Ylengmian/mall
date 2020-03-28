<template>
    <div id="detail" >
      <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <ul>
        <li v-for="item in $store.state.cartList">{{item}}</li>
      </ul>
      <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contScroll">
           <DetailSwiper :top-images="topImages"/>
           <DetailBaseInfo :goods = "goods"/>
           <DetailShopInfo :shop="shop" />
           <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
           <DetailParamInfo ref="params" :param-info="paramInfo"/>
           <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
           <GoodsList ref="recommend" :goods="recommends"/>
      </Scroll>
      <DetailBottomBar @addCart ="addToCart"/>
      <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'
    
    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
    import {debounce} from "common/tools";
    import  {itemListenerMixin,backTopMixin} from "common/mixin";

    export default {
    name:'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
    },
    //混入技术
    mixins: [itemListenerMixin,backTopMixin],
    data () {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailImages:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            isShowBackTop: false,
        }
    },
    created () {
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.跟iid请求详情页数据
        getDetail(this.iid) .then(res =>{
            //a.获取顶部轮播图的数据
            const data = res.result
            this.topImages = data.itemInfo.topImages
            
            //b.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            //c.创建店铺信息
            this.shop = new Shop(data.shopInfo)

            //d.保存商品的详情数据
            this.detailInfo = data.detailInfo

            //e.获取商品的参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            // f.取出评论信息
            if(data.rate.cRate !== 0){
              this.commentInfo = data.rate.list[0]
            }

        })

        //3.请求详情页下面的推荐数据
        getRecommend().then(res =>{
          this.recommends = res.data.list
        })

        //4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
        this.getThemeTopY = debounce( () =>{
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);   
          this.themeTopYs.push(Number.MAX_VALUE)
        },100)
    },
    methods: {
        imageLoad(){
            this.$refs.scroll.refresh();

            this.getThemeTopY();
        },
        titleClick(index){
          this.$refs.scroll.scrollTo(0 , -this.themeTopYs[index], 100)
        },
        contScroll(position){
          //1.获取y值
          const positionY = -position.y

          //2.positionY和主题中值进行对比
          let length = this.themeTopYs.length
          for (let i = 0; i < length - 1; i++) {
            if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
              this.currentIndex = i ;
              this.$refs.nav.currentIndex = this.currentIndex;
            }
          }
          //3.是否显示回到顶部
          this.isShowBackTop = (-position.y) > 1000
        },
        addToCart(){
          //1.获取购物车需要展示的信息
          const product = {}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price = this.goods.realPrice;
          product.iid = this.iid;

          //2.将商品添加到购物车里面
          // this.$store.commit('addCart',product)
          this.$store.dispatch('addCart',product)
        }
    },
    mounted () {
    },
    destroyed() {
      //取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    }
    </script>

<style scoped>
      #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
      }
      .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
      }
      .content {
        height: calc(100% - 44px - 59px);
      }
</style>