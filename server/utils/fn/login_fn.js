const {
  db,
  errMessage
} = require('../../db')

const JWT = require('../jwt')

//登录
const loginFn = (req, res, next) => {

  const {
    user,
    password
  } = req.body

  db.query('select * from  user where user=?', [user], async (err, result) => {
    errMessage(err)

    if (await result.length == 0) {

      db.query('insert into user (user, password) values (?,?)', [user, password], async (err_2,
        result_2) => {
        errMessage(err_2)

        if (await result_2) {
          const token = JWT.generate({user}, "1h")
          res.header('Authorization', token)
          return res.send({
            ok: 1,
            message: '注册成功'
          })
        }
      })

    } else {

      db.query('select * from user where user= ? and password= ?', [user, password], async (err_3,
        result_3) => {
        errMessage(err_3)
        if (await result_3.length == 0) {
          return res.send({
            ok: 0,
            errMessage: '账号或密码错误！'
          })

        } else {
          const token = JWT.generate({user}, "10h")
          res.header('Authorization', token)
          return res.send({
            ok: 1,
            message: '登录成功！'
          })
        }

      })
    }
  })
}

//验证码
const captchapngFn = (req, res) => {
  var captchapng = require("captchapng")
  var mynum = parseInt(Math.random() * 9000 + 1000);
  req.session.captcha = mynum;
  var p = new captchapng(80, 40, mynum); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
  var img = p.getBase64();
  var imgbase64 = new Buffer.from(img, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  res.end(imgbase64);
}

//验证码验证
const verificationFn = (req, res, next) => {
  const {
    code
  } = req.query
  if (code == req.session.captcha) {
    res.send({
      ok: 1
    })

  } else {
    res.send({
      ok: 0
    })
  }
}

module.exports = {
  loginFn,
  captchapngFn,
  verificationFn
}
