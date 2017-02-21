/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Must be puted on the head!
 * Global functions and polyfills that must be set before the DOM is loaded.
 */

/*
 * Some helpers to load assets in asynchronously
 * @returns {undefined}
 */


/* @@cc_on
     @@if (@@_jscript_version <= 6)
     (function (f) {window.setTimeout = f(window.setTimeout)})(function (f) {
     return function (c, t) {
     var a = [].slice.call(arguments, 2);
     return f(function () {
     c.apply(this, a) }, t);
     }
     }
     );
     @@end
     @@*/

window.MQ = Object.freeze({
    tiny: window.matchMedia("only screen and (max-width: 33.9em)").matches,
    tinyUp: window.matchMedia("only screen and (min-width: 34em)").matches,
    small: window.matchMedia("only screen and (max-width: 47.9em)").matches,
    smallUp: window.matchMedia("only screen and (min-width: 48em)").matches,
    medium: window.matchMedia("only screen and (max-width: 61.9em)").matches,
    mediumUp: window.matchMedia("only screen and (min-width: 62em)").matches,
    large: window.matchMedia("only screen and (max-width: 74.9em)").matches,
    largeUp: window.matchMedia("only screen and (min-width: 75em)").matches,
});

(function(styleSheetLinks, documentStyleSheets, w) {
    'use strict';
    var mobileFactor = "(max-width: 62em)";
    w.doSync = function( /*fn, args*/ ) {
        var fn = [].slice.call(arguments, 0, 1)[0];
        var args = [].slice.call(arguments, 1);
        if (window.requestAnimationFrame !== undefined) {
            w.requestAnimationFrame(function() {
                fn.apply(this, args);
            });
        } else {
            setTimeout(fn, 0, args);
        }
    };

    w.appendStyle = function(style) {
        document.head.appendChild(style);
    };

    w.inStyleSheets = function(href) {
        return [].some.call(document.styleSheets, function(s) {
            var sh = s.href;
            return (sh && sh.indexOf(href) > -1);
        });
    };

    w.setMedia = function(style, media) {
        var href = style.href;
        media = media;
        if (Array.isArray(style)) {
            style = style[0];
            href = style.href;
        }
        var setIn = w.inStyleSheets(href);
        if (setIn) {
            style.media = media;
            return true;
        }
        w.doSync(w.setMedia, style, media);
    };
    w.setMediaMobile = function(style) {
        w.setMedia(style, mobileFactor);
    };

    w.setMediaDesktop = function(style) {
        w.setMedia(style, "all");
    };

    [].forEach.call(styleSheetLinks, function(s) {
        var media = s.media;
        if (media === 'x')
            w.setMediaDesktop(s);
        if (media === 'm')
            w.setMediaMobile(s);
    });
})(document.getElementsByTagName('link'), window.document.styleSheets, window);
