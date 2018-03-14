let html2json = require('./html2json.js').html2json;
let json2html = require('./html2json.js').json2html;

class JsonTree {
    constructor (html, isJson = true) {
        this.htmlStr =isJson ? json2html(html) : html;
        this.htmlJson = isJson ? html :  html2json(htmlStr);
        this.type = this.htmlJson.node;
        this.ele = this.type === 'element' ? this.htmlJson.tag : this.type;
        this.val = this.getNodeTextContent(this.htmlJson);
        this.attr = this.htmlJson.attr || {};
    }

    getNodesByClassName(cs) {

    }

    getNodesById(id) {

    }

    getNodesByTagName(tag) {

    }

    getNodesByAttr(key, val) {

    }

    getNodeTextContent(node) {
      let text = '';
      node.child && node.child.forEach(cd => {
        if (cd.node === 'text') {
          text = cd.text;
        }
      });
    }
}


export default JsonTree;