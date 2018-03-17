let { getCookie } = require('./cookie.js');

function isLogined () {
  return getCookie('A2') && getCookie('PB3_SESSION')
}

module.exports = {
  isLogined
}