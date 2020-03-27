(function() {
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  var styleSheet = styleEl.sheet;
  styleSheet.insertRule('image-swapper {display: block;}');

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
    class extends HTMLElement {
      static get observedAttributes() {
        return ['images'];
      }

      constructor() {
        super();
        this._outer = document.createElement('div');
        this._outer.style.position = 'relative';
        this._outer.style.width = '100%';
        this._outer.style.height = '100%';

        this.images = [];
        this._img = document.createElement('img');
        this._img.style.position = 'absolute';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._outer.appendChild(this._img);

        var resizeObserver = new ResizeObserver(
          function(entries) {
            this._observedWidth = entries[0].contentRect.width;
            this._getClosestImage();
          }.bind(this)
        );
        resizeObserver.observe(this);
      }

      _getClosestImage() {
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
        });
        // First item width is smaller than observed width
        if (index === 0) {
          this._img.setAttribute('src', this.images[0].src);
          return;
        }
        // Last item width is larger than observed width
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
      }

      _updateProps() {
        this.images = getImageData(this.getAttribute('images'));
        this._getClosestImage();
      }

      attributeChangedCallback() {
        this._updateProps();
      }

      connectedCallback() {
        this._observedWidth = this.getBoundingClientRect().width;
        this._getClosestImage();
        this._updateProps();
        this.appendChild(this._outer);
      }

      disconnectedCallback() {
        this.removeChild(this._outer);
      }
    }
  );
})();
