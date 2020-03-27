(function() {
  'use strict';

  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _typeof(obj) {
    '@babel/helpers - typeof';
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };
    }
    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _createSuper(Derived) {
    return function() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (_isNativeReflectConstruct()) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
      return call;
    }
    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function');
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: { value: subClass, writable: true, configurable: true },
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === 'function' ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== 'function') {
        throw new TypeError('Super expression must either be null or a function');
      }
      if (typeof _cache !== 'undefined') {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true },
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf('[native code]') !== -1;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
    return _setPrototypeOf(o, p);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }

  function getImageData(images) {
    if (!images) {
      return [];
    }

    var allImages = images.split(',').map(function(img) {
      return img.trim();
    });
    var processed = [];
    allImages.forEach(function(img) {
      processed.push({
        width: parseInt(img.substring(img.lastIndexOf('-') + 1, img.lastIndexOf('x'))),
        src: img,
      });
    });
    processed.sort(function(a, b) {
      return b.width - a.width;
    });
    return processed;
  }

  customElements.define(
    'image-swapper',
    /*#__PURE__*/ (function(_HTMLElement) {
      _inherits(_class, _HTMLElement);

      var _super = _createSuper(_class);

      _createClass(_class, null, [
        {
          key: 'observedAttributes',
          get: function get() {
            return ['images'];
          },
        },
      ]);

      function _class() {
        var _this;

        _classCallCheck(this, _class);

        _this = _super.call(this);
        _this._outer = document.createElement('div');
        _this._outer.style.position = 'relative';
        _this._outer.style.width = '100%';
        _this._outer.style.height = '100%';
        _this.images = [];
        _this._img = document.createElement('img');
        _this._img.style.position = 'absolute';
        _this._img.style.width = '100%';
        _this._img.style.height = '100%';

        _this._outer.appendChild(_this._img);

        var resizeObserver = new ResizeObserver(
          function(entries) {
            this._observedWidth = entries[0].contentRect.width;

            this._getClosestImage();
          }.bind(_assertThisInitialized(_this))
        );
        resizeObserver.observe(_assertThisInitialized(_this));
        return _this;
      }

      _createClass(_class, [
        {
          key: '_getClosestImage',
          value: function _getClosestImage() {
            if (this._reportContentComplete) {
              return;
            }

            var width = this._observedWidth;

            if (!this.images.length || !width) {
              return;
            }

            if (this.images.length === 1) {
              this._img.setAttribute('src', this.images[0].src);

              return;
            }

            var index = -1;
            this.images.forEach(function(val, myIndex) {
              if (index !== -1) {
                return;
              }

              if (width >= val.width) {
                index = myIndex;
              }
            }); // First item width is smaller than observed width

            if (index === 0) {
              this._img.setAttribute('src', this.images[0].src);

              return;
            } // Last item width is larger than observed width

            if (index === -1) {
              this._img.setAttribute('src', this.images[this.images.length - 1].src);

              return;
            }

            var smaller = this.images[index];
            var larger = this.images[index - 1];

            if (width - smaller.width < larger.width - width) {
              this._img.setAttribute('src', smaller.src);
            } else {
              this._img.setAttribute('src', larger.src);
            }
          },
        },
        {
          key: '_updateProps',
          value: function _updateProps() {
            this.images = getImageData(this.getAttribute('images'));

            this._getClosestImage();
          },
        },
        {
          key: 'attributeChangedCallback',
          value: function attributeChangedCallback() {
            this._updateProps();
          },
        },
        {
          key: 'connectedCallback',
          value: function connectedCallback() {
            this._observedWidth = this.getBoundingClientRect().width;

            this._getClosestImage();

            this._updateProps();

            this.appendChild(this._outer);
          },
        },
        {
          key: 'disconnectedCallback',
          value: function disconnectedCallback() {
            this.removeChild(this._outer);
          },
        },
      ]);

      return _class;
    })(/*#__PURE__*/ _wrapNativeSuper(HTMLElement))
  );
})();
