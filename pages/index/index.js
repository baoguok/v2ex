//index.js
//获取应用实例
const app = getApp()

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
    }]
  },
  onLoad: function () {
  },
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
  getUserInfo: function(e) {

  }
})
