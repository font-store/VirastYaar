const arabicRegex = new RegExp("([\u0600-\u06FF\u0750-\u077F\u08a0-\u08ff\uFB50-\uFDFF\uFE70-\uFEFF\]+([\u0600-\u06FF\u0750-\u077F\u08a0-\u08ff\uFB50-\uFDFF\uFE70-\uFEFF\\W\\d]+)*)", "g");
const arabicNumbersRegex = new RegExp("([\u0660-\u0669\u06F0-\u06F9]+)", "g");
const htmlEditables = ["textarea", "input", "text", "email", "number", "search", "tel", "url", "password"];

let target = {};

let virastyaar = new Virastyaar();


function hasArabicScript(node) {
    return !!node.value && !!(node.value.match(arabicRegex));
}

function isNodeEditable(node) {
    const element = node;
    const nodeName = element.nodeName.toLowerCase();
    return (element.isContentEditable || (htmlEditables.includes(nodeName) && element.nodeType === Node.ELEMENT_NODE));
}

function checkNode(event) {
    const element = event.target;
    let res = false;
    target.active = (isNodeEditable(element) && hasArabicScript(element));
    target.element = element;
    browser.runtime.sendMessage({ "contextmenu": target.active });
}


function getTextNode(node) {
    return (node.isContentEditable ? node.innerHTML : node.value);
}

function setTextNode(node, text) {
    if (node.isContentEditable) {
        node.innerHTML = text;
    } else {
        node.value = text;
    }
}

function VirastyaarElement(node) {
    oldText = getTextNode(node);
    oldText = virastyaar.cleanup(oldText);
    setTextNode(node, oldText);
    return "text is virastaring..."
}

window.addEventListener("contextmenu", checkNode, true);

browser.runtime.onMessage.addListener(async function(msg) {

    if (msg.command == "vcm-checkText") {
        return VirastyaarElement(target.element);
        // return ['hello'];
    }
});