<template>
  <view>
    <template v-if="mData.data">
      <view class="motion-container">
        <template v-if="mData.data">
          <banner :data="mData.data"></banner>
        </template>

        <card title="超级大牌"></card>
        <view class="goods-brand">
          <view class="goods-brand-item" v-for="(item, i) in mData.data.brand" :key="item.goods_id">
            <image :src="item.img_name" mode="widthFix" :style="{ marginTop: item.goods_id > 2 ? '0rpx' : '60rpx' }"></image>
          </view>
        </view>

        <card title="热销爆品"></card>
        <u-loadmore v-if="threeList.length == 0" :line="true" status="loading" loading-text="加载中..." />

        <commodityList :commodityList="threeList" :itemWH="{ width: '230rpx', height: '230rpx' }"></commodityList>

        <template v-if="shopList.length !== 0">
          <card title="推荐店铺"></card>
          <shop :scrollList="shopList" img_name="../../static/img/banner1.jpg"></shop>
        </template>

        <card title="为你推荐"></card>
        <u-loadmore v-if="commodityList.length == 0" :line="true" status="loading" loading-text="加载中..." />
        <template v-if="commodityList.length !== 0">
          <view>
            <commodityList :commodityList="commodityList" :itemWH="{ width: '280rpx', height: '360rpx' }"></commodityList>
            <u-loadmore :line="true" :status="status" loading-text="努力加载中" nomore-text="实在没有了" />
          </view>
        </template>
      </view>
    </template>
  </view>
</template>

<script>
// import { mapState } from 'vuex';
import { getThreeList } from '@/api/homeAPI.js';
import { getList } from '@/utils/get_list.js';

export default {
  props: {
    mData: {
      type: Object
    }
  },

  mounted() {
    uni.$on('reqData1', async val => {
      if (this.threeList.length == 0) {
        const { data: res } = await getThreeList(val, '鸿星尔克');
        this.threeList = res;
        this.$nextTick(() => uni.$emit('loadSwiper'));
      } else if (this.shopList.length == 0) {
        const { data: res } = await getThreeList(val, '特步');
        this.shopList = res;
        this.$nextTick(() => uni.$emit('loadSwiper'));
      } else {
        getList(this, val);
      }
    });
  },
  data() {
    return {
      threeList: [],
      shopList: [],
      page: 0,
      total: 0,
      status: 'loading',
      commodityList: []
    };
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.goods-brand {
  display: flex;
  flex-wrap: wrap;

  .goods-brand-item {
    width: 25%;
    height: 180rpx;
    image {
      vertical-align: middle;
      width: 100%;
      // margin-top: 60rpx;
    }
  }
}
</style>
