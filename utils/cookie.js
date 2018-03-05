const cookieKey = 'cookies';

var getCookieString = () => {
  let cookieStr = '';
  const cookieObj = wx.getStorageSync(cookieKey);
  if (!cookieObj) return;
  Object.keys(cookieObj).forEach(key => {
    cookieStr += `${key}="${cookieObj[key]}";`;
  });
  return cookieStr;
}


module.exports = {
  getCookieString
}