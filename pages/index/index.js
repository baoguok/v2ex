//index.js
//获取应用实例
const app = getApp()
import homeService from '../../service/homePage.js';

Page({
  data: {
    tab: '',
    nodeList: [],
    postList: []
  },
  onLoad: function () {
    console.log('onload');
  },

  onShow: function () {
    let nodeList =[];
    let postList = [];
    // 获取节点
    homeService.getNodeList().then(res => {
      const currentTab = this.getCurrentTab();
      const id = currentTab;
      nodeList = res;
      console.log(res, 'res');
      nodeList = this.filterNodeOn(nodeList, id);
      this.setData({
        nodeList,
        tab: currentTab
      });
    }).catch(err => {
      console.error(err);
    });
    // 获取帖子
    homeService.getTabPostList(this.data.tab).then(res => {
      postList = res;
      this.setData({
        postList
      });
    }).catch(err => {
      console.error(err);
    });
  },

  onHide: function () {
    wx.setStorage({
      key: 'currentTab',
      data: this.data.tab
    });
  },

  onUnload: function () {
    wx.setStorage({
      key: 'currentTab',
      data: this.data.tab
    });
  },

  // 切换节点
  switchNode: function(e) {
    const id = e.target.dataset.id;
    const nodeList = this.filterNodeOn(this.data.nodeList, id);
    this.setData({
      tab: id,
      nodeList
    }, () => {
      homeService.getTabPostList(id).then(res => {
        this.setData({
          postList: res
        });
      }).catch(err => {
        console.error(err);
      });
    });
   
  },

  // 筛选
  filterNodeOn(nodeList, id) {
    nodeList.forEach(node => {
      if (node.id == id) {
        node.on = 1;
      } else {
        node.on = 0;
      }
    });
    return nodeList;
  },

  // 获取当前所在节点
  getCurrentTab() {
    const currentTab = wx.getStorageSync('currentTab');
    return currentTab ? currentTab : 'tech';
  },

  // 跳转到更多节点
  navigatToMoreNodes() {
    wx.navigateTo({
      url: '/pages/nodes/nodes',
    });
  },

  toPostDetail(e) {
    const id = e.currentTarget.dataset.id;
    const postnum = e.currentTarget.dataset.postnum;
    wx.navigateTo({
      url: '/pages/post/post?id=' + id + '&postnum=' + postnum,
    });
  },


  getUserInfo: function(e) {

  }
})
