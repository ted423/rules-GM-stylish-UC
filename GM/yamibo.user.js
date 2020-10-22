// ==UserScript==
// @name         yamibo自动加载图片
// @namespace   
// @version      0.1
// @description  yamibo自动加载图片
// @author       ted423
// @run-at       document-end
// @match        https://bbs.yamibo.com/forum.php*
// @grant        none
// ==/UserScript==

(function() {
var imgs = document.querySelectorAll("img[src='static/image/common/none.gif']");

[].forEach.call(imgs, function(img) {
	img.src=img.attributes["zoomfile"].value
	console.log(img.src);
	})
})();