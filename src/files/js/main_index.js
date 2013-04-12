var safeMod = false;
$(function() {
	if(jQuery.browser.touch) {
		$('html').addClass('touch');	
	}
	initializeAnimations();
	var detailUrl = giveDetailUrl();
	var ios5 = (navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i) != null) || 
		(navigator.userAgent.match(/OS 4_[0-9_]+ like Mac OS X/i) != null) || 
		(navigator.userAgent.match(/OS 3_[0-9_]+ like Mac OS X/i) != null);
	safeMod = $('html').attr('data-safeMod') === 'true';
	mobileSafeMod = $('html').attr('data-mobileSafeMod') === 'true' && jQuery.browser.mobile;
	safeMod = safeMod || mobileSafeMod || !Modernizr.csstransforms || !Modernizr.csstransforms3d || ios5;
	if(safeMod) {
		$('html').removeClass('no-overflow').addClass('safe-mod');	
		setActivePage();
		$.address.change(function() {
			setActivePage();
			});
	}
	function setActivePage() {
			$('.page').removeClass('active').hide();
			var path = $.address.path();
			path = path.slice(1, path.length);
			if(path == "") {
				var firstPage = $('#header ul li').first().find('a').attr('href');
				path = firstPage.slice(2,firstPage.length);
				$.address.path(path);
				}
			if(Modernizr.csstransforms && Modernizr.csstransforms3d) {
				$('#'+ path).show().removeClass('animated ' + safeModPageOutAnimation).addClass('animated ' + safeModPageInAnimation);
			} else {
				$('#'+ path).fadeIn();
				$('.page.active').hide();
			}	
			$('#'+ path).addClass('active');
			setTimeout(function() { setCurrentMenuItem(); }, 100 );
			if ($('.page.resume').hasClass('active')) {
				emptyBars();
				animateBars();
			}
			$("body").scrollTop(0);
	}
	if(!safeMod) {
		$('#pages').jmpress({
			stepSelector: '.page',
			fullscreen : false,
			transitionDuration: duration,
			animation       : { transitionDuration : duration / 1000 + 's' },
			mouse: { clickSelects: false },
			keyboard : { use : false },
			idle : function() {
				setCurrentMenuItem();
				refreshScrollBars();
				},
			beforeChange : function( element, eventData ) { 
				var activePage = $(element[0]);
				if(activePage.hasClass('resume')) {
					animateBars();
					}
				}
		});
	}
	$('#header nav ul a').click( function() {
		if($(this).parent().hasClass('current-menu-item')) {
			return;	
		}
		$(this).addClass('waiting');
		$('#header nav ul li').removeClass('current-menu-item');
		});
	var mainNavigation = $('#header nav ul').clone();
	$('#header nav').prepend('<select class="mobile-nav"></select>');
	var selectMenu = $('select.mobile-nav');
	$(mainNavigation).children('li').each(function() {
		 $(selectMenu).append(generateSelectLink($(this), ''));
	});
	function generateSelectLink(li, prefix) {
		var href = li.children('a').attr('href');
		var text = li.children('a').text();
		return '<option value="' + href+ '"> ' + prefix + text + '</option>';
	}
	$(selectMenu).change(function() {
		location = this.options[this.selectedIndex].value;
	});
	if (!safeMod) {
		setupScrollBars();
		$(window).resize(function() {
		  refreshScrollBars();
		});
	}
});
var ajaxClicked;
window.onload = function() {
	if (!safeMod) {
		refreshScrollBars();
	}
};
var pActive, inAnimation, outAnimation, safeModPageInAnimation, safeModPageOutAnimation, lightboxInAnimation, duration;
function initializeAnimations() {
	inAnimation = $('html').attr('data-inAnimation');
	outAnimation = $('html').attr('data-outAnimation');
	safeModPageInAnimation = $('html').attr('data-safeModPageInAnimation');
	safeModPageOutAnimation = $('html').attr('data-safeModPageOutAnimation');
	lightboxInAnimation = $('html').attr('data-lightboxInAnimation');
	profileImageAnimation = $('html').attr('data-profileImageAnimation');
	duration = $('html').attr('data-jmpressAnimationDuration');
	$('.te-transition').addClass(profileImageAnimation);
}
function giveDetailUrl() {
	var address = $.address.value();
	var detailUrl;
	return detailUrl;
}
function setupScrollBars() {
	if(!safeMod) {
		$(".iscroll-wrapper").jScroll({ 
			useTransition : jQuery.browser.touch ? true : false,
			fadeScrollbar : jQuery.browser.mobile ? false : true,
			lockDirection : false,
			hideScrollbar : $('html').attr('data-hideScrollbar') != 'false',
			forceIscroll : true,
			scrollbarClass: 'iscrollbar'
			});
	}
}
function refreshScrollBars() {
	if(!safeMod) {
	 $(".iscroll-wrapper").jScroll("refresh");
	}
}
function setCurrentMenuItem() {
	var activePageId = $('#pages .active').attr('id');
	$('#header nav ul a').removeClass('waiting');
	$('#header nav ul a[href$=' + activePageId +']').parent().addClass('current-menu-item').siblings().removeClass('current-menu-item');
	$("select.mobile-nav option").attr("selected","");
	$('select.mobile-nav option[value$=' + activePageId +']').attr("selected","selected");
}
function animateBars() {
	emptyBars();
	$('.bar').each(function() {
		 var bar = $(this);
		 setTimeout( function() { bar.find('.progress').addClass('easing-long').css('width', bar.attr('data-percent') + '%' ); } , duration);
		});
}	
function emptyBars() {	
	$('.bar').each(function() {
		 var bar = $(this);
		 bar.find('.progress').removeClass('easing-long').css('width', 0 ); 
		});
}