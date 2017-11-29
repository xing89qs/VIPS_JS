var blockExtraction = function () {
    var travel = function (node, callback) {
        if (node === null || node.tagName == 'SCRIPT') {
            return;
        }
        if (node.childNodes.length) {
            for (var i = 0; i < node.childNodes.length; i++) {
                travel(node.childNodes[i], callback);
            }
        }
        callback(node);
    };

    var initNode = function (node) {
        node.isTextNode = (node.nodeType === Node.TEXT_NODE);
        node.isValidNode = false;
        if (!node.isTextNode) {
            node.isValidNode = (node.clientHeight > 0 && node.clientWidth > 0);
        }
    };
    // 1:divide,0:not divide,-1: to be determined.
    var rule1 = function (node) {
        if (!node.isTextNode) {
            var hasValidChild = false;
            for (var i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].isValidNode) hasValidChild = true;
            }
            if (!hasValidChild) return 0;
        }
        return -1;
    };

    var root = document.getElementsByTagName("body")[0];
    travel(root, initNode);
};

module.exports.blockExtraction = blockExtraction;