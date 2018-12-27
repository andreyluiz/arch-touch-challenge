(function (window) {
  var breakpoint = {};
  breakpoint.refreshValue = function () {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  };
  breakpoint.refreshValue();

  var carousel;

  function updateCarousel() {
    var width;
    switch (breakpoint.value) {
      case 'desktop':
        width = 1000;
        break;
      case 'tablet':
        width = 600;
        break;
      default:
        width = 300;
    }

    if (carousel) {
      carousel.setWidth(width);
      return;
    }

    carousel = new window.Carousel({ width: width });
    carousel.init();
  }

  updateCarousel();

  window.addEventListener('resize', function () {
    breakpoint.refreshValue();
    updateCarousel();
  });
})(window);
