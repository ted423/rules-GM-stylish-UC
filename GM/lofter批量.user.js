// ==UserScript==
// @name         lofter.com原图网址批量下载(点击标题运行脚本)
// @namespace    https://saber.love/?p=4073
// @version      0.1
// @description  在lofter.com的文章页，显示图片的原图网址，方便下载。
// @author       ted423
// @description  修改自雪见仙尊 的脚本
// @match        *.lofter.com/post/*
// @grant       GM_download
// @icon 		http://ssf91.lofter.com/favicon.ico
// ==/UserScript==
'user strict';
var btn =document.querySelector("h1 a")
btn.href = "";
btn.onclick = function(){
let pic_urls = '';
let pic_elements = document.querySelectorAll('.imgclasstag');
var time = window.prompt("请输入日期","");
if (time != null)
if (pic_elements.length > 0) {
	var i=0;
	for (const e of pic_elements) {
		i++;
		var name = time + '_' + document.title + '_' + i;
		var url = e.getAttribute('bigimgsrc').split('?')[0]
		pic_urls += url + '<br>';
		var temp = url.split('.')
		var ext="."+temp[temp.length-1];
		GM_download(url,name+ext);
	}
	pic_elements[0].parentNode.parentNode.parentNode.parentNode.insertAdjacentHTML('afterbegin', pic_urls);
}
}