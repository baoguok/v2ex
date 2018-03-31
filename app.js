//app.js
var { html2json } = require('./utils/html2json.js');
var { password, account } = require('./config/accountInfo.js');
var { isLogined } = require('./utils/loginUtil.js');

App({
  onLaunch: function () {
    const that = this;
    if (isLogined())  {
      // 跳转到首页页
      wx.redirectTo({
        url: '/pages/index/index',
      });
    } else {
      
      // 跳转到登录页
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
  },

  onShow: () => {
    if (isLogined()) {
      // 跳转到首页页
      wx.redirectTo({
        url: '/pages/index/index',
      });
    }
  },

  

  globalData: {
    userInfo: null 
  }
})