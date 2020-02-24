<template>
  <div class="tab-bar-item" @click="itemClick">
     <div v-if="!isActive"><slot  name="item-icon"></slot></div>
     <div v-else><slot  name="item-icon-active"></slot></div>
     <div :class="{active:isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabbarItem',
  props:{
	  path:String
  },
  data () {
      return {
          // isActive:false
		  
      }
  },
  computed:{
	  isActive(){
		  return this.$route.path.indexOf(this.path) !== -1
	  }
  },
  methods:{
	  itemClick(){
		  this.$router.replace(this.path)
	  }
  }
}
</script>

<style scoped>
   .tab-bar-item{
   /* 对4个flex均等分 */
   flex: 1;    
   text-align: center;
   /* 移动端开发都是49 */
   height: 49px;
   margin-top: 3px;
   margin-bottom: 2px;
   font-size: 14px;
   vertical-align: middle;
 }
 .tab-bar-item img{
   height: 24px;
   width: 24px;
 }
 .active{
     color: red
 }
</style>