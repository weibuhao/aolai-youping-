<template>
  <view>
    <view class="goods-order-box" @click="gotoDetails">
      <view class="goods-order-left"><image :src="goods.img" mode="widthFix"></image></view>
      <view class="goods-order-right">
        <view class="goods-order">{{ goods.name }}</view>
        <view class="goods-price-box">
          <view class="goods-price">
            <text>￥{{ priceToFixed(goods.price) }}</text>
            <text>￥{{ priceToFixed(Math.ceil(goods.price / (goods.discount / 10))) }}</text>
          </view>
          <view class="goods-count-box">
            <template v-if="!goods.countState">
              <view @click.stop="reduceCount"><u-icon name="minus"></u-icon></view>
              <view class="goods-count">{{ goods.count }}</view>
              <view @click.stop="addCount"><u-icon name="plus"></u-icon></view>
            </template>
            <template v-else>
              <view class="count-box">
                <text>× {{ goods.count ? goods.count : 1 }}</text>
              </view>
            </template>
          </view>
        </view>
        <view class="discount-price-box">
          <view class="discount-price">每件到手价￥{{ priceToFixed(goods.price) }}</view>
          <view class="discount-service">
            <text>支持7天无理由退货</text>
            <text>自营专享价</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'goods-order',
  props: ['goodsDetail'],
  data() {
    return {
      count: 0,
      goods: {},
      time: null
    };
  },
  created() {
    this.goods = this.goodsDetail;
  },
  methods: {
    gotoDetails() {
      uni.navigateTo({
        url: `/subpkg/goods_details/goods_details?goods_id=${this.goods.goods_id}&tabs_id=${this.goods.tabs_id}`
      });
    },
    timeOunt(time) {
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.reqUpdateGoods({ goods_id: this.goodsDetail.goods_id, tabs_id: this.goodsDetail.tabs_id, count: this.goodsDetail.count });
      }, time);
    },
    ...mapActions(['reqUpdateGoods']),
    reduceCount() {
      if (this.goods.count == 1) return;
      this.goodsDetail.count--;
      this.timeOunt(1000);
    },

    addCount() {
      if (this.goods.count == 999) return;
      this.goodsDetail.count++;
      this.timeOunt(1000);
    },
    // 给价格添加两个零
    priceToFixed(val) {
      if (!val) return;
      return val.toFixed(2);
    }
  },
  watch: {
    goodsDetail: {
      handler(newVal, oldVal) {
        this.goods.count = this.goodsDetail.count;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-order-box {
  position: relative;
  margin: 20rpx 0;
  display: flex;

  .count-box {
    position: absolute;
    color: #6e6e6e;
    right: 20rpx;
    bottom: 40rpx;
  }
  .goods-order-left {
    image {
      width: 160rpx;
      height: 160rpx;
    }
  }

  .goods-order-right {
    padding: 0 20rpx;
    .goods-order {
      width: 450rpx;
      font-size: 28rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .goods-price-box {
      display: flex;
      margin: 20rpx 0 10rpx;
      height: 20px;
      align-items: center;
      justify-content: space-between;

      .goods-price {
        text {
          margin-right: 20rpx;
        }
        text:nth-child(1) {
          font-weight: 700;
          color: #fd4443;
        }
        text:nth-child(2) {
          font-size: 24rpx;
          text-decoration: line-through;
          color: #c5c5c5;
        }
      }

      .goods-count-box {
        width: 90px;
        margin-right: 50rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .minus-icon {
          color: #dddddd !important;
        }
        .goods-count {
          width: 80rpx;
          height: 40rpx;
          line-height: 40rpx;
          font-size: 28rpx;
          border-radius: 10rpx;
          padding: 5rpx;
          background-color: #f6f6f6;
          text-align: center;
        }
      }
    }

    .discount-price-box {
      .discount-price {
        font-size: 26rpx;
        color: #fd4443;
      }

      .discount-service {
        margin: 15rpx 0;
        font-size: 18rpx;

        text {
          margin-right: 10rpx;
          border: 1rpx solid #fd4443;
          padding: 0 5rpx;
          border-radius: 8rpx;
          color: #fd4443;
        }
      }
    }
  }
}
</style>
