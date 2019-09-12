/**
 * 判断对象是否为空或者空串
 * @param {Object} o 
 */
function isEmpty(o) {
    return null === o || 'null' === o || '' === o || undefined === o;
}

/**
 * 获取节点的位置属性
 * @param {HTMLElement} e 
 */
function getAttr(e) {
    var tn = e.tagName;
    var id = e.getAttribute('id');
    var hasId = !isEmpty(id);
    id = "[@id='" + id + "']";
    if (hasId) {
        return id;
    } else {
        let preElement = e.previousElementSibling;
        let i = 1;
        while (!!preElement) {
            if (preElement.tagName === tn) {
                i++;
            }
            preElement = preElement.previousElementSibling;
        }
        return i === 1 ? '' : '[' + i + ']';
    }
}

function getPath(elementDom, path = '') {
    var tn = elementDom.tagName;
    if (isEmpty(elementDom) || isEmpty(tn)) {
        return path;
    }
    var attr = getAttr(elementDom);
    tn = tn.toLowerCase() + attr;
    path = isEmpty(path) ? tn : tn + "/" + path;
    var parentE = elementDom.parentElement;
    if (isEmpty(parentE) || attr.substring(0, 5) == '[@id=') {
        return path;
    }
    return getPath(parentE, path);
}

/**
 * 获取节点的xpath表达式
 * @param {HTMLElement} dom 
 */
module.exports = function (dom) {
    return `//${getPath(dom)}`
}