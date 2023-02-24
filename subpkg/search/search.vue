<template>
  <view>
    <template v-if="pageShow">
      <uni-search-bar placeholder="请输入搜索关键词" :focus="true" v-model="searchValue" @confirm="gotoGoodsList(searchValue)" @cancel="cancelFn"></uni-search-bar>
      <!-- @focus="goodsListShow = false" -->

      <view class="" v-if="!searchTipsShow">
        <!-- 搜索历史 -->
        <view class="search-record-box">
          <view class="search-record-itlte">
            <view class="search-itlte">搜索历史</view>
            <view class="icon-delete" v-if="!deleteState" @click="changeDelete()"><u-icon name="trash" size="24"></u-icon></view>
            <!-- <van-icon name="delete-o" class="icon-delete" /> -->
            <view class="delete-state" v-else>
              <view
                class="delete"
                @click="changeDelete()"
                :style="{ backgroundColor: searchHistory.length === 0 ? '#cfcfcf' : '#3b9cff', borderColor: searchHistory.length === 0 ? '#cfcfcf' : '#3b9cff' }"
              >
                全部删除
              </view>
              <view class="delete" @click="cancel()">确定</view>
            </view>
          </view>
          <text class="search_history_text" v-if="searchHistory.length == 0">还没有历史记录哦...</text>
          <view class="search-record">
            <view :class="['search-record-item', deleteState ? 'animation' : '']" @click="gotoGoodsList(item)" v-for="(item, index) in searchHistory" :key="index">
              <view class="delete-box" v-if="deleteState">x</view>
              <!-- 多加一个盒子为了让一行装不下出现省略号不剪切删除小图标（x） -->
              <view class="search-record-word">{{ item }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 搜索建议 -->
      <scroll-view class="search-tips-box" :style="{ height: wh - 54 + 'px' }" scroll-y v-else>
        <view class="search-tips-item" @click="gotoGoodsList(searchValue)" v-html="replaceKw(searchValue, searchValue)" v-if="!searchTipFn(searchTipList)"></view>
        <view class="search-tips-item" @click="gotoGoodsList(item)" v-for="(item, index) in searchTipList" :key="index" v-html="replaceKw(item, searchValue)"></view>
      </scroll-view>
      <u-modal :show="show" title="你真的要清空搜索历史吗" showCancelButton @confirm="cancelDelete" @cancel="show = !show"></u-modal>
    </template>
  </view>
</template>

<script>
import { getSearchTips, getSearchGoodsList } from '@/api/searchAPI.js';
export default {
  onShow() {
    this.pageShow = true;
  },
  onHide() {
    this.pageShow = false;
  },
  data() {
    return {
      searchTipList: [],
      searchHistory: [],
      pageShow: false,
      wh: '',
      searchValue: '',
      deleteState: false,
      show: false,
      searchTipsShow: false,
      itme: null
    };
  },

  onLoad() {
    const sysInfo = uni.getSystemInfoSync();
    this.wh = sysInfo.windowHeight;
    if (!uni.getStorageSync('history_key')) return;
    this.searchHistory = JSON.parse(uni.getStorageSync('history_key'));
  },

  methods: {
    // 获取数据
    async getSearchTipList() {
      const { data: res } = await getSearchTips(this.searchValue);
      this.searchTipList = res;
    },

    //搜索提示格式化
    searchTipFn(val) {
      if (val.length !== 0) {
        return val.some(item => item == this.searchValue);
      } else {
        return false;
      }
    },
    // 跳转搜索商品列表
    gotoGoodsList(query) {
      if (query == '') {
        this.cancelFn();
        uni.$showMsg('输入框不能为空！');

        return;
      }
      // 删除状态
      if (this.deleteState) {
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        uni.setStorageSync('history_key', JSON.stringify(this.searchHistory));
      } else {
        uni.navigateTo({
          url: `../goods_list/goods_list?query=${query}`,
          animationType: 'fade-in'
        });
        this.searchValue = query;
        this.searchTipsShow = false;
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        this.searchHistory.unshift(query);
        uni.setStorageSync('history_key', JSON.stringify(this.searchHistory));
      }
    },

    changeDelete() {
      if (this.deleteState && this.searchHistory.length !== 0) {
        this.show = true;
      } else {
        this.show = false;
      }
      this.deleteState = true;
    },

    // 清空历史记录
    cancelDelete() {
      uni.removeStorageSync('history_key');
      this.searchHistory = [];
      this.deleteState = false;
      this.show = false;
    },

    //弹出框的取消
    cancel() {
      this.deleteState = false;
      this.show = false;
    },

    //输入框的取消
    cancelFn() {
      this.searchTipsShow = false;
    },

    // 去掉输入框空格
    searchChange(e) {
      this.searchValue = e.detail.replace(/[, ]/g, '');
    },
    //输入框与搜索建议中相匹配的值标红
    replaceKw(originStr = this.searchValue, target) {
      const reg = RegExp(target, 'ig');
      return originStr.replace(reg, `<span style="color:red;">${target}</span>`);
    }
  },

  watch: {
    searchValue() {
      this.searchValue = this.searchValue.replace(/[, ]/g, '');
      if (this.searchValue == '') {
        this.searchTipsShow = false;
      } else {
        // 防抖效果
        this.searchTipList = [];
        clearTimeout(this.itme);
        this.searchTipsShow = true;
        this.itme = setTimeout(() => {
          this.getSearchTipList();
        }, 300);
      }
    }
  }
};
</script>

<style lang="scss">
.search_history_text {
  font-size: 24rpx;
  color: #cfcfcf;
}
.search-record-box {
  padding: 0 20rpx;

  .search-record-itlte {
    height: 60rpx;
    line-height: 60rpx;
    margin: 15rpx 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 5rpx solid #efefef;

    .search-itlte {
      font-size: 26rpx;
      color: #cfcfcf;
    }

    .icon-delete {
      font-size: 40rpx !important;
      margin-right: 20rpx;
    }

    .delete-state {
      display: flex;

      .delete {
        font-size: 24rpx;
        border: 1rpx solid #3b9cff;
        border-radius: 100rpx;
        background-color: #3b9cff;
        padding: 0 15rpx 0 15rpx;
        margin: 0 10rpx;
        color: #ffff;
      }
    }
  }

  .search-record {
    padding-top: 0;
    display: flex;
    flex-wrap: wrap;

    .search-record-item {
      max-width: 120rpx;
      text-align: center;
      border: 3rpx solid #cfcfcf;
      border-radius: 100rpx;
      font-size: 24rpx;
      padding: 10rpx 15rpx;
      margin: 10rpx;
      position: relative;

      .delete-box {
        text-align: center;
        line-height: 25rpx;
        display: block;
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        background-color: #cfcfcf;
      }

      .search-record-word {
        max-width: 130rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.search-tips-box {
  background-color: #ffff;
  display: flex;
  flex-direction: column;

  .search-tips-item {
    padding: 10rpx 30rpx;
    border-bottom: 1rpx solid #f9fafb;
    font-size: 24rpx;
  }
}

.animation {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}
</style>
