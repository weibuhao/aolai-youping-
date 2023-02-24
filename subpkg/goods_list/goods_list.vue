<template>
  <view>
    <view class="head">
      <view class="Back" @click="backFn"><uni-search-bar placeholder="请输入搜索关键词" readonly :value="searchValue"></uni-search-bar></view>
      <view class="filter-box">
        <view class="filter-item" :class="{ active: state == 0 ? 'active' : '' }" @click="chengnSynthesize"><view class="word">综合</view></view>
        <view class="filter-item" :class="{ active: state == 1 ? 'active' : '' }" @click="chengnPrice">
          <view class="word">价格</view>
          <view class="icon">
            <u-icon name="arrow-up" size="14" :color="state == 1 && pricColor ? '#3b9cff' : '#99939f'"></u-icon>
            <u-icon name="arrow-down" size="14" :color="state == 1 && pricColor == false ? '#3b9cff' : '#99939f'"></u-icon>
          </view>
        </view>
        <view class="filter-item" :class="{ active: state == 2 ? 'active' : '' }" @click="chengnDiscount">
          <view class="word">折扣</view>
          <view class="icon">
            <u-icon name="arrow-up" size="14" :color="state == 2 && discountColor ? '#3b9cff' : '#99939f'"></u-icon>
            <u-icon name="arrow-down" size="14" :color="state == 2 && discountColor == false ? '#3b9cff' : '#99939f'"></u-icon>
          </view>
        </view>
      </view>
    </view>

   <view v-if="!searchShow">
     <view v-for="item in goodsList" :key="item.goods_id"><goodsItem :data="item" @click.native="gotoGoodsDetail(item.goods_id)"></goodsItem></view>
     <u-loadmore :line="true" :status="status" loading-text="努力加载中" nomore-text="实在没有了" />
   </view>
    <template v-else>
     <u-empty
             mode="search"
             marginTop="60"
     >
     </u-empty>
    </template>
  </view>
</template>

<script>
import { getSearchGoodsList } from '@/api/searchAPI.js';
export default {
  data() {
    return {
      state: 0,
      synthesize: true,
      pricColor: false,
      discountColor: false,
      searchValue: '',
      page: 0,
      goodsList: [],
      status: 'loading',
      searchShow:false
    };
  },
  async onLoad(option) {
    this.searchValue = option.query;
    this.page++;
     this.reqGoodsList(this.searchValue, this.page).then((res)=>{
       if(res.length==0) return this.searchShow=true
      this.goodsList=res
    })
  },

  methods: {
    
      
    gotoGoodsDetail(id){
      uni.navigateTo({
        url:`../goods_details/goods_details?goods_id=${id}`
      })
    },
    
    async reqGoodsList(name, page, condition = '') {
      this.status= 'loading'
      const { data: res } = await getSearchGoodsList(name, page, condition);
      this.total = res.total;
      if (Math.ceil(this.total / 8) <= page) {
         (this.status = 'nomore');
      }
      return res.data;
    },

    async chengnSynthesize() {
      if (this.state == 0) return;
      this.page = 1;
      this.goodsList=[]
      this.discountColor = this.pricColor = false;
      this.state = 0;
      this.goodsList = await this.reqGoodsList(this.searchValue, this.page);
    },

    chengnPrice() {
      this.page = 1;
      this.goodsList=[]
      this.state = 1;
      this.pricColor = !this.pricColor;
      this.discountColor = false;

      if (this.pricColor) {
        this.reqGoodsList(this.searchValue, this.page, { factor: 'price' }).then(res => (this.goodsList = res));
      } else {
        this.reqGoodsList(this.searchValue, this.page, { factor: 'price', sort: 'desc' }).then(res => (this.goodsList = res));
      }
    },

    async chengnDiscount() {
      this.page = 1;
      this.goodsList=[]
      this.state = 2;
      this.pricColor = false;
      this.discountColor = !this.discountColor;

      if (this.discountColor) {
        this.goodsList = await this.reqGoodsList(this.searchValue, this.page, { factor: 'discount' });
      } else {
        this.goodsList = await this.reqGoodsList(this.searchValue, this.page, { factor: 'discount', sort: 'desc' });
      }
    },

    backFn() {
      uni.navigateBack({
        animationType: 'fade-out'
      });
    }
  },
  onReachBottom() {
    this.page++;
    switch (this.state) {
      case 0:
        {
          this.reqGoodsList(this.searchValue, this.page).then(res => this.goodsList.push(...res));
        }
        break;

      case 1:
        {
          if (this.pricColor) {
            this.reqGoodsList(this.searchValue, this.page, { factor: 'price' }).then(res => this.goodsList.push(...res));
          } else {
            this.reqGoodsList(this.searchValue, this.page, { factor: 'price', sort: 'desc' }).then(res => this.goodsList.push(...res));
          }
        }
        break;

      case 2:
        {
          if (this.discountColor) {
            this.reqGoodsList(this.searchValue, this.page, { factor: 'discount' }).then(res => this.goodsList.push(...res));
          } else {
            this.reqGoodsList(this.searchValue, this.page, { factor: 'discount', sort: 'desc' }).then(res => this.goodsList.push(...res));
          }
        }
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: #ffff;
}
.active {
  color: #3b9cff;
}
.filter-box {
  border-bottom: #e5e5e5 solid 1px;
  height: 80rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .filter-item {
    height: 50rpx;
    line-height: 50rpx;
    display: flex;
    font-size: 28rpx;

    .icon {
      margin: 0 10rpx;
    }
  }
}
</style>
