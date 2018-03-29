import domQuery from '../utils/domQuery.js';
import { downloadFileRequest } from '../utils/api.js';

/**
 * 获取节点列表
 */
function getPostContent(id) {
  let postContent = {};
  return downloadFileRequest({
    url: `https://www.v2ex.com${id}`,
    method: 'GET'
  }).then((res) => {
    if (res.statusCode === 200) {
      const $ = domQuery(res.data);
      const container = $('.content .box');
      console.log(container);
      const content$ = domQuery(container.htmlStr);
      console.log(content$('.header .fr img'));
      postContent.avatar = content$('.header .fr img')[0].attr.src;
      postContent.title = content$('.header h1')[0].val;
      postContent.nickname = content$('.header small a').val;
      postContent.lastReply = content$('.header small').val;
      postContent.clickTimes = content$('.header small').val;
      postContent.content = content$('.topic-content').val;
    }
    return Promise.resolve(postContent);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function getPostReplies(id, page) {

}

export default {
  getPostContent,
  getPostReplies
}