// pages/nodepage/nodepage.js
import nodePageService from '../../service/nodePage.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    node: {
      name: '',
      id: ''
    },
    postList: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const nodeId = options.node;
    const nodeName = options.name;
    this.setData({
      node: {
        id: nodeId,
        name: nodeName
      }
    }, () => {
      wx.setNavigationBarTitle({
        title: nodeName
      });
    });
    nodePageService.getNodePost(this.data.node, this.data.page).then(res => {
      this.setData({
        postList: res,
        page: this.data.page+1
      });
    }).catch(err => {
      console.log(err);
    });
  },

  // 下拉刷新
  handleRefresh() {
    return;
    nodePageService.getNodePost(this.data.node, 1).then(res => {
      this.setData({
        postList: res,
        page: 1
      });
    }).catch(err => {
      console.log(err);
    });
  },

  // 无限加载
  handleInfiniteLoad() {
    // 加载期间不再重新加载
    if (this.data.isLoading) {return;}
    this.setData({
      isLoading: true
    });
    // 获取后续列表
    nodePageService.getNodePost(this.data.node, this.data.page).then(res => {
      if (this.data.postList.length < (this.data.page-1)*20 ) {
        wx.showToast({
          icon: 'none',
          title: '没有更多主题了',
        });
        return;
      }
      const postList = this.data.postList.concat(res);
      const page = this.data.page+1;
      console.log(page, this.data.postList.length);
      this.setData({
        postList,
        page,
        isLoading: false
      });
    }).catch(err => {
      console.log(err);
      this.setData({
        isLoading: false
      });
    });
  },

  // 跳转到帖子详情
  toPostDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/post/post?id='+id
    });
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