let html2json = require('./html2json.js').html2json;
let json2html = require('./html2json.js').json2html;

class JsonTree {
    constructor(html, isJson = false) {
        this.htmlStr =isJson ? json2html(html) : html;
        this.htmlJson = isJson ? html :  html2json(html);
        this.type = this.htmlJson.node;
        this.ele = this.type === 'element' ? this.htmlJson.tag : this.type;
        this.val = this.getNodeTextContent(this.htmlJson);
        this.attr = this.htmlJson.attr || {};
    }

    /**
     * 遍历节点树
     */
    static treeTravelsal(tree, stratege) {
      let nodes = [];
      let travelsal = (tree, stratege) => {
        if (tree && stratege(tree)) {
            nodes.push(tree);
        }
        if (tree.child) {
            tree.child.forEach(item => {
              travelsal(item, stratege);
            });
        }
      }
      travelsal(tree, stratege);
      return nodes;
    }

    /**
     * 通过 class 获取节点
     */
    getNodesByClassName(cs) {
      if (!cs) {return [];}
      return JsonTree.treeTravelsal(this.htmlJson, function (node) {
        if (node.attr && node.attr.class) {
          const className = node.attr.class;
          return className.indexOf(cs) >= 0; 
        }
        return false;
      });
    }

    /**
     * 通过 id 获取节点
     */
    getNodesById(id) {
      if (!id) {return [];}
      return JsonTree.treeTravelsal(this.htmlJson, function (node) {
        if (node.attr && node.attr.id) {
          const idName = node.attr.id;
          return idName === id;
        }
        return false;
      });
    }

    /**
     * 通过 tag 获取节点
     */
    getNodesByTagName(tag) {
      if (!tag) { return []; }
      return JsonTree.treeTravelsal(this.htmlJson, function (node) {
        if (node.node === 'element') {
          return node.tag === tag;
        }
        return false;
      });
    }

    /**
     * 通过 attr 键值对获取节点
     */
    getNodesByAtrr(key, val) {
      if (!key || !val) {return [];}
      return JsonTree.treeTravelsal(this.htmlJson, function (node) {
        if (node.attr && key!=='id' && key!=='class') {
          return node.attr[key] === val;
        }
        return false;
      });
    }

    /**
     * 获取节点文本值
     */
    getNodeTextContent(node) {
      let text = '';
      node.child && node.child.forEach(cd => {
        if (cd.node === 'text') {
          text = cd.text;
        }
      });
      return text;
    }
}


export default JsonTree;