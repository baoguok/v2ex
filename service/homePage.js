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
      nodeList = nodeList.map(node => {
        const $node = $(node);
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
function getPostList(node, page) {

}

export default {
  getNodeList,
  getPostList
}