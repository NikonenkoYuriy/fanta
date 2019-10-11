(function ($) {

    // Init variables.
    var arrSlides = $('#wrapperSlides.scroll > div');
        countSlides = arrSlides.length,
        activeSlide = 0,
        showInfoBlock = true,
        btnNext = $('#next span'),
        btnNextSvg = $('#next svg'),
        btnPrev = $('#prev span'),
        btnPrevSvg = $('#prev svg');

    $.jInvertScroll(['#wrapperSlides.scroll'], {
        height: countSlides * 1000,
        onScroll: function (percent, currSlide, exactlySlide) {
            activeSlide = currSlide;
            activeSlideId = $(arrSlides[currSlide]).attr('id');
            showInfoBlock = exactlySlide;

            // Temporary block.
            var p = $('#p');
            p.html('Percents: ' + (percent * 100).toFixed(2) + '% Active slide: #' + activeSlideId);

            // Change active a link.
            $('a').removeClass('activeTour');
            $('a[href="#' + activeSlideId + '"]').addClass('activeTour');

            // Change active div block.
            $('div').removeClass('activeTour');
            if (showInfoBlock) {
                $('div[target="#' + activeSlideId + '"]').addClass('activeTour');
            }
        }
    });

    // Function: switch slide by jquery obj.
    function GoToSlide(obj) {
        var left = 0,
            k = 0;
        if (obj.length) {
            k = ($(document).outerHeight(true) - obj.outerHeight(true)) / ((countSlides - 1) * obj.outerWidth(true));
            left = obj.position().left;
        }
        $('html,body').animate({
            scrollTop: Math.ceil(left * k)
        }, 1500);
    }

    // Function: switch slide by id.
    function GoToSlideId(id) {
        GoToSlide($(id));
    }

    // Function: switch slide by num.
    function GoToSlideNum(num) {
        GoToSlide($(arrSlides[num]));
    }

    $(document).ready(function () {

        // Switch pages by click to menu item.
        $('.toursFadeMenu ul li a').on('click', function (e) {
            e.preventDefault();
            GoToSlideId($(this).attr('href'));
        });

        // Prev link.
        $('#prev').on('click', function (e) {
            e.preventDefault();
            GoToSlideNum((activeSlide > 0) ? activeSlide - (showInfoBlock ? 1 : 0) : activeSlide);
            inactiveBtn(activeSlide - 1);
        });

        // Next link.
        $('#next').on('click', function (e) {
            e.preventDefault();
            GoToSlideNum((activeSlide < countSlides - 1) ? activeSlide + 1 : countSlides - 1);
            inactiveBtn(activeSlide + 1);
        });

        // Random link.
        $('#random').click(function (e) {
            e.preventDefault();
            var randomNumber = Math.round(Math.random() * (countSlides - 1));
            GoToSlideNum(randomNumber);
            inactiveBtn(randomNumber);
        });


        $('.hoverBtn').hover(
            function () {
                if (!$(this).children('span').hasClass('inactiveBtn')) {
                    console.log($(this).children('span'));
                    $($(this).children('span')).attr('id', 'hover');
                    $($(this).children('svg')).attr('id', 'hover');
                }
            },
            function () {
                $($(this).children('span')).attr('id', '');
                $($(this).children('svg')).attr('id', '');
            });
        
        inactiveBtn(activeSlide);
        
        //button illumination: prev, next
        function inactiveBtn(activeSlide) {
            if (activeSlide <= 0) {
                btnPrev.attr('class', 'inactiveBtn');
                btnPrevSvg.attr('class', 'inactiveBtn');
            } else if (activeSlide === (countSlides - 1)) {
                btnNext.attr('class', 'inactiveBtn');
                btnNextSvg.attr('class', 'inactiveBtn');
            } else {

                btnNext.attr('class', 'activBtn');
                btnNextSvg.attr('class', 'activBtn');
                btnPrev.attr('class', 'activBtn');
                btnPrevSvg.attr('class', 'activBtn');
            }
        }

        var triangleBlock = $('.triangle-block');
        var triangle = $('.triangle');
        var triangleP = $('.triangle-p');
        var triangleForm = $('.triangleForm');
        var yellow = $('.yellow');

        //triangle block animation
        triangle.click(function (e) {
            e.preventDefault();
           triangleBlock.toggleClass('positionRight');
            triangleForm.toggleClass('show');
            triangleP.toggleClass('hide');
            yellow.removeClass('positionYellow').toggleClass('yellowAnime');
        });

    });

}(jQuery));