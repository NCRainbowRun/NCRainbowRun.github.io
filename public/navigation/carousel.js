(function ($) {
    $.fn.infiniteCarousel = function () {
        function repeat(str, num) {
            return new Array(num + 1).join(str);
        }

        return this.each(function () {
            var $wrapper = $('> div', this).css('overflow', 'hidden'),
                $slider = $wrapper.find('> ul'),
                $items = $slider.find('> li'),
                $single = $items.filter(':first'),

                singleWidth = $single.outerWidth(true),

                visible = Math.ceil($wrapper.innerWidth() / singleWidth),
                currentPage = 1,
                pages = Math.ceil($items.length / visible);

            if (($items.length % visible) !== 0) {
                for(var i = 0; i <= visible - ($items.length % visible); i++)
                {
                    var $clone = $items.filter(':nth-child('+ i +')').clone().addClass('empty');
                    $slider.append($clone);
                }

                $items = $slider.find('> li');
            }

            $items.filter(':first').before($items.slice(-visible).clone().addClass('cloned'));
            $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));

            $wrapper.scrollLeft(singleWidth * visible);
            //gotopage is invoked every 10 seconds
            var autoScroll = setInterval(function(){gotoPage(currentPage + 1)}, 3000);

            function gotoPage(page) {
                var dir = page < currentPage ? -1 : 1,
                    n = Math.abs(currentPage - page),
                    left = singleWidth * dir * visible * n;

                $wrapper.filter(':not(:animated)').animate({
                    scrollLeft: '+=' + left
                }, 300, function () {
                    if (page === 0) {
                        $wrapper.scrollLeft(singleWidth * visible * pages);
                        page = pages;
                    } else if (page > pages) {
                        $wrapper.scrollLeft(singleWidth * visible);
                        page = 1;
                    }
                    currentPage = page;
                });
                return false;
            }

            $('a.back').click(function (e) {
                e.preventDefault();
                return gotoPage(currentPage - 1);
            });

            $('a.forward').click(function (e) {
                e.preventDefault();
                return gotoPage(currentPage + 1);
            });

            $(this).bind('goto', function (event, page) {
                gotoPage(page);
            });
        });
    };
})(jQuery);

$(document).ready(function () {
    $('.carousel').infiniteCarousel();
});