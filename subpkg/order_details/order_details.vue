<template>
  <view>
    <my-address></my-address>
    <view class="goods-order-container">
      <view class="shop">
        <van-icon name="newspaper-o" />
        <text>官方自营</text>
      </view>
      <template v-if="goodsList.length !== 0">
        <view v-for="(item, i) in goodsList" :key="i"><goods-order :goodsDetail="item"></goods-order></view>
      </template>
      <view class="service-list">
        <view class="service-delivery">
          <text>配送</text>
          <text>顺丰快递（送货上门）</text>
        </view>
        <view class="service-delivery">
          <text>退换货免运费</text>
          <text>可享1次免费上门取件</text>
        </view>
      </view>
    </view>
    <view class="goods-carts">
      <view class="total-price">￥{{ totalPrice.toFixed(2) }}</view>
      <uni-goods-nav :options="[]" :fill="true" :button-group="buttonGroup" @buttonClick="submitOrder" />
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      address: state => {
        if (state.addressStore.addressList.length == 0) return false;
        return state.addressStore.addressList.filter(item => item.addressState)[0];
      }
    }),
    totalPrice() {
      let price = 0;
      this.goodsList.length !== 0 && this.goodsList.forEach(item => (price += item.price * (item.count ? item.count : 1)));
      return price;
    }
  },
  data() {
    return {
      goodsList: [],
      buttonGroup: [
        {
          text: '提交订单',
          backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
          color: '#fff'
        }
      ]
    };
  },

  onLoad(options) {
    if (options.goodsDetails) {
      let goodsDetail = JSON.parse(options.goodsDetails);
      goodsDetail.countState = true;
      this.goodsList.push(goodsDetail);
    } else {
      this.goodsList = JSON.parse(options.goodsList);
      this.goodsList.forEach(item => (item.countState = true));
    }
  },

  methods: {
    submitOrder(e) {
      if (e.index == 0) {
        if (!this.address) return uni.$showMsg('请选择您的地址');
        uni.navigateBack({
          success() {
            uni.$showMsg('提交成功');
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.uni-tab__cart-sub-left {
  padding: 0 300rpx 0 10rpx !important;
}

.goods-carts {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  /* #ifdef H5 */
  left: var(--window-left);
  right: var(--window-right);
  /* #endif */
  bottom: 0;

  .total-price {
    position: absolute;
    top: 50%;
    left: 120rpx;
    z-index: 999;
    transform: translate(-50%, -50%);
    font-size: 36rpx;
    color: #fb5032;
    font-weight: 700;
  }
}

.van-card {
  background-color: #fff !important;
}

.goods-order-container {
  font-family: Times, serif;
  background-color: #fff;
  padding: 25rpx;
  margin: 25rpx 0;
  padding-bottom: 150rpx;
  border-radius: 20rpx;

  .shop {
    color: #fd4443;

    text {
      font-size: 24rpx;
      // font-weight: 700;
    }
  }

  .service-delivery {
    display: flex;
    justify-content: space-between;
    height: 60rpx;
    line-height: 60rpx;

    text:nth-child(1) {
      font-weight: 700;
      font-size: 26rpx;
    }

    text:nth-child(2) {
      font-size: 22rpx;
    }
  }
}
</style>
