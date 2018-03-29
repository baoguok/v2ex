import domQuery from '../utils/domQuery.js';
import { downloadFileRequest } from '../utils/api.js';

/**
 * 获取节点列表
 */
function getNodePost(node, page) {
  let postList = [];
  return downloadFileRequest({
    url: `https://www.v2ex.com/go/${node.id}?p=${page}`,
    method: 'GET'
  }).then((res) => {
    if (res.statusCode === 200) {
      const $1 = domQuery(res.data);
      postList = $1('.box .cell').map(item => {
        let $ = domQuery(item.htmlStr);
        const tempObj = $('td@width:auto a');
        console.log(tempObj);
        const title = tempObj[1].val;
        const id = tempObj[0].attr.href;
        const avatar = $('.avatar')[0].attr.src;
        const author = $('.small.fade strong')[0].val;
        const temp = (/\&nbsp;\•\&nbsp;\s+(.+)\s+\&nbsp;\•\&nbsp;/g).exec($('.small.fade')[0].val);
        const lastReplyTime = temp ? temp[1] : '';
        const replyInfo = {
          replyNum: $('.count_livid')[0] ? $('.count_livid')[0].val : 0,
          lastReplyTime,
          lastReplyPersonName: ''
        };
        return {
          id,
          avatar,
          node: node.name,
          author,
          title,
          replyInfo
        }
      });
    }
    return Promise.resolve(postList);
  }).catch(err => {
    return Promise.reject(err);
  });
}

export default {
  getNodePost
}