var appInstance = getApp();
import myService from '../../service/my.js';
import { ifNotLoginRedirect } from '../../utils/loginUtil.js';

Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    settingList: []
  },
  onLoad: function () {
    ifNotLoginRedirect();
    myService.getPersonInfo().then(res => {
      this.setData({
        userInfo: {
          avatarUrl: res.avatar,
          nickName: res.nickname,
          description: ''
        }
      });
    }).catch(err => {
      console.error(err);
    })
  },

  logout() {
    wx.setStorage({
      key: 'cookies',
      data: {},
      success: () => {
        wx.reLaunch({
          url: '/pages/login/login'
        });
      } 
    });
  }
});
