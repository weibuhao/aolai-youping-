export const userInfo = () => {
    return uni.$http.get('/user/info')
  }
