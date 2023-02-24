<template>
  <view>
    <template v-if="!tokenState">
      <view class="car-empty"><u-empty mode="permission"></u-empty></view>
    </template>
    <template v-else>
      <view v-if="cartData.length !== 0">
        <view class="cart-page-box">
          <view class="cart-page">
            <!-- 地址组件 -->
            <my-address></my-address>
            <view class="cart-container">
              <view class="cart-head">
                <view class="cart-icon">
                  <u-icon name="shopping-cart" size="24"></u-icon>
                  <text>购物车</text>
                </view>
                <view class="edit-box" @click="changeEdit">{{ editState == false ? '编辑' : '完成' }}</view>
              </view>
              <template v-if="cartData.length !== 0">
                <!-- 商品 -->
                <view class="cart-goods" v-for="(item, i) in cartData" :key="item.goods_id">
                  <view class="address-item-change">
                    <view :class="{ animation: item.state }">
                      <u-checkbox-group><u-checkbox :checked="item.state" shape="circle" @change="chengeState(item, $event)"></u-checkbox></u-checkbox-group>
                    </view>
                  </view>
                  <template v-if="item">
                    <goods-order :goodsDetail="item"></goods-order>
                  </template>
                </view>
              </template>
            </view>
          </view>
          <view class="goods-carts">
            <view class="total-icon total-price">
              <view :class="{ animation: cartAllState }">
                <u-checkbox-group><u-checkbox :checked="cartAllState" shape="circle" label="全选" @change="allChoice"></u-checkbox></u-checkbox-group>
              </view>
            </view>
            <view class="total-price">￥{{ cartTotalPrice ? priceToFixed(cartTotalPrice) : '0.00' }}</view>
            <uni-goods-nav :options="[]" :fill="true" :button-group="buttonGroup" @buttonClick="buttonClick" />
          </view>
        </view>
      </view>

      <template v-else>
        <view class="car-empty"><u-empty mode="car"></u-empty></view>
      </template>
    </template>
  </view>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { updateCount } from '@/api/cartAPI.js';
export default {
  computed: {
    ...mapState({
      cartData: state => state.cartStore.cartData,
      tokenState: state => JSON.parse(state.userStore.tokenState),
      address: state => {
        if (state.addressStore.addressList.length == 0) return false;
        return state.addressStore.addressList.filter(item => item.addressState)[0];
      }
    }),
    ...mapGetters(['cartAllState', 'cartTotalPrice', 'carSelectList'])
  },
  data() {
    return {
      buttonGroup: [
        {
          text: '提交订单',
          backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
          color: '#fff'
        }
      ],
      price: 0,
      editState: false,
      time: null,
      allState: false
    };
  },

  onShow(e) {
    this.reqCartData();
  },
  created() {
    this.reqCartData();
  },

  methods: {
    ...mapActions(['reqCartData', 'reqUpdateGoods', 'reqDeleteGoods']),

    //提交订单或删除
    buttonClick(e) {
      if (this.carSelectList.length == 0) return uni.$showMsg('请选择您的商品！');
      if (!this.address && e.content.text == '提交订单') return uni.$showMsg('请添加您的地址！');
      if (e.content.text == '提交订单') {
        let goodsList = JSON.stringify(this.cartData.filter(item => item.state));
        uni.navigateTo({
          url: `/subpkg/order_details/order_details?goodsList=${goodsList}`
        });
      } else {
        this.cartAllState ? this.reqDeleteGoods().then(() => this.changeEdit()) : this.reqDeleteGoods(this.carSelectList).then(() => this.changeEdit());
      }
    },

    // 给价格添加两个零
    priceToFixed(val) {
      if (!val) return;
      return val.toFixed(2);
    },

    //商品状态
    chengeState(item, e) {
      item.state = e;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.reqUpdateGoods({ goods_id: item.goods_id, tabs_id: item.tabs_id, count: item.state });
      }, 1000);
    },

    //编辑状态
    changeEdit() {
      this.editState = !this.editState;
      this.editState ? (this.buttonGroup[0].text = '删除') : (this.buttonGroup[0].text = '提交订单');
    },

    // 全选方法
    allChoice(e) {
      this.cartData.forEach(item => (item.state = e));
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        updateCount(null, null, e);
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.car-empty {
  margin-top: 300rpx;
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

  .total-icon {
    transform: translateY(-50%) !important;
    left: 22rpx !important;
  }

  .total-price {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    font-size: 36rpx;
    color: #fb5032;
    font-weight: 700;
  }
}
.uni-tab__cart-sub-left {
  padding: 0 500rpx 0 10rpx !important;
}
.van-empty {
  padding: 160px 0 !important;
}
.van-empty__image {
  width: 150rpx !important;
  height: 150rpx !important;
}

.van-submit-bar__bar {
  justify-content: space-between !important;
}

.cart-page {
  padding-bottom: 80rpx;
}

.cart-container {
  margin: 20rpx 0;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;

  .cart-head {
    margin: 20rpx 0;
    font-size: 45rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cart-icon {
      display: flex;
      align-items: center;
    }

    text {
      font-size: 28rpx;
    }

    .edit-box {
      padding: 0 15rpx;
      height: 50rpx;
      font-size: 28rpx;
      line-height: 50rpx;
      border-radius: 100rpx;
      background-color: #3b9cff;
      color: #fff;
      text-align: center;
    }
  }
}

.address-item-change {
  display: flex;
  align-items: center;
}

.cart-goods {
  display: flex;
  align-items: center;
}

.animation {
  animation: jelly 0.6s ease;
}

@keyframes jelly {
  from {
    transform: scale(1, 1);
  }

  30% {
    transform: scale(1.25, 0.75);
  }

  40% {
    transform: scale(0.75, 1.25);
  }

  50% {
    transform: scale(1.15, 0.85);
  }

  65% {
    transform: scale(0.95, 1.05);
  }

  75% {
    transform: scale(1.05, 0.95);
  }

  to {
    transform: scale(1, 1);
  }
}
</style>
