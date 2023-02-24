<template>
  <view class="sign-box">
    <view class="app-img"><image src="../../static/img/app.webp" mode=""></image></view>
    <view class="sign-input-box">
      <view class="example">
        <!-- 基础表单校验 -->
        <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
          <uni-forms-item label="电话" name="phone" required ref="inputPhone">
            <uni-easyinput placeholder="请输入电话号码" v-model="valiFormData.phone" @blur="e => $refs.inputPhone.onFieldChange(e.detail.value)" />
          </uni-forms-item>
          <uni-forms-item label="密码" name="password" required ref="inputPassword">
            <uni-easyinput
              placeholder="请输入以字母开头，长度在6~18之间"
              type="password"
              v-model="valiFormData.password"
              @blur="e => $refs.inputPassword.onFieldChange(e.detail.value)"
            />
          </uni-forms-item>
          <view class="verificationCode">
            <uni-forms-item label="验证码" name="verificationCode" required ref="inputCode">
              <uni-easyinput placeholder="请输入验证码" v-model="valiFormData.verificationCode" @blur="codeFn" />
            </uni-forms-item>
            <view class="code-img" @click="upDateCode"><image :src="CodeImg" mode=""></image></view>
          </view>
        </uni-forms>
        <button type="primary" @click="submit('valiForm')">登录</button>
        <view class="agreement">
          <u-icon name="error-circle-fill" color="#ffd66a"></u-icon>
          <view class="">未注册的号码登录将自动注册</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { verificationCode, loginApi } from '@/api/loginAPI.js';
import { mapMutations } from 'vuex';
export default {
  name: 'app-login',
  data() {
    return {
      CodeImg: 'http://192.168.132.189:3000/login/captchapng',
      valiFormData: {
        phone: null,
        password: '',
        verificationCode: ''
      },
      rules: {
        phone: {
          rules: [
            {
              required: true,
              errorMessage: '电话不能为空'
            },
            {
              pattern: '^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$',
              errorMessage: '只能输入电话号码'
            }
          ]
        },

        password: {
          rules: [
            {
              required: true,
              errorMessage: '只能以字母开头，长度在6~18之间'
            },
            {
              pattern: '^[a-zA-Z]\\w{5,17}$',
              errorMessage: '只能以字母开头，长度在6~18之间'
            }
          ]
        },

        verificationCode: {
          rules: [
            {
              required: true,
              errorMessage: '验证码错误'
            }
          ]
        }
      },
      verification: true
    };
  },

  methods: {
    ...mapMutations(['updateToken']),
    //更新验证码
    upDateCode() {
      let timer = new Date().getTime();
      this.CodeImg += `?timer=${timer}`;
    },
    // 验证表单
    submit(ref) {
      this.$refs[ref]
        .validate()
        .then(async res => {
          if (this.verification) {
            const { data: res1 } = await loginApi(res.phone, res.password);

            //登录失败与成功
            if (res1.ok == 0) {
              uni.$showMsg(res1.errMessage);
            } else {
              uni.$showMsg(res1.message);
              this.updateToken();
            }
          }
        })
        // 验证表单失败
        .catch(err => {
          console.log('err', err);
        });
    },

    //验证验证码
    async codeFn(e) {
      this.$refs.inputCode.onFieldChange(e.detail.value);
      const { data: res } = await verificationCode(this.valiFormData.verificationCode);

      if (res.ok == 1) {
        this.verification = true;
      } else {
        uni.$showMsg('验证错误！');
        this.valiFormData.verificationCode = '';
        this.upDateCode();
        this.verification = false;
      }
      // console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .is-input-border {
  border: 0;
  border-bottom: 1px solid #f0f0f0 !important;
}

.verificationCode {
  display: flex;
  .code-img {
    width: 160rpx;
    height: 80rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }
}

.agreement {
  display: flex;
  font-size: 24rpx;
  color: #9999b5;
}

.sign-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 900rpx;
  margin: 200rpx auto;

  .app-img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .sign-input-box {
    padding-top: 50rpx;
    margin: 0 auto;
    width: 80%;
    flex: 1;

    .input {
      margin-top: 20rpx;
      display: flex;

      view:nth-child(1) {
        width: 120rpx;
        text-align: center;
        line-height: 80rpx;
      }
    }
  }
}
</style>
