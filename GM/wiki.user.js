// ==UserScript==
// @name		wiki open image
// @version		2.1
// @description	wiki
// @include		http://*.wikia.com/wiki/*
// @include		http://img1.wikia.nocookie.net/*
// @grant		none
// @run-at		document-end
// ==/UserScript==

var temp=/^https?:\/\/.*\.wikia\.com\/wiki\/file/i;
if(temp.test(location.href))
	temp=document.getElementsByClassName("internal")[0];
a=temp.href.split("/revision");
temp.href=a[0];
temp.click();