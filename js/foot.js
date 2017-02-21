(function () {
    "use strict";
    var dom = {
        $nav: $("#navigation"),
        $mobileNav: $("#mobileNavigation"),
        $mobileNavTrigger: $("#mobileNavigationTrigger")
    };
    var $nav;
    if ((MQ.mediumUp && MQ.large) || MQ.largeUp) {
        $nav = dom.$nav;
    } else {
        $nav = dom.$mobileNav;
        var $trigger = dom.$mobileNavTrigger;
        $trigger.click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            $trigger.toggleClass('in');
            $nav.toggleClass('in');
        });
    }
    var state = {
        scroll: {
            timeoutId: null,
            lastScrollY: 0,
        }
    };
    var scrollDelta = 5;
    var navHeight = $nav.height();
    var $window = $(window);

    $window.on('scroll', function(event){
        if (state.scroll.timeoutId)  {
            clearTimeout(state.scroll.timeoutId);
        }
        state.scroll.timeoutId = setTimeout(function () {
             var lastScrollY  = state.scroll.lastScrollY;
             var currentScrollY = $window.scrollTop();
             if (currentScrollY > navHeight) {
                if (!$nav.hasClass('inverse')) {
                    $nav.addClass('inverse');
                }
             } else {
                if ($nav.hasClass('inverse')) {
                    $nav.removeClass('inverse');
                }
             }
             if (!$nav.hasClass('in')) {
                 if (Math.abs(currentScrollY - lastScrollY) >= scrollDelta) {
                     if (currentScrollY > lastScrollY && currentScrollY > navHeight) {
                        $nav.addClass('up').removeClass('down');
                     }
                     else if (currentScrollY + $window.height() < document.documentElement.offsetHeight) {
                         $nav.addClass('down').removeClass('up');
                     }
                     state.scroll.lastScrollY =  currentScrollY;
                 }
             }
        }, 50);
    });
})();


