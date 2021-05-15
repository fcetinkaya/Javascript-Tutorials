(function ($) {
    "use strict";
    enableSwiper();
    $('[data-nav-menu]').on('click', function (event) {
        var $this = $(this),
            visibleHeadArea = $this.data('nav-menu');
        $(visibleHeadArea).toggleClass('visible');
    });
})(jQuery);

