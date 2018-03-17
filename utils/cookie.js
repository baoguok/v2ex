const cookieKey = 'cookies';

var getCookieString = () => {
  let cookieStr = '';
  const cookieObj = wx.getStorageSync(cookieKey);
  if (!cookieObj) return '';
  Object.keys(cookieObj).forEach(key => {
    cookieStr += `${key}="${cookieObj[key]}";`;
  });
  return cookieStr;
}

var setCookie = (key, val) => {
  let cookieObj = wx.getStorageSync(cookieKey);
  cookieObj[key] = val;
  wx.setStorageSync(cookieKey, cookieObj);
}

var getCookie = (key) => {
  let cookieObj = wx.getStorageSync(cookieKey);
  if (key && cookieObj[key]) {
    return cookieObj[key];
  }
  return false;
}


module.exports = {
  getCookieString,
  setCookie,
  getCookie
}