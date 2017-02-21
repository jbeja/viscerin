(function ($) {
	$.fn.pageNav = function (userSettings) {

		const map = new Map();
		const $navigators = this;
		const settings = $.extend({
			offset: 0,
			activeClass: 'scroll-navigator-active',
			duration: 600
		}, userSettings);


		$navigators.click(function (e) {
			e.preventDefault();
			e.stopPropagation();
			let href = $(this).attr('href');
			let obj = map.get(href);
			let {top} = obj;
			$('html, body').animate({
				'scrollTop': `${top + settings.offset}px`,
			}, settings.duration);
			return false;
		}); 
		let lastBottom = 0; 
		calculate();
		function calculate() {
			$navigators.each(function (i, el) {
				let $el = $(el);
				let href = $el.attr('href');
				if (!href.startsWith("#")) {
					throw Error(`href ${href} should start with "#".`);
				}
				let section = $(`${href}`);
				let top = section.offset().top - settings.offset;
				let bottom = top + section.outerHeight();
				if (top <= lastBottom) {
					console.log(top - lastBottom);
					let diff = Math.abs(top - lastBottom);
					top = top + diff + 1;
				}
				lastTop = bottom;
				if (section.length) {
					map.set(href, {
						navigator: $el,
						section: section,
						top: ~~top,
						bottom: ~~bottom,
					});
				} else {
					console.log(`Missing section ${href}`);
				}
			});
		}
		function throttle(fn, wait) {
			var id;
			return function () {
				if (id !== undefined) {
					clearTimeout(id);
					id = undefined;
				} else {
					id = setTimeout(() => {
						fn();
					}, wait);
				} 
			};
		}
		console.log(map)
		let $window = $(window);
		function select() {
			var scroll = $window.scrollTop();
			map.forEach((v, k) => {
				if (scroll >= v.top && scroll <= v.bottom) {

					console.log(scroll, v.top, v.bottom, k)
					$navigators.removeClass(settings.activeClass).promise().then(() => {
						$(`[href='${k}']`).addClass(settings.activeClass);
					});
				}
			})
		}
		select();
		$window.resize(calculate);
		$window.scroll(select);


	};
})(jQuery);