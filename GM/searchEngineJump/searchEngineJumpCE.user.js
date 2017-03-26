// ==UserScript==
// @name		searchEngineJump-NextStage
// @author		ted423
// @contributor	NLF && ywzhaiqi
// @description	方便的在各个引擎之间跳转。可自定义搜索列表的 NLF 修改版。
// @version		8.1703.25.0
// @include		*
// @namespace	https://greasyfork.org/users/85
// @require		http://code.jquery.com/jquery-2.2.0.min.js
// @downloadURL	https://github.com/ted423/rules-GM-stylish-UC/raw/master/GM/searchEngineJump/searchEngineJumpCE.user.js
// @updateURL	https://github.com/ted423/rules-GM-stylish-UC/raw/master/GM/searchEngineJump/searchEngineJumpCE.user.js
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_addStyle
// @run-at		document-start
// ==/UserScript==


(function() {
	"use strict";
	var prefs = {
		openInNewTab: false, //是否在新页面打开.
		engineListDataType: "ted423", //搜索列表默认类型
		debug: false
	};
	var engineListData = {
		custom: "",
		ted423: "网页--search\n	Google\n		Google, https://www.google.com/search?q=%s&safe=off, fa-google\n		Google.hk, https://www.google.com.hk/search?q=%s&safe=off, fa-google\n		Google.co.jp，https://www.google.co.jp/search?q=%s&safe=off, fa-google\n	百度\n		百度, https://www.baidu.com/s?wd=%s, fa-paw\n		简洁搜索, https://www.baidu.com/s?wd=firefox&ie=utf-8&tn=baidulocal, fa-paw\n	360, https://www.so.com/s?q=%s\n	Bing\n		Bing(CN), https://cn.bing.com/search?q=%s, fa-bing\n		Bing(Global), https://global.bing.com/search?q=%s&setmkt=en-us&setlang=en-us, fa-bing\n	搜狗, https://www.sogou.com/web?query=%s\n	DuckDuckGo, https://duckduckgo.com/?q=%s, fa-duckduckgo\n	Yahoo\n		Yahoo, https://search.yahoo.com/search?p=%s, fa-yahoo\n		Yahoo(tw), https://tw.search.yahoo.com/search?p=%s, fa-yahoo\n 		Yahoo.co.jp, https://search.yahoo.co.jp/search?p=%s&aq=-1&x=wrt, fa-yahoo\n资料--book\n	WIKI\n		ZWIKI, http://zh.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch, fa-wikipedia-w\n		EWIKI, https://en.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch, fa-wikipedia-w\n		JWIKI, http://ja.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch, fa-wikipedia-w\n	百科, http://baike.baidu.com/searchword/?word=%s, fa-paw\n	Internet Archive, https://archive.org/search.php?query=%s\n	Scholar, http://scholar.google.com/scholar?hl=zh-CN&q=%s&btnG=&lr=, fa-scholar\n	学术, http://xueshu.baidu.com/s?wd=%s, fa-paw\n	知乎, https://www.zhihu.com/search?q=%s, fa-zhihu\n	萌娘百科, http://zh.moegirl.org/index.php?search=%s, https://zh.moegirl.org/favicon.ico\n	Book, https://www.google.com/search?q=%s&btnG=%E6%90%9C%E7%B4%A2%E5%9B%BE%E4%B9%A6&tbm=bks&tbo=1&hl=zh-CN&gws_rd=ssl, fa-google\n	开发\n		stackoverflow, https://stackoverflow.com/search?q=%s, fa-stack-overflow\n		MDN, https://developer.mozilla.org/en-US/search?q=%s，fa-MDN\n		github, https://github.com/search?q=%s\n		krugle, http://opensearch.krugle.org/document/search/#query=%s，http://opensearch.krugle.org/media/images/favicon.ico\n		npm, https://www.npmjs.org/search?q=%s, https://i.imgur.com/Ec0WrY8.png\n地图--map\n	百度, http://map.baidu.com/?newmap=1&s=s%26wd%3D%s, fa-paw\n	Google, https://www.google.com/maps/search/%s/, fa-google\n	Bing, https://www.bing.com/ditu/?q=%s, fa-bing\n	搜狗, http://map.sogou.com/#lq=%s, https://www.sogou.com/favicon.ico\n音乐--music\n	Music, http://music.baidu.com/search?key=%s&ie=utf-8&oe=utf-8, fa-paw\n	搜狗, http://mp3.sogou.com/music.so?query=%s, https://www.sogou.com/favicon.ico\n	一听, http://so.1ting.com/all.do?q=%s\n	虾米, http://www.xiami.com/search?key=%s, fa-xiami\n	piapro, https://piapro.jp/search/?view=audio&keyword=%s\n	Lyric, http://music.baidu.com/search/lrc?key=%s, fa-paw\n图片--image\n	百度, http://image.baidu.com/search/index?tn=baiduimage&word=%s, fa-paw\n	Google, https://www.google.com.hk/search?tbm=isch&q=%s, fa-google\n	花瓣, https://huaban.com/search/?q=%s, https://huaban.com/img/touch-icon-iphone.png\n	Picsearch, http://cn.picsearch.com/index.cgi?q=%s\n	Flickr, https://www.flickr.com/search/?w=all&q=%s, fa-flickr\n	Pixiv, http://www.pixiv.net/search.php?s_mode=s_tag&word=%s\n	dA, https://www.deviantart.com/browse/all/?q=%s, fa-deviantart\n下载--download\n	二次元\n		dmhy, https://share.dmhy.org/topics/list?keyword=%s\n		Tokyotosho, https://www.tokyotosho.info/search.php?terms=%s\n		Mikan, http://mikanani.me/Home/Search?searchstr=%s\n		＊MioBT＊, http://www.miobt.com/search.php?keyword=%s, http://www.miobt.com/images/favicon/miobt.ico\n		ACG搜，http://www.acgsou.com/search.php?keyword=%s, fa-download\n		简单动漫, http://www.36dm.com/search.php?keyword=%s, fa-download\n		KOTOMI RSS, https://moe4sale.in/?kw=%s, fa-download\n		ACG狗狗, http://bt.acg.gg/search.php?keyword=%s\n		ACG.RIP, https://acg.rip/?term=%s\n	nyaa\n		nyaa.eu, https://www.nyaa.eu/?page=search&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n		nyaa.se, http://www.nyaa.se/?page=search&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n		sukebei(eu), https://sukebei.nyaa.eu/?page=search&cats=0_0&filter=0&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n		sukebei(se), http://sukebei.nyaa.se/?page=search&cats=0_0&filter=0&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n	BTSOW, https://btso.pw/search/%s, https://btso.pw/app/bts/View/img/btsow.com.favicon.ico\n	种子狗, http://www.zhongzigou.net/so/%s/, http://www.zhongzigou.net/app/bts/View/img/favicon.ico\n	影视\n		kat.how, https://kat.how/usearch/%s/, https://kat.how/favicon.ico\n		thepiratebay, https://thepiratebay.org/search/%s\n		ExtraTorrent, http://extratorrent.cc/search/?search=%s\n		isoHunt, https://isohunt.to/torrents/?ihq=%s\n		1337x, http://1337x.to/search/%s/1/\n		RARBG, https://rarbg.to/torrents.php?search=%s\n	GGBases, http://www.ggbases.com/search.so?title=%s, fa-g\n	TK, https://www.torrentkitty.tv/search/%s\n	ed2k\n		ed2kers, https://www.google.com/search?q=%s+site%3Aed2kers.com, http://www.ed2kers.com/favicon.ico\n		xiaohx, http://www.xiaohx.net/search?key=%s, http://s.cdn.acgimg.com/xiaohx.com/images/favicon.ico\n		逛电驴, http://verycd.gdajie.com/find.htm?keyword=%s\n	字幕\n		subom, http://www.subom.net/search/%s\n		sub HD, http://subhd.com/search/%s, fa-subhd\n		射手网(伪), http://sub.makedie.me/sub/?searchword=%s\n网购--cart-arrow-down\n	一淘, http://s.etao.com/search?q=%s\n	京东, https://search.jd.com/Search?keyword=%s&enc=utf-8, fa-jd\n	淘宝, https://s.taobao.com/search?q=%s\n	亚马逊, https://www.amazon.cn/s/ref=nb_ss?keywords=%s\netc--plus-square\n	邮编库, http://www.youbianku.com/%s\n	AMO, https://addons.mozilla.org/zh-CN/firefox/search/?q=%s, fa-firefox\n	汉典(字), http://www.zdic.net/sousuo/?q=%s&tp=tp1\n	汉典(词), http://www.zdic.net/sousuo/?q=%s&tp=tp3",
	};

	var MAIN_CSS = "sejul{border: 1px solid #333;}sej-i {vertical-align:initial;color: #333;}#sej-container:hover {z-index: 999999999999999;opacity: 1.0;}sejul, sejli {margin: 0;padding: 0;list-style: none outside;}sejli {display: list-item;}sejli:hover>sejul {display:block;}body>sejul>sejli {float: left;}sejli sejul {position: absolute;}sejli sejul sejul {margin-left: 100px;margin-top: -30px;}sejli sejul .sej-engine {padding: 4px 0px;width:100%;text-align: left;}#sej-container {background: white;box-shadow:0px 0px 3px #aaaaaa;margin:0 auto;opacity: 0.5;display:table;font-family: Comic Sans MS, 'Microsoft YaHei', 微软雅黑;position: relative;line-height: 1.5;font-size: 13px;transition: opacity 0.5s ease-in-out;}#sej-container>sejli {float: left;border-right: 1px solid #333;}#sej-container>sejli:last-child {border-right: none;}#sej-expanded-category {display: inline-block;font-weight: bold;padding: 2px 4px;line-height: 2;}#sej-expanded-category::after {content:' :';}.sej-engine {line-height: 2;display: inline-block;margin: 0;border: none;padding: 2px 4px;text-decoration: none;transition: background-color 0.15s ease-in-out;}a.sej-engine {white-space: nowrap;    min-width: 80px;    text-align: center;}a.sej-engine:visited, a.sej-engine:active {color: #120886;}a.sej-engine:link, a.sej-engine:visited {text-decoration: none;}.sej-drop-list-trigger-shown {background-color: #DEEDFF !important;}.sej-drop-list-trigger::after {content:\'\';display: inline-block;margin: 0 0 0 3px;padding: 0;width: 0;height: 0;border-top: 6px solid #BCBCBC;border-right: 5px solid transparent;border-left: 5px solid transparent;border-bottom: 0px solid transparent;transition: -webkit-transform 0.3s ease-in-out;transition: transform 0.3s ease-in-out;}.sej-drop-list-trigger-shown::after {-webkit-transform: rotate(180deg);transform: rotate(180deg);}.sej-engine:hover {background-color: #EAEAEA;}.sej-engine-icon {display: inline-block;height: 16px;border: none;padding: 0;margin: 0 3px 0 0;vertical-align: sub;}.sej-drop-list {display: none;float: left;min-width: 100px;font-size: 13px;-moz-box-shadow: 2px 2px 5px #ccc;-webkit-box-shadow: 2px 2px 5px #ccc;box-shadow: 2px 2px 5px #ccc;background-color: white;}.sej-drop-list> sejli{border-bottom: 1px solid #333;}.sej-drop-list> sejli:last-child {border-bottom: none;}";

	var categoryMap = { //rules 和 engineList 的对应
		"web": "网页",
		"map": "地图",
		"video": "视频",
		"music": "音乐",
		"image": "图片",
		"knowledge": "资料",
		"sociality": "社交",
		"shopping": "网购",
		"download": "下载",
	};

	var engineListIntroduce = getMStr(function() {
		/*
		<div>
			<h2>分类规则：</h2>
			<i>【名称最好不要更改，类别跟站点规则有个对应关系】</i>
			<p>1、"音乐--music"，代表类别是 "音乐"，图标使用"fa-music"</p>
		</div>
		<div>
			<h2>搜索引擎规则：</h2>
			<code>名称，地址（%s 关键字），站点图标(或者font-awesome)</code>
			<p>1、"//" 开头会被忽略</p>
			<p>2、中间分隔符：中文逗号（，） 或 英文逗号 + 空格（, ）</p>
			<p>站点图标也可省略</p>
			<p>4、POST 方式(未测试，可能会出现问题)</p>
		</div>
		 */
	});

	function introduceToHtml() {
		return engineListIntroduce.replace(/(（.*?）)/g, "<span>$1</span>")
			.replace(/"(.*?)"/g, "<span>$1</span>");
	}
	var defaultStyleFix = "html{margin-top:32.1px;}#sej-container{position:fixed;top:0px;z-index:1999;margin:0;}";
	var defaultStyleFixNoMarginTop = "#sej-container{position:fixed;top:0px;z-index:1999;margin:0;}";

	function isTheSameCategory(c1, c2) {
		return (categoryMap[c1] || c1) == (categoryMap[c2] || c2);
	}

	var rules = [ //根据规则把搜索引擎列表插入到指定网站
		// 网页,第一个可以当模板看
		{
			name: "google网页搜索", //你要加载的网站的名字(方便自己查找)
			url: /^https?:\/\/(encrypted\.google\.com|www\.google\.(?!co\.jp)[^\/]{2,9})\/(webhp|search|#|$|\?)(?!.*tbm=)/, //在哪个网站上加载,正则.
			mutationTitle: true, //mutationTitle监视标题的变化
			engineList: "web", //加载哪个类型的列表:
			style: "width: calc(100% - 15px);padding-left: 15px;top: 1px;", //给引擎列表的样式
			// keyword 使用 css选中一个form input元素 或者 该项是一个函数，使用返回值
			// 插入文档,相关
			// target 将引擎跳转工具栏插入到文档的某个元素
			// (请使用css匹配,比如: "#subform_ctrl" );
			// where 四种:
			// "beforeBegin"(插入到给定元素的前面) ;
			// "afterBegin"(作为给定元素的第一个子元素) ;
			// "beforeEnd" (作为给定元素的最后一个子元素) ;
			// "afterEnd"(插入到给定元素的后面);.
			insertIntoDoc: {
				target: "#top_nav",
				where: "beforeBegin",
			},
			stylish: "#top_nav{padding-top: 23px;}", //自定义样式
		}, {
			name: "google.co.jp",
			url: /^https?:\/\/www\.google\.co\.jp\/(webhp|search|#|$|\?)(?:.(?!&tbm=))*$/,
			mutationTitle: true,
			engineList: "web",
			style: "width: calc(100% - 15px);padding-left: 15px;top: 1px;",
			insertIntoDoc: {
				target: "#top_nav",
				where: "beforeBegin",
			},
			stylish: "#top_nav{padding-top: 23px;}",
		}, {
			name: "baidu 简洁搜索", //百度简洁搜索：https://www.baidu.com/s?wd=firefox&ie=utf-8&tn=baidulocal
			url: /^https?:\/\/www\.baidu\.com\/s\?.*tn=baidulocal/,
			engineList: "web",
			keyword: "input[name='wd']",
			stylish: defaultStyleFix,
		}, {
			name: "baidu 网页搜索", //因为不刷新搜索，所以百度跳简洁搜索会有问题
			url: /^https?:\/\/www\.baidu\.com\/(?:s.*|baidu.*|)$/,
			mutationTitle: true,
			engineList: "web",
			style: "margin-left: 122px;",
			insertIntoDoc: {
				target: "#s_tab",
				where: "afterEnd",
			},
			endFix: function() {
					if (getComputedStyle(document.getElementById("lg")).display != "none") remove();
				} //通过检测首页图片判断在首页的话不显示
		}, {
			name: "bing(global)",
			url: /^https?:\/\/global\.bing\.com\/search/,
			engineList: "web",
			style: "border-collapse:separate;",
			stylish: defaultStyleFix,
		}, {
			name: "必应网页搜索",
			url: /^https?:\/\/(cn|www)\.bing\.com\/search/,
			engineList: "web",
			style: "border-collapse:separate;",
			stylish: defaultStyleFix,
		}, {
			name: "360搜索",
			url: /^https?:\/\/www\.so\.com\/s\?/,
			engineList: "web",
			style: "margin-left: 20px;",
			insertIntoDoc: {
				target: "#header",
				where: "afterEnd",
			},
		}, {
			name: "搜狗网页搜索",
			url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
			engineList: "web",
			style: "margin-bottom: 10px;margin-left: 35px;",
			insertIntoDoc: {
				target: "#wrapper",
				where: "beforeBegin",
			},
			stylish: ".header{ margin-bottom: 5px; }"
		}, {
			name: "雅虎网页搜索",
			url: /^https?:\/\/search\.yahoo\.com\/search/,
			change: "noExternalRequests",
			engineList: "网页",
			style: "margin-left: 15px;",
			insertIntoDoc: {
				target: "#hd",
				where: "afterEnd"
			},
			stylish: "#doc #sticky-hd ~ #bd {margin-top: 110px;}"
		}, {
			name: "tw.yahoo",
			url: /^https?:\/\/tw\.search\.yahoo\.com\/search/,
			change: "noExternalRequests",
			engineList: "web",
			style: "margin-left:15px;margin-top:5px;",
			insertIntoDoc: {
				target: "#sticky-hd",
				where: "beforeEnd"
			},
			stylish: "#bd {margin-top: 105px!important;}"
		}, {
			name: "yahoo.co.jp",
			url: /^https?:\/\/search\.yahoo\.co\.jp\/search/,
			engineList: "web",
			stylish: defaultStyleFix,
		}, {
			name: "duckduckgo",
			url: /^https?:\/\/duckduckgo\.com\/\?/,
			engineList: "web",
			stylish: defaultStyleFix,
		},
		// 知识
		{
			name: "Scholar",
			url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
			engineList: "资料",
			style: "margin-left:0px;width: 100%;",
			insertIntoDoc: {
				target: "#gs_ab",
				where: "beforeBegin"
			}
		}, {
			name: "百度学术",
			url: /^https?:\/\/xueshu\.baidu\.com\/s\?/,
			engineList: "资料",
			insertIntoDoc: {
				target: "#container",
				where: "beforeBegin",
			},
		}, {
			name: "百度百科",
			url: /^https?:\/\/baike\.baidu\.com\/(search|item)/,
			engineList: "资料",
			style: "z-index: 999999;",
			insertIntoDoc: {
				target: ".header-wrapper",
				where: "afterEnd",
			},
		}, {
			name: "萌娘百科",
			url: /^https?:\/\/zh\.moegirl\.org\/./,
			engineList: "资料",
			style: "z-index: 999999;",
			keyword: function() {
				if (document.getElementById("searchText")) return document.querySelector("input[type='search']").value;
				else return document.getElementById("firstHeading").textContent;
			},
			insertIntoDoc: {
				target: "#content",
				where: "afterBegin",
			},
		}, {
			name: "Google book",
			url: /^https?:\/\/www\.google\.co.{1,3}\/search\?.*(&btnG=%E6)|(tbm=bks)/,
			mutationTitle: true,
			engineList: "资料",
			style: "width: calc(100% - 15px);padding-left: 15px;top: 1px;",
			insertIntoDoc: {
				target: "#top_nav",
				where: "beforeBegin",
			},
			stylish: "#top_nav{padding-top: 23px;}",
		}, {
			name: "互动百科",
			url: /^https?:\/\/[a-z]{2,3}\.baike\.com\/[a-z]/,
			engineList: "资料",
			style: "z-index:99999;padding:0,auto;",
			keyword: function() {
				var input;
				if (document.getElementsByClassName("ac_input")[0] != undefined) {
					if (document.getElementsByClassName("ac_input")[0].value != "")
						input = document.getElementsByClassName("ac_input")[0].value;
					else if (document.getElementsByClassName("blue")[0].innerHTML != "") input = document.getElementsByClassName("blue")[0].innerHTML;
					else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
				} else if (document.getElementsByClassName("blue")[0].innerHTML != "") input = document.getElementsByClassName("blue")[0].innerHTML;
				else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
				return input;
			},
			stylish: ".bk-head{background:none}",
		}, {
			name: "wiki",
			url: /^https?:\/\/..\.wikipedia\.org\/w\/index\.php(?!.*\?search=)/,
			engineList: "资料",
			insertIntoDoc: {
				target: "#siteNotice",
				where: "beforeBegin"
			}
		}, {
			name: "wiki[ZH]",
			url: /^https?:\/\/zh\.wikipedia\.org\/(?:zh|wiki\/|w\/index.php\?search=)/,
			engineList: "资料",
			keyword: function() {
				if (document.getElementById("searchText"))
					return document.getElementById("searchText").value;
				else return document.getElementById("firstHeading").childNodes[0].textContent;
			},
			insertIntoDoc: {
				target: "#siteNotice",
				where: "beforeBegin"
			}
		}, {
			name: "wiki[EN]",
			url: /^https?:\/\/en\.wikipedia\.org\/(wiki\/|w\/index\.php\?search=)/,
			engineList: "资料",
			keyword: function() {
				if (document.getElementById("searchText"))
					return document.getElementById("searchText").value;
				else return document.getElementById("firstHeading").childNodes[0].textContent;
			},
			insertIntoDoc: {
				target: "#siteNotice",
				where: "beforeBegin"
			}
		}, {
			name: "wiki[JP]",
			url: /^https?:\/\/ja\.wikipedia\.org\/(wiki\/|w\/index\.php\?search=)/,
			engineList: "资料",
			keyword: function() {
				if (document.getElementById("searchText"))
					return document.getElementById("searchText").value;
				else return document.getElementById("firstHeading").childNodes[0].textContent;
			},
			insertIntoDoc: {
				target: "#siteNotice",
				where: "beforeBegin"
			}
		}, {
			name: "百度知道(search)",
			url: /^https?:\/\/zhidao\.baidu\.com\/search/,
			engineList: "资料",
			style: "margin-bottom: 8px;margin-left: 21px;",
			insertIntoDoc: {
				target: "#body",
				where: "beforeBegin"
			},
		}, {
			name: "百度知道(question)",
			url: /^https?:\/\/zhidao\.baidu\.com\/question/,
			engineList: "资料",
			style: "white-space: nowrap;",
			insertIntoDoc: {
				target: "#body",
				where: "beforeBegin"
			},
			endFix: function() { //插入搜索条后修正绿色背景错位的问题
				var container = document.getElementById("sej-container");
				if (container && document.body.classList.contains("has-menu")) {
					document.body.style.backgroundPosition = "0px " + (95 + container.clientHeight) + "px";
				}
			},
		}, {
			name: "知乎",
			url: /^https?:\/\/www\.zhihu\.com\/search\?/,
			change: "noExternalRequests",
			engineList: "资料",
			insertIntoDoc: {
				target: ".zu-top",
				where: "afterEnd"
			},
			stylish: "#sej-container{position:fixed;z-index:10;}"
		}, {
			name: "stackoverflow",
			url: /^https?:\/\/stackoverflow\.com\/search\?/,
			engineList: "资料",
			insertIntoDoc: {
				target: ".topbar",
				where: "afterEnd"
			}
		}, {
			name: "百度文库",
			url: /^https?:\/\/wenku\.baidu\.com\/search\?/,
			engineList: "资料",
			stylish: defaultStyleFix,
		}, {
			name: "豆丁",
			url: /^https?:\/\/www\.docin\.com\/search\.do/,
			engineList: "资料",
			insertIntoDoc: {
				target: ".theme_header",
				where: "afterEnd"
			}
		},
		// 地图
		{
			name: "百度地图",
			url: /^https?:\/\/map\.baidu\.com\/\?newmap/,
			engineList: "map",
			stylish: defaultStyleFixNoMarginTop,
		}, {
			name: "google地图",
			url: /^https?:\/\/www\.google\.co.{1,4}\/maps/,
			engineList: "map",
			mutationTitle: true,
			style: "z-index: 9999999;",
		}, {
			name: "Bing地图",
			url: /^https?:\/\/[^.]*\.bing\.com\/ditu\//,
			engineList: "map",
			stylish: "html{height:calc(100% - 32.1px)}",
		}, {
			name: "搜狗地图",
			url: /^https?:\/\/map\.sogou\.com\/#/,
			engineList: "map",
		},
		// 音乐
		{
			name: "百度音乐",
			url: /^https?:\/\/music\.baidu\.com\/search/,
			engineList: "music",
			stylish: defaultStyleFix,
		}, {
			name: "搜狗音乐",
			url: /^https?:\/\/mp3\.sogou\.com\/music\.so/,
			engineList: "music",
			stylish: defaultStyleFixNoMarginTop + "html{margin-top:20px}",
		}, {
			name: "音悦台",
			url: /^https?:\/\/so\.yinyuetai\.com\/mv\?/,
			engineList: "music",
			insertIntoDoc: {
				target: ".hint",
				where: "beforeBegin"
			},
		}, {
			name: "一听音乐",
			url: /^https?:\/\/so\.1ting\.com\//,
			engineList: "music",
			insertIntoDoc: {
				target: ".nav",
				where: "beforeBegin"
			}
		}, {
			name: "xiami",
			url: /^https?:\/\/www\.xiami\.com\/search/,
			engineList: "music",
			style: "word-break:keep-all;margin-right: 205px;",
			keyword: "#search_text",
			stylish: defaultStyleFix,
		},
		// 图片
		{
			name: "谷歌图片",
			url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/search\?(.*tbs=sbi)|(.*tbm=isch)/,
			engineList: "image",
			style: "margin-left:0px;width:100%",
			insertIntoDoc: {
				target: "#top_nav",
				where: "beforeBegin"
			},
			stylish: "#top_nav{padding-top: 23px;}",
		}, {
			name: "百度图片",
			url: /^https?:\/\/image\.baidu\.c(om|n)\/search/,
			engineList: "image",
			style: "margin-left:35px"
		}, {
			name: "360图片",
			url: /^https?:\/\/\image\.so\.com\/i\?/,
			engineList: "image",
			style: "word-break:keep-all;white-space:nowrap;margin-top: 7px;",
			insertIntoDoc: {
				target: "#searchBox",
				where: "beforeEnd"
			},
			stylish: "#searchBox{height:75px !important;}.searchwrap{height:60px}"
		}, {
			name: "bing图片",
			url: /^https?:\/\/.*\.bing\.com\/images\/search/,
			engineList: "image",
			style: "z-index:9999",
		}, {
			name: "搜狗图片",
			url: /^https?:\/\/pic\.sogou\.com\/pic/,
			engineList: "image",
			style: "margin-top: 10px;margin-left:35px;",
			insertIntoDoc: {
				target: ".fix_area",
				where: "beforeEnd"
			},
			stylish: "#hdFix{height:130px !important;}",
		}, {
			name: "花瓣",
			url: /^https?:\/\/huaban\.com\/search\/\?/,
			engineList: "image",
			style: "box-shadow:none;",
			insertIntoDoc: {
				target: "#header",
				where: "beforeEnd"
			},
			stylish: "#page{padding-top: 75px;}#header{height: 80px;}.floating{top: 80px !important;}",
		}, {
			name: "flickr",
			url: /^https?:\/\/www\.flickr\.com\/search/,
			change: "noExternalRequests",
			engineList: "image",
			keyword: function() {
				var input = document.querySelector("input[type='text'][value]");
				if (input) return input.value;
				else {
					var m = location.search.match(/q=([^&]+)/i);
					if (m) return true;
				}
			},
			insertIntoDoc: {
				target: "body",
				where: "beforeBegin"
			},
			stylish: "#sej-container{position:fixed;z-index:1999;top:50px}.sej-engine{padding:0 4px}"
		}, {
			name: "picsearch",
			url: /^http:\/\/(..|...)\.picsearch\.com\/index\.cgi/,
			engineList: "image",
			stylish: defaultStyleFix,
		}, {
			name: "pixiv",
			url: /^http:\/\/www\.pixiv\.net\/search\.php/,
			engineList: "image",
			style: "z-index:9999",
			keyword: "input[name=word]",
		}, {
			name: "deviantart",
			url: /^https?:\/\/www\.deviantart\.com\/browse\/all\//,
			engineList: "image",
			style: "margin-bottom:10px;",
			keyword: "#searchInput",
			insertIntoDoc: {
				target: ".browse-top-bar",
				where: "afterEnd"
			},
			etc: function() { //这个是为了调整编码
				if (window.location.href.indexOf("%26%23") == -1 && /%[A-Fa-f8-9][A-Fa-f0-9]/.test(window.location.href)) {
					var url = window.location.href.split("q=");
					window.location.href = url[0] + "q=" + toEscapeCharacter(decodeURIComponent(url[1]));
				}
			}
		},
		// 下载
		{
			name: "dmhy",
			url: /^https?:\/\/share\.dmhy\.org\/topics\/list/,
			engineList: "download",
			keyword: function() {
				var key = document.querySelector("#keyword").value;
				if (key) return key;
				else key = document.title.split(/「|」/)[1];
				return key;
			},
			insertIntoDoc: {
				target: ".quick_search",
				where: "afterEnd"
			}
		}, {
			name: "kat.how",
			url: /^https?:\/\/kat\.how\/u?search/,
			engineList: "download",
			insertIntoDoc: {
				target: ".mainpart",
				where: "beforeBegin"
			},
		}, {
			name: "Tokyotosho",
			url: /^https?:\/\/www\.tokyotosho\.info\/search\.php/,
			engineList: "download",
			stylish: defaultStyleFix,
		}, {
			name: "＊MioBT＊",
			url: /^https?:\/\/www\.miobt\.com\/search\.php/,
			engineList: "download",
			keyword: "#topsearch",
			stylish: defaultStyleFix,
		}, {
			name: "爱恋动漫",
			url: /^https?:\/\/www\.kisssub\.org\/search\.php/,
			engineList: "download",
			keyword: "#topsearch",
			stylish: defaultStyleFix,
		}, {
			name: "Mikan",
			url: /^https?:\/\/mikanani\.me\/Home\/Search\?searchstr/,
			engineList: "download",
			stylish: defaultStyleFix,
		}, {
			name: "acgsou",
			url: /^https?:\/\/www\.acgsou\.com\/search\.php/,
			engineList: "download",
			keyword: "#topsearch",
			stylish: defaultStyleFix + ".table_fixed{table-layout:auto;}",
		}, {
			name: "36dm",
			url: /^https?:\/\/www\.36dm\.com\/search\.php/,
			engineList: "download",
			keyword: "#topsearch",
			stylish: defaultStyleFix + ".table_fixed{table-layout:auto;}",
		}, {
			name: "KOTOMI RSS",
			url: /^https?:\/\/moe4sale\.in\/\?kw/,
			engineList: "download",
			stylish: defaultStyleFix,
		}, {
			name: "ACG狗狗",
			url: /^https?:\/\/bt\.acg\.gg\/search/,
			engineList: "download",
			keyword: "#topsearch",
			stylish: defaultStyleFix,
		}, {
			name: "nyaa",
			url: /^https?:\/\/www\.nyaa\.(se|eu)\/\?page=search/,
			engineList: "download",
			style: "top:44px;",
			keyword: "input[name='term']",
			insertIntoDoc: {
				target: "#topbar",
				where: "afterEnd"
			},
			stylish: "#main{padding-top:70px;}",
		}, {
			name: "sukebei.nyaa",
			url: /^https?:\/\/sukebei\.nyaa\.(se|eu)\/\?page=search/,
			engineList: "download",
			style: "top:44px;",
			keyword: "input[name='term']",
			insertIntoDoc: {
				target: "#topbar",
				where: "afterEnd"
			},
			stylish: "#main{padding-top:70px;}",
		}, {
			name: "GGBases",
			url: /^https?:\/\/www\.ggbases\.com\/search/,
			engineList: "download",
			stylish: defaultStyleFix,
		}, {
			name: "ACG.RIP",
			url: /^https?:\/\/acg\.rip\/\?term/,
			engineList: "download",
			stylish: defaultStyleFix,
		}, {
			name: "xiaohx",
			url: /^https?:\/\/www\.xiaohx\.net\/search\?/,
			engineList: "download",
			insertIntoDoc: {
				target: ".header_box",
				where: "afterEnd"
			},
		}, {
			name: "ed2000",
			url: /^https?:\/\/www\.ed2000\.com\/FileList\.asp/,
			engineList: "download",
			stylish: defaultStyleFix,
		}, {
			name: "BTSOW",
			url: /^https?:\/\/btso\.pw\/search\//,
			engineList: "download",
			style: "word-break:keep-all;white-space:nowrap;margin: 5px 0;",
			keyword: "input[name='keyword'][value]",
			insertIntoDoc: {
				target: ".fullsearch-form.search",
				where: "afterEnd"
			},
			etc: function() {
				if (window.location.href.indexOf("%20") != -1) window.location.href = window.location.href.replace("%20", "+");
			}
		}, {
			name: "torrentkitty",
			url: /^https?:\/\/(www\.)?torrentkitty\.(net|org|tv)\/search\//,
			engineList: "download",
			style: "margin-top:50px;",
			keyword: function() {
				return document.getElementsByTagName("h2")[0].innerHTML.slice(18, -1);
			},
			insertIntoDoc: {
				target: ".wrapper",
				where: "afterEnd"
			}
		},
		//字幕
		{
			name: "subom",
			url: /^https?:\/\/www\.subom\.net\/search/,
			engineList: "download",
			insertIntoDoc: {
				target: "#container",
				where: "afterBegin"
			}
		}, {
			name: "subhd",
			url: /^https?:\/\/subhd\.com\/search/,
			engineList: "download",
			style: "top: -10px; text-align: left;",
			keyword: "#sn",
			insertIntoDoc: {
				target: ".container.list",
				where: "beforeBegin"
			}
		}, {
			name: "射手网(伪)",
			url: /^https?:\/\/assrt\.net\/sub\/\?s/,
			engineList: "download",
			style: "text-align: left;",
			insertIntoDoc: {
				target: "#site_header",
				where: "afterEnd"
			}
		},
		// 购物
		{
			name: "一淘",
			url: /^https?:\/\/s8?\.etao\.com\/search/,
			engineList: "shopping",
			insertIntoDoc: {
				target: ".etao-header",
				where: "beforeBegin"
			}
		}, {
			name: "京东",
			url: /^https?:\/\/search\.jd\.com\/(S|s)earch\?/i,
			engineList: "shopping",
			insertIntoDoc: {
				target: "div[id*='nav-201']",
				where: "beforeBegin"
			}
		}, {
			name: "淘宝搜索",
			url: /^https?:\/\/(s|haosou\.ai)\.taobao\.com\/search/,
			engineList: "shopping",
			style: "box-shadow: none;",
			insertIntoDoc: {
				target: "body",
				where: "beforeBegin",
			},
		}, {
			name: "易迅",
			url: /^https?:\/\/searchex\.yixun\.com\/html\?/,
			engineList: "shopping",
			insertIntoDoc: {
				target: ".ic_header",
				where: "beforeEnd"
			}
		}, {
			name: "苏宁",
			url: /^https?:\/\/search\.suning\.com\//,
			engineList: "shopping",
			style: "border-bottom:1px solid #E5E5E5;",
			insertIntoDoc: {
				target: ".ng-header",
				where: "afterEnd"
			}
		}, {
			name: "天猫",
			url: /^https?:\/\/list\.tmall\.com\/\/?search/,
			engineList: "shopping",
			style: "margin-bottom:3px;",
			insertIntoDoc: {
				target: "#header",
				where: "afterEnd"
			}
		}, {
			name: "亚马逊",
			url: /^https?:\/\/www\.amazon\.cn\/s\/ref/,
			engineList: "shopping",
			stylish: defaultStyleFixNoMarginTop,
		}, {
			name: "当当",
			url: /^https?:\/\/search\.dangdang\.com\/\?key/,
			engineList: "shopping"
		}, {
			name: "newegg",
			url: /^https?:\/\/www\.newegg\.com\.tw\/search\?/,
			engineList: "shopping",
			keyword: "#searchword",
		},
	];

	function loadPrefs() {
		prefs.openInNewTab = GM_getValue("openInNewTab", prefs.openInNewTab);
		prefs.debug = GM_getValue("debug", prefs.debug);
		prefs.engineListDataType = GM_getValue("engineListDataType", prefs.engineListDataType);

		engineListData.custom = GM_getValue("engineList") || "";

		reloadDebug();
	}

	function openPrefs() {
			var d = document;
			var on = function(node, e, f) {
				node.addEventListener(e, f, false);
			};

			var $ = function(s) {
				return d.getElementById("sej-prefs-" + s);
			};
			if ($("setup")) return;

			var styleNode = GM_addStyle("\
		#sej-prefs-setup { position:fixed;z-index:2147483647;top:38px;right:60px;padding:20px 30px 10px;background:#eee;width:500px;border:1px solid black; }\
		#sej-prefs-setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
		#sej-prefs-setup i { 'Microsoft YaHei UI','微软雅黑',Arial; }\
		#sej-prefs-setup a { color:black;text-decoration:underline; }\
		#sej-prefs-setup div { text-align:center;font-size:14px; }\
		#sej-prefs-title { font-weight:bold; }\
		#sej-prefs-setup ul { margin:15px 0 0 0;padding:0;list-style:none;background:#eee;border:0; }\
		#sej-prefs-setup input, #sej-prefs-setup select { border:1px solid gray;padding:2px;background:white; height: auto; }\
		#sej-prefs-setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
		#sej-prefs-setup textarea { width:98%; height:60px; margin:3px 0; font-family: 'Microsoft YaHei UI','微软雅黑',Arial; }\
		#sej-prefs-setup button { padding: 1px 6px; font-size: 12px; margin-right: 3px; }\
		#sej-prefs-setup #top-buttons{text-align: left;}\
		#sej-prefs-setup img { display: initial; }\
		#sej-prefs-minitip { position: absolute; background: #ff9; border: 1px solid #F96; padding: 10px; left: -400px; top: 200px; right: 570px; }\
		#sej-prefs-minitip p { margin: 5px 5px; }\
		#sej-prefs-minitip span { color: green; }\
		#sej-prefs-debug { margin-left: 18px; }\
		");

			var div = d.createElement("div");
			div.id = "sej-prefs-setup";
			d.body.appendChild(div);
			div.innerHTML = "\
		<div id='top-buttons'>\
			<button id='sej-prefs-ok' title='立即生效'>√ 确定</button>\
			<button id='sej-prefs-cancel' title='取消本次设定，所有选项还原'>X 取消</button>\
		</div>\
		<div id='sej-prefs-title'>SearchEngineJumpCE 设置</div>\
		<ul>\
			<li>\
				<input type='checkbox' id='sej-prefs-openInNewTab' /> 在新页面打开\
				<input type='checkbox' id='sej-prefs-debug' /> 调试模式\
			</li>\
			<li>\
				搜索列表版本：\
				<select id='sej-prefs-engineListDataType' >\
					<option value='custom'>用户版本</option>\
					<option value='ted423'>ted423版本</option>\
				</select>\
				<a style='margin-left: 20px;' target='_blank' href='https://greasyfork.org/zh-CN/scripts/16193/feedback' title='通过反馈给作者加入你的版本'>加入你的版本？</a>\
			</li>\
			<li>自定义搜索列表：\
				<sej-i id='sej-prefs-engineList-tip' class='fa' style='border: 1px solid #000000; width: 18px; text-align: center; border-radius: 10px; cursor: pointer;'>?</sej-i>\
				<div>\
					<textarea id='sej-prefs-engineList' style='height: 350px;'></textarea>\
				</div>\
			</li>\
		</ul>\
		<div id='sej-prefs-minitip' style='display: none;'>" +
				introduceToHtml() + "\
		</div>\
		";
			div = null;

			var engineListType_sel = $("engineListDataType"),
				engineList_txt = $("engineList");

			var close = function() {
				if (styleNode) {
					styleNode.parentNode.removeChild(styleNode);
				}
				var div = $("setup");
				div.parentNode.removeChild(div);
			};

			on($("ok"), "click", function() {
				GM_setValue("openInNewTab", prefs.openInNewTab = !!$("openInNewTab").checked);
				GM_setValue("debug", prefs.debug = !!$("debug").checked);
				GM_setValue("engineListDataType", prefs.engineListDataType = engineListType_sel.value);
				// GM_setValue("position", prefs.position = $("position").value);

				if (engineListType_sel.value == "custom") {
					GM_setValue("engineList", engineListData.custom = engineList_txt.value);
				}

				// 刷新工具条
				remove();
				run();
				reloadDebug();

				close();
			});

			on($("cancel"), "click", close);

			$("engineList-tip").onclick = function() {
				var minitip = $("minitip");
				minitip.style.display = (minitip.style.display == "block") ? "none" : "block";
			};

			engineListType_sel.onchange = function() {
				engineList_txt.value = engineListData[engineListType_sel.value].trim();
			};

			$("openInNewTab").checked = prefs.openInNewTab;
			$("debug").checked = prefs.debug;
			engineListType_sel.value = prefs.engineListDataType;

			engineList_txt.value = engineListData[prefs.engineListDataType].trim();
		}
		// --------------------可设置项结束------------------------
	var debug;

	function reloadDebug() {
		debug = prefs.debug ? console.debug.bind(console) : function() {};
	}


	function getPostFormHTML(url, args, newTab) { //获取 method 为 POST 的表单的 HTML
		var form = "<form method='post'" +
			" action='" + url + "'" +
			(newTab ? " target='_blank'" : "") +
			">";
		for (var arg in args) {
			var input = "<input type='hidden'" +
				" name='" + arg + "'" +
				" value='" + args[arg] + "'" +
				" />";
			form += input;
		}
		form += "</form>";
		return form;
	}

	function wrapToHide(html) { //包装 HTML 元素代码以隐藏该元素
		return "<span style='display:none;'>" + html + "</span>";
	}

	function toRE(obj) {
		if (obj instanceof RegExp) {
			return obj;
		} else if (obj instanceof Array) {
			return new RegExp(obj[0], obj[1]);
		} else {
			return new RegExp(obj);
		}
	}

	function getMStr(func) {
		var lines = func.toString();
		lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
		return lines;
	}

	function toEscapeCharacter(str) { //dA使用ISO-8859-1编码，网页只能使用转义字符(UTF16)来显示其他字符 这里是对转义字符(UTF16)进行编码
		var length = str.length;
		var ret = [];
		var character;
		var charCode;
		var gCode;
		var neReg = /[\dA-z]/;
		for (var i = 0; i < length; i++) {
			charCode = str.charCodeAt(i);
			if (charCode <= 128) {
				character = str.charAt(i);
				if (neReg.test(character)) { /*ascii的数字字母不编码*/
					ret.push(character);
				} else ret.push("%" + charCode.toString(16));
			} else {
				gCode = charCode.toString();
				if (gCode) {
					while (gCode.length < 4) {
						gCode = "0" + gCode;
					}
					ret.push("%26%23" + gCode + "%3B");
				} else {
					/*字库里面没有.*/
				}
			}
		}
		return ret.join("");
	}

	function getFaviconUrl(url, type) {
		var uri = parseUri(url);
		switch (type) {
			case 0:
				return "http://g.soz.im/" + uri.host;
			default:
				return uri.protocol + "://" + uri.host + "/favicon.ico";
		}
	}

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	var parseUri = function(str) {
		var o = parseUri.options,
			m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i = 14;

		while (i--) uri[o.key[i]] = m[i] || "";

		uri[o.ds.name] = {};
		uri[o.ds.name][0] = {};
		uri[o.ds.name][0]["key"] = (uri.protocol ? uri.protocol : "http") + "://" + uri.host + (uri.port ? ":" + uri.port : "") + "/";
		uri[o.ds.name][0]["val"] = "/";
		i = 0;
		var tempsub = "/",
			subs = uri[o.key[10]].substr(1).split("/");
		for (var j = 1; j < (subs.length + 1); j++, i++) {
			tempsub += tempsub === "/" ? subs[i] : "/" + subs[i];
			if (subs[i]) {
				uri[o.ds.name][j] = {};
				uri[o.ds.name][j]["key"] = subs[i];
				uri[o.ds.name][j]["val"] = tempsub;
			}
		}

		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});
		uri[o.aq.name] = {};
		uri[o.key[13]].replace(o.aq.parser, function($0, $1, $2) {
			if ($1) uri[o.aq.name][$1] = $2;
		});

		return uri;
	};
	parseUri.options = {
		strictMode: false,
		key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
		q: {
			name: "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		aq: {
			name: "anchorqueryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		ds: {
			name: "directorySub"
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};

	function addGlobalStyle() {
		// 添加全局样式和自定义样式
		var style;
		if (!document.getElementById("sej-style")) {
			style = document.createElement("style");
			style.id = "sej-style";
			style.type = "text/css";
			style.textContent = MAIN_CSS + "\n" + (matchedRule.stylish || "");
			document.head.appendChild(style);
		}

	}

	function addContainer(iTarget, iInput) {
		function parseDataStr(str) { //转换文本数据
			var List = str.split(/\n(?=[^\s])/);
			List.forEach(function(eachList) {
				var line = eachList.split(/[\n\r]+/);
				var category = line[0];
				category = category.split("--");
				if (isTheSameCategory(category[0], matchedRule.engineList)) {
					container.innerHTML += "<sejli><sejspan id='sej-expanded-category'><sej-i class='fa fa-'=" + category[1] + "'></sej-i>" + category[0] + "</sejspan></sejli>";
					parseLine(container, line, true);
				} else {
					var contSejli = document.createElement("sejli");
					contSejli.innerHTML = "<sejspan class='sej-engine sej-drop-list-trigger'><sej-i class='fa fa-" + category[1] + "'></sej-i>" + category[0] + "</sejspan>";
					var sejul = document.createElement("sejul");
					sejul.className = "sej-drop-list";
					parseLine(sejul, line, false);
					contSejli.appendChild(sejul);
					container.appendChild(contSejli);
				}
			});


			str = str.replace(/[\n\r]+[\s\/]*-\s*(\S+):/g, "_POST_ $1:"); //提前处理下特殊的 post 方式

			var parseArgs = function(str) {
				var arr = str.replace(/，/g, ", ").split(/\s*, \s*/);
				var args = {};
				arr.forEach(function(s) {
					var argArr = s.split(/\s*: \s*/);
					args[argArr[0]] = argArr[1];
				});
				return args;
			};

			function parseLine(container, line, isCurrent) {
				line.splice(0, 1);
				var sejul, defaultEngine, contSejli;
				var flag, flag2;
				for (var i = 0; i < line.length; i++) {
					if (!line[i]) continue;

					if (line[i].indexOf("//") == 0) {
						continue;
					}
					var arr = line[i].replace(/，/g, ", ").split(/,\s/);
					if (isCurrent && matchedRule.engineList && toRE(matchedRule.url).test(arr[1])) { //去掉跳转到当前引擎
						if (flag == i - 1) flag++;
						if (flag2 == i - 1) {
							if (i == line.length - 1) {
								contSejli.appendChild(sejul);
								container.appendChild(contSejli);
							}
							flag2++;
						}
						continue;
					}
					var engine = {};
					if (line[i].indexOf("_POST_") != -1) {
						engine.method = "POST";
						var two = line.split(/\s*_POST_\s*/);
						line[i] = two[0];
						engine.args = parseArgs(two[1]);
					}
					if (arr.length === 1) { //分类
						flag = i;
						if (flag2 == i - 1 && sejul != "") {
							contSejli.appendChild(sejul);
							container.appendChild(contSejli);
						}
						defaultEngine = arr[0].trim();
						sejul = document.createElement("sejul");
						sejul.className = "sej-drop-list";
						continue;
					}
					if (/\s\s/.test(arr[0])) { //引擎分类只支持2级，所以两个tab就是二级分类的引擎
						var sejli = document.createElement("sejli");
						sejli.innerHTML = getaPattern(arr);
						sejul.appendChild(sejli);
						if (i == flag + 1) { //由于二级分类大多是引擎细分，所以引擎名字上也需要能点击才行
							arr[0] = defaultEngine;
							contSejli = document.createElement("sejli");
							contSejli.innerHTML = getaPattern(arr).replace("sej-engine", "sej-engine sej-drop-list-trigger");
						}
						flag2 = i; //flag2代表二级分类的引擎标记，结束后需要写入列表
						if (i == line.length - 1) { //如果已二级分类的引擎结尾，写入列表
							contSejli.appendChild(sejul);
							container.appendChild(contSejli);
						}
						continue;
					}
					if (/\s[^\s]/.test(arr[0])) {
						if (flag2 == i - 1 && sejul != "") { //看是否二级分类引擎结束
							contSejli.appendChild(sejul);
							container.appendChild(contSejli);
						}
						sejul = "";
						sejli = document.createElement("sejli");
						sejli.innerHTML = getaPattern(arr);
						container.appendChild(sejli);
					}
				}
			}

		}

		function getaPattern(arr) {
				var engine = {};
				engine.name = arr[0].trim();
				engine.url = arr[1];
				engine.host = parseUri(engine.url).host;
				if (arr[2]) engine.favicon = arr[2];
				var a = aPattern.replace("$url$", engine.url)
					.replace("$name$", engine.name)
					.replace("$title$", engine.name);
				if (engine.favicon) {
					if (/^fa/.test(engine.favicon)) a = a.replace("<img src='$favicon$' class='sej-engine-icon' />", "<sej-i class='fa " + engine.favicon + "'></sej-i>");
					a = a.replace("$favicon$", engine.favicon);
				} else {
					a = a.replace("src='$favicon$'", "");
				}

				if (engine.method && engine.method.toUpperCase() == "POST") {
					var f = wrapToHide(getPostFormHTML(engine.url, engine.args, prefs.openInNewTab));
					a = a.replace("$form$", f);
					a = a.replace("$onclick$", "this.getElementsByTagName('form')[0].submit();return false;");
				} else {
					a = a.replace("$form$", "");
					a = a.replace("onclick='$onclick$'", "");
				}
				return a;
			}
			// 创建dom
		var aPattern = "<a href='' class='sej-engine'" + (prefs.openInNewTab ? " target='_blank' " : " ") +
			"url='$url$' onclick='$onclick$' _title='$title$'>" +
			"<img src='$favicon$' class='sej-engine-icon' />$form$<span>$name$</span></a>";

		var container = document.createElement("sejul");
		container.id = "sej-container";

		container.addEventListener("mousedown", mousedownhandler, true);
		if (matchedRule.style) {
			container.style.cssText = matchedRule.style;
		}
		// 根据搜索列表的类型得到数据
		var engineListDataStr = engineListData[prefs.engineListDataType] || engineListData.normal;
		parseDataStr(engineListDataStr);
		var insertWhere = matchedRule.insertIntoDoc ? matchedRule.insertIntoDoc.where : "beforeBegin"; //设置插入的位置

		//设置按钮
		var configBtn = document.createElement("sej-i");
		configBtn.content = "<svg viewBox='0 0 64 64' height='16' width='16' xmlns='http://www.w3.org/2000/svg'><circle cx='32' cy='32' r='8.342'/><path d='M53.25 20.192l4.218-5.157-8.494-8.5-5.15 4.216c-1.632-.912-3.351-1.628-5.136-2.139L38.025 2H25.977l-.663 6.611c-1.786.511-3.505 1.227-5.137 2.139l-5.148-4.214-8.494 8.499 4.216 5.156c-.909 1.632-1.623 3.351-2.132 5.135L2 25.99v12.02l6.617.662c.508 1.784 1.222 3.503 2.133 5.138l-4.216 5.154 8.494 8.502 5.148-4.216c1.633.914 3.353 1.63 5.139 2.14l.663 6.61h12.05l.662-6.612c1.786-.511 3.506-1.228 5.138-2.14l5.148 4.217 8.496-8.502-4.219-5.158c.909-1.632 1.622-3.35 2.13-5.133L62 38.006V25.988l-6.619-.663c-.508-1.783-1.221-3.5-2.131-5.133zM32 44.341c-6.806 0-12.342-5.536-12.342-12.341 0-6.806 5.536-12.342 12.342-12.342S44.342 25.195 44.342 32c0 6.805-5.536 12.341-12.342 12.341z'/></svg>"
		configBtn.onclick = openPrefs;
		container.lastChild.appendChild(configBtn);


		switch (insertWhere.toLowerCase()) { //插入到文档中
			case "beforebegin":
				iTarget.parentNode.insertBefore(container, iTarget);
				break;
			case "afterbegin":
				if (iTarget.firstChild) {
					iTarget.insertBefore(container, iTarget.firstChild);
				} else {
					iTarget.appendChild(container);
				}
				break;
			case "beforeend":
				iTarget.appendChild(container);
				break;
			case "afterend":
				if (iTarget.nextSibling) {
					iTarget.parentNode.insertBefore(container, iTarget.nextSibling);
				} else {
					iTarget.parentNode.appendChild(container);
				}
				break;
		}

		if (typeof matchedRule.endFix == "function") {
			try {
				matchedRule.endFix();
			} catch (ex) {
				console.error("endFix 错误", ex);
			}
		}

		function mousedownhandler(e) {
			var target = e.target;
			if (!target.href) target = target.parentNode;
			if (!target || target.className.indexOf("sej-engine") == -1) return;
			if (!target || !this.contains(target)) return;
			var value;
			if (typeof iInput == "function") value = iInput();
			else {
				if (iInput.nodeName == "INPUT" || iInput.localName == "textarea") value = iInput.value;
				else value = iInput.textContent;
			}
			if (document.characterSet != "UTF-8") value = encodeURIComponent(value);
			// 根据后代元素中是否存在 form 元素，判断提交方式并进行处理
			// 如果没有 form 元素，将会使用 GET 方法提交；如果有，将会使用 POST 方法提交
			var forms = target.getElementsByTagName("form");
			if (forms.length == 0) { //提交方式为 GET
				target.href = target.getAttribute("url").replace(/%s/g, value); //替换"全部"关键词
			} else { //提交方式为 POST
				var inputs = target.getElementsByTagName("input");
				for (var i = 0; i < inputs.length; i++) inputs[i].value = inputs[i].value.replace(/%s/g, value); //// 替换"全部"关键词
			}
		}
	}

	function run() {
		// 百度搜索插入到顶部搜索条下面就会造成页面部分元素的消失，所以需要每个部分都判断下是否存在
		// 判断插入位置和输入框是否存在
		var iTarget = matchedRule.insertIntoDoc ? document.querySelector(matchedRule.insertIntoDoc.target) : document.querySelector("head");
		var iInput;
		if (matchedRule.keyword) {
			if (typeof matchedRule.keyword == "function") {
				iInput = matchedRule.keyword;
				if (!iInput()) {
					return;
				}
			} else {
				iInput = document.querySelector(matchedRule.keyword);
			}
		} else {
			iInput = document.querySelector("input[type='search'],input[type='text'][autocomplete='off'],input[autocomplete='off']:not([type])") || document.querySelector("input[type='text'][name][value],input[name][value]:not([type])");
		}
		debug("插入的位置为 %o", iTarget);
		debug("匹配的输入框为 %o", iInput);

		if (!iTarget || !iInput) {
			debug("不存在插入的位置或匹配的输入框", iTarget, iInput);
			return;
		}

		addGlobalStyle();

		// 判断是否存在
		var container = document.getElementById("sej-container");

		if (!container) {} else if (container) {
			container.parentNode.removeChild(container);
		}
		addContainer(iTarget, iInput);
		if (matchedRule.stylish && matchedRule.stylish.indexOf("fixed") != -1) {
			container = document.getElementById("sej-container");
			container.style.left = "calc(50% - " + getComputedStyle(container).width + " / 2)";
		}
	}

	function remove() {
		var elems = document.querySelectorAll("#sej-container");
		if (!elems) return;

		[].forEach.call(elems, function(elem) {
			elem.parentNode.removeChild(elem);
		});
	}

	// iframe 禁止加载
	if (window.self != window.top) return;

	loadPrefs();

	var matchedRule;

	rules.some(function(rule) {
		if (toRE(rule.url).test(location.href)) {
			matchedRule = rule;
			if (typeof rule.etc == "function") {
				try {
					rule.etc();
				} catch (ex) {
					console.error("执行 etc 错误", ex);
				}
			}
			return true;
		}
	});


	debug("匹配的规则为", matchedRule);

	if (!matchedRule) return;
	document.onreadystatechange = function() {
		if (document.readyState == "interactive") {
			debug("onreadystatechange: " + document.readyState);
			run();
		} else if (document.readyState == "complete") {
			debug("onreadystatechange: " + document.readyState);
			run();
			/*if (window.navigator.userAgent.indexOf("Chrome") != -1) {
				setTimeout(run(), 1000);
			}*/
		}
	};
	if (matchedRule.mutationTitle) {
		debug("添加标题节点监视器: title");
		var watch = document.querySelector("title");
		var observer = new window.MutationObserver(function(mutations) {
			debug("标题发生了变化", document.title);
			run();
		});
		observer.observe(watch, {
			childList: true,
			subtree: true,
			characterData: true
		});
	} 
})();