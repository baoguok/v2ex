//app.js
var { html2json } = require('./utils/html2json.js');
var { password, account } = require('./config/accountInfo.js');
var { isLogined } = require('./utils/loginUtil.js');

App({
  onLaunch: function () {
    const that = this;
    if (isLogined())  {
      
    } else {
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
          console.log(that.formData)
        }
      });

      // 跳转到登录页
      wx.redirectTo({
        url: 'pages/nodes/nodes',
      });
    }
  },

  // 从请求 response 头部中获取set-cookie
  getCookieFromHeader: (header) => {
    let cookie = {};
    const temp = header.split(';')[0];
    const equalCharIndex = temp.indexOf('=');
    const key = temp.slice(0, equalCharIndex);
    const val = temp.slice(equalCharIndex+1);
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
          this.formData.push({
            type: treeName,
            name: treeName,
            value: treeValue
          });
        } else if (treeType === 'password') {
          // 密码
          this.formData.push({
            type: 'password',
            name: treeName,
            value: treeValue
          });
        } else if (treeType === 'text') {
          // 验证码 or 账号
          if (treePlaceholder === '请输入上图中的验证码') {
            this.formData.push({
              type: 'capcha',
              name: treeName,
              value: treeValue
            });
          } else {
            if (treeName === 'q') return;
            this.formData.push({
              type: 'account',
              name: treeName,
              value: treeValue
            });
          }
        }
      } else {
        if (tree.child && tree.child.length>0) {
           tree.child.forEach(node => {
              this.findInput(node);
           });
         }
      }
    }
  },

  globalData: {
    userInfo: null 
  },

  formData: []
})