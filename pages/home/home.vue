<template>
  <view>
    <view class="head">
      <!-- #ifdef MP-WEIXIN -->
      <view class="search">
        <navigator animation-type="fade-in" url="../../subpkg/search/search"><uni-search-bar :radius="100" placeholder="搜索" readonly></uni-search-bar></navigator>
      </view>
      <!-- #endif -->
      <u-sticky bgColor="#fff">
        <u-tabs
          @click="switchTabs"
          :list="topBar"
          :current="current"
          :duration="200"
          :activeStyle="{ color: '#3c9cff', fontWeight: 'bold', transform: 'scale(1.05)' }"
          :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
          }"
        ></u-tabs>
      </u-sticky>
    </view>
    <swiper :style="'height:' + swiperHeight + 'px;'" :current="current" @change="swiperChange" :duration="150">
      <swiper-item>
        <view class="swiper-item0"><recommend :rData="screenData(data, 0)"></recommend></view>
      </swiper-item>
      <swiper-item>
        <template>
          <view class="swiper-item1"><motion v-if="screenData(data, 1)" :mData="screenData(data, 1)"></motion></view>
        </template>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item2"><underwear v-if="screenData(data, 2)" :uData="screenData(data, 2)"></underwear></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item3"><makeup v-if="screenData(data, 3)" :mData="screenData(data, 3)"></makeup></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item4"><boots v-if="screenData(data, 4)" :bData="screenData(data, 4)"></boots></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item5"><digital v-if="screenData(data, 5)" :dData="screenData(data, 5)"></digital></view>
      </swiper-item>
    </swiper>
    <view @click="backTop"><u-back-top :scroll-top="scrollTop" duration="500" bottom="50" icon="arrow-up" z-index="99999"></u-back-top></view>
    <!-- 加载动画 -->
    <loader-view v-if="loaderShow"></loader-view>
  </view>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getTabs, getTabsData } from '@/api/homeAPI.js';
import Recommend from './itemPage/recommend/recommend.vue';
import Motion from './itemPage/motion/motion.vue';
import Underwear from './itemPage/underwear/underwear.vue';
import Makeup from './itemPage/makeup/makeup.vue';
import Boots from './itemPage/boots/boots.vue';
import Digital from './itemPage/digital/digital.vue';
export default {
  components: {
    Recommend,
    Motion,
    Underwear,
    Makeup,
    Boots,
    Digital
  },

  computed: {
    ...mapState({
      data: state => state.homeStore.tabsData,
      loaderShow: state => state.homeStore.loaderShow
    })
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  data() {
    return {
      componentActive: 'recommend',
      swiperHeight: 0,
      current: 0,
      scrollTop: 0,
      topBar: [],
      loadState: false
    };
  },

  async onLoad() {
    //请求tabs
    const { data: res } = await getTabs();
    this.topBar = res.data;
    // 请求tabs的数据
    this.reqTabsData(this.current).then(() => {
      setTimeout(() => this.getSwiperHeight(this.current), 300);
    });
  },

  mounted() {
    // // 重置高度
    // this.getSwiperHeight(this.current);
    // 数据加载完毕
    uni.$on('loadSwiper', () => {
      this.loadState = false;
      this.getSwiperHeight(this.current);
    });
  },

  onNavigationBarButtonTap(e) {
    if (e.index == 0) {
      uni.navigateTo({
        url: '../../subpkg/search/search'
      });
    }
  },
  onReachBottom() {
    //实现节流
    if (this.loadState) return;
    this.loadState = true;
    uni.$emit(`reqData${this.current}`, this.current);
  },

  methods: {
    ...mapActions(['reqTabsData']),

    backTop() {
      // #ifndef MP-WEIXIN
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 200
      });
      // #endif
    },

    screenData(data, id) {
      if (data.length == 0) return;
      let newData = data.filter(item => item.id == id)[0];
      return newData;
    },

    switchTabs(e) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.current = e.index;
    },

    swiperChange(e) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.current = e.detail.current;

      // 请求tabs的数据
      this.reqTabsData(this.current).then(() => {
        this.$nextTick(() => this.getSwiperHeight(this.current), 200);
      });
    },

    getSwiperHeight(index) {
      let view = uni.createSelectorQuery().in(this);
      view
        .select(`.swiper-item${index}`)
        .boundingClientRect(data => {
          this.swiperHeight = data.height;
        })
        .exec();
    }
  }
};
</script>

<style lang="scss">
.uni-searchbar {
  background-color: #fff !important;
}

.head {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
