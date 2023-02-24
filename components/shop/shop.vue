<template>
  <view>
    <view class="shop-container">
      <view class="shop-img-box"><image class="shop-img" :src="img_name" mode=""></image></view>
      <view class="scroll-box">
        <scroll-view :scroll-x="true" class="scroll-view">
          <view class="scroll-item" v-for="(item, index) in scrollList" :key="index">
            <commodity
              @click.native="gotoGoodsDetails(item)"
              :commodity="item"
              :itemWH="{
                width: '200rpx',
                height: '200rpx'
              }"
            ></commodity>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'shop',

  props: {
    scrollList: {
      type: Array
    },

    img_name: {
      type: String
    }
  },
  data() {
    return {};
  },

  methods: {
    gotoGoodsDetails(val) {
      uni.navigateTo({
        url: `/subpkg/goods_details/goods_details?goods_id=${val.goods_id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-img {
  width: 100%;
  height: 350rpx;
}

.scroll-view {
  white-space: nowrap;

  .scroll-item {
    display: inline-block;
    margin: 0 10rpx;
  }
}
</style>
