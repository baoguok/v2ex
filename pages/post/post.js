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
    const replyPage = Math.ceil(postnum/100);
    this.setData({
      id,
      postnum,
      replyPage
    });
    // 获取主题内容
    postService.getPostContent(id).then(res => {
      const {avatar, nickname, title, createTime, clickTimes, content, replyTimes, replyMoment} = res;
      const pageTitle = title.length > 5 ? title.slice(0, 5)+'...' : title;
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
      // 设置标题
      wx.setNavigationBarTitle({
        title: pageTitle
      });
    }).catch(err => {
      console.error(err);
    });
    // 获取主题回复
    postService.getPostRepliesByPage(id, replyPage).then(res => {
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
    const page = this.data.replyPage - 1;
    const id = this.data.id;
    if (page === 0) {
      return;
    }
    postService.getPostRepliesByPage(id, page).then(res => {
      let replies = [];
      replies = replies.concat(this.data.replies).concat(res.reverse());
      this.setData({
        replies,
        replyPage: page
      });
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