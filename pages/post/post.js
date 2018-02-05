// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author: {
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/AZVz8lUszY4b31iaSwFEDPYkR2TcUUhZGowQmw1OndmYgyMbZc3ckBJ2x0jBVJXLg413faibUop4FPiaFMb0jaIIw/0',
      nickname: '作者',
    },
    post: {
      title: '标题标题标题标题标题',
      lastReply: '24分钟前',
      clickTimes: 5622,
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
    },
    replies: [{
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/AZVz8lUszY4b31iaSwFEDPYkR2TcUUhZGowQmw1OndmYgyMbZc3ckBJ2x0jBVJXLg413faibUop4FPiaFMb0jaIIw/0',
      name: '回复人1',
      content: 'blablablablablablablablasdfdsfblablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
      replyTime: '一个小时前'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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