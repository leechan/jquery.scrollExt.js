(function($) {
	$.fn.originalOn = $.fn.on;
	var scrollRegx = /^scroll[\>|\<|\/]\d+/;
	var timerRegx = /\/(\d+)/;
	var topRegx = /\>(\d+)/;
	var bottomRegx = /\<(\d+)/;

	$.fn.on = function() {
		var eventName = arguments[0];
		if(scrollRegx.test(eventName)) {
			var rtimer = 0, rtop, rbottom, scrollTimer;
			if(timerRegx.test(eventName)) {
				rtimer = Number(eventName.match(timerRegx)[1]);
			}

			if(topRegx.test(eventName)) {
				rtop = Number(eventName.match(topRegx)[1]);
			}
			
			if(bottomRegx.test(eventName)) {
				rbottom = Number(eventName.match(bottomRegx)[1]);
			}

			$(this).originalOn('scroll', function() {
				scrollTimer && clearTimeout(scrollTimer);
				var $this = $(this);
				var scrollTop = $(this).scrollTop();
				var height = $(this).height();
				var winHeight = $(window).height();

				scrollTimer = setTimeout(function() {
					if(typeof rtop !== 'undefined') {
						if(scrollTop >= rtop) {
							$this.trigger(eventName);
						}
					} else if(typeof rbottom !== 'undefined') {
						if(height - scrollTop - winHeight <= rbottom) {
							$this.trigger(eventName);
						}
					} else {
						$this.trigger(eventName);
					}
				}, rtimer);
			})

		}

		$(this).originalOn.apply(this, arguments);
	}
})(jQuery)