//验证码验证
export const verificationCode = (code) => {
  return uni.$http.get('/login/verification', {
    code
  })
}

//登录
export const loginApi = (user, password) => {
  return uni.$http.post('/login', {
    user,
    password
  })

}
