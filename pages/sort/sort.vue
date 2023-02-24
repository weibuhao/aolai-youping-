<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="search">
      <navigator animation-type="fade-in" url="../../subpkg/search/search"><uni-search-bar :radius="100" placeholder="搜索" readonly></uni-search-bar></navigator>
    </view>
    <!-- #endif -->

    <!-- 分类 -->
    <view class="cate-container">
      <!-- 左侧 -->
      <scroll-view class="left-scroll-box" scroll-y :style="{ height: wh + 'px' }">
        <view :class="['left-item', i === active ? 'active' : '']" @click="currentFn(i)" v-for="(item, i) in cateList" :key="item.cat_id">{{ item.cat_name }}</view>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view class="right-scroll-box" scroll-y :style="{ height: wh + 'px' }" :scroll-top="scroll">
        <view class="right-item-box" v-for="item in cateItemList" :key="item.cat_id">
          <view class="right-item-title">{{ item.cat_name }}</view>
          <view class="right-item-goods">
            <view class="right-item-goods-item" @click="gotoGoodsList(item2)" v-for="(item2, i) in item.children" :key="i">
              <image :src="item2.cat_icon" mode=""></image>
              <text>{{ item2.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <loader-view v-if="loaderShow"></loader-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0,
      cateList: [],
      cateItemList: [],
      active: 0,
      scroll: 0,
      loaderShow: true
    };
  },

  onLoad() {
    const sysInfo = uni.getSystemInfoSync();

    this.wh = sysInfo.windowHeight;
    // #ifdef MP-WEIXIN
    this.wh -= 54;
    // #endif
    this.getCateList();
  },
  onNavigationBarButtonTap(e) {
    if (e.index == 0) {
      uni.navigateTo({
        url: '../../subpkg/search/search'
      });
    }
  },
  methods: {
    async getCateList() {
      uni.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
        success: res => {
          this.cateList = res.data.message;
          this.cateItemList = this.cateList[0].children;
          this.loaderShow = false;
        }
      });
    },

    currentFn(index) {
      this.active = index;
      this.cateItemList = this.cateList[index].children;
      this.scroll = this.scroll ? 0 : 1;
    },

    gotoGoodsList(item) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?query=' + item.cat_name
      });
    }
  }
};
</script>

<style lang="scss">
.cate-container {
  display: flex;

  .left-scroll-box {
    width: 250rpx;
    text-align: center;

    .left-item {
      height: 100rpx;
      line-height: 100rpx;
      font-size: 28rpx;

      &.active {
        background-color: #fff;
        position: relative;

        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 6rpx;
          height: 50rpx;
          background-color: #3b9cff;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  .right-scroll-box {
    background-color: #fff;
    .right-item-box {
      .right-item-title {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-weight: 700;
        font-size: 30rpx;
      }

      .right-item-goods {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30rpx;

        .right-item-goods-item {
          width: 33.33%;
          display: flex;
          flex-direction: column;
          margin-bottom: 30rpx;

          image {
            width: 120rpx;
            height: 120rpx;
            margin: 0 auto;
          }

          text {
            text-align: center;
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>
