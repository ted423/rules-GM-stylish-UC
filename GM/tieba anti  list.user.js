// ==UserScript==
// @name         Tieba anti list
// @version     1.0
// @description  去除贴吧搜索框的下拉列表
// @grant          none
// @include      http://tieba.baidu.com/*
// @namespace https://greasyfork.org/users/85
// ==/UserScript==

document.getElementById("tb_header_search_form").id="XX";
document.getElementById("wd2").id="xx";