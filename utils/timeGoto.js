const showTips = (n) => {
  uni.showToast({
    icon: 'none',
    title: `请登录再进行操作！${n}秒后跳转至登录页`,
    mask: true,
    duration: 1100
  });
}

export const delayNavigate = () => {
  clearInterval(time);
  let seconds = 3
  let time = null
  showTips(seconds);
  time = setInterval(() => {
    seconds--;
    showTips(seconds);
    if (seconds <= 0) {
      clearInterval(time)

      setTimeout(() => {
        uni.switchTab({
          url: '/pages/my/my'
        });
      },1000)
    }
  }, 1000);
}
