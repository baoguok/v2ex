import domQuery from '../utils/domQuery.js';
import { downloadFileRequest } from '../utils/api.js';
import { fixHtmlParserBug } from '../utils/util.js';
/**
 * 获取节点列表
 */
function getPersonInfo() {
  let info = {};
  return downloadFileRequest({
    url: 'https://www.v2ex.com/',
    method: 'GET'
  }).then((res) => {
    if (res.statusCode === 200) {
      // 临时解决htmlparse 解析问题
      res.data = fixHtmlParserBug(res.data);
      const $ = domQuery(res.data);
      const nickname = $('.content td@width:auto a')[0].attr.href.slice(8);
      const avatar = $('.content td@width:auto a img')[0].attr.src;
      info = {
        nickname,
        avatar
      }
    }
    return Promise.resolve(info);
  }).catch(err => {
    return Promise.reject(err);
  });
}

export default {
  getPersonInfo
}