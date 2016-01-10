// ==UserScript==
// @name           去除云管家
// @author         ted423
// @description    去除云管家，理论上支持MAC
// @namespace	https://greasyfork.org/users/85
// @license        GPL version 3
// @include        http*://yun.baidu.com/*
// @include        http*://pan.baidu.com/*
// @run-at         document-start
// @version 0.0.1.20170227120904
// ==/UserScript==
(function() {
	// 下面的去除云管家，会对上传插件无法显示上传文件夹
	navigator.__defineGetter__('platform', function() {
		return 'Linux x86';
	});
	navigator.__defineGetter__('userAgent', function() {
		return 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0';
	});

	//阻止百度网盘wap版自动跳转,来自https://greasyfork.org/zh-CN/scripts/13434
	document.addEventListener('beforescriptexecute', function(e) {
		if (e.target.id == 'platform') {
			e.preventDefault();
		}
	});
})();