import domQuery from '../utils/domQuery.js';
import {downloadFileRequest} from '../utils/api.js';

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
      const $ = domQuery(res.data);
      nodeList = $('.tab');
      nodeList = nodeList.map($node => {
        return {
          id: $node.attr.href.slice(6),
          name: $node.val,
          on: $node.attr.class === 'tab_current'
        }
      });
    }
    return Promise.resolve(nodeList);
  }).catch(err => {
    return Promise.reject(err);
  });
}

/**
 * 获取帖子列表
 */
function getTabPostList(tab) {
  let postList = [];
  return downloadFileRequest({
    url: `https://www.v2ex.com/?tab=${tab}`,
    method: 'GET'
  }).then((res) => {
    if (res.statusCode === 200) {
      const $1 = domQuery(res.data);
      postList = $1('.cell.item').map(item => {
        let $ = domQuery(item.htmlStr);
        const tempObj = $('td@width:auto a');
        const title = tempObj[2].val;
        const id = tempObj[2].attr.href;
        const node = tempObj[0].val;
        const avatar = $('.avatar')[0].attr.src;
        const author = tempObj[1].val;
        const temp =(/^(.+)\s*\&nbsp;\•\&nbsp;/g).exec($('.small.fade')[1].val);
        const lastReplyTime = temp ? temp[1] : '';
        const replyInfo = {
          replyNum: $('.count_livid')[0] ? $('.count_livid')[0].val : 0,
          lastReplyTime,
          lastReplyPersonName: tempObj[3] ? tempObj[3].val : ''
        };
        return {
          id,
          avatar,
          node,
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
  getNodeList,
  getTabPostList
}