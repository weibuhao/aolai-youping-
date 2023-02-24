<template>
  <view>
    <template v-if="goodsDetails">
      <view class="detail-container">
        <swiper :indicator-dots="true" :autoplay="true" circular :interval="3000" :duration="1000" indicator-active-color="#b2b2b2" indicator-color="#efefef">
          <swiper-item v-for="(item, index) in goodsDetailList" :key="index">
            <view class="swiper-item"><image :src="item" @click="preview(index)" mode="widthFix"></image></view>
          </swiper-item>
        </swiper>
        <view class="goods-detail-box">
          <view class="goods-price">
            <text>￥{{ priceToFixed(goodsDetails.price) }}</text>
            <text>￥{{ priceToFixed(Math.ceil(goodsDetails.price / (goodsDetails.discount / 10))) }}</text>
          </view>
          <view class="goods-title-box">
            <view class="goods-title-tiem">{{ goodsDetails.name }}</view>
            <view class="goods-Collection" @click="starShow = !starShow">
              <view class="goods-Collection-icon">
                <u-icon name="star" size="24" v-if="starShow"></u-icon>
                <u-icon name="star-fill" color="#fad44e" size="24" v-else></u-icon>
              </view>
              <view class="goods-Collection-word">收藏</view>
            </view>
          </view>
          <text class="goods-express">快递：免运费</text>
        </view>
        <image class="img_explain" src="https://gw.alicdn.com/tfs/TB1d0h2qVYqK1RjSZLeXXbXppXa-1125-960.png?getAvatar=avatar" mode="widthFix"></image>
      </view>
      <view class="goods-carts"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
    </template>
  </view>
</template>

<script>
import { getGoodsDetails } from '@/api/searchAPI.js';
import { delayNavigate } from '@/utils/timeGoto.js';
import { mapActions, mapGetters } from 'vuex';
import { getToken } from '@/utils/getToken.js';
export default {
  computed: {
    ...mapGetters(['cartCount'])
  },
  data() {
    return {
      viewHeight: 0,
      starShow: true,
      goods_id: 0,
      tabs_id: '',
      options: [
        {
          icon: 'headphones',
          text: '客服'
        },
        {
          icon: 'shop',
          text: '店铺'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
          color: '#fff'
        }
      ],
      goodsDetailList: [],
      goodsDetails:null
    };
  },
  async onLoad(options) {
    //获取购物车数据
    if (getToken()) {
      this.reqCartData().then(() => (this.options[2].info = this.cartCount));
    }

    this.goods_id = options.goods_id;
    if (options.tabs_id) this.tabs_id = options.tabs_id;
    // 请求商品详情
    const { data: res } = await getGoodsDetails(this.goods_id, this.tabs_id);
    this.goodsDetails = res;
    // 添加uni图片预览
    this.goodsDetailList.push(this.goodsDetails.img);
  },
  methods: {
    ...mapActions(['reqCartData', 'reqAddCart']),
    //左边模块的按钮
    onClick(e) {
      if (e.index !== 2) {
        uni.showToast({
          title: `该功能还未开发`,
          icon: 'none'
        });
      } else {
        this.gotoCart();
      }
    },

    //右边模块的按钮
    buttonClick(e) {
      if(!getToken()) return delayNavigate();
      if (e.index == 0) {
        this.reqAddCart(this.goodsDetails).then(() => {
          uni.$showMsg('加入购物车', 'success');
          setTimeout(() => (this.options[2].info = this.cartCount), 200);
        });
      }else{
        let data =JSON.stringify(this.goodsDetails)
        uni.navigateTo({
          url:`/subpkg/order_details/order_details?goodsDetails=${data}`
        })
      }
    },

    //点击轮播图调用uni的方法全屏显示图片
    preview(index) {
      uni.previewImage({
        current: index,
        urls: this.goodsDetailList
      });
    },

    // 给价格添加两个零
    priceToFixed(val) {
      if (!val) return;
      return val.toFixed(2);
    },

    // 跳转购物车
    gotoCart() {
      if (getToken()) {
        uni.switchTab({
          url: '/pages/cart/cart'
        });
      } else {
        delayNavigate();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.example-body {
  padding: 0;
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
}

.goods-carts {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  /* #ifdef H5 */
  left: var(--window-left);
  right: var(--window-right);
  /* #endif */
  bottom: 0;
}

.img_explain {
  width: 100%;
  height: 100%;
}
.detail-container {
  padding-bottom: 80rpx;
}

swiper {
  height: 700rpx;

  swiper-item {
    .swiper-item {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.goods-detail-box {
  padding: 20rpx;
  background-color: #fff;

  .goods-price {
    text:nth-child(1) {
      margin-right: 20rpx;
      font-size: 40rpx;
      color: #fc4443;
    }

    text:nth-child(2) {
      text-decoration: line-through;
      font-size: 20rpx;
      color: #b2b2b2;
    }
  }

  .goods-title-box {
    margin: 20rpx 0;
    display: flex;

    .goods-title-tiem {
      border-right: 1px solid #efefef;
      font-size: 24rpx;
    }

    .goods-Collection {
      width: 200rpx;
      height: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #b2b2b2;

      .goods-Collection-word {
        font-size: 22rpx;
      }
    }
  }

  .goods-express {
    font-size: 20rpx;
    color: #b2b2b2;
  }
}
</style>
