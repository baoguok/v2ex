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
      const container = $('.content .box')[0];
      const content$ = domQuery(container.htmlStr);
      postContent.avatar = content$('.header .fr img')[0].attr.src;
      postContent.title = content$('.header h1')[0].val;
      postContent.nickname = content$('.header small.gray a')[0].val;
      var tempContent = /at\s*(.+)\,\s*(\d+)\s*次点击/g.exec(content$('.header small.gray')[0].val);
      postContent.createTime = tempContent[1];
      postContent.clickTimes = tempContent[2];
      const mkcontent = content$('.topic_content .markdown_body')[0];
      postContent.content = mkcontent ? mkcontent.htmlStr : '';
      let other$ = domQuery($('.content .box')[1].htmlStr);
      const replyInfoReg = /^(\d+)\s*回复.*直到\s*(.+)$/g;
      const replyInfo = replyInfoReg.exec(other$('.cell .gray')[0].val);
      postContent.replyTimes = replyInfo[1];
      postContent.replyMoment = replyInfo[2];
    }
    return Promise.resolve(postContent);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function getPostRepliesByPage(id, page) {
    let postReplies = [];
    return downloadFileRequest({
        url: `https://www.v2ex.com${id}`,
        method: 'GET'
    }).then((res) => {
        if (res.statusCode === 200) {
          const $ = domQuery(res.data);
          const reply$ = domQuery($('.content .box')[1].htmlStr);
        postReplies = reply$('.cell').slice(1).map(cell => {
            const cell$ = domQuery(cell.htmlStr);
            const avatar = cell$('img')[0].attr.src;
            const floorNum = cell$('.no')[0].val;
            const name = cell$('a.dark')[0].val;
            const replyInfoReg = /^(.+)\s*via\s*(.+)$/g;
            const replyContent = cell$('.fade')[0].val;
            let time = '';
            let device = '';
            if (replyContent.indexOf('via') >= 0) {
                const temp = replyInfoReg.exec(cell$('.fade.small')[0].val);
                time = temp[1];
                device = temp[2];
            } else {
              time = replyContent;
            }
            const content = cell$('.reply_content')[0].htmlStr;
            return {
                avatar,
                floorNum,
                name,
                time,
                device,
                content
            }
          });
        }
        return Promise.resolve(postReplies);
    }).catch(err => {
        return Promise.reject(err);
    });
}

export default {
    getPostContent,
    getPostRepliesByPage
}