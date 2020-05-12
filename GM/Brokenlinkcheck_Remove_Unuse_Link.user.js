// ==UserScript==
// @name		Brokenlinkcheck Remove Unuse Link
// @namespace	https://github.com/ted423
// @description 用来移除磁力链以及ed2k这些链接的
// @include		https://www.brokenlinkcheck.com/broken-links.php
// @require		http://code.jquery.com/jquery-2.1.4.min.js
// @require     https://greasyfork.org/scripts/13495-jquery-resize/code/jquery-resize.js
// @version		1
// @grant		none
// @run-at         document-end
// ==/UserScript==

$('#inputForm').resize(function(){
	console.log('resize');
	$('input[value*="ed2k://"]').parent().parent().remove();
	$('input[value*="qqdl://"]').parent().parent().remove();
	$('input[value*="thunder://"]').parent().parent().remove();
	$('input[value*="flashget://"]').parent().parent().remove();
	$('input[value*="magnet:?xt=urn:btih"]').parent().parent().remove();
});