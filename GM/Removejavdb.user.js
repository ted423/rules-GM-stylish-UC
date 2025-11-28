// ==UserScript==
// @name        Removejavdb
// @namespace   ted423
// @include     https://javdb.com/v/*
// @description 去除磁力链接里的"javdb.com"
// @version     1.1
// @grant       none
// @run-at      document-end
// ==/UserScript==

var temp=document.querySelectorAll('a[href*="magnet"]');
[].forEach.call(temp,function(each){each.href = each.href.replace('[javdb.com]','');})
