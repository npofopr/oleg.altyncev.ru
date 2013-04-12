	// CHANGE PAGE
	function setActivePage() {
		
			$('.page').removeClass('active').hide();
			var path = $.address.path();
			path = path.slice(1, path.length);
			path = giveDetailUrl() != -1 ? portfolioKeyword : path;
			if(path == "") {  // if hash tag doesnt exists - go to first page
				var firstPage = $('#header ul li').first().find('a').attr('href');
				path = firstPage.slice(2,firstPage.length);
				$.address.path(path);
				}
			
			
			if(Modernizr.csstransforms && Modernizr.csstransforms3d) { // modern browser
				$('#'+ path).show().removeClass('animated ' + safeModPageOutAnimation).addClass('animated ' + safeModPageInAnimation);
			} else { //old browser
				$('#'+ path).fadeIn();
				$('.page.active').hide();
			}	
			
			$('#'+ path).addClass('active');
			
			setTimeout(function() { setCurrentMenuItem(); }, 100 );
			
			if(path.indexOf(portfolioKeyword) != -1) {
				setupPortfolio();
				setTimeout(function() { setupPortfolio(); }, 1000);
			} 
			if ($('.page.resume').hasClass('active')) {
				emptyBars();
				animateBars();
			}
			$("body").scrollTop(0);
			
			//iphone google map fix
			if($('.page.active .map iframe').length) {
				var map = $('.page.active .map').html();
				$('page.active .map').empty();
				setTimeout(function() { $('.page.active .map').html(map); }, 100);
			}
		
	}

	// ------------------------------
	// JMPRESS LAYOUT
	// setup jmpress
	if(!safeMod) { // don't run jmpress if mobile safe mode is on 
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


	// ------------------------------
	// NAV MENU
	// setup menu clicks
	$('#header nav ul a').click( function() {
		if($(this).parent().hasClass('current-menu-item')) {
			return;	
		}
		$(this).addClass('waiting');
		$('#header nav ul li').removeClass('current-menu-item');
		});
	// ------------------------------


	// ------------------------------
	// MOBIL NAV MENU - SELECT LIST
	/* Clone our navigation */
	var mainNavigation = $('#header nav ul').clone();
	
	/* Replace unordered list with a "select" element to be populated with options, and create a variable to select our new empty option menu */
	$('#header nav').prepend('<select class="mobile-nav"></select>');
	var selectMenu = $('select.mobile-nav');
	
	/* Navigate our nav clone for information needed to populate options */
	$(mainNavigation).children('li').each(function() {
		 $(selectMenu).append(generateSelectLink($(this), ''));
	});
	
	function generateSelectLink(li, prefix) {
		var href = li.children('a').attr('href');
		var text = li.children('a').text();
		return '<option value="' + href+ '"> ' + prefix + text + '</option>';
	}
	
	/* When our select menu is changed, change the window location to match the value of the selected option. */
	$(selectMenu).change(function() {
		location = this.options[this.selectedIndex].value;
	});
	// ------------------------------