<template>
  <view>
    <template v-if="uData.data">
      <banner :data="uData.data"></banner>
      <view class="">
        <card title="热销爆品"></card>
        <u-loadmore v-if="threeList.length == 0" :line="true" status="loading" loading-text="加载中..." />
        <commodityList :commodityList="threeList" :itemWH="{ width: '230rpx', height: '230rpx' }"></commodityList>
      </view>
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
    </template>
  </view>
</template>

<script>
import { getThreeList } from '@/api/homeAPI.js';
import { mapState } from 'vuex';
import { getList } from '@/utils/get_list.js';
export default {
  props: {
    uData: {
      type: Object
    }
  },
  async mounted() {
    if (this.threeList !== 0) {
      const { data: res } = await getThreeList('2', '内衣女');
      this.threeList = res;
      this.$nextTick(() => uni.$emit('loadSwiper'));
    }
    uni.$on('reqData2', tabsID => {
      getList(this, tabsID);
    });
  },

  computed: {
    ...mapState({
      data: state => state.homeStore.tabsData[2]
    })
  },
  data() {
    return {
      threeList: [],
      page: 0,
      total: 0,
      status: 'loading',
      commodityList: []
    };
  }
};
</script>

<style lang="scss"></style>
