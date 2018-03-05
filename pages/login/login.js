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
      capcha: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const { getCookieString } = cookieUtil;
    const that = this;
    let once = '';
    app.formData.forEach(data => {
      if (data.name === 'once') {
        once = data.value;
      }
    });
    wx.downloadFile({
      url: `https://www.v2ex.com/_captcha?once=${once}`,
      header: {
        'cookie': getCookieString()
      },
      success: (res) => {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onAccountInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, {account: e.detail.value})
    });
  },
  onPasswordInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, { password: e.detail.value })
    });
  },
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
      console.log(key.name);
      params[key.name] = key.name === key.type ? key.value : this.data.formData[key.type]
    });
    params = Object.assign(params, {next: '/'})
    console.log('---', params);
    wx.showLoading({
      title: '登录中...',
      mask: true
    });
    wx.request({
      url: 'https://www.v2ex.com/signin',
      method: 'POST',
      header: {
        'cookie': getCookieString(),
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://www.v2ex.com',
        'pragma': 'no-cache',
        'upgrade-insecure-request': 1,
      },
      data: params,
      success: (res) => {
        console.log(res);
        if(res.statusCode === 200) {
          wx.hideLoading();
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          console.log(res);
          // wx.request({
          //   url: 'https://www.v2ex.com/recent',
          //   method: 'GET',
          //   header: {
          //     cookie: getCookieString()
          //   },
          //   success: (res) => {
          //     console.log(res);
          //   }
          // })
        } else {
          
        }
      },
      complete: () => {
        wx.hideLoading();
        console.log('请求登录完成');
      }
    });
  }
})