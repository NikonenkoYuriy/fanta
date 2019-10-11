(function($) {
  $.jInvertScroll = function(sel, options) {
    var defaults = {
      width: 'auto',
      height: 'auto',

      // Callback fired when the user scrolls down, the percentage of how far the user has scrolled down gets passed as parameter.
      onScroll: function(percent) {
        // Do whatever you like.
      }

    };

    var config = $.extend(defaults, options);

    if(typeof sel === 'Object' && sel.length > 0) {
      return;
    }

    var elements = [];
    var longest = 0;

    // Extract all selected elements from dom and save them into an array by resize.
    var onResize = function(e) {
      $.each(sel, function(i, val) {
        $(val).each(function(e) {
          var tmp = {
            width: $(this).outerWidth(true),
            height: $(this).outerHeight(true),
            el: $(this),
            numSlides: $(this).children().length,
            currSlide: 0,
            exactlySlide: true
          }

          elements.push(tmp);
          if(longest < tmp.width) {
            longest = tmp.width;
          }
        });
      });
    }
    onResize(null);
    $(window).on('load resize', onResize);

    // Use the longest elements width + height if set to auto.

    if(config.width == 'auto') {
      config.width = longest;
    }

    if(config.height == 'auto') {
      config.height = longest;
    }

    // Set the body to the selected height.
    $('body').css('height', config.height + 'px');

    // Listen for the actual scroll event.
    var onScroll = function(e) {
      var currY = $(this).scrollTop();
      var totalHeight = $(document).outerHeight(true);
      var winHeight = $(this).outerHeight(true);
      var winWidth = $(this).outerWidth(true);

      // Current percentual position.
      var scrollPercent = (currY / (totalHeight - winHeight));
      var deltaPercent = (50 / (totalHeight - winHeight));

      // Do the position calculation for each element.
      $.each(elements, function(i, el) {
        var currSlideFloat = (scrollPercent + deltaPercent) * (el.numSlides - 1);
        el.currSlide = Math.floor(currSlideFloat);
        el.exactlySlide = (deltaPercent * el.numSlides > Math.abs(currSlideFloat - el.currSlide));

        // Move element.
        var pos = Math.floor((el.width - winWidth) * scrollPercent) * -1;
        el.el.css('left', pos);

        // Call the onScroll callback.
        if (typeof config.onScroll === 'function') {
          config.onScroll.call(this, scrollPercent, el.currSlide, el.exactlySlide);
        }
      });
    };
    onScroll(null);
    $(window).on('load scroll resize', onScroll);
  };
}(jQuery));
