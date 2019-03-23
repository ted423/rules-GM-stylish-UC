// ==UserScript==
// @name		Lofter显示原图
// @namespace	https://github.com/ted423
// @version		1.0
// @description	Lofter显示原图
// @grant		unsafeWindow
// @author		ted423
// @match		*://*.lofter.com/post/*
// @run-at		document-end
// ==/UserScript==
    "use strict";
	var imgs = document.querySelectorAll(".img img");
	[].forEach.call(imgs, function(img) {
	img.src=img.src.split("?")[0];
	console.log(img.src);
	});