<template>
  <view>
    <template v-if="dData">
      <view><banner :data="dData.data"></banner></view>
      <template v-if="notebookList.length !== 0">
        <card title="为你推荐"></card>
        <shop :scrollList="notebookList" img_name="https://gdp.alicdn.com/imgextra/i1/2210728322855/O1CN016rFzKZ1WxdZYGxdsB_!!2210728322855.jpg"></shop>
        <shop :scrollList="phoneList" img_name="//gdp.alicdn.com/imgextra/i2/1114511827/O1CN01ujdP0S1PMoPvy9IXz_!!1114511827.jpg"></shop>
      </template>
      <view class>
        <!-- 卡片组件 -->
        <card title="猜你喜欢"></card>
        <u-loadmore v-if="commodityList.length == 0" :line="true" status="loading" loading-text="加载中..." />
        <template v-if="commodityList.length !== 0">
          <!-- 商品列表 -->
          <view class="waterfall-container"><commodityList :commodityList="commodityList" :itemWH="{ width: '300rpx', height: '340rpx' }"></commodityList></view>
          <u-loadmore :line="true" :status="status" loading-text="努力加载中" nomore-text="实在没有了" />
        </template>
      </view>
    </template>
  </view>
</template>

<script>
import { getThreeList } from '@/api/homeAPI.js';
import { getList } from '@/utils/get_list.js';
export default {
  props: {
    dData: {
      type: Object
    }
  },
  data() {
    return {
      notebookList: [],
      phoneList: [],
      page: 0,
      total: 0,
      status: 'loading',
      commodityList: []
    };
  },
  async mounted() {
    uni.$on('reqData5', tabsID => {
      getList(this, tabsID);
    });
    const { data: res } = await getThreeList(5, '电脑');
    this.notebookList = res;
    const { data: phoneRes } = await getThreeList(5, '荣耀');
    this.phoneList = phoneRes;
    this.$nextTick(() => uni.$emit('loadSwiper'));
  }
};
</script>

<style lang="scss"></style>
