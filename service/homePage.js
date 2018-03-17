import domQuery from '../utils/domQuery.js';
import {downloadFileRequest} from '../utils/api.js';

let $;

function init$() {
  downloadFileRequest({
    url: 
  }).then(function (res) {

  }).catch(function (err) {

  });
}

/**
 * 获取节点列表
 */
function getNodeList() {

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