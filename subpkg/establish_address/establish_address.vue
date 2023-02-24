<template>
  <view>
    <view class="establish_address-list">
      <view class="example">
        <!-- 地址表单 -->
        <uni-forms ref="baseForm" :modelValue="baseFormData" :rules="rules">
          <!-- 地址联系人 -->
          <uni-forms-item label="姓名" name="name" required ref="inputName">
            <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" @blur="e => $refs.inputName.onFieldChange(e.detail.value)" />
          </uni-forms-item>

          <!-- 地址联系号码 -->
          <uni-forms-item label="手机" name="phone" ref="inputPhone" required>
            <uni-easyinput type="number" v-model="baseFormData.phone" placeholder="请输入手机" @blur="e => $refs.inputPhone.onFieldChange(e.detail.value)" />
          </uni-forms-item>

          <!-- 地址地区 -->
          <uni-forms-item label="地址" name="area" required>
            <uni-data-picker :localdata="dataTree" :clear-icon="false" v-model="area" placeholder="请选择" popup-title="请选择所在地区" @change="onchange"></uni-data-picker>
          </uni-forms-item>

          <!-- 地址详情 -->
          <uni-forms-item label="详细地址" name="detailsAddress" ref="inputAddress" required>
            <uni-easyinput v-model="baseFormData.detailsAddress" placeholder="请输入详细地址" @blur="e => $refs.inputAddress.onFieldChange(e.detail.value)" />
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>

    <!-- 地址类型标签 -->
    <view class="label-box">
      <view class="label-item-container">
        <view class="label-word">标签</view>
        <view class="label-item-box">
          <view :class="['label-item', index === current ? 'current' : '']" v-for="(item, index) in addressType" :key="index" @click="currentFn(index)">{{ item }}</view>
        </view>
      </view>

      <!-- 地址默认状态 -->
      <view class="set-default-address">
        <view class="set-word-box">
          <view class="set-word-item">设置默认地址</view>
          <view class="tips-word">提示：下单优先使用该地址</view>
        </view>
        <view class="set-default-icon"><u-switch v-model="addressState" size="20"></u-switch></view>
      </view>
    </view>

    <!-- 地址保存 -->
    <view class="goods-carts"><uni-goods-nav :options="[]" :fill="true" :button-group="buttonGroup" @buttonClick="saveAddress('baseForm')" /></view>
  </view>
</template>

<script>
import { mapActions } from 'vuex';
// 地区
import area from '@/utils/area.js';
export default {
  data() {
    return {
      area: ['1'],
      // 地区
      dataTree: area.addressarea,
      buttonGroup: [
        {
          text: '保存',
          backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
          color: '#fff'
        }
      ],
      // 验证规则
      rules: {
        //联系人验证规则
        name: {
          rules: [
            {
              required: true,
              errorMessage: '联系人不能为空'
            }
          ]
        },
        //联系人号码验证规则
        phone: {
          rules: [
            {
              required: true,
              errorMessage: '联系电话不能为空'
            },
            {
              pattern: '^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$',
              errorMessage: '只能输入电话号码'
            }
          ]
        },
        //地址验证规则
        detailsAddress: {
          rules: [
            {
              required: true,
              errorMessage: '地址不能为空'
            }
          ]
        }
      },
      // 表单验证绑定
      baseFormData: { name: '', phone: null, addressArea: '', detailsAddress: '' },
      addressType: ['家', '公司', '学校'],
      current: 0,
      addressID: null,
      // 默认地址状态
      addressState: true
    };
  },
  onLoad(options) {
    //传值更改地址
    if (!options.address) return;
    let { id, consignee, contactCode, addressType, addressDetailed, addressArea, addressState } = JSON.parse(options.address);
    // 修改地址的id
    this.addressID = id;
    // 地区码
    this.area = JSON.parse(addressArea).areaValue;
    // 地区名称
    this.baseFormData.addressArea = JSON.parse(addressArea).areatext;
    // 联系人
    this.baseFormData.name = consignee;
    // 联系人号码
    this.baseFormData.phone = contactCode - 0;
    //详细地址
    this.baseFormData.detailsAddress = addressDetailed;
    //地址类型
    this.currentFn(addressType);
    //地址默认状态
    this.addressState = addressState;
  },
  methods: {
    ...mapActions(['reqSaveAddress', 'judgeAddressState']),
    saveAddress(ref) {
      this.$refs[ref]
        .validate()
        .then(async res => {
          if (!this.baseFormData.addressArea) return uni.$showMsg('您的地址还是空的哦');
          let addressInfo = {
            id: this.addressID,
            // 联系人
            consignee: res.name,
            // 联系号码
            contactCode: res.phone + '',
            // 地址类型
            addressType: this.current,
            // 详细地址
            addressDetailed: res.detailsAddress,
            // 地址地区
            addressArea: JSON.stringify({
              areatext: this.baseFormData.addressArea,
              areaValue: this.area
            }),
            // 是否默认地址
            addressState: this.addressState
          };
          // 发起请求
          const result = await this.reqSaveAddress(addressInfo);
          // 请求成功
          if (result.ok == 1) {
            uni.navigateBack({
              success() {
                uni.$showMsg('保存成功');
              }
            });
            // 请求失败
          } else {
            uni.$showMsg(result.errMessage);
          }
        })
        // 校验失败
        .catch(err => {
          console.log('err', err);
        });
    },

    // 地区地址
    onchange(e) {
      this.area = [];
      this.baseFormData.addressArea = '';
      e.detail.value.forEach(item => {
        this.baseFormData.addressArea += item.text;
        this.area.push(item.value);
      });
    },

    // 地址类型
    currentFn(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="scss" scoped>
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

.example {
  padding: 20rpx;
  background-color: #fff;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}

.van-picker {
  border-radius: 20rpx 20rpx 0;
}

.current {
  background-color: #2a79ff;
  color: #fff;
  animation: jelly 0.6s ease;
}

.van-field__label {
  font-size: 24rpx;
  font-weight: 700;
}

.establish_address-list {
  margin: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;

  .detailed-address-box {
    display: flex;
    height: 50px;

    .detailed-address {
      flex: 3;
    }

    .tips {
      flex: 5;
    }

    .detailed-address-icon {
      flex: 1;
    }
  }
}

.label-box {
  margin: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 15rpx;

  .label-item-container {
    display: flex;
    // margin-bottom: 15rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px solid #efefef;

    .label-word {
      width: 150rpx;
      font-size: 26rpx;
      font-weight: 700;
    }

    .label-item-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label-item {
        text-align: center;
        margin: 0 20rpx;
        width: 60rpx;
        padding: 8rpx 15rpx;
        font-size: 26rpx;
        border-radius: 100rpx;
        border: 1px solid #efefef;
      }
    }
  }

  .set-default-address {
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    margin: 20rpx 0;

    .set-word-box {
      font-size: 26rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .tips-word {
        font-size: 24rpx;
        color: #c3c3c3;
      }
    }
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
