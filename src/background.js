'use strict';

const tabSet = new Set();

chrome.windows.onCreated.addListener(window => {
  if (!chrome.runtime.lastError && window) {
    const { type, id } = window;
    if (type === 'popup') {
      chrome.windows.get(
        id,
        {
          populate: true,
        },
        win => {
          if (!chrome.runtime.lastError && win && win.tabs) {
            win.tabs.forEach(tab => {
              const { id: tabId } = tab;
              chrome.tabs.executeScript(tabId, {
                file: 'contentScript.js',
              });
              tabSet.add(tabId);
            });
          }
        }
      );
    }
  }
});

chrome.tabs.onUpdated.addListener(function listener(tId) {
  if (tabSet.has(tId)) {
    chrome.tabs.executeScript(tId, {
      file: 'contentScript.js',
    });
  }
});
