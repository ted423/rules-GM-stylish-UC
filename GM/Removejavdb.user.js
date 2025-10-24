// ==UserScript==
// @name        Removejavdb
// @namespace   ted423
// @include     https://javdb.com/v/*
// @description 去除磁力链接里的"javdb.com"
// @version     1.0
// @grant       none
// ==/UserScript==

var temp=document.querySelectorAll('button.button.copy-to-clipboard');
[].forEach.call(temp,function(each){each.dataset.clipboardText = each.dataset.clipboardText.replace('[javdb.com]','');})
