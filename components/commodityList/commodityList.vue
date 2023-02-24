<template>
  <view class="commodity-list">
    <view class="commodity-item" v-for="(item, index) in commodityList" :key="item.goods_id">
      <Commodity :commodity="item" :itemWH="itemWH" @click.native="gotoGoodsDetails(item)"></Commodity>
    </view>
  </view>
</template>

<script>
import Commodity from '../commodity/commodity.vue';
export default {
  name: 'commodityList',
  props: {
    commodityList: {
      type: Array,
      required: true
    },
    itemWH: {
      type: Object,

      default() {
        return {
          width: '300rpx',
          height: '420rpx'
        };
      }
    }
  },
  components: {
    Commodity
  },

  data() {
    return {};
  },

  methods: {
    gotoGoodsDetails(val) {
      uni.navigateTo({
        url:`../../subpkg/goods_details/goods_details?goods_id=${val.goods_id}&tabs_id=${val.tabs_id}`
      })
    }
  }
};
</script>

<style lang="scss">
.commodity-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
