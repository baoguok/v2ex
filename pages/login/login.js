// pages/login/login.js
let cookieUtil = require('../../utils/cookie.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capcha: '',
    formData: {
      account: '',
      password: '',
      capcha: '',
      once: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const that = this;
    let once = '';
    app.formData.forEach(data => {
      if (data.name === 'once') {
        once = data.value;
        this.setData({
          once
        });
      }
    });
    this.refreshCapcha();
  },

  /**
   * 刷新验证码图片
   */
  refreshCapcha() {
    const { getCookieString } = cookieUtil;
    const that = this;
    wx.downloadFile({
      url: `https://www.v2ex.com/_captcha?once=${this.data.once}`,
      header: {
        'cookie': getCookieString()
      },
      success: (res) => {
        console.log(res);
        if (res.statusCode === 200) {
          that.setData({
            capcha: res.tempFilePath
          }, () => {
            console.log(that.data.capcha);
          });
        }
      },
      fail: () => {
        console.log('下载验证码失败');
      }
    })
  },

 // 账号输入监听
 onAccountInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, {account: e.detail.value})
    });
  },

  // 密码输入监听
  onPasswordInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, { password: e.detail.value })
    });
  },

  // 验证码输入监听
  onCapchaInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, { capcha: e.detail.value })
    });
  },

  /**
   * 登录
   */
  login: function () {
    console.log(this.data.formData);
    console.log(getApp().formData);
    let params = {};
    let keys = getApp().formData;
    const { getCookieString } = cookieUtil;
    keys.forEach(key => {
      params[key.name] = key.name === key.type ? key.value : this.data.formData[key.type]
    });
    params = Object.assign(params, {next: '/'})
    wx.showLoading({
      title: '登录中...',
      mask: true
    });
    wx.request({
      url: 'http://v2ex.fedeveloper.cn/login',
      method: 'POST',
      header: {
        'cookie': getCookieString(),
        'content-type': 'application/x-www-form-urlencoded',
        'pragma': 'no-cache',
        'upgrade-insecure-request': 1,
      },
      data: params,
      success: (res) => {
        wx.hideLoading();
        if(res.statusCode === 200) {
          wx.hideLoading();
          if (res.data.code === 200) {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            let header = JSON.parse(JSON.stringify(res.header));
            let a2 = /A2\=(.*)\;\s+expires/g.exec(header['Set-Cookie']);
            // 登录成功 设置 cookie
            cookieUtil.setCookie('A2', decodeURIComponent(a2[1]));
            // 跳转到首页
            wx.navigateTo({
              url: 'pages/index/index'
            });
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            });
          }
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      },
      complete: () => {
        wx.hideLoading();
        console.log('请求登录完成');
      }
    });
  }
})