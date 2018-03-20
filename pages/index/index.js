//index.js
//获取应用实例
const app = getApp()
import homeService from '../../service/homePage.js';

Page({
  data: {
    nodeList: [{
        id: 1,
        name: '发现',
        on: 0
    },{
        id: 2,
        name: '最热',
        on: 0
    },{
        id: 3,
        name: '问与答',
        on: 0
    },{
        id: 4,
        name: 'Apple',
        on: 0
    },{
        id: 5,
        name: '技术',
        on: 0
    },{
        id: 6,
        name: '问与答',
        on: 0
    },{
        id: 7,
        name: '问与答',
        on: 0
    },{
        id: 8,
        name: '问与答',
        on: 0
    },{
        id: 9,
        name: '问与答',
        on: 0
    }],
    postList: [
      {
        id: 1255,
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/AZVz8lUszY4b31iaSwFEDPYkR2TcUUhZGowQmw1OndmYgyMbZc3ckBJ2x0jBVJXLg413faibUop4FPiaFMb0jaIIw/0',
        node: '最热',
        author: '小王',
        title: '最新内容标题最新内容标题最新内容标题最新内容标题最新内容标题',
        replyInfo: {
          replyNum: 52,
          lastReplyTime: '23分钟前',
          lastReplyPersonName: '李白很帅'
        }
      },
      {
        id: 1255,
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/AZVz8lUszY4b31iaSwFEDPYkR2TcUUhZGowQmw1OndmYgyMbZc3ckBJ2x0jBVJXLg413faibUop4FPiaFMb0jaIIw/0',
        node: '最热',
        author: '小王',
        title: '最新内容标题最新内容标题最新内容标题最新内容标题最新内容标题',
        replyInfo: {
          replyNum: 52,
          lastReplyTime: '23分钟前',
          lastReplyPersonName: '李白很帅'
        }
      },
      {
        id: 1255,
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/AZVz8lUszY4b31iaSwFEDPYkR2TcUUhZGowQmw1OndmYgyMbZc3ckBJ2x0jBVJXLg413faibUop4FPiaFMb0jaIIw/0',
        node: '最热',
        author: '小王',
        title: '最新内容标题最新内容标题最新内容标题最新内容标题最新内容标题',
        replyInfo: {
          replyNum: 52,
          lastReplyTime: '23分钟前',
          lastReplyPersonName: '李白很帅'
        }
      },
      {
        id: 1255,
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/AZVz8lUszY4b31iaSwFEDPYkR2TcUUhZGowQmw1OndmYgyMbZc3ckBJ2x0jBVJXLg413faibUop4FPiaFMb0jaIIw/0',
        node: '最热',
        author: '小王',
        title: '最新内容标题最新内容标题最新内容标题最新内容标题最新内容标题',
        replyInfo: {
          replyNum: 52,
          lastReplyTime: '23分钟前',
          lastReplyPersonName: '李白很帅'
        }
      },
      {
        id: 1255,
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/AZVz8lUszY4b31iaSwFEDPYkR2TcUUhZGowQmw1OndmYgyMbZc3ckBJ2x0jBVJXLg413faibUop4FPiaFMb0jaIIw/0',
        node: '最热',
        author: '小王',
        title: '最新内容标题最新内容标题最新内容标题最新内容标题最新内容标题',
        replyInfo: {
          replyNum: 52,
          lastReplyTime: '23分钟前',
          lastReplyPersonName: '李白很帅'
        }
      }
    ]
  },
  onLoad: function () {
    console.log(this.data.postList)
  },

  onShow: function () {
    let nodeList =[];
    homeService.getNodeList().then(res => {
      nodeList = res;
      console.log(res, 'res');
      this.setData({
        nodeList
      });
    }).catch(err => {
      console.error(err);
    });
  },

  // 切换节点
  switchNode: function(e) {
    const id = e.target.dataset.id;
    this.data.nodeList.forEach(node => {
      if (node.id == id) {
        node.on = 1;
      } else {
        node.on = 0;
      }
    });
    this.setData({nodeList: this.data.nodeList}, () => {
        console.log(this.data.nodeList);
    });
  },
  // 跳转到更多节点
  navigatToMoreNodes() {
    wx.navigateTo({
      url: '/pages/nodes/nodes',
    });
  },

  toPostDetail() {
    wx.navigateTo({
      url: '/pages/post/post',
    });
  },


  getUserInfo: function(e) {

  }
})
