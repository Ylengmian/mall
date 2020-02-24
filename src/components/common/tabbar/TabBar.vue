<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
 
 export default {
  name:'Tabbar'
  
}
</script>


<style scoped>

#tab-bar{
   display: flex;
   background-color: #f6f6f6;
   
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   box-shadow: 0 -3px 1px rgba(185, 185, 185, 0.3)
 }
 .tab-bar-item{
   /* 对4个flex均等分 */
   flex: 1;    
   text-align: center;
   /* 移动端开发都是49 */
   height: 49px;
   margin-top: 20px;

 }
 .tab-bar-item img{
   height: 24px;
   width: 24px;
 }
</style>