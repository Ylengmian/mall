<template>
    <div class="bottom-bar">
        <div class="check-content">
            <CheckButton :is-checked="isSelectAll" class="check-botton" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去结算：{{checkLength}}
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

    export default {
    name:'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength(){
          return this.$store.state.cartList.filter(item =>item.checked).length
      },
      isSelectAll(){
          if(this.cartList.length === 0) return false
           return !(this.cartList.filter(item =>!item.checked).length)
        //  return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
        checkClick(){
            if(this.isSelectAll){  //全部选中
                this.cartList.forEach(item => item.checked =false)
            }else{
                this.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick(){
            this.$toast.show("请选择购买的商品" ,2000)
        }
    }
}
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        background-color: #eee;
        position: relative;
        bottom: 40px;
        line-height: 40px;
        display: flex;
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 50px;
    }
    .check-botton{
        width: 18px;
        height: 18px;
        line-height: 18px;
        margin-right: 5px;
    }
    .check-content span{
        font-size: 10px;
    }
    .price{
        margin-left: 20px;
        font-size: 12px;
        flex: 1;
    }
    .calculate{
        font-size: 12px;
        width: 100px;
        background-color: var(--color-tint);
        color: #fff;
        text-align: center;
    }
</style>