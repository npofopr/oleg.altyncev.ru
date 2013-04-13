$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	/*$("#back-top").hide();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});*/
});
// Tags
	var OurString = $(".tags").html();
	var NewOurString="";
	OurString=OurString.split(", ");
	for(i=0;i<OurString.length;i++ ){
	NewOurString= NewOurString+"<div class='tag_item'>"+OurString[i]+"</div> ";
	}
	$(".tags").html(NewOurString);