<template>
  <view>
        <template v-if="rData">
          <!-- 轮播图 -->
          <view class="swiper-box"><swiper-component :swiperList="getSwiperList(rData.data.swiper)"></swiper-component></view>
          <view class="recommend-item">
            <!-- 商品大图 -->
            <view class="recommend-item-img-box" v-for="item in rData.data.img_list" :key="item.id">
              <view class="max-img-box"><image :src="item.big_img" class="max-img" mode=""></image></view>
              <view class="min-img-box">
                <view class="min-img-item" v-for="val in item.small_img" :key="val.goods_id"><image :src="val.small_img" mode=""></image></view>
              </view>
            </view>
            <!-- 卡片组件 -->
            <card title="猜你喜欢"></card>
            <u-loadmore v-if="commodityList.length == 0" :line="true" status="loading" loading-text="加载中..." />
            <template v-if="commodityList.length !== 0">
              <!-- 商品列表 -->
              <view class="waterfall-container"><commodityList :commodityList="commodityList"></commodityList></view>
              <u-loadmore :line="true" :status="status" loading-text="努力加载中" nomore-text="实在没有了" />
            </template>
          </view>
        </template>
  </view>
</template>

<script>
import { mapState } from 'vuex';
import { getGoodsList } from '@/api/homeAPI.js';
import { getList } from '@/utils/get_list.js';
export default {
  name: 'recommend',
  computed: {
    ...mapState({
      data: state => state.homeStore.tabsData
    })
  },
  props: {
    rData: {
      type: Object
    }
  },

  mounted() {
    uni.$on('reqData0', tabsID => {
      getList(this, tabsID);
    });
  },

  data() {
    return {
      page: 0,
      total: 0,
      status: 'loading',
      commodityList: []
    };
  },
  // onReady() {
  //   uni.$on('reqData0', tabsID => {
  //     // this.page++;
  //     // if (this.commodityList.length !== 0 && Math.ceil(this.total / 4) < this.page) return;
  //     // this.status = 'loading';
  //     // const { data: res } = await getGoodsList(tabsID, this.page);
  //     // this.commodityList.push(...res.data);
  //     // this.total = res.total;
  //     // this.$nextTick(() => uni.$emit('loadSwiper'));
  //     // this.status = 'nomore';
  //     // getList(this, tabsID);
  //   });
  // },

  methods: {
    getSwiperList(val) {
      let swiperList = [];
      val.forEach(item => {
        swiperList.push(item.img_name);
      });
      return swiperList;
    },
      
  },
};
</script>

<style lang="scss" scoped>

.recommend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 20rpx;
  background-color: #fff;

  .recommend-item-img-box {
    margin-bottom: 30rpx;

    .max-img-box {
      border-radius: 20rpx 20rpx 0 0;
      overflow: hidden;

      .max-img {
        width: 650rpx;
        height: 300rpx;
        vertical-align: bottom;
      }
    }

    .min-img-box {
      overflow: hidden;
      display: flex;
      border-top: 0rpx !important;
      border: 1px solid #dee1e6;
      border-radius: 0 0 20rpx 20rpx;

      .min-img-item {
        width: 33.33%;

        image {
          width: 100%;
          height: 220rpx;
        }
      }
    }
  }
}
</style>
