(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'AIzaSyCnTbBCGVHI83-ifu-JxpkSQLoDioYQzXI';
    const CX_ID = '011353137015733451093:WMX-2085287479';
    
    var searchTerm = window.location.search.split('=')[1];
    var wrapper = document.querySelector('[data-search-results]');
    
    const SEARCH_URI = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX_ID}&q=${searchTerm}&fields=items`;
    
    if (wrapper) {
      document.querySelector('h1').textContent = `Suchergebnisse für "${searchTerm}"`;
  
      getData();
  
      function getData() {
        var xhr = new XMLHttpRequest();
  
        xhr.addEventListener('load', handleResponse);
        xhr.addEventListener('error', handleError);
        xhr.open('GET', SEARCH_URI);
        xhr.send();
      }
  
      function handleResponse() {
        if (this.status === 200) {
          try {
            var response = JSON.parse(this.responseText);

            showResults(response.items);
          } catch (e) {
            handleError(e);
          }
        } else {
          handleError('HTTP Request could not be fetched.');
        }
      }
  
      function showResults(items) {
        if (!items) {
          handleError('Keine Ergebnisse gefunden.')
        } else {
          items.forEach(function (item) {
            wrapper.appendChild(getSearchItemHTML(item));
          });
        }
      }
  
      function getSearchItemHTML(item) {
        var article = document.createElement('article'),
          title = document.createElement('h2'),
          titleLink = document.createElement('a'),
          snippet = document.createElement('p'),
          button = document.createElement('a');
  
        article.className = 'content-tile';
        button.className = 'more';
        button.textContent = 'Weiterlesen';
        button.href = item.link;
        titleLink.href = item.link;
        titleLink.textContent = item.title;
        snippet.innerHTML = item.htmlSnippet;
  
        title.appendChild(titleLink);
        article.appendChild(title);
        article.appendChild(snippet);
        article.appendChild(button);
  
        return article;
      }
  
      function handleError(msg) {
        var error = document.createElement('p');
  
        error.className = '_error';
        error.innerHTML = `Bei deiner Suche ist leider ein Fehler aufgetreten, das tut uns leid.<br><code class="code">${msg}</code>`;
  
        wrapper.appendChild(error);
      }
    }
  });
})();