<template>
  <view>
    <my-login v-if="!tokenState"></my-login>
    <my-user v-else></my-user>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState({
      tokenState: state => JSON.parse(state.userStore.tokenState)
    })
  },
  data() {
    return {};
  },

  methods: {
    ...mapMutations(['updateToken'])
  },
  mounted() {
    uni.$on('updateToken', () => {
      this.updateToken();
    });
  }
};
</script>

<style lang="scss" scoped></style>
