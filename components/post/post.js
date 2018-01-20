// components/post/post.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    postInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  ready() {
    console.log('postInfo',this.properties.postInfo);
  }
})
