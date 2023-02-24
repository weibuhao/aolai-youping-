<template>
  <view>
    <view class="banner-img-box"><swiper-component :swiperList="getSwiperList(data.swiper)"></swiper-component></view>
    <view class="goods-nav">
      <view class="goods-nav-item" v-for="(item, index) in data.nav" :key="item.id">
        <view class="goods-nav-item-img" @click="gotoGoodsList(item)"><image :src="item.img" mode=""></image></view>
        <text>{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'banner',

  props: {
    data: {
      type: Object
    }
  },
  mounted() {},
  data() {
    return {};
  },

  methods: {
    getSwiperList(val) {
      let swiperList = [];
      val.forEach(item => {
        swiperList.push(item.img_name);
      });
      return swiperList;
    },
    
    gotoGoodsList(val) {
      let name
      if (val.tabs_id == 0) {
        if(val.id==22){
          return uni.switchTab({
            url:'/pages/sort/sort'
          })
        }
    name=this.gotoFn(val.id)
      } else {
        name=val.name
      }
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?query=' + name
      });
    },
    gotoFn(val){
      let value
      switch(val){
        case 19: value= '吃'
        break
        case 18: value= '户外'
        break
        case 17: value=  '时尚'
        break
        case 16: value=  '爆款'
        break
        case 21: value=  '口红'
        break
        case 15: value=  '小小'
        break
        case 20: value=  '小小'
        break
      }
      return value
    }
  }
};
</script>

<style lang="scss" scoped>
.banner-img-box {
  padding: 20rpx 0;
  width: 100%;
  height: 300rpx;
  background-color: #fff;

  .banner-img {
    width: 100%;
    height: 100%;
  }
}

.goods-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  .goods-nav-item {
    font-size: 26rpx;
    width: 25%;
    text-align: center;
    margin-bottom: 15rpx;
    image {
      width: 125rpx;
      height: 100rpx;
    }
  }
}
</style>
