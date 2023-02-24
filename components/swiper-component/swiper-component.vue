<template>
  <view>
    <view class="u-demo-block">
      <u-swiper :list="swiperList" previousMargin="30" nextMargin="30" :indicator="true" circular autoplay radius="5"
        bgColor="#ffffff">
      </u-swiper>
    </view>
  </view>
</template>

<script>
  export default {
    name:"swiper-component",
      
    props:{
      swiperList:{
        type:Array,
        required:true
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
  .u-demo-block {
    background-color: #fff;
    padding: 20rpx 0;
  }
</style>