<template>
  <view>
    <view class="card-box">
     <text> - &nbsp {{title}} &nbsp -</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"card",
      
    props:{
      title:{
        type:String,
        required:true
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
    
  .card-box{
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    background-color: #fff;
    font-size: 34rpx;
    font-weight: 700;
  }
</style>