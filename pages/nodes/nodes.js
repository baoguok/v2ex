// pages/nodes/nodes.js
import nodesService from '../../service/nodes.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allNodeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取所有节点
    nodesService.getNodeList().then((res) => {
      this.setData({
        allNodeList: res
      });
    }).catch(err => {
      console.error(err);
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

  handleNodeClick(e) {
    const node = e.target.dataset.id;
    const name = e.target.dataset.name;
    wx.navigateTo({
      url: `/pages/nodepage/nodepage?node=${node}&name=${name}`
    });
  }
})