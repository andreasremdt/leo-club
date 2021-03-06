"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Litebox = function () {
  function Litebox(options) {
    _classCallCheck(this, Litebox);

    if (!Litebox._isObject(options)) {
      this.options = Litebox.defaults;
    } else {
      this.options = Litebox._merge(Litebox.defaults, options);
    }

    this._current = null;
    this.VERSION = '0.8.4';

    this._init();
  }

  _createClass(Litebox, [{
    key: "_init",
    value: function _init() {
      this._buildCollection();

      this._createElements();

      this._reset();

      this._createStructure();

      this._registerKeyboardEvents();

      this._registerMouseEvents();

      this._registerTouchEvents();
    }
  }, {
    key: "_createElements",
    value: function _createElements() {
      this._structure = {
        'BUTTON_CLOSE': document.createElement('button'),
        'BUTTON_NEXT': document.createElement('button'),
        'BUTTON_PREV': document.createElement('button'),
        'OUTER_WRAPPER': document.createElement('div'),
        'INNER_WRAPPER': document.createElement('div'),
        'FIGURE': document.createElement('figure'),
        'CAPTION': document.createElement('figcaption'),
        'IMAGE': document.createElement('img'),
        'LOADER': document.createElement('div'),
        'ERROR': document.createElement('div')
      };
    }
  }, {
    key: "_createStructure",
    value: function _createStructure() {
      this._structure.OUTER_WRAPPER.appendChild(this._structure.INNER_WRAPPER);

      this._structure.OUTER_WRAPPER.appendChild(this._structure.LOADER);

      this._structure.INNER_WRAPPER.appendChild(this._structure.BUTTON_CLOSE);

      this._structure.INNER_WRAPPER.appendChild(this._structure.BUTTON_NEXT);

      this._structure.INNER_WRAPPER.appendChild(this._structure.BUTTON_PREV);

      this._structure.INNER_WRAPPER.appendChild(this._structure.FIGURE);

      this._structure.INNER_WRAPPER.appendChild(this._structure.ERROR);

      this._structure.FIGURE.appendChild(this._structure.IMAGE);

      this._structure.FIGURE.appendChild(this._structure.CAPTION);

      this._LITEBOX = this._structure.OUTER_WRAPPER;
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._structure.OUTER_WRAPPER.className = "".concat(this.options.classNames.outer).concat(this.options.animation ? ' is-animated' : '');
      this._structure.INNER_WRAPPER.className = "".concat(this.options.classNames.inner, " ").concat(this.options.classNames.hidden);
      this._structure.BUTTON_CLOSE.className = "".concat(this.options.classNames.buttonGeneral, " ").concat(this.options.classNames.buttonClose, " ").concat(this.options.classNames.hidden);
      this._structure.BUTTON_CLOSE.textContent = this.options.labels.close;
      this._structure.BUTTON_NEXT.className = "".concat(this.options.classNames.buttonGeneral, " ").concat(this.options.classNames.buttonNext, " ").concat(this.options.classNames.hidden);
      this._structure.BUTTON_NEXT.textContent = this.options.labels.next;
      this._structure.BUTTON_PREV.className = "".concat(this.options.classNames.buttonGeneral, " ").concat(this.options.classNames.buttonPrev, " ").concat(this.options.classNames.hidden);
      this._structure.BUTTON_PREV.textContent = this.options.labels.prev;
      this._structure.FIGURE.className = this.options.classNames.figure;
      this._structure.CAPTION.className = "".concat(this.options.classNames.caption, " ").concat(this.options.classNames.hidden);
      this._structure.IMAGE.className = "".concat(this.options.classNames.image);
      this._structure.IMAGE.src = '';
      this._structure.LOADER.className = "".concat(this.options.classNames.loader, " ").concat(this.options.classNames.hidden);
      this._structure.ERROR.className = "".concat(this.options.classNames.error, " ").concat(this.options.classNames.hidden);
      this._structure.ERROR.textContent = this.options.labels.error;
    }
  }, {
    key: "_registerKeyboardEvents",
    value: function _registerKeyboardEvents() {
      var _this = this;

      if (!this.options.keyboardShortcuts) {
        return;
      }

      window.addEventListener('keydown', function (event) {
        if (_this._isHidden()) {
          return;
        }

        if (event.keyCode === 27) {
          _this.remove();
        }

        if (event.keyCode === 39) {
          _this.switch('next');
        }

        if (event.keyCode === 37) {
          _this.switch('prev');
        }
      });
    }
  }, {
    key: "_registerTouchEvents",
    value: function _registerTouchEvents() {
      var _this2 = this;

      if (!this.options.touch) {
        return;
      }

      var xDown = null;
      var yDown = null;
      window.addEventListener('touchstart', function (event) {
        if (_this2._isHidden()) {
          return;
        }

        xDown = event.touches[0].clientX;
        yDown = event.touches[0].clientY;
      });
      window.addEventListener('touchmove', function (event) {
        if (_this2._isHidden() || !xDown || !yDown) {
          return;
        }

        var xUp = event.touches[0].clientX;
        var yUp = event.touches[0].clientY;

        if (Math.abs(xDown - xUp) > Math.abs(yDown - yUp)) {
          if (xDown - xUp > 0) {
            _this2.switch('next');
          } else {
            _this2.switch('prev');
          }
        } else {
          if (yDown - yUp < 0) {
            _this2.remove();
          }
        }

        xDown = null;
        yDown = null;
      });
    }
  }, {
    key: "_registerMouseEvents",
    value: function _registerMouseEvents() {
      var _this3 = this;

      for (var gallery in this._collection) {
        var _loop = function _loop(item) {
          var image = _this3._collection[gallery][item];
          image.addEventListener('click', function (event) {
            event.preventDefault();

            _this3.open(image);
          });
        };

        for (var item in this._collection[gallery]) {
          _loop(item);
        }
      }

      this._structure.BUTTON_CLOSE.addEventListener('click', this.remove.bind(this));

      this._structure.BUTTON_NEXT.addEventListener('click', function () {
        return _this3.switch('next');
      });

      this._structure.BUTTON_PREV.addEventListener('click', function () {
        return _this3.switch('prev');
      });
    }
  }, {
    key: "open",
    value: function open(element) {
      var _this4 = this;

      if (document.body.contains(this._LITEBOX)) {
        return;
      }

      document.body.appendChild(this._LITEBOX);

      this._animate('before-load', null, this.options.animation);

      this._showLoader();

      this._beforeLoad(element[this.options.target], function () {
        _this4._afterLoad(element);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this5 = this;

      if (!document.body.contains(this._LITEBOX)) {
        return;
      }

      this._animate('before-unload', function () {
        document.body.removeChild(_this5._LITEBOX);
        _this5._current = null;

        _this5._reset();
      }, this.options.animation);
    }
  }, {
    key: "switch",
    value: function _switch(direction) {
      var _this6 = this;

      var target = this.exists(direction);

      if (target) {
        this._showLoader();

        this._beforeLoad(target[this.options.target], function () {
          _this6._animate("before-".concat(direction), function () {
            _this6._afterLoad(target);

            _this6._animate("after-".concat(direction), null, _this6.options.animation);
          }, _this6.options.animation);
        });
      }
    }
  }, {
    key: "_beforeLoad",
    value: function _beforeLoad(src, cb) {
      var _this7 = this;

      var image = new Image();
      image.src = src;
      image.onload = cb;

      image.onerror = function () {
        cb();

        _this7._showError();
      };
    }
  }, {
    key: "_afterLoad",
    value: function _afterLoad(element) {
      this._structure.IMAGE.src = element[this.options.target];

      this._structure.INNER_WRAPPER.classList.remove('is-hidden');

      this._current = element;

      this._hideError();

      this._hideLoader();

      this._toggleCaption();

      this._toggleButtons();
    }
  }, {
    key: "_animate",
    value: function _animate(className, cb, time) {
      var _this8 = this;

      if (this.options.animation && this.options.animation > 0) {
        this._LITEBOX.classList.add(className);

        setTimeout(function () {
          if (cb) cb();

          _this8._LITEBOX.classList.remove(className);
        }, time);
      } else {
        if (cb) cb();
      }
    }
  }, {
    key: "exists",
    value: function exists(direction) {
      if (!this._current || !this._isInGallery()) return false;

      var gallery = this._collection[this._current.dataset.gallery.toUpperCase()];

      var i = gallery.indexOf(this._current);

      if (direction === 'next') {
        if (this.options.loop && i + 1 === gallery.length) {
          return gallery[0];
        }

        return gallery[i + 1] || false;
      } else if (direction === 'prev') {
        if (this.options.loop && i === 0) {
          return gallery[gallery.length - 1];
        }

        return gallery[i - 1] || false;
      }
    }
  }, {
    key: "_toggleCaption",
    value: function _toggleCaption() {
      var caption = this._current.getAttribute(this.options.caption);

      if (!caption) {
        this._structure.CAPTION.classList.add(this.options.classNames.hidden);
      } else {
        this._structure.CAPTION.textContent = caption;

        this._structure.CAPTION.classList.remove(this.options.classNames.hidden);
      }
    }
  }, {
    key: "_toggleButtons",
    value: function _toggleButtons() {
      this._structure.BUTTON_CLOSE.classList.remove(this.options.classNames.hidden);

      if (this._isInGallery()) {
        if (this._isLast() && !this.options.loop) {
          this._structure.BUTTON_NEXT.classList.add(this.options.classNames.hidden);
        } else {
          this._structure.BUTTON_NEXT.classList.remove(this.options.classNames.hidden);
        }

        if (this._isFirst() && !this.options.loop) {
          this._structure.BUTTON_PREV.classList.add(this.options.classNames.hidden);
        } else {
          this._structure.BUTTON_PREV.classList.remove(this.options.classNames.hidden);
        }
      }
    }
  }, {
    key: "_isHidden",
    value: function _isHidden() {
      return !document.body.contains(this._LITEBOX);
    }
  }, {
    key: "_showLoader",
    value: function _showLoader() {
      this._structure.LOADER.classList.remove(this.options.classNames.hidden);
    }
  }, {
    key: "_hideLoader",
    value: function _hideLoader() {
      this._structure.LOADER.classList.add(this.options.classNames.hidden);
    }
  }, {
    key: "_showError",
    value: function _showError() {
      this._structure.ERROR.classList.remove(this.options.classNames.hidden);
    }
  }, {
    key: "_hideError",
    value: function _hideError() {
      this._structure.ERROR.classList.add(this.options.classNames.hidden);
    }
  }, {
    key: "_isInGallery",
    value: function _isInGallery() {
      for (var gallery in this._collection) {
        if (gallery !== '__' && this._collection[gallery].indexOf(this._current) !== -1) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_isFirst",
    value: function _isFirst() {
      var gallery = this._collection[this._current.dataset.gallery.toUpperCase()];

      if (gallery.indexOf(this._current) === 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "_isLast",
    value: function _isLast() {
      var gallery = this._collection[this._current.dataset.gallery.toUpperCase()];

      if (gallery.indexOf(this._current) === gallery.length - 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "_buildCollection",
    value: function _buildCollection() {
      var images = document.querySelectorAll(this.options.el);
      var collection = {
        __: []
      };
      [].forEach.call(images, function (image) {
        var gallery = image.dataset.gallery;

        if (gallery) {
          if (!collection.hasOwnProperty(gallery.toUpperCase())) {
            collection[gallery.toUpperCase()] = [];
          }

          collection[gallery.toUpperCase()].push(image);
        } else {
          collection.__.push(image);
        }
      });
      this._collection = collection;
    }
  }], [{
    key: "_isObject",
    value: function _isObject(item) {
      return item && _typeof(item) === 'object' && !Array.isArray(item);
    }
  }, {
    key: "_merge",
    value: function _merge(target, source) {
      var output = Object.assign({}, target);
      Object.keys(source).forEach(function (key) {
        if (Litebox._isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, _defineProperty({}, key, source[key]));
          } else {
            output[key] = Litebox._merge(target[key], source[key]);
          }
        } else {
          Object.assign(output, _defineProperty({}, key, source[key]));
        }
      });
      return output;
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        el: '[data-litebox]',
        target: 'href',
        caption: 'title',
        keyboardShortcuts: true,
        touch: true,
        autohideControls: true,
        slideshow: 5000,
        loop: false,
        animation: 500,
        labels: {
          close: 'Close',
          next: 'Show next image',
          prev: 'Show previous image',
          error: 'Sorry, the image couldn\'t be loaded.'
        },
        classNames: {
          outer: 'litebox',
          inner: 'litebox-wrapper',
          figure: 'litebox-image-wrapper',
          caption: 'litebox-caption',
          image: 'litebox-image',
          buttonGeneral: 'litebox-button',
          buttonClose: 'litebox-button-close',
          buttonPrev: 'litebox-button-prev',
          buttonNext: 'litebox-button-next',
          loader: 'litebox-loader',
          error: 'litebox-error',
          hidden: 'is-hidden'
        }
      };
    }
  }]);

  return Litebox;
}();

new Litebox();