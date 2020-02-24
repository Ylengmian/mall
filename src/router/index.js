import Vue from 'vue'
import VueRouter from 'vue-router'

//设置懒加载
const Home = () =>import('../views/home/Home')
const Classify = () =>import('../views/classify/Classify')
const One = () =>import('../views/one/One')
const ShopC = () =>import('../views/shopc/ShopC')
// const Classify = () =>import('../views/classify/Classify')
// const ShopC = () =>import('../views/shopc/ShopC')
// const One = () =>import('../views/one/One')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes =[
    //默认加载首页
	{
		path:'',
		redirect:'./home'
	},
	{
		path:'/home',
		component:Home
	},
	{
		path:'/classify',
		component:Classify
	},
	{
		path:'/shopc',
		component:ShopC
	},
	{
		path:'/one',
		component:One
	}
]

const router =new VueRouter({
    routes,
    mode:'history'
})

export default router