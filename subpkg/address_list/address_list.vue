<template>
  <view class="address-box">
    <template v-if="addressList.length !== 0">
      <view v-for="(item, i) in addressList" :key="item.id"><address-item :address="item"></address-item></view>
    </template>
    <!-- 空状态 -->
    <u-empty v-if="addressList.length == 0" mode="list" marginTop="200"></u-empty>
    <!-- @click="gotoEstablishAddress()" -->
    <!-- 新建地址 -->
    <view class="goods-carts"><uni-goods-nav :options="[]" :fill="true" :button-group="buttonGroup" @buttonClick="gotoEstablishAddress" /></view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      addressList: state => state.addressStore.addressList
    })
  },
  data() {
    return {
      buttonGroup: [
        {
          text: '新建地址',
          backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
          color: '#fff'
        }
      ]
    };
  },
  // 返回按钮点击生命周期
  onBackPress(e) {
    //判断用户是否有选择地址
    if (e.from == 'backbutton' && this.addressList.length !== 0 && !this.addressList.some(item => item.addressState == true)) {
      uni.$showMsg('请选择您的地址！');
      return true;
    }
  },
  methods: {
    ...mapActions(['reqGetaddresList']),
    //跳转新建地址
    gotoEstablishAddress() {
      uni.navigateTo({
        url: '/subpkg/establish_address/establish_address'
      });
    }
  },
  created() {
    this.reqGetaddresList()
  }
};
</script>

<style lang="scss" scoped>
.address-box {
  padding-bottom: 100rpx;
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
  z-index: 999;
}
</style>
