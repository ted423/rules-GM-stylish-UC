// ==UserScript==
// @name		searchEngineJump-NextStage
// @author		ted423
// @contributor	NLF && ywzhaiqi
// @description	方便的在各个引擎之间跳转。可自定义搜索列表的 NLF 修改版。
// @version		8.1703.13.0
// @include		*
// @exclude		*.mediatek.inc/*
// @exclude		http://tieba.baidu.com/*
// @namespace	https://greasyfork.org/users/85
// @require		http://code.jquery.com/jquery-2.2.0.min.js
// @downloadURL	https://github.com/ted423/rules-GM-stylish-UC/raw/master/GM/searchEngineJump/searchEngineJumpCE.user.js
// @updateURL	https://github.com/ted423/rules-GM-stylish-UC/raw/master/GM/searchEngineJump/searchEngineJumpCE.user.js
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_addStyle
// @run-at		document-end
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

	var MAIN_CSS = "sej-i{\n	vertical-align:initial;\n    color: #333;\n}\n#sej-container:hover{\n	z-index: 999999999999999;\n	opacity: 1.0;\n}\nsejul, sejli {\n	margin: 0;\n	padding: 0;\n	list-style: none outside;\n}\nsejli {\n	display: list-item;\n}\nsejli:hover>sejul {\n	display:block;\n}\nbody>sejul>sejli {\n	float: left;\n}\nsejli sejul {\n	position: absolute;\n}\nsejli sejul sejul {\n	margin-left: 100px;\n	margin-top: -30px;\n}\nsejli sejul .sej-engine {\n	padding: 4px 0px;\n	width:100%;\n}\n#sej-container {\n   background: white;\n	box-shadow:0px 0px 3px #aaaaaa;\n	margin:0 auto;\n	opacity: 0.5;\n	display:table;\n	font-family: Comic Sans MS, 'Microsoft YaHei', 微软雅黑;\n	position: relative;\n	line-height: 1.5;\n	font-size: 13px;\n	transition: opacity 0.5s ease-in-out;\n}\n#sej-container>sejli {\n    float: left;\n}\n#sej-expanded-category {\n	display: inline-block;\n	font-weight: bold;\n	padding: 2px 4px;\n	line-height: 2;\n}\n#sej-expanded-category::after {\n	content:' :';\n}\n.sej-engine {\n line-height: 2;\n display: inline-block;\n margin: 0;\n border: none;\n padding: 2px 4px;\n text-decoration: none;\n transition: background-color 0.15s ease-in-out;\n}\na.sej-engine{white-space: nowrap;}\na.sej-engine:visited, a.sej-engine:active{\n color: #120886;\n}\na.sej-engine.only-icon {\n	margin-left: 3px;\n	margin-right: 3px;\n}\na.sej-engine.only-icon > span {\n	display: none;\n}\na.sej-engine:link, a.sej-engine:visited {\n	text-decoration: none;\n}\n.sej-drop-list-trigger-shown {\n	background-color: #DEEDFF !important;\n}\n.sej-drop-list-trigger::after {\n	content:\'\';\n	display: inline-block;\n	margin: 0 0 0 3px;\n	padding: 0;\n	width: 0;\n	height: 0;\n	border-top: 6px solid #BCBCBC;\n	border-right: 5px solid transparent;\n	border-left: 5px solid transparent;\n	border-bottom: 0px solid transparent;\n	transition: -webkit-transform 0.3s ease-in-out;\n	transition: transform 0.3s ease-in-out;\n}\n.sej-drop-list-trigger-shown::after {\n	-webkit-transform: rotate(180deg);\n	transform: rotate(180deg);\n}\n.sej-engine:hover {\n	background-color: #EAEAEA;\n}\n.sej-drop-list > .sej-engine {\n	display: block;\n	padding-top: 4px;\n	padding-bottom: 4px;\n}\n.sej-drop-list > .sej-engine:hover {\n	background-color: #DEEDFF;\n}\n.sej-drop-list sej-i,.sej-drop-list img{padding-left:5px;}\n.sej-engine-icon {\n	display: inline-block;\n	height: 16px;\n	border: none;\n	padding: 0;\n	margin: 0 3px 0 0;\n	vertical-align: sub;\n}\n.sej-drop-list {\n	display: none;\n	float: left;\n	min-width: 100px;\n	border: 1px solid #FAFAFA;\n	font-size: 13px;\n	-moz-box-shadow: 2px 2px 5px #ccc;\n	-webkit-box-shadow: 2px 2px 5px #ccc;\n	box-shadow: 2px 2px 5px #ccc;\n	background-color: white;\n}\n#sej-container img{min-width:16px;}";
	var fontawesome = "@font-face{font-family:'FontAwesome';src:url(data:application/x-font-woff2;charset=utf-8;base64,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) format('woff2');font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:15px;margin: 0 3px 0 0;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-glass:before{content:'\\f000'}.fa-music:before{content:'\\f001'}.fa-search:before{content:'\\f002'}.fa-gear:before,.fa-cog:before{content:'\\f013'}.fa-download:before{content:'\\f019'}.fa-book:before{content:'\\f02d'}.fa-camera:before{content:'\\f030'}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:'\\f03e'}.fa-twitter-square:before{content:'\\f081'}.fa-facebook-square:before{content:'\\f082'}.fa-camera-retro:before{content:'\\f083'}.fa-github-square:before{content:'\\f092'}.fa-phone-square:before{content:'\\f098'}.fa-twitter:before{content:'\\f099'}.fa-facebook-f:before,.fa-facebook:before{content:'\\f09a'}.fa-github:before{content:'\\f09b'}.fa-globe:before{content:'\\f0ac'}.fa-google-plus-square:before{content:'\\f0d4'}.fa-google-plus:before{content:'\\f0d5'}.fa-cloud-upload:before{content:'\\f0ee'}.fa-plus-square:before{content:'\\f0fe'}.fa-github-alt:before{content:'\\f113'}.fa-gamepad:before{content:'\\f11b'}.fa-html5:before{content:'\\f13b'}.fa-youtube-square:before{content:'\\f166'}.fa-youtube:before{content:'\\f167'}.fa-youtube-play:before{content:'\\f16a'}.fa-dropbox:before{content:'\\f16b'}.fa-stack-overflow:before{content:'\\f16c'}.fa-flickr:before{content:'\\f16e'}.fa-tumblr:before{content:'\\f173'}.fa-tumblr-square:before{content:'\\f174'}.fa-weibo:before{content:'\\f18a'}.fa-renren:before{content:'\\f18b'}.fa-pagelines:before{content:'\\f18c'}.fa-stack-exchange:before{content:'\\f18d'}.fa-mortar-board:before,.fa-graduation-cap:before{content:'\\f19d'}.fa-yahoo:before{content:'\\f19e'}.fa-google:before{content:'\\f1a0'}.fa-delicious:before{content:'\\f1a5'}.fa-language:before{content:'\\f1ab'}.fa-paw:before{content:'\\f1b0';border: solid 1px;padding: 1px 1px 0 1px;}.fa-steam:before{content:'\\f1b6'}.fa-steam-square:before{content:'\\f1b7'}.fa-deviantart:before{content:'\\f1bd'}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:'\\f1c5'}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:'\\f1d4'}.fa-tencent-weibo:before{content:'\\f1d5'}.fa-qq:before{content:'\\f1d6'}.fa-send:before,.fa-paper-plane:before{content:'\\f1d8'}.fa-send-o:before,.fa-paper-plane-o:before{content:'\\f1d9'}.fa-skyatlas:before{content:'\\f216'}.fa-cart-plus:before{content:'\\f217'}.fa-cart-arrow-down:before{content:'\\f218'}.fa-facebook-official:before{content:'\\f230'}.fa-wikipedia-w:before{content:'\\f266'}.fa-firefox:before{content:'\\f269'}.fa-amazon:before{content:'\\f270'}.fa-map:before {content: '\\f279';}.fa-scholar:before {content:'\\f8fc'}.fa-subhd:before {content:'\\f8fd'}.fa-bing:before{content:'\\f8fe';border: solid 1px;padding: 0.5px;}.fa-duckduckgo:before {content:'\\f8ff'}.fa-MDN:before {content:'\\f8fb';font-size:smaller;padding-right: 5px;}.fa-spin {-webkit-animation: fa-spin 2s infinite linear;animation: fa-spin 2s infinite linear;}@-webkit-keyframes fa-spin{0%{-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(359deg);transform: rotate(359deg);}}@keyframes fa-spin {0%{-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(359deg);transform: rotate(359deg);}}.fa-zhihu:before{content:'知';border: solid 1px;padding: 1px;font-size:14px;}.fa-xiami:before{content:'虾';border: solid 1px;padding: 1px;font-size:14px;}.fa-g:before{content:'G';border: solid 1px;padding: 0px 4px;font-size:16px;}.fa-jd:before{content:'JD';border: solid 1px;padding:0px;font-family:'Microsoft YaHei UI','微软雅黑',Arial;font-size:13px;}";

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
			change: "mutationTitle", //mutationTitle监视标题的变化,runAtComplete在页面结束时执行
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
			change: "mutationTitle",
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
			change: "mutationTitle",
			engineList: "web",
			style: "margin-left: 122px;",
			insertIntoDoc: {
				target: "#s_tab",
				where: "afterEnd",
			},
			endFix: function() {if (getComputedStyle(document.getElementById("lg")).display != "none") remove();} //通过检测首页图片判断在首页的话不显示
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
			change: "mutationTitle",
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
			change: "runAtComplete",
			engineList: "map",
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
		},{
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
			change: "runAtComplete",
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
			stylish:defaultStyleFixNoMarginTop,
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
		if (!(matchedRule.change && matchedRule.change == "noExternalRequests")) {
			if (!document.getElementById("sej-fontawesome")) {
				style = document.createElement("style");
				style.id = "sej-fontawesome";
				style.type = "text/css";
				style.textContent = fontawesome;
				document.head.appendChild(style);
			}
		} else {
			if (!document.getElementById("sej-fontawesome")) {
				style = document.createElement("style");
				style.id = "sej-fontawesome";
				style.type = "text/css";
				style.textContent = ".fa{display:inline-block;font:normal normal normal 14px/1;font-size:15px;margin: 0 3px 0 0;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.sej-icon:before,.fa-download:before,.fa-image:before,.fa-book:before,.fa-map:before,.fa-cart-arrow-down:before,.fa-plus-square:before,.fa-search:before,.fa-music:before {content:'⊙'}";
				document.head.appendChild(style);
			}
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
			if (!engine.favicon) {
				engine.favicon = getFaviconUrl(engine.url);
			}
			var a = aPattern.replace("$url$", engine.url)
				.replace("$name$", engine.name)
				.replace("$title$", engine.name);
			if (matchedRule.change == "noExternalRequests") a = a.replace("<img src='$favicon$' class='sej-engine-icon' />", "<sej-i class='fa sej-icon'></sej-i>");
			else if (engine.favicon) {
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
		configBtn.className = "fa fa-cog fa-spin";
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

		if (!container) {} 
		else if (container) {
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

	if (matchedRule.change) {
		if (matchedRule.change == "mutationTitle") {
			run();
			debug("添加标题节点监视器: title");

			var watch = document.querySelector("title");
			var observer = new MutationObserver(function() {
				debug("标题发生了变化", document.title);
				run();
			});
			observer.observe(watch, {
				childList: true,
				subtree: true,
				characterData: true
			});
		} else if (matchedRule.change == "runAtComplete") {
			document.onreadystatechange = function() {
				debug("onreadystatechange");
				if (document.readyState == "complete") {
					run();
					if(window.navigator.userAgent.indexOf("Chrome")!=-1){setTimeout(run(),1000)}
				}
			};
		} else run();
	} else run();
})();
