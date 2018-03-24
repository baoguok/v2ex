//index.js
//获取应用实例
const app = getApp()
import homeService from '../../service/homePage.js';

Page({
  data: {
    nodeList: [],
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
    homeService.getTabPostList('tech');
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
