'use strict';

const virContextMenuID = "vcm-checkText";

function onError(error) {
    console.log('Error: ', error);
}

browser.contextMenus.create({
    id: virContextMenuID,
    title: "ویراستاری کنم؟",
    enabled: false,
    onclick: virContextMenuClicked
});

function virContextMenuClicked(info, tab) {
    browser.tabs.sendMessage(tab.id, { command: info.menuItemId }).then(response => {
        console.log(response);
    }).catch(onError);
}

browser.runtime.onMessage.addListener(async function(msg) {
    if (msg.hasOwnProperty('contextmenu')) {
        browser.contextMenus.update(virContextMenuID, {
            enabled: msg.contextmenu
        });
        browser.contextMenus.refresh();
    }
});