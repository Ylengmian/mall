<template>
	<div class="cart">
		<NavBar class="nav-bar">
			<div slot="center">购物车({{length}})</div>
		</NavBar>
		<CartList/>
		<CartBottomBar/>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar'

	import {mapGetters } from 'vuex'

	export default{
		name:"ShopC",
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			//指定对getters转成计算属性
			//  ...mapGetters(['cartLength'])
			//另一种写法 
		        ...mapGetters({
			 	length:'cartLength'
		     })
		},
	}
</script>

<style scoped>
	.cart{
		height: 100vh;
	}
	.nav-bar{
		background-color: var(--color-tint);
		color: #fff;
	}
</style>
