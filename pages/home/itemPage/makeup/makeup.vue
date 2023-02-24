<template>
  <view>
    <banner :data="mData.data"></banner>
    <shop :scrollList="scrollList" img_name="https://gdp.alicdn.com/imgextra/i3/2208156289515/O1CN01nDHcgS2K9vM7XPyHU_!!2208156289515.jpg"></shop>
    <view class="">
      <!-- 卡片组件 -->
      <card title="猜你喜欢"></card>
      <u-loadmore v-if="commodityList.length == 0" :line="true" status="loading" loading-text="加载中..." />
      <template v-if="commodityList.length !== 0">
        <!-- 商品列表 -->
        <view class="waterfall-container"><commodityList :commodityList="commodityList" :itemWH="{ width: '300rpx', height: '340rpx' }"></commodityList></view>
        <u-loadmore :line="true" :status="status" loading-text="努力加载中" nomore-text="实在没有了" />
      </template>
    </view>
  </view>
</template>

<script>
import { getThreeList } from '@/api/homeAPI.js';
import { getList } from '@/utils/get_list.js';
export default {
  props: {
    mData: {
      type: Object
    }
  },
  
  data() {
    return {
      scrollList: [],
      page: 0,
      total: 0,
      status: 'loading',
      commodityList: []
    };
  },
  
  async mounted() {
    if (this.scrollList !== 0) {
      const { data: res } = await getThreeList('3', '口红');
      this.scrollList = res;
      this.$nextTick(() => uni.$emit('loadSwiper'));
    }

    uni.$on('reqData3', tabsID => {
      getList(this, tabsID);
    });
  }
};
</script>

<style lang="scss"></style>
