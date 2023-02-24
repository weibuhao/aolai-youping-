<template>
  <view>
    <view class="goods-container" :style="'width:'+itemWH.width+';'">
      <view class="goods-img-box">
        <image class="goods-img" :style="'height:'+itemWH.height+';'" :src="commodity.img" mode=""></image>
      </view>
      <view class="goods-details" :style="itemWH.width==='200rpx'?'font-size:24rpx':''">
        <view class="goods-title" :style="itemWH.width==='200rpx'?'font-size:24rpx':'display: -webkit-box;'">
          <text>{{commodity.name}}</text>
        </view>
        <view class="goods-price">
          <text class="price">￥{{commodity.price}}</text>
          <text class="oprice">￥{{Math.ceil(commodity.price/(commodity.discount/10))}}</text>
        </view>
        <view class="goods-discount">
          <text :style="itemWH.width==='200rpx'?'font-size:24rpx':''">{{commodity.discount}}折</text>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    name: "commodity",

    props: {
      commodity: {
        type: Object,
        required: true
      },

      itemWH: {
        type: Object,

        default () {
          return {
            width: '300rpx',
            height: '420rpx'
          }
        }
      }
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .goods-container {
    margin: 20rpx 0;
    // width: 230rpx;
    text-align: center;
    font-size: 26rpx;

    .goods-img-box {
      width: 100%;

      .goods-img {
        width: 100%;
        // height: 280rpx;
      }
    }

    .goods-details {
      
      padding: 0 15rpx;

      .goods-title {
        text-align: center;
        font-size: 26rpx;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
    }


    .goods-price {
      margin: 15rpx;

      text {
        margin: 8rpx;
      }

      .price {
        margin-bottom: 15rpx;
      }

      .oprice {
        margin: 0;
        font-size: 24rpx;
        color: #c5c5c5;
        text-decoration: line-through;
      }
    }

    .goods-discount {
      text {
        font-size: 26rpx;
        padding: 0 15rpx;
        color: #cf3340;
        border: 1rpx solid #cf3340;
        border-radius: 8rpx;
      }

    }
  }
</style>
