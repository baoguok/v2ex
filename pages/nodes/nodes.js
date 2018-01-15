// pages/nodes/nodes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedNodeList: [{
      id: 1,
      name: '发现',
      on: 0
    }, {
      id: 2,
      name: '最热',
      on: 0
    }, {
      id: 3,
      name: '问与答',
      on: 0
    }, {
      id: 4,
      name: 'Apple',
      on: 0
    }, {
      id: 5,
      name: '技术',
      on: 0
    }, {
      id: 6,
      name: '问与答',
      on: 0
    }, {
      id: 7,
      name: '问与答',
      on: 0
    }, {
      id: 8,
      name: '问与答',
      on: 0
    }, {
      id: 9,
      name: '问与答',
      on: 0
    }],
    allNodeList: [
        {
            id: 10,
            name: '分享与创造',
            childNodes: [
                {
                    id: 6,
                    name: '问与答'
                }, {
                    id: 7,
                    name: '问与答'
                }, {
                    id: 8,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }
            ]
        },
        {
            id: 11,
            name: '分享与创造',
            childNodes: [
                {
                    id: 6,
                    name: '问与答'
                }, {
                    id: 7,
                    name: '问与答'
                }, {
                    id: 8,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }
            ]
        },
        {
            id: 12,
            name: '分享与创造',
            childNodes: [
                {
                    id: 6,
                    name: '问与答'
                }, {
                    id: 7,
                    name: '问与答'
                }, {
                    id: 8,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }
            ]
        },
        {
            id: 13,
            name: '分享与创造',
            childNodes: [
                {
                    id: 6,
                    name: '问与答'
                }, {
                    id: 7,
                    name: '问与答'
                }, {
                    id: 8,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }, {
                    id: 9,
                    name: '问与答'
                }
            ]
        }
    ]
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