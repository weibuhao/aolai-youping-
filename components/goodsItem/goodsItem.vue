<template>
  <view>
    <view class="goods-order-box">
      <view class="goods-order-left">
        <image :src="data.img" mode="widthFix"></image>
      </view>
      <view class="goods-order-right">
        <view class="goods-order">
          <!-- {{goods.goods_name}} -->
         {{data.name}}
        </view>
        <view class="goods-price-box">
          <view class="goods-price">￥{{ (data.price-0).toFixed(2) }}</view>
        </view>
        <view class="discount-price-box">
          <view class="discount-price discount ">{{data.discount}}折</view>
          <view class="discount-price">官方自营</view> 
          <view class="comment">1000+条评论 好评率95%</view>
          <view class="discount-service">
            <text>支持7天无理由退货</text>
            <text>自营专享价</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'goodsItem',
  props:['data'],
  data() {
    return {
    };
  },
  
  created() {
    
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
    
  .discount{
    text-align: center;
    border-radius: 10rpx;
    width: 50rpx;
    color: #ffff !important;
    background-color: #fd4443;
  }
  
.comment {
  font-size: 20rpx;
  color: #9999a7;
}
.goods-order-box {
  margin: 20rpx 15rpx;
  display: flex;

  .goods-order-left {
    image {
      width: 250rpx;
      height: 250rpx;
      vertical-align: bottom;
    }
  }

  .goods-order-right {
    border-bottom: #e5e5e5 solid 1px;
    padding: 0 20rpx;
    .goods-order {
      width: 450rpx;
      font-size: 28rpx;
      ext-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
    }

    .goods-price-box {
      display: flex;
      margin: 10rpx 0 10rpx;
      height: 20px;
      align-items: center;
      // justify-content: space-between;

      .goods-price {
        font-weight: 700;
        color: #fd4443;
      }
    }

    .discount-price-box {
      .discount-price {
        font-size: 26rpx;
        color: #fd4443;
      }

      .discount-service {
        margin: 10rpx 0;
        font-size: 18rpx;

        text {
          margin-right: 10rpx;
          border: 1rpx solid #fd4443;
          padding: 0 5rpx;
          border-radius: 8rpx;
          color: #fd4443;
        }
      }
    }
  }
}
</style>
