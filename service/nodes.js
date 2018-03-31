import domQuery from '../utils/domQuery.js';
import { downloadFileRequest } from '../utils/api.js';
import { fixHtmlParserBug } from '../utils/util.js';

/**
 * 获取节点列表
 */
function getNodeList() {
  let nodeList = [];
  return downloadFileRequest({
    url: 'https://www.v2ex.com/',
    method: 'GET'
  }).then((res) => {
    if (res.statusCode === 200) {
      res.data = fixHtmlParserBug(res.data);
      const $ = domQuery(res.data);
      const container = $('.content .box')[2];
      console.log(res.data);
      const nodes$ = domQuery(container.htmlStr);
      nodeList = nodes$('.cell').map((item, index) => {
        const item$ = domQuery(item.htmlStr);
        if (index === 0 ) {return {};}
        const childNodes = item$('a').map(a => {
          return {
            id: a.attr.href.slice(4),
            name: a.val
          };
        });
        return {
          id: index,
          name: item$('.fade')[0].val,
          childNodes
        }
      });
    }
    console.log(nodeList)
    return Promise.resolve(nodeList);
  }).catch(err => {
    return Promise.reject(err);
  });
}

export default {
  getNodeList
}