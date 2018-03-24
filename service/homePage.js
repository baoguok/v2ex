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
      nodeList = $('.tab_current').concat($('.tab'));
      console.log(nodeList);
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
      console.log(res.data);
      postList = $1('.cell.item').forEach(item => {
        console.log(item);
        let $ = domQuery(item.htmlStr);
        const tempObj = $('td@width:auto a');
        console.log(tempObj)
        const title = tempObj[0].val;
        const id = tempObj[0].attr.href;
        const node = $('.node')[0].val;
        const avatar = $('.avatar')[0].attr.src;
        const author = tempObj[1].val;
        console.log($('.small.fade'));
        const replyInfo = {
          replyNum: $('.count_livid')[0].val,
          lastReplyTime: (/(\d)./g).exec($('.small.fade').val)[1],
          lastReplyPersonName: tempObj[2].val
        }
      });
    }
    console.log(postList, 'postList');
    return Promise.resolve(postList);
  }).catch(err => {
    return Promise.reject(err);
  });
}

export default {
  getNodeList,
  getTabPostList
}