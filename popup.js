document.addEventListener('DOMContentLoaded', function () {
  const videoLinksUl = document.getElementById('video-links');
  const clearAllButton = document.getElementById('clear-all');

  // Function to render video links
  function renderLinks(links) {
    videoLinksUl.innerHTML = ''; // Clear previous content
    links.forEach((link, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const removeButton = document.createElement('button');

      a.href = link;
      a.textContent = link;
      a.target = '_blank';

      removeButton.textContent = 'Remove';
      removeButton.onclick = function () {
        removeLink(index);
      };

      li.appendChild(a);
      li.appendChild(removeButton);
      videoLinksUl.appendChild(li);
    });
  }

  // Function to remove a specific link
  function removeLink(index) {
    chrome.storage.local.get({ videoLinks: [] }, function (result) {
      let videoLinks = result.videoLinks;
      videoLinks.splice(index, 1); // Remove the link at the given index
      chrome.storage.local.set({ videoLinks: videoLinks }, function () {
        renderLinks(videoLinks); // Re-render links after removal
      });
    });
  }

  // Function to clear all links
  function clearAllLinks() {
    chrome.storage.local.set({ videoLinks: [] }, function () {
      renderLinks([]); // Clear the display after clearing storage
    });
  }

  // Event listener for the Clear All button
  clearAllButton.addEventListener('click', clearAllLinks);

  // Load and render video links on popup open
  chrome.storage.local.get({ videoLinks: [] }, function (result) {
    renderLinks(result.videoLinks);
  });
});
