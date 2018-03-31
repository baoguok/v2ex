// pages/login/login.js
let cookieUtil = require('../../utils/cookie.js');
var { isLogined } = require('../../utils/loginUtil.js');
var { html2json } = require('../../utils/html2json.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    capcha: '',
    once: '',
    formData: {
      account: '',
      password: '',
      capcha: '',
      once: ''
    },
    appFormData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function () {
    if (isLogined()) {
      // 跳转到首页页
      wx.switchTab({
        url: '/pages/index/index',
      });
      return;
    }
    const app = getApp();
    const account = wx.getStorageSync('account');
    const password = wx.getStorageSync('password');
    this.refresPage();
    // 初始化用户名和密码
    if (account && password) {
      this.setData({
        formData: Object.assign({}, this.data.formData, {
          account,
          password
        })
      })
    }
  },

  refresPage() {
    let once = '';
    const that = this;
    // 获取登录cookie
    wx.request({
      url: 'https://www.v2ex.com/signin',
      method: 'GET',
      success: (res) => {
        const header = res.header;
        const html = res.data;
        const htmlJson = html2json(html);
        let cookies = this.getCookieFromHeader(header['set-cookie'] || header['Set-Cookie']);
        Object.keys(cookies).forEach(key => {
          // 存储 cookie 到 storage
          wx.setStorage({
            key: 'cookies',
            data: cookies,
            success: () => {
              console.log('存储 key:' + key + ' value: ' + cookies[key] + ' storage' + '成功');
            }
          });
        });
        that.findInput(htmlJson);
        this.data.appFormData.forEach(data => {
          if (data.name === 'once') {
            once = data.value;
            this.setData({
              once
            }, () => {
              this.refreshCapcha();
            });
          }
        });
      }
    });
  },

  /**
   * 刷新验证码图片
   */
  refreshCapcha() {
    const { getCookieString } = cookieUtil;
    const that = this;
    wx.downloadFile({
      url: `https://www.v2ex.com/_captcha?once=${this.data.once}`,
      header: {
        'cookie': getCookieString()
      },
      success: (res) => {
        console.log(res);
        if (res.statusCode === 200 && /.*\.png$/g.test(res.tempFilePath)) {
          that.setData({
            capcha: res.tempFilePath
          }, () => {
            console.log(that.data.capcha);
          });
        } else {
        }
      },
      fail: () => {
        console.log('下载验证码失败');
      }
    })
  },

 // 账号输入监听
 onAccountInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, {account: e.detail.value})
    });
  },

  // 密码输入监听
  onPasswordInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, { password: e.detail.value })
    });
  },

  // 验证码输入监听
  onCapchaInput(e) {
    this.setData({
      formData: Object.assign({}, this.data.formData, { capcha: e.detail.value })
    });
  },

  /**
   * 登录
   */
  login: function () {
    let params = {};
    let keys = this.data.appFormData;
    const { getCookieString } = cookieUtil;
    keys.forEach(key => {
      params[key.name] = key.name === key.type ? key.value : this.data.formData[key.type]
    });
    params = Object.assign(params, {next: '/'})
    wx.showLoading({
      title: '登录中...',
      mask: true
    });
    wx.request({
      url: 'https://v2ex.fedeveloper.cn/login',
      method: 'POST',
      header: {
        'cookie': getCookieString(),
        'content-type': 'application/x-www-form-urlencoded',
        'pragma': 'no-cache',
        'upgrade-insecure-request': 1,
      },
      data: params,
      success: (res) => {
        wx.hideLoading();
        if(res.statusCode === 200) {
          wx.hideLoading();
          if (res.data.code === 200) {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            let header = JSON.parse(JSON.stringify(res.header));
            let a2 = /A2\=(.*)\;\s+expires/g.exec(header['Set-Cookie']);
            // 登录成功 设置 cookie
            cookieUtil.setCookie('A2', decodeURIComponent(a2[1]));
            wx.setStorageSync('account', this.data.formData.account);
            wx.setStorageSync('password', this.data.formData.password);
            // 跳转到首页
            wx.switchTab({
              url: '/pages/index/index'
            });
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            });
          }
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      },
      fail: (res) => {
        console.log(res);
      },
      complete: () => {
        wx.hideLoading();
        console.log('请求登录完成');
      }
    });
  },

  // 从请求 response 头部中获取set-cookie
  getCookieFromHeader: (header) => {
    let cookie = {};
    const temp = header.split(';')[0];
    const equalCharIndex = temp.indexOf('=');
    const key = temp.slice(0, equalCharIndex);
    const val = temp.slice(equalCharIndex + 1);
    cookie[key] = val.slice(1, -1);
    return cookie;
  },

  /**
   * 获取表单 name 等信息
   * https://www.v2ex.com/_captcha?once=95378
   */
  findInput(tree) {
    if (tree.node === 'element' || tree.node === 'root') {
      if (tree.tag === 'input') {
        const treeType = tree.attr['type'];
        const treePlaceholder = tree.attr['placeholder'];
        const treeName = tree.attr['name'];
        const treeValue = tree.attr['value'];
        if (treeType === 'hidden') {
          // 隐藏表单
          this.data.appFormData.push({
            type: treeName,
            name: treeName,
            value: treeValue
          });
        } else if (treeType === 'password') {
          // 密码
          this.data.appFormData.push({
            type: 'password',
            name: treeName,
            value: treeValue
          });
        } else if (treeType === 'text') {
          // 验证码 or 账号
          if (treePlaceholder === '请输入上图中的验证码') {
            this.data.appFormData.push({
              type: 'capcha',
              name: treeName,
              value: treeValue
            });
          } else {
            if (treeName === 'q') return;
            this.data.appFormData.push({
              type: 'account',
              name: treeName,
              value: treeValue
            });
          }
        }
      } else {
        if (tree.child && tree.child.length > 0) {
          tree.child.forEach(node => {
            this.findInput(node);
          });
        }
      }
    }
  }
})