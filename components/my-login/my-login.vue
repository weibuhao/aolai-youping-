<template>
  <view>
   <!-- #ifndef MP-WEIXIN -->
    <app-login></app-login>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <wx-login></wx-login>
    <!-- #endif -->
  </view>
</template>

<script>
import wxLogin from '../wx-login/wx-login.vue';
export default {
  name: 'my-login',
  components: {
    wxLogin
  },
  data() {
    return {};
  }
};
</script>

<style></style>
