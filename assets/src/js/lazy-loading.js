(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver(function(images) {
      images.forEach(function (image) {
        if (image.isIntersecting) {
          var toLoad = image.target;

          if (toLoad.tagName === "IMG" || toLoad.tagName === "SOURCE") {
            if (toLoad.dataset.src) {
              toLoad.src = toLoad.dataset.src;
              toLoad.removeAttribute("data-src");
            }

            if (toLoad.dataset.srcset) {
              toLoad.srcset = toLoad.dataset.srcset;
              toLoad.removeAttribute("data-srcset");
            }
          }

          observer.unobserve(toLoad);
        }
      });
    });

    [].slice.call(document.querySelectorAll("[data-loader]")).forEach(image => observer.observe(image));
  });
})();