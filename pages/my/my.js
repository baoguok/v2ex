var appInstance = getApp();
Page({
  data: {
    userInfo: null
  },
  onLoad: function () {
    this.setData({
      userInfo: appInstance.globalData.userInfo
    });
    console.log(this.userInfo);
  }
});
