// pages/post/post.js
import postService from '../../service/post.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    author: {
      avatar: '',
      nickname: '',
    },
    post: {
      title: '',
      lastReply: '',
      clickTimes: 0,
      content: ''
    },
    replies: [],
    replyPage: 1,
    id: '',
    postnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id, postnum } = options;
    const page = this.data.page;
    this.setData({
      id,
      postnum
    });
    postService.getPostContent(id).then(res => {
      const {avatar, nickname, title, createTime, clickTimes, content, replyTimes, replyMoment} = res;
      this.setData({
        author: {
          avatar,
          nickname
        },
        post: {
          title,
          createTime,
          clickTimes,
          content,
          replyTimes,
          replyMoment
        }
      })
    }).catch(err => {
      console.error(err);
    });

    postService.getPostRepliesByPage(id, page).then(res => {
      const replies = res;
      this.setData({
          replies: replies.reverse()
      })
    }).catch(err => {
      console.error(err);
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const page = this.data.page + 1;
    const id = this.data.id;
    if (this.data.replies.length < this.data.page*64) {
      wx.showToast({
        title: '没有更多回复了',
        icon: 'none'
      });
      return;
    }
    postService.getPostRepliesByPage(id, page).then(res => {
      let replies = [];
      replies = replies.concat(res.reverse()).concat(this.data.replies);
      this.setData({
        replies
      })
    }).catch(err => {
      console.error(err);
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})