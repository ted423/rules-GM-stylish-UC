// ==UserScript==
// @name        Remove"(ED2000.COM)"
// @namespace   https://greasyfork.org/users/85
// @include     http://www.ed2000.com/ShowFile*
// @include     http://www.bt2mag.com/*
// @description 就是把ed2K连接里的"(ED2000.COM)"去除而已
// @version     3.0
// @grant       none
// ==/UserScript==
if(location.href.indexOf("ed2000.com")!=-1){
	var temp=document.querySelectorAll('a[href*="ed2k"]');
	[].forEach.call(temp,function(each){each.href = each.href.replace('(ED2000.COM)','');})
}
else document.getElementsByClassName("modal-open")[0].removeAttribute("class");