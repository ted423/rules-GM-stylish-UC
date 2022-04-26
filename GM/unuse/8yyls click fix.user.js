// ==UserScript==
// @name        8yyls click fix
// @description 8yyls.com漫画站上一页以及下一页修复，这个脚本只有火狐需要装，因为这个网站的href里的函数在漫画看完一话后会返回null导致火狐跳转到一个错误的页面
// @namespace   https://github.com/ted423
// @include     http://8yyls.com/*
// @version     1.2
// ==/UserScript==
var click = document.querySelectorAll(".redfont_input[href*='javascript']");
[].forEach.call(click, function(each) {
	if (/scroll/.test(each.href)) {
		each.href=each.href.replace('scroll(', 'scrollTo(');
		if (each.textContent == "下一頁")document.querySelector('#caonima').setAttribute('onclick', each.href.replace('javascript:', ''));
	}
	each.setAttribute('onclick', each.href.replace('javascript:', ''));
	each.href = "javascript:void(0);";

})