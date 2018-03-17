import { getCookieString } from './cookie.js';

export function basicRequest(config) {
  return new Promise(function (resolve, reject) {
    const cfg = Object.assign(config, {
      success: function(res) {
        resolve(res);
      },
      fail: function() {
        reject({
          code: '10001',
          msg: '请求失败'
        })
      }
    });
    wx.request(cfg);
  });
}


export function downloadFileRequest(config) {
  return new Promise(function(resolve, reject) {
    const cookieStr = getCookieString();
    const cfg = Object.assign(config, {
      method: 'GET',
      header: {
        cookie: cookieStr
      },
      success: function (res) {
        resolve(res);
      },
      fail: function () {
        reject({
          code: '10001',
          msg: '请求失败'
        })
      }
    });
    wx.request(cfg);
  });
}