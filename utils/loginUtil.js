let { getCookie } = require('./cookie.js');

function isLogined () {
  return getCookie('A2') && getCookie('PB3_SESSION')
}

function ifNotLoginRedirect() {
  if (!isLogined()) {
    wx.redirectTo({
      url: '/pages/login/login',
    });
  }
}

module.exports = {
  isLogined,
  ifNotLoginRedirect
}