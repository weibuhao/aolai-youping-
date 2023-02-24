<template>
  <view>
    <view class="my-container">
      <view class="my-head">
        <view class="head-portrait-box">
          <view class="head-portrait"><image src="../../static/img/1.jpg" mode=""></image></view>
          <!-- #ifndef MP-WEIXIN -->
          <text class="head-portrait-word">{{ geTel(userInfo.userName) }}</text>
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <text class="head-portrait-word">{{ userInfo.userName == '206911' ? '测试号' : userInfo.userName }}</text>
          <!-- #endif -->
        </view>
      </view>
      <view class="my-main">
        <view class="my-details">
          <view class="my-details-item" v-for="(item, i) in myRecord" :key="i">
            <view class="my-details-item-count">{{ item.count }}</view>
            <view class="my-details-item-type">{{ item.type }}</view>
          </view>
        </view>
        <view class="my-order">
          <view class="my-order-word">我的订单</view>
          <view class="my-order-details">
            <view class="my-order-details-item">
              <view class="my-order-details-image"><image src="../../static/img/order1.png" mode=""></image></view>
              <text>待付款</text>
            </view>
            <view class="my-order-details-item">
              <view class="my-order-details-image"><image src="../../static/img/order2.png" mode=""></image></view>
              <text>待收货</text>
            </view>
            <view class="my-order-details-item">
              <view class="my-order-details-image"><image src="../../static/img/order3.png" mode=""></image></view>
              <text>退款/退货</text>
            </view>
            <view class="my-order-details-item">
              <view class="my-order-details-image"><image src="../../static/img/order1.png" mode=""></image></view>
              <text>全部账单</text>
            </view>
          </view>
        </view>
        <view class="my-function">
          <u-cell-group>
            <u-cell icon="map-fill" title="收货地址" isLink @click="gotoAddressList"></u-cell>
            <u-cell icon="server-man" title="联系客服" @click="contactService()" isLink></u-cell>
            <u-cell icon="error-circle-fill" title="退出登录" @click="loginOut()" isLink></u-cell>
          </u-cell-group>
        </view>
      </view>
    </view>
    <u-modal :show="dialogShow" title="是否退出登录" showCancelButton @confirm="confirmFn" @cancel="dialogShow = !dialogShow"></u-modal>
  </view>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
  name: 'my-user',

  computed: {
    ...mapState({
      userInfo: state => state.userStore.userInfo
    })
  },
  data() {
    return {
      myRecord: [
        {
          type: '收藏的店铺',
          count: 12
        },

        {
          type: '收藏的商品',
          count: 22
        },
        {
          type: '退款售后',
          count: 0
        },
        {
          type: '足迹',
          count: 43
        }
      ],
      dialogShow: false
    };
  },
  created() {
    this.reqUserInfo();
    this.updateToken();
  },
  methods: {
    ...mapActions(['reqUserInfo']),
    ...mapMutations(['updateToken']),
    geTel(tel) {
      tel += '';
      let reg = /^(\d{3})\d{4}(\d{4})$/;
      return tel.replace(reg, '$1****$2');
    },
    contactService() {
      uni.$showMsg('还未开发该服务！！');
    },

    loginOut() {
      this.dialogShow = !this.dialogShow;
    },
      
    gotoAddressList(){
      uni.navigateTo({
        url:'/subpkg/address_list/address_list'
      })
    },

    confirmFn() {
      this.dialogShow = !this.dialogShow;
      // #ifndef MP-WEIXIN
      uni.removeStorageSync('token');
      // #endif
      // #ifdef MP-WEIXIN
      uni.removeStorageSync('wx_token');
      // #endif
      uni.removeStorageSync('token_state');
      this.updateToken();
      // this.updataUserInfo()
    }
  }
};
</script>

<style lang="scss" scoped>
.head-portrait-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.my-container {
  position: relative;

  .my-head {
    display: flex;
    justify-content: center;
    height: 350rpx;
    background-color: #3b9cff;
    border-radius: 0 0 100% 100%;

    .head-portrait {
      width: 120rpx;
      height: 120rpx;
      margin-top: 40rpx;
      margin-bottom: 10rpx;
      overflow: hidden;
      border-radius: 1000rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .head-portrait-word {
      color: #fff;
    }
  }

  .my-main {
    width: 100%;
    position: absolute;
    top: 260rpx;
    left: 0;
    box-sizing: border-box;
    padding: 0 20rpx;

    .my-details {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 15rpx;
      height: 100rpx;
      background-color: #fff;

      .my-details-item {
        text-align: center;
        font-size: 26rpx;

        .my-details-item-count {
          margin-bottom: 8rpx;
        }
      }
    }

    .my-order {
      margin: 15rpx 0;
      border-radius: 15rpx;
      background-color: #fff;

      .my-order-word {
        padding-left: 15rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 1px solid #efefef;
      }

      .my-order-details {
        display: flex;
        justify-content: space-around;
        padding: 20rpx 0;

        .my-order-details-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 26rpx;

          .my-order-details-image {
            width: 65rpx;
            height: 70rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }

          text {
            margin-top: 8rpx;
          }
        }
      }
    }

    .my-function {
      overflow: hidden;
      border-radius: 15rpx;
      background-color: #fff;
    }
  }
}
</style>
