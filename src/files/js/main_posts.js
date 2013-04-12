$(function() {
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
});
function setCurrentMenuItem() {
	var activePageId = $('#pages .active').attr('id');
	$('#header nav ul a').removeClass('waiting');
	$('#header nav ul a[href$=' + activePageId +']').parent().addClass('current-menu-item').siblings().removeClass('current-menu-item');
	$("select.mobile-nav option").attr("selected","");
	$('select.mobile-nav option[value$=' + activePageId +']').attr("selected","selected");
}