(function (window) {
  function createDots() {
    var existingDots = this.$carousel.getElementsByClassName('dots');
    if (existingDots.length) {
      this.$carousel.removeChild(existingDots[0]);
    }
    var dots = document.createElement('ul');
    dots.className = 'dots';
    var items = this.$carousel.getElementsByTagName('ul')[0];
    this.$count = items.childElementCount;
    for (var i = 0; i < items.childElementCount; i += 1) {
      var dot = document.createElement('li');
      dot.dataset.index = i;
      dots.appendChild(dot);
    }
    this.$carousel.appendChild(dots);
  }

  function selectView(index) {
    var scrollPosition = index * this.$width;
    var items = this.$carousel.firstElementChild;
    items.scrollTo(scrollPosition, 0);
  }

  function unselectAllDots() {
    var dots = this.$carousel.lastElementChild;
    for (var i = 0; i < dots.childElementCount; i += 1) {
      dots.children[i].className = '';
    }
  }

  function highlightDot(index) {
    this.unselectAllDots();
    var dots = this.$carousel.lastElementChild;
    for (var i = 0; i < dots.childElementCount; i += 1) {
      if (i === index) {
        dot = dots.children[i].className = 'active';
      }
    }
  }

  function update() {
    this.selectView(this.$selectedView);
    this.highlightDot(this.$selectedView);
  }

  function _onDotClick(e) {
    if (e.target.tagName !== 'LI') return;
    clearInterval(this.$interval);
    this.$selectedView = parseInt(e.target.dataset.index, 10);
    this.update();
  }

  function registerListeners() {
    var dots = this.$carousel.lastElementChild;
    dots.addEventListener('click', _onDotClick.bind(this));
  }

  function updateWidth() {
    var width = this.$width.toString() + 'px';
    this.$carousel.style.width = width;
    var list = this.$carousel.querySelector('.items ul');
    var lis = list.children;
    for (var i = 0; i < lis.length; i += 1) {
      lis[i].style.width = width;
    }
  }

  function init() {
    this.updateWidth();
    this.createDots();
    this.registerListeners();
    this.update();
  }

  function setWidth(width) {
    this.$width = width;
    this.updateWidth();
  }

  var defaultOptions = {
    width: 800,
  };

  function Carousel(options) {
    this.$options = Object.assign({}, defaultOptions, options);
    this.$width = this.$options.width;
    this.$carousel = document.querySelector('.carousel');
    this.$selectedView = 0;

    this.createDots = createDots.bind(this);
    this.selectView = selectView.bind(this);
    this.unselectAllDots = unselectAllDots.bind(this);
    this.highlightDot = highlightDot.bind(this);
    this.update = update.bind(this);
    this.registerListeners = registerListeners.bind(this);
    this.init = init.bind(this);
    this.setWidth = setWidth.bind(this);
    this.updateWidth = updateWidth.bind(this);

    this.$interval = setInterval(function () {
      if (this.$selectedView + 1 >= this.$count) {
        this.$selectedView = 0;
      } else {
        this.$selectedView += 1;
      }
      this.update();
    }.bind(this), 4000);
  }

  window.Carousel = Carousel;

  return Carousel;
})(window);
