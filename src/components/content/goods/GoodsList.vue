<template>
    <div class="goods">
        <GoodsListItem v-for="item in goods" :goodsItem="item"/>
    </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem'

    export default {
    name:'GoodsList',
    components: {
        GoodsListItem
    },
    props: {
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
    }
</script>

<style scoped>
    .goods{
        /* 设置flex，所有的东西都是在一行显示，所以要设置宽度 */
        display: flex;
        /* 这个是根据设置好的宽度均等分 */
        flex-wrap: wrap;
        /* 把一个数据周围显示均等分 */
        justify-content: space-around;
    }
</style>