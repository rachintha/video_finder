chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.match(/\.(mp4|avi|mkv|mov|flv|wmv)$/)) {
      chrome.storage.local.get({ videoLinks: [] }, function (result) {
        let videoLinks = result.videoLinks;
        videoLinks.push(details.url);
        chrome.storage.local.set({ videoLinks: videoLinks });
      });
    }
  },
  { urls: ["<all_urls>"] }
);
