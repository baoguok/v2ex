const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 临时解决htmlparse 解析问题
const fixHtmlParserBug = (data) => {
  let tempStr = /\<div\s+class\=\"cell\"\>\<table\s+cellpadding.+条未读提醒.+\<\/table\>\<\/div\>/g;
  data = data.replace(tempStr, '');
  return data;
}

module.exports = {
  formatTime,
  fixHtmlParserBug
}
