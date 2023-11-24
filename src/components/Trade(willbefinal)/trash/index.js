const toggleBtn = document.querySelector('.navbar__toogleBtn');
const menu = document.querySelector('.navbar__menu');
const icons = document.querySelector('.navbar__icons');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active')
    icons.classList.toggle('active')
});


// 북마크 //
document.getElementById('bookmark-button').addEventListener('click', function() {
    var bookmarkUrl = window.location.href;
    var bookmarkTitle = document.title;
  
    // Local Storage에 북마크 데이터 추가
    var bookmark = {
      url: bookmarkUrl,
      title: bookmarkTitle
    };
  
    var bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks === null) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(bookmarks);
    }
  
    bookmarks.push(bookmark);
  
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  });
  
  function displayBookmarks() {
    var bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks !== null) {
      bookmarks = JSON.parse(bookmarks);
      var bookmarkList = document.getElementById('bookmark-list');
  
      // 기존 북마크 리스트 초기화
      while (bookmarkList.firstChild) {
        bookmarkList.removeChild(bookmarkList.firstChild);
      }
  
      // Local Storage에서 북마크 데이터를 가져와 리스트에 추가
      for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        link.href = bookmark.url;
        link.textContent = bookmark.title;
        listItem.appendChild(link);
        bookmarkList.appendChild(listItem);
      }
    }
  }
  
  displayBookmarks();