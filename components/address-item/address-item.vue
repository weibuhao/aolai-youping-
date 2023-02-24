<template>
  <view>
    <view>
      <!-- 地址列表 -->
      <u-swipe-action>
        <u-swipe-action-item :options="options" @click="deleteFn(address)">
          <view class="address-item">
            <view class="address-item-left" @click="addressDefault(address)">
              <!-- 默认地址 -->
              <view class="address-item-change" :class="{ animation: address.addressState }">
                <!-- @change="allChoice" -->
                <label class="radio"><radio :checked="address.addressState" /></label>
              </view>
              <view class="address-info">
                <!-- 地址地区 -->
                <view class="address-province">{{ areaFn(address.addressArea) }}</view>
                <!-- 地址详情 -->
                <view class="address-details">{{ address.addressDetailed }}</view>
                <view class="address-contact">
                  <!-- 联系人 -->
                  <text>{{ address.consignee }}</text>
                  <!-- 联系人号码 -->
                  <text>{{ geTel(`${address.contactCode}`) }}</text>
                </view>
              </view>
            </view>
            <!-- 更改地址 -->
            <view class="address-icon" @click="changeAddress(address)"><u-icon name="edit-pen" size="24"></u-icon></view>
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'address-item',
  props: ['address'],
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#ff0405'
          }
        }
      ],
      istrue: true
    };
  },

  methods: {
    ...mapActions(['reqUpAddressState','reqDeleteAddress']),

    //删除地址
    deleteFn(address) {
     this.reqDeleteAddress(address)
    },
    //地区函数
    areaFn(val) {
      let area = JSON.parse(val).areatext;
      return area;
    },
    //修改号码
    geTel(tel) {
      let reg = /^(\d{3})\d{4}(\d{4})$/;
      return tel.replace(reg, '$1****$2');
    },

    addressDefault(address) {
      if (address.addressState) return;
      this.reqUpAddressState(address.id);
    },

    changeAddress(val) {
     let address= JSON.stringify(val)
      uni.navigateTo({
        url: `/subpkg/establish_address/establish_address?address=${address}`
      });
    }
  }
};
</script>

<style lang="scss">
.animation {
  animation: jelly 0.6s ease;
}

.address-item {
  display: flex;
  justify-content: space-between;
  padding: 15rpx;
  border-bottom: 1rpx solid #efefef;
  align-items: center;
  .address-item-left {
    flex: 1;
    display: flex;
    align-items: center;
    .address-item-change {
      flex: 1;
      text-align: center;
    }

    .address-info {
      flex: 8;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .address-province {
        font-size: 24rpx;
        color: #9f9f9f;
      }

      .address-details {
        margin: 10rpx 0;
        font-weight: 700;
      }

      .address-contact {
        font-size: 24rpx;

        text {
          margin-right: 15rpx;
        }
        text:nth-child(2) {
          font-size: 22rpx;
          color: #9f9f9f;
        }
      }
    }
  }

  .address-icon {
    width: 100rpx;
    text-align: center;
    font-size: 40rpx;
  }
}

@keyframes jelly {
  from {
    transform: scale(1, 1);
  }

  30% {
    transform: scale(1.25, 0.75);
  }

  40% {
    transform: scale(0.75, 1.25);
  }

  50% {
    transform: scale(1.15, 0.85);
  }

  65% {
    transform: scale(0.95, 1.05);
  }

  75% {
    transform: scale(1.05, 0.95);
  }

  to {
    transform: scale(1, 1);
  }
}
</style>
