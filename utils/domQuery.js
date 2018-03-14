import JsonTree from './jsonTree';

/**
 * 选择转换器
 * selector String
 * return Array 
 */
let selectorParser = (selector) => {
  let selectors = selector && selector.split(/\s+/);
  const reg = /^.+(#|\.)/g;
  selectors = selectors.map((selector, index) => {
    let sls = selector.replace(reg, ',$1').split(',');
    return sls.map(sl => {
      let type = 'tag';
      let name = '';
      switch (sl[0]) {
        case '#':
          type = 'id';
          name = sl.slice(1);
          break;
        case '.':
          type = 'class';
          name = sl.slice(1);
          break;
        default:
          type = 'tag';
          name = sl.slice(0);
          break;
      }
      return {
        type,
        name
      };
    });
  });
  return selectors;
}

/**
 * 根据单个选择器获取dom
 * selector Object
 * tree Object
 * return Array
 */
let getDomBySingleSelector = (selector, tree) => {
  let doms = [];
  switch(selector.type) {
    case 'id': 
      doms = tree.getNodesById(selector.name);
      break;
    case 'class':
      doms = tree.getNodesByClassName(selector.name);
      break;
    default:
      doms = tree.getNodesByTagName(selector.name);
      break;    
  }
  return doms;
}

/**
 * 连续选择器获取dom
 * selectors Array
 * tree Object
 * return Array
 */
let getDomByLinkSelector = (selectors, tree) => {
  if (selectors.length < 1) return tree;
  let temDoms = getDomBySingleSelector(selectors[0], tree);
  tempDoms = tempDoms.filter(dom => {
    return selectors.filter(sls => {
      if (sls.type === 'id') {
        return sls.name === dom.attr.id;
      } else if (sls.type === 'class') {
        return dom.attr.class.indexOf(sls.name);
      } else {
        return dom.tag === sls.name
      }
    });
  });
  return tempDoms;
}

/**
 * 
 */
let getDomByQueueSelector = (selectorQueue, tree) => {
  if (selectorQueue.length === 1) {
    return getDomByLinkSelector(selectorQueue[0], tree);
  }
  
}

/**
 * domQuery函数
 */
let getNodesBySelectorFn = (tree) => {
  return (selector) => {
    const selectors = selectorParser(selector);
    selectors.forEach(selector => {

    });
    return 
  }
}

let domQuery = (htmlStr) => {
    let tree = new JsonTree(htmlStr, false);
    return getNodesBySelectorFn(tree);
}

export default domQuery;