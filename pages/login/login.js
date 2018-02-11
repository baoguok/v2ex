// pages/login/login.js
let cookieUtil = require('../../utils/cookie.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capcha: ''
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
    wx.request({
      url: `https://www.v2ex.com/_captcha`,
      method: 'GET',
      responseType: 'arrayBuffer',
      data: {
        once
      },
      header: {
        'cookie': getCookieString()
      },
      success: (res) => {
        console.log(res.data);
        that.setData({
          capcha: `data:image/png;base64,${res.data}`
        }, () => {
          console.log(that.data.capcha);
        });
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
  
  }
})