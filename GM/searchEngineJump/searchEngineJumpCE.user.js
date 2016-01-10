// ==UserScript==
// @name		searchEngineJumpCE-modify by ted423
// @author		NLF && ywzhaiqi
// @contributor	ted423
// @description	方便的在各个引擎之间跳转。可自定义搜索列表的 NLF 修改版。
// @version		8.1601.10.1
// @namespace	https://greasyfork.org/users/85
// @downloadURL	https://github.com/ted423/rules-GM-stylish-UC/raw/master/GM/searchEngineJump/searchEngineJumpCE.user.js
// @updateURL	https://github.com/ted423/rules-GM-stylish-UC/raw/master/GM/searchEngineJump/searchEngineJumpCE.user.js
// @grant		none
// @run-at		document-end
// ==/UserScript==
(function() {
	'use strict';
	var prefs = {
		openInNewTab: false, //是否在新页面打开.
		hidePrefsBtn: false, //隐藏设置按钮
		hideEnglineLabel: 0, //是否隐藏前几个搜索的文字部分。0：不隐藏，1：根据高度自行判断，2：隐藏
		engineListDataType: 'ted423', //搜索列表默认类型
		iconType: '', //获取 icon 的在线服务的地址类型
		//position: '',//全局搜索条插入的位置：default, left, top
		debug: false
	};
	var engineListData = {
		custom: '',
		ted423: '网页\n	百度, https://www.baidu.com/s?wd=%s&ie=utf-8\n	360, https://www.haosou.com/s?ie=utf-8&q=%s\n	bing, https://cn.bing.com/search?q=%s&pc=OPER\n	搜狗, https://www.sogou.com/web?query=%s\n	DuckDuckGo, https://duckduckgo.com/?q=%s\n	Yahoo\n		Yahoo, https://search.yahoo.com/search?p=%s\n		Yahoo(tw), https://tw.search.yahoo.com/search?p=%s\n 		Yahoo.co.jp, https://search.yahoo.co.jp/search?p=%s&aq=-1&oq=&ei=UTF-8&fr=top_ga1_sa&x=wrt\n	Google\n		Google.hk, https://www.google.com.hk/search?q=%s&ie=utf-8&safe=off, fa-google\n		Google.co.jp，https://www.google.co.jp/search?q=%s&ie=utf-8&safe=off, fa-google\n资料\n	百科, http://baike.baidu.com/searchword/?word=%s&pic=1&sug=1&ie=utf-8, https://www.baidu.com/favicon.ico\n	Scholar, http://scholar.google.com/scholar?hl=zh-CN&q=%s&btnG=&lr=, https://i.imgur.com/hJVSUU5.png\n	学术, http://xueshu.baidu.com/s?wd=%s, https://www.baidu.com/favicon.ico\n	知乎, https://www.zhihu.com/search?q=%s\n	萌娘百科, http://zh.moegirl.org/index.php?search=%s, https://zh.moegirl.org/favicon.ico\n	Google Book, https://www.google.com/search?q=%s&btnG=%E6%90%9C%E7%B4%A2%E5%9B%BE%E4%B9%A6&tbm=bks&tbo=1&hl=zh-CN&gws_rd=ssl, fa-google\n	WIKI\n		ZWIKI, http://zh.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch, https://zh.wikipedia.org/static/favicon/wikipedia.ico\n		EWIKI, https://en.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch, https://zh.wikipedia.org/static/favicon/wikipedia.ico\n		JWIKI, http://ja.wikipedia.org/w/index.php?search=%s&button=&title=Special%3ASearch, https://zh.wikipedia.org/static/favicon/wikipedia.ico\n	开发\n		stackoverflow, https://stackoverflow.com/search?q=%s, https://cdn.sstatic.net/stackoverflow/img/favicon.ico\n		MDN, https://developer.mozilla.org/en-US/search?q=%s，https://developer.cdn.mozilla.net/media/img/favicon32.png\n		github, https://github.com/search?q=%s\n		krugle, http://opensearch.krugle.org/document/search/#query=%s，http://opensearch.krugle.org/media/images/favicon.ico\n		npm, https://www.npmjs.org/search?q=%s, https://i.imgur.com/Ec0WrY8.png\n地图\n	百度, http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D%s, https://www.baidu.com/favicon.ico\n	Google, https://www.google.com/maps/search/%s/, fa-google\n	搜狗, http://map.sogou.com/#lq=%s, https://www.sogou.com/favicon.ico\n	Bing, https://www.bing.com/ditu/?q=%s\n音乐\n	天天动听, http://www.dongting.com/#a=searchlist&q=%s\n	Music, http://music.baidu.com/search?key=%s&ie=utf-8&oe=utf-8, https://www.baidu.com/favicon.ico\n	搜狗, http://mp3.sogou.com/music.so?query=%s, https://www.sogou.com/favicon.ico\n	一听, http://so.1ting.com/all.do?q=%s\n	虾米, http://www.xiami.com/search?key=%s\n	piapro, https://piapro.jp/search/?view=audio&keyword=%s\n	Lyric, http://music.baidu.com/search/lrc?key=%s, https://www.baidu.com/favicon.ico\n图片\n	百度, http://image.baidu.com/search/index?tn=baiduimage&word=%s, https://www.baidu.com/favicon.ico\n	Google, https://www.google.com.hk/search?tbm=isch&q=%s, fa-google\n	花瓣, https://huaban.com/search/?q=%s\n	Picsearch, http://cn.picsearch.com/index.cgi?q=%s\n	Flickr, https://www.flickr.com/search/?w=all&q=%s, fa-flickr\n	Pixiv, http://www.pixiv.net/search.php?s_mode=s_tag&word=%s\n	dA, https://www.deviantart.com/browse/all/?q=%s\n	, http://img.jpg4.info/index.php?feed=%s, https://i.imgur.com/qkOEi8O.png\n下载\n	dmhy, https://share.dmhy.org/topics/list?keyword=%s\n	kickass, https://kat.cr/usearch/%s/, https://i.imgur.com/uz2GaPN.png\n	BTSOW, http://www.bt2mag.com/search/%s, http://www.bt2mag.com/app/bts/View/img/btsow.com.favicon.ico\n	BTDigg, https://btdigg.org/search?q=%s\n	xiaohx, http://www.xiaohx.net/search?key=%s, http://s.cdn.acgimg.com/xiaohx.com/images/favicon.ico\n	ed2000, https://www.baidu.com/s?wd=%s+site:ed2000.com&ie=utf-8, http://www.biaoqing.com/2000/favicon.ico\n	字幕\n		subom, http://www.subom.net/search/%s\n		, http://subhd.com/search/%s, https://i.imgur.com/kC8RATC.png\n		射手网(伪), http://sub.makedie.me/sub/?searchword=%s\n	nyaa\n		nyaa.eu, https://www.nyaa.eu/?page=search&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n		nyaa.se, http://www.nyaa.se/?page=search&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n		sukebei.nyaa.eu, https://sukebei.nyaa.eu/?page=search&cats=0_0&filter=0&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n		sukebei.nyaa.se, http://sukebei.nyaa.se/?page=search&cats=0_0&filter=0&term=%s, https://i292.photobucket.com/albums/mm30/ted423/favicon_zpsdxwbxo6t.png\n网购\n	一淘, http://s.etao.com/search?q=%s\n	京东, https://search.jd.com/Search?keyword=%s&enc=utf-8\n	淘宝, https://s.taobao.com/search?q=%s\n	亚马逊, https://www.amazon.cn/s/ref=nb_ss?keywords=%s\netc\n	AMO, https://addons.mozilla.org/zh-CN/firefox/search/?q=%s, fa-firefox\n	汉典, http://www.zdic.net/sousuo/?q=%s&tp=tp3',
	};

	var MAIN_CSS = 'sejul, sejli {\n	z-index:999999999999999;\n	margin: 0;\n	padding: 0;\n	list-style: none outside;\n}\nsejli {\n	display: list-item;\n}\nsejli:hover>sejul {\n	display:block;\n}\nbody>sejul>sejli {\n	float: left;\n}\nsejli sejul {\n	position: absolute;\n}\nsejli sejul sejul {\n	margin-left: 100px;\n	margin-top: -30px;\n}\nsejli sejul .sej-engine {\n	margin-left: 10px;\n}\n#sej-container {\n	box-shadow:0px 0px 3px #aaaaaa;\n	margin:0 auto;\n	opacity: 0.7;\n	display:table;\n	font-family: Comic Sans MS, "Microsoft YaHei", 微软雅黑;\n	position: relative;\n	padding: 1px 0 1px 10px;\n	line-height: 1.5;\n	font-size: 13px;\n}\n#sej-container>sejli {\n    float: left;\n}\n#sej-expanded-category {\n	display: inline-block;\n	font-weight: bold;\n	padding: 2px 4px;\n	line-height: 2;\n}\n#sej-expanded-category::after {\n	content:" :";\n}\n.sej-engine {\n	white-space: nowrap;\n	line-height: 2;\n	display: inline-block;\n	margin: 0;\n	border: none;\n	padding: 2px 4px;\n	text-decoration: none;\n	color: #120886 !important;\n	transition: background-color 0.15s ease-in-out;\n}\na.sej-engine.only-icon {\n	margin-left: 3px;\n	margin-right: 3px;\n}\na.sej-engine.only-icon > span {\n	display: none;\n}\na.sej-engine:link, a.sej-engine:visited {\n	text-decoration: none;\n}\na.sej-engine:visited, a.sej-engine:visited *, a.sej-engine:active, a.sej-engine:active * {\n	color: #120886 !important;\n}\n.sej-drop-list-trigger-shown {\n	background-color: #DEEDFF !important;\n}\n.sej-drop-list-trigger::after {\n	content:\'\';\n	display: inline-block;\n	margin: 0 0 0 3px;\n	padding: 0;\n	width: 0;\n	height: 0;\n	border-top: 6px solid #BCBCBC;\n	border-right: 5px solid transparent;\n	border-left: 5px solid transparent;\n	border-bottom: 0px solid transparent;\n	vertical-align: middle;\n	transition: -webkit-transform 0.3s ease-in-out;\n	transition: transform 0.3s ease-in-out;\n}\n.sej-drop-list-trigger-shown::after {\n	-webkit-transform: rotate(180deg);\n	transform: rotate(180deg);\n}\n.sej-engine:hover {\n	background-color: #EAEAEA;\n}\n.sej-drop-list > .sej-engine {\n	display: block;\n	padding-top: 4px;\n	padding-bottom: 4px;\n}\n.sej-drop-list > .sej-engine:hover {\n	background-color: #DEEDFF;\n}\n.sej-engine-icon {\n	display: inline-block;\n	height: 16px;\n	border: none;\n	padding: 0;\n	margin: 0 3px 0 0;\n	vertical-align: text-bottom;\n}\n.sej-drop-list {\n	display: none;\n	float: left;\n	min-width: 100px;\n	border: 1px solid #FAFAFA;\n	padding: 5px 0;\n	font-size: 13px;\n	-moz-box-shadow: 2px 2px 5px #ccc;\n	-webkit-box-shadow: 2px 2px 5px #ccc;\n	box-shadow: 2px 2px 5px #ccc;\n	background-color: white;\n	transition: opacity 0.2s ease-in-out, top 0.2s ease-in-out;\n}';
	var fontawesome ='@font-face{font-family:"FontAwesome";src:url(data:application/x-font-woff;charset=utf-8;base64,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) format("woff");font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:16px;margin: 0 3px 0 0;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\\f000"}.fa-music:before{content:"\\f001"}.fa-search:before{content:"\\f002"}.fa-envelope-o:before{content:"\\f003"}.fa-heart:before{content:"\\f004"}.fa-star:before{content:"\\f005"}.fa-star-o:before{content:"\\f006"}.fa-user:before{content:"\\f007"}.fa-film:before{content:"\\f008"}.fa-th-large:before{content:"\\f009"}.fa-th:before{content:"\\f00a"}.fa-th-list:before{content:"\\f00b"}.fa-check:before{content:"\\f00c"}.fa-remove:before,.fa-close:before,.fa-times:before{content:"\\f00d"}.fa-search-plus:before{content:"\\f00e"}.fa-search-minus:before{content:"\\f010"}.fa-power-off:before{content:"\\f011"}.fa-signal:before{content:"\\f012"}.fa-gear:before,.fa-cog:before{content:"\\f013"}.fa-trash-o:before{content:"\\f014"}.fa-home:before{content:"\\f015"}.fa-file-o:before{content:"\\f016"}.fa-clock-o:before{content:"\\f017"}.fa-road:before{content:"\\f018"}.fa-download:before{content:"\\f019"}.fa-arrow-circle-o-down:before{content:"\\f01a"}.fa-arrow-circle-o-up:before{content:"\\f01b"}.fa-inbox:before{content:"\\f01c"}.fa-play-circle-o:before{content:"\\f01d"}.fa-rotate-right:before,.fa-repeat:before{content:"\\f01e"}.fa-refresh:before{content:"\\f021"}.fa-list-alt:before{content:"\\f022"}.fa-lock:before{content:"\\f023"}.fa-flag:before{content:"\\f024"}.fa-headphones:before{content:"\\f025"}.fa-volume-off:before{content:"\\f026"}.fa-volume-down:before{content:"\\f027"}.fa-volume-up:before{content:"\\f028"}.fa-qrcode:before{content:"\\f029"}.fa-barcode:before{content:"\\f02a"}.fa-tag:before{content:"\\f02b"}.fa-tags:before{content:"\\f02c"}.fa-book:before{content:"\\f02d"}.fa-bookmark:before{content:"\\f02e"}.fa-print:before{content:"\\f02f"}.fa-camera:before{content:"\\f030"}.fa-font:before{content:"\\f031"}.fa-bold:before{content:"\\f032"}.fa-italic:before{content:"\\f033"}.fa-text-height:before{content:"\\f034"}.fa-text-width:before{content:"\\f035"}.fa-align-left:before{content:"\\f036"}.fa-align-center:before{content:"\\f037"}.fa-align-right:before{content:"\\f038"}.fa-align-justify:before{content:"\\f039"}.fa-list:before{content:"\\f03a"}.fa-dedent:before,.fa-outdent:before{content:"\\f03b"}.fa-indent:before{content:"\\f03c"}.fa-video-camera:before{content:"\\f03d"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:"\\f03e"}.fa-pencil:before{content:"\\f040"}.fa-map-marker:before{content:"\\f041"}.fa-adjust:before{content:"\\f042"}.fa-tint:before{content:"\\f043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\\f044"}.fa-share-square-o:before{content:"\\f045"}.fa-check-square-o:before{content:"\\f046"}.fa-arrows:before{content:"\\f047"}.fa-step-backward:before{content:"\\f048"}.fa-fast-backward:before{content:"\\f049"}.fa-backward:before{content:"\\f04a"}.fa-play:before{content:"\\f04b"}.fa-pause:before{content:"\\f04c"}.fa-stop:before{content:"\\f04d"}.fa-forward:before{content:"\\f04e"}.fa-fast-forward:before{content:"\\f050"}.fa-step-forward:before{content:"\\f051"}.fa-eject:before{content:"\\f052"}.fa-chevron-left:before{content:"\\f053"}.fa-chevron-right:before{content:"\\f054"}.fa-plus-circle:before{content:"\\f055"}.fa-minus-circle:before{content:"\\f056"}.fa-times-circle:before{content:"\\f057"}.fa-check-circle:before{content:"\\f058"}.fa-question-circle:before{content:"\\f059"}.fa-info-circle:before{content:"\\f05a"}.fa-crosshairs:before{content:"\\f05b"}.fa-times-circle-o:before{content:"\\f05c"}.fa-check-circle-o:before{content:"\\f05d"}.fa-ban:before{content:"\\f05e"}.fa-arrow-left:before{content:"\\f060"}.fa-arrow-right:before{content:"\\f061"}.fa-arrow-up:before{content:"\\f062"}.fa-arrow-down:before{content:"\\f063"}.fa-mail-forward:before,.fa-share:before{content:"\\f064"}.fa-expand:before{content:"\\f065"}.fa-compress:before{content:"\\f066"}.fa-plus:before{content:"\\f067"}.fa-minus:before{content:"\\f068"}.fa-asterisk:before{content:"\\f069"}.fa-exclamation-circle:before{content:"\\f06a"}.fa-gift:before{content:"\\f06b"}.fa-leaf:before{content:"\\f06c"}.fa-fire:before{content:"\\f06d"}.fa-eye:before{content:"\\f06e"}.fa-eye-slash:before{content:"\\f070"}.fa-warning:before,.fa-exclamation-triangle:before{content:"\\f071"}.fa-plane:before{content:"\\f072"}.fa-calendar:before{content:"\\f073"}.fa-random:before{content:"\\f074"}.fa-comment:before{content:"\\f075"}.fa-magnet:before{content:"\\f076"}.fa-chevron-up:before{content:"\\f077"}.fa-chevron-down:before{content:"\\f078"}.fa-retweet:before{content:"\\f079"}.fa-shopping-cart:before{content:"\\f07a"}.fa-folder:before{content:"\\f07b"}.fa-folder-open:before{content:"\\f07c"}.fa-arrows-v:before{content:"\\f07d"}.fa-arrows-h:before{content:"\\f07e"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\\f080"}.fa-twitter-square:before{content:"\\f081"}.fa-facebook-square:before{content:"\\f082"}.fa-camera-retro:before{content:"\\f083"}.fa-key:before{content:"\\f084"}.fa-gears:before,.fa-cogs:before{content:"\\f085"}.fa-comments:before{content:"\\f086"}.fa-thumbs-o-up:before{content:"\\f087"}.fa-thumbs-o-down:before{content:"\\f088"}.fa-star-half:before{content:"\\f089"}.fa-heart-o:before{content:"\\f08a"}.fa-sign-out:before{content:"\\f08b"}.fa-linkedin-square:before{content:"\\f08c"}.fa-thumb-tack:before{content:"\\f08d"}.fa-external-link:before{content:"\\f08e"}.fa-sign-in:before{content:"\\f090"}.fa-trophy:before{content:"\\f091"}.fa-github-square:before{content:"\\f092"}.fa-upload:before{content:"\\f093"}.fa-lemon-o:before{content:"\\f094"}.fa-phone:before{content:"\\f095"}.fa-square-o:before{content:"\\f096"}.fa-bookmark-o:before{content:"\\f097"}.fa-phone-square:before{content:"\\f098"}.fa-twitter:before{content:"\\f099"}.fa-facebook-f:before,.fa-facebook:before{content:"\\f09a"}.fa-github:before{content:"\\f09b"}.fa-unlock:before{content:"\\f09c"}.fa-credit-card:before{content:"\\f09d"}.fa-feed:before,.fa-rss:before{content:"\\f09e"}.fa-hdd-o:before{content:"\\f0a0"}.fa-bullhorn:before{content:"\\f0a1"}.fa-bell:before{content:"\\f0f3"}.fa-certificate:before{content:"\\f0a3"}.fa-hand-o-right:before{content:"\\f0a4"}.fa-hand-o-left:before{content:"\\f0a5"}.fa-hand-o-up:before{content:"\\f0a6"}.fa-hand-o-down:before{content:"\\f0a7"}.fa-arrow-circle-left:before{content:"\\f0a8"}.fa-arrow-circle-right:before{content:"\\f0a9"}.fa-arrow-circle-up:before{content:"\\f0aa"}.fa-arrow-circle-down:before{content:"\\f0ab"}.fa-globe:before{content:"\\f0ac"}.fa-wrench:before{content:"\\f0ad"}.fa-tasks:before{content:"\\f0ae"}.fa-filter:before{content:"\\f0b0"}.fa-briefcase:before{content:"\\f0b1"}.fa-arrows-alt:before{content:"\\f0b2"}.fa-group:before,.fa-users:before{content:"\\f0c0"}.fa-chain:before,.fa-link:before{content:"\\f0c1"}.fa-cloud:before{content:"\\f0c2"}.fa-flask:before{content:"\\f0c3"}.fa-cut:before,.fa-scissors:before{content:"\\f0c4"}.fa-copy:before,.fa-files-o:before{content:"\\f0c5"}.fa-paperclip:before{content:"\\f0c6"}.fa-save:before,.fa-floppy-o:before{content:"\\f0c7"}.fa-square:before{content:"\\f0c8"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:"\\f0c9"}.fa-list-ul:before{content:"\\f0ca"}.fa-list-ol:before{content:"\\f0cb"}.fa-strikethrough:before{content:"\\f0cc"}.fa-underline:before{content:"\\f0cd"}.fa-table:before{content:"\\f0ce"}.fa-magic:before{content:"\\f0d0"}.fa-truck:before{content:"\\f0d1"}.fa-pinterest:before{content:"\\f0d2"}.fa-pinterest-square:before{content:"\\f0d3"}.fa-google-plus-square:before{content:"\\f0d4"}.fa-google-plus:before{content:"\\f0d5"}.fa-money:before{content:"\\f0d6"}.fa-caret-down:before{content:"\\f0d7"}.fa-caret-up:before{content:"\\f0d8"}.fa-caret-left:before{content:"\\f0d9"}.fa-caret-right:before{content:"\\f0da"}.fa-columns:before{content:"\\f0db"}.fa-unsorted:before,.fa-sort:before{content:"\\f0dc"}.fa-sort-down:before,.fa-sort-desc:before{content:"\\f0dd"}.fa-sort-up:before,.fa-sort-asc:before{content:"\\f0de"}.fa-envelope:before{content:"\\f0e0"}.fa-linkedin:before{content:"\\f0e1"}.fa-rotate-left:before,.fa-undo:before{content:"\\f0e2"}.fa-legal:before,.fa-gavel:before{content:"\\f0e3"}.fa-dashboard:before,.fa-tachometer:before{content:"\\f0e4"}.fa-comment-o:before{content:"\\f0e5"}.fa-comments-o:before{content:"\\f0e6"}.fa-flash:before,.fa-bolt:before{content:"\\f0e7"}.fa-sitemap:before{content:"\\f0e8"}.fa-umbrella:before{content:"\\f0e9"}.fa-paste:before,.fa-clipboard:before{content:"\\f0ea"}.fa-lightbulb-o:before{content:"\\f0eb"}.fa-exchange:before{content:"\\f0ec"}.fa-cloud-download:before{content:"\\f0ed"}.fa-cloud-upload:before{content:"\\f0ee"}.fa-user-md:before{content:"\\f0f0"}.fa-stethoscope:before{content:"\\f0f1"}.fa-suitcase:before{content:"\\f0f2"}.fa-bell-o:before{content:"\\f0a2"}.fa-coffee:before{content:"\\f0f4"}.fa-cutlery:before{content:"\\f0f5"}.fa-file-text-o:before{content:"\\f0f6"}.fa-building-o:before{content:"\\f0f7"}.fa-hospital-o:before{content:"\\f0f8"}.fa-ambulance:before{content:"\\f0f9"}.fa-medkit:before{content:"\\f0fa"}.fa-fighter-jet:before{content:"\\f0fb"}.fa-beer:before{content:"\\f0fc"}.fa-h-square:before{content:"\\f0fd"}.fa-plus-square:before{content:"\\f0fe"}.fa-angle-double-left:before{content:"\\f100"}.fa-angle-double-right:before{content:"\\f101"}.fa-angle-double-up:before{content:"\\f102"}.fa-angle-double-down:before{content:"\\f103"}.fa-angle-left:before{content:"\\f104"}.fa-angle-right:before{content:"\\f105"}.fa-angle-up:before{content:"\\f106"}.fa-angle-down:before{content:"\\f107"}.fa-desktop:before{content:"\\f108"}.fa-laptop:before{content:"\\f109"}.fa-tablet:before{content:"\\f10a"}.fa-mobile-phone:before,.fa-mobile:before{content:"\\f10b"}.fa-circle-o:before{content:"\\f10c"}.fa-quote-left:before{content:"\\f10d"}.fa-quote-right:before{content:"\\f10e"}.fa-spinner:before{content:"\\f110"}.fa-circle:before{content:"\\f111"}.fa-mail-reply:before,.fa-reply:before{content:"\\f112"}.fa-github-alt:before{content:"\\f113"}.fa-folder-o:before{content:"\\f114"}.fa-folder-open-o:before{content:"\\f115"}.fa-smile-o:before{content:"\\f118"}.fa-frown-o:before{content:"\\f119"}.fa-meh-o:before{content:"\\f11a"}.fa-gamepad:before{content:"\\f11b"}.fa-keyboard-o:before{content:"\\f11c"}.fa-flag-o:before{content:"\\f11d"}.fa-flag-checkered:before{content:"\\f11e"}.fa-terminal:before{content:"\\f120"}.fa-code:before{content:"\\f121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\\f122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\\f123"}.fa-location-arrow:before{content:"\\f124"}.fa-crop:before{content:"\\f125"}.fa-code-fork:before{content:"\\f126"}.fa-unlink:before,.fa-chain-broken:before{content:"\\f127"}.fa-question:before{content:"\\f128"}.fa-info:before{content:"\\f129"}.fa-exclamation:before{content:"\\f12a"}.fa-superscript:before{content:"\\f12b"}.fa-subscript:before{content:"\\f12c"}.fa-eraser:before{content:"\\f12d"}.fa-puzzle-piece:before{content:"\\f12e"}.fa-microphone:before{content:"\\f130"}.fa-microphone-slash:before{content:"\\f131"}.fa-shield:before{content:"\\f132"}.fa-calendar-o:before{content:"\\f133"}.fa-fire-extinguisher:before{content:"\\f134"}.fa-rocket:before{content:"\\f135"}.fa-maxcdn:before{content:"\\f136"}.fa-chevron-circle-left:before{content:"\\f137"}.fa-chevron-circle-right:before{content:"\\f138"}.fa-chevron-circle-up:before{content:"\\f139"}.fa-chevron-circle-down:before{content:"\\f13a"}.fa-html5:before{content:"\\f13b"}.fa-css3:before{content:"\\f13c"}.fa-anchor:before{content:"\\f13d"}.fa-unlock-alt:before{content:"\\f13e"}.fa-bullseye:before{content:"\\f140"}.fa-ellipsis-h:before{content:"\\f141"}.fa-ellipsis-v:before{content:"\\f142"}.fa-rss-square:before{content:"\\f143"}.fa-play-circle:before{content:"\\f144"}.fa-ticket:before{content:"\\f145"}.fa-minus-square:before{content:"\\f146"}.fa-minus-square-o:before{content:"\\f147"}.fa-level-up:before{content:"\\f148"}.fa-level-down:before{content:"\\f149"}.fa-check-square:before{content:"\\f14a"}.fa-pencil-square:before{content:"\\f14b"}.fa-external-link-square:before{content:"\\f14c"}.fa-share-square:before{content:"\\f14d"}.fa-compass:before{content:"\\f14e"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:"\\f150"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:"\\f151"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:"\\f152"}.fa-euro:before,.fa-eur:before{content:"\\f153"}.fa-gbp:before{content:"\\f154"}.fa-dollar:before,.fa-usd:before{content:"\\f155"}.fa-rupee:before,.fa-inr:before{content:"\\f156"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:"\\f157"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:"\\f158"}.fa-won:before,.fa-krw:before{content:"\\f159"}.fa-bitcoin:before,.fa-btc:before{content:"\\f15a"}.fa-file:before{content:"\\f15b"}.fa-file-text:before{content:"\\f15c"}.fa-sort-alpha-asc:before{content:"\\f15d"}.fa-sort-alpha-desc:before{content:"\\f15e"}.fa-sort-amount-asc:before{content:"\\f160"}.fa-sort-amount-desc:before{content:"\\f161"}.fa-sort-numeric-asc:before{content:"\\f162"}.fa-sort-numeric-desc:before{content:"\\f163"}.fa-thumbs-up:before{content:"\\f164"}.fa-thumbs-down:before{content:"\\f165"}.fa-youtube-square:before{content:"\\f166"}.fa-youtube:before{content:"\\f167"}.fa-xing:before{content:"\\f168"}.fa-xing-square:before{content:"\\f169"}.fa-youtube-play:before{content:"\\f16a"}.fa-dropbox:before{content:"\\f16b"}.fa-stack-overflow:before{content:"\\f16c"}.fa-instagram:before{content:"\\f16d"}.fa-flickr:before{content:"\\f16e"}.fa-adn:before{content:"\\f170"}.fa-bitbucket:before{content:"\\f171"}.fa-bitbucket-square:before{content:"\\f172"}.fa-tumblr:before{content:"\\f173"}.fa-tumblr-square:before{content:"\\f174"}.fa-long-arrow-down:before{content:"\\f175"}.fa-long-arrow-up:before{content:"\\f176"}.fa-long-arrow-left:before{content:"\\f177"}.fa-long-arrow-right:before{content:"\\f178"}.fa-apple:before{content:"\\f179"}.fa-windows:before{content:"\\f17a"}.fa-android:before{content:"\\f17b"}.fa-linux:before{content:"\\f17c"}.fa-dribbble:before{content:"\\f17d"}.fa-skype:before{content:"\\f17e"}.fa-foursquare:before{content:"\\f180"}.fa-trello:before{content:"\\f181"}.fa-female:before{content:"\\f182"}.fa-male:before{content:"\\f183"}.fa-gittip:before,.fa-gratipay:before{content:"\\f184"}.fa-sun-o:before{content:"\\f185"}.fa-moon-o:before{content:"\\f186"}.fa-archive:before{content:"\\f187"}.fa-bug:before{content:"\\f188"}.fa-vk:before{content:"\\f189"}.fa-weibo:before{content:"\\f18a"}.fa-renren:before{content:"\\f18b"}.fa-pagelines:before{content:"\\f18c"}.fa-stack-exchange:before{content:"\\f18d"}.fa-arrow-circle-o-right:before{content:"\\f18e"}.fa-arrow-circle-o-left:before{content:"\\f190"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:"\\f191"}.fa-dot-circle-o:before{content:"\\f192"}.fa-wheelchair:before{content:"\\f193"}.fa-vimeo-square:before{content:"\\f194"}.fa-turkish-lira:before,.fa-try:before{content:"\\f195"}.fa-plus-square-o:before{content:"\\f196"}.fa-space-shuttle:before{content:"\\f197"}.fa-slack:before{content:"\\f198"}.fa-envelope-square:before{content:"\\f199"}.fa-wordpress:before{content:"\\f19a"}.fa-openid:before{content:"\\f19b"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:"\\f19c"}.fa-mortar-board:before,.fa-graduation-cap:before{content:"\\f19d"}.fa-yahoo:before{content:"\\f19e"}.fa-google:before{content:"\\f1a0"}.fa-reddit:before{content:"\\f1a1"}.fa-reddit-square:before{content:"\\f1a2"}.fa-stumbleupon-circle:before{content:"\\f1a3"}.fa-stumbleupon:before{content:"\\f1a4"}.fa-delicious:before{content:"\\f1a5"}.fa-digg:before{content:"\\f1a6"}.fa-pied-piper:before{content:"\\f1a7"}.fa-pied-piper-alt:before{content:"\\f1a8"}.fa-drupal:before{content:"\\f1a9"}.fa-joomla:before{content:"\\f1aa"}.fa-language:before{content:"\\f1ab"}.fa-fax:before{content:"\\f1ac"}.fa-building:before{content:"\\f1ad"}.fa-child:before{content:"\\f1ae"}.fa-paw:before{content:"\\f1b0"}.fa-spoon:before{content:"\\f1b1"}.fa-cube:before{content:"\\f1b2"}.fa-cubes:before{content:"\\f1b3"}.fa-behance:before{content:"\\f1b4"}.fa-behance-square:before{content:"\\f1b5"}.fa-steam:before{content:"\\f1b6"}.fa-steam-square:before{content:"\\f1b7"}.fa-recycle:before{content:"\\f1b8"}.fa-automobile:before,.fa-car:before{content:"\\f1b9"}.fa-cab:before,.fa-taxi:before{content:"\\f1ba"}.fa-tree:before{content:"\\f1bb"}.fa-spotify:before{content:"\\f1bc"}.fa-deviantart:before{content:"\\f1bd"}.fa-soundcloud:before{content:"\\f1be"}.fa-database:before{content:"\\f1c0"}.fa-file-pdf-o:before{content:"\\f1c1"}.fa-file-word-o:before{content:"\\f1c2"}.fa-file-excel-o:before{content:"\\f1c3"}.fa-file-powerpoint-o:before{content:"\\f1c4"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:"\\f1c5"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:"\\f1c6"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:"\\f1c7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\\f1c8"}.fa-file-code-o:before{content:"\\f1c9"}.fa-vine:before{content:"\\f1ca"}.fa-codepen:before{content:"\\f1cb"}.fa-jsfiddle:before{content:"\\f1cc"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:"\\f1cd"}.fa-circle-o-notch:before{content:"\\f1ce"}.fa-ra:before,.fa-rebel:before{content:"\\f1d0"}.fa-ge:before,.fa-empire:before{content:"\\f1d1"}.fa-git-square:before{content:"\\f1d2"}.fa-git:before{content:"\\f1d3"}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:"\\f1d4"}.fa-tencent-weibo:before{content:"\\f1d5"}.fa-qq:before{content:"\\f1d6"}.fa-wechat:before,.fa-weixin:before{content:"\\f1d7"}.fa-send:before,.fa-paper-plane:before{content:"\\f1d8"}.fa-send-o:before,.fa-paper-plane-o:before{content:"\\f1d9"}.fa-history:before{content:"\\f1da"}.fa-circle-thin:before{content:"\\f1db"}.fa-header:before{content:"\\f1dc"}.fa-paragraph:before{content:"\\f1dd"}.fa-sliders:before{content:"\\f1de"}.fa-share-alt:before{content:"\\f1e0"}.fa-share-alt-square:before{content:"\\f1e1"}.fa-bomb:before{content:"\\f1e2"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:"\\f1e3"}.fa-tty:before{content:"\\f1e4"}.fa-binoculars:before{content:"\\f1e5"}.fa-plug:before{content:"\\f1e6"}.fa-slideshare:before{content:"\\f1e7"}.fa-twitch:before{content:"\\f1e8"}.fa-yelp:before{content:"\\f1e9"}.fa-newspaper-o:before{content:"\\f1ea"}.fa-wifi:before{content:"\\f1eb"}.fa-calculator:before{content:"\\f1ec"}.fa-paypal:before{content:"\\f1ed"}.fa-google-wallet:before{content:"\\f1ee"}.fa-cc-visa:before{content:"\\f1f0"}.fa-cc-mastercard:before{content:"\\f1f1"}.fa-cc-discover:before{content:"\\f1f2"}.fa-cc-amex:before{content:"\\f1f3"}.fa-cc-paypal:before{content:"\\f1f4"}.fa-cc-stripe:before{content:"\\f1f5"}.fa-bell-slash:before{content:"\\f1f6"}.fa-bell-slash-o:before{content:"\\f1f7"}.fa-trash:before{content:"\\f1f8"}.fa-copyright:before{content:"\\f1f9"}.fa-at:before{content:"\\f1fa"}.fa-eyedropper:before{content:"\\f1fb"}.fa-paint-brush:before{content:"\\f1fc"}.fa-birthday-cake:before{content:"\\f1fd"}.fa-area-chart:before{content:"\\f1fe"}.fa-pie-chart:before{content:"\\f200"}.fa-line-chart:before{content:"\\f201"}.fa-lastfm:before{content:"\\f202"}.fa-lastfm-square:before{content:"\\f203"}.fa-toggle-off:before{content:"\\f204"}.fa-toggle-on:before{content:"\\f205"}.fa-bicycle:before{content:"\\f206"}.fa-bus:before{content:"\\f207"}.fa-ioxhost:before{content:"\\f208"}.fa-angellist:before{content:"\\f209"}.fa-cc:before{content:"\\f20a"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:"\\f20b"}.fa-meanpath:before{content:"\\f20c"}.fa-buysellads:before{content:"\\f20d"}.fa-connectdevelop:before{content:"\\f20e"}.fa-dashcube:before{content:"\\f210"}.fa-forumbee:before{content:"\\f211"}.fa-leanpub:before{content:"\\f212"}.fa-sellsy:before{content:"\\f213"}.fa-shirtsinbulk:before{content:"\\f214"}.fa-simplybuilt:before{content:"\\f215"}.fa-skyatlas:before{content:"\\f216"}.fa-cart-plus:before{content:"\\f217"}.fa-cart-arrow-down:before{content:"\\f218"}.fa-diamond:before{content:"\\f219"}.fa-ship:before{content:"\\f21a"}.fa-user-secret:before{content:"\\f21b"}.fa-motorcycle:before{content:"\\f21c"}.fa-street-view:before{content:"\\f21d"}.fa-heartbeat:before{content:"\\f21e"}.fa-venus:before{content:"\\f221"}.fa-mars:before{content:"\\f222"}.fa-mercury:before{content:"\\f223"}.fa-intersex:before,.fa-transgender:before{content:"\\f224"}.fa-transgender-alt:before{content:"\\f225"}.fa-venus-double:before{content:"\\f226"}.fa-mars-double:before{content:"\\f227"}.fa-venus-mars:before{content:"\\f228"}.fa-mars-stroke:before{content:"\\f229"}.fa-mars-stroke-v:before{content:"\\f22a"}.fa-mars-stroke-h:before{content:"\\f22b"}.fa-neuter:before{content:"\\f22c"}.fa-genderless:before{content:"\\f22d"}.fa-facebook-official:before{content:"\\f230"}.fa-firefox:before{content:"\\f269"}.fa-amazon:before{content:"\\f270"}';

	var categoryMap = { //rules 和 engineList 的对应
		'web': '网页',
		'map': '地图',
		'video': '视频',
		'music': '音乐',
		'image': '图片',
		'knowledge': '资料',
		'sociality': '社交',
		'shopping': '网购',
		'download': '下载',
	};

	function isTheSameCategory(c1, c2) {
		return (categoryMap[c1] || c1) == (categoryMap[c2] || c2);
	}


	var rules = [ //根据规则把搜索引擎列表插入到指定网站
		// 网页
		/////////////第一个可以当模板看
		{
			name: "google网页搜索", //你要加载的网站的名字(方便自己查找)
			enabled: true, //是否启用
			url: /^https?:\/\/(encrypted\.google\.com|www\.google\.(?!co\.jp)[^\/]{2,9})\/(webhp|search|#|$|\?)(?!.*tbm=)/, //在哪个网站上加载,正则.
			change: 'mutationTitle', //mutationTitle监视标题的变化,runAtComplete在页面结束时执行
			engineList: 'web', //加载哪个类型的列表:
			style: '\
			border-bottom: 1px solid #E5E5E5;\
			border-top: 1px solid #E5E5E5;\
			width:100%;\
			padding-left: 15px;\
			', //给引擎列表的样式
			// 插入文档,相关
			// target 将引擎跳转工具栏插入到文档的某个元素
			// (请使用css匹配(请加上 'css;' 的前缀),比如: 'css;#subform_ctrl' );
			// keyword 使用 css选中一个form input元素 或者 该项是一个函数，使用返回值
			// where 四种:
			// 'beforeBegin'(插入到给定元素的前面) ;
			// 'afterBegin'(作为给定元素的第一个子元素) ;
			// 'beforeEnd' (作为给定元素的最后一个子元素) ;
			// 'afterEnd'(插入到给定元素的后面);.
			insertIntoDoc: {
				target: 'css;#top_nav',
				where: 'beforeBegin',
			},
			stylish: '', //自定义样式
		}, {
			name: "google.co.jp",
			enabled: true,
			url: /^https?:\/\/www\.google\.co\.jp\/(webhp|search|#|$|\?)(?:.(?!&tbm=))*$/,
			change: 'mutationTitle',
			engineList: 'web',
			style: '\
			border-bottom: 1px solid #E5E5E5;\
			border-top: 1px solid #E5E5E5;\
			width:100%;\
			padding-left: 15px;\
			',


			insertIntoDoc: {
				target: 'css;#top_nav',
				where: 'beforeBegin',
			},
		}, {
			name: "baidu 网页搜索",
			url: /^https?:\/\/www\.baidu\.com\/(?:s(?!.*tn=baidulocal).*|baidu(?!.*tn=baidulocal).*|)$/,
			change: 'mutationTitle',
			enabled: true,
			engineList: 'web',
			style: '\
			border-top:1px solid #D9E1F7;\
			border-bottom:1px solid #D9E1F7;\
			margin-left: 122px;\
			',
			insertIntoDoc: {
				target: 'css;#container',
				where: 'beforeBegin',
			},
		}, {
			name: "baidu 简洁搜索", //百度简洁搜索：https://www.baidu.com/s?wd=firefox&ie=utf-8&tn=baidulocal
			url: /^https?:\/\/www\.baidu\.com\/s\?.*tn=baidulocal/,
			enabled: true,
			engineList: 'web',
			style: '\
			border-top:1px solid #D9E1F7;\
			border-bottom:1px solid #D9E1F7;\
			margin-left: 122px;\
			',
			insertIntoDoc: {
				target: 'css;table[bgcolor="#e6e6e6"]',
				where: 'beforeBegin',
			},
		}, {
			name: "必应网页搜索",
			url: /^https?:\/\/[^.]*\.bing\.com\/search/,
			enabled: true,
			engineList: 'web',
			style: '\
			border-collapse:separate;\
			border-top: 1px solid #E6E6E6;\
			border-bottom: 1px solid #E6E6E6;\
			margin-left: 10px;\
			',
			insertIntoDoc: {
				target: 'css;#b_header',
				where: 'beforeEnd',
			},
			stylish: '#b_content{ padding: 10px 0px 20px 100px !important; } .b_underSearchbox{margin:5px 20px 0px;}'
		}, {
			name: "360搜索",
			url: /^https?:\/\/www\.haosou\.com\/s\?/,
			engineList: 'web',
			enabled: true,
			style: '\
			border-bottom: 1px solid #E0E0E0;\
			border-top: 1px solid #E0E0E0;\
			margin-left: 20px;\
			',
			insertIntoDoc: {
				target: 'css;#head',
				where: 'afterEnd',
			},
			stylish: '#header .inner{height: 116px !important;}'
		}, {
			name: "搜狗网页搜索",
			url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
			enabled: true,
			engineList: 'web',
			style: "\
			margin-bottom: 10px;\
			margin-left: 35px;\
			",
			insertIntoDoc: {
				target: 'css;#wrapper',
				where: 'beforeBegin',
			},
			stylish: '.header{ margin-bottom: 5px; }'
		}, {
			name: "雅虎网页搜索",
			url: /^https?:\/\/search\.yahoo\.com\/search/,
			engineList: '网页',
			enabled: true,
			style: "\
			margin-left: 15px;\
			border-top:1px solid #D4E9F7;\
			border-bottom:1px solid #D4E9F7;\
			",
			insertIntoDoc: {
				target: 'css;#hd',
				where: 'afterEnd'
			},
			stylish: '#doc #sticky-hd ~ #bd {margin-top: 110px;}'
		}, {
			name: "tw.yahoo",
			url: /^https?:\/\/tw\.search\.yahoo\.com\/search/,
			engineList: '网页',
			enabled: true,
			style: "\
			margin-left:15px;\
			margin-top:5px;\
			border-top:1px solid #D4E9F7;\
			border-bottom:1px solid #D4E9F7;\
			",
			insertIntoDoc: {
				target: 'css;#sticky-hd',
				where: 'beforeEnd'
			},
			stylish: '#bd {margin-top: 105px!important;}'
		}, {
			name: "yahoo.co.jp",
			url: /^https?:\/\/search\.yahoo\.co\.jp\/search/,
			engineList: '网页',
			enabled: true,
			style: "\
			margin:0px auto;\
			border:1px solid #D4E9F7;\
			",
			insertIntoDoc: {
				target: 'css;#ygma',
				where: 'afterEnd'
			},
		}, {
			name: "duckduckgo",
			url: /^https?:\/\/duckduckgo\.com\/\?/,
			engineList: '网页',
			enabled: true,
			style: "\
			margin-left:15px;\
			border:1px solid #D4E9F7;\
			",
			insertIntoDoc: {
				target: 'css;#zero_click_wrapper',
				where: 'afterEnd'
			},
		},
		// 知识
		{
			name: "谷歌学术",
			enabled: true,
			url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
			engineList: "资料",
			style: '\
			border-bottom:1px solid #E5E5E5;\
			border-top:1px solid #E5E5E5;\
			z-index:999;\
			position:relative;\
			',
			insertIntoDoc: {
				target: 'css;#gs_ab',
				where: 'beforeBegin'
			}
		}, {
			name: "百度学术",
			url: /^https?:\/\/xueshu\.baidu\.com\/s\?/,
			enabled: true,
			engineList: '资料',
			style: '\
			border-bottom:1px solid #D9E1F7;\
			',
			insertIntoDoc: {
				target: 'css;#head',
				where: 'afterEnd',
			},
			stylish: '#container{padding-top: 130px !important;}'
		}, {
			name: "百度百科",
			url: /^https?:\/\/baike\.baidu\.com\/(search|view|subview)/,
			engineList: "资料",
			enabled: true,
			style: "\
			z-index: 999999;\
			",
			insertIntoDoc: {
				target: 'css;.header-wrapper',
				where: 'afterEnd',
			},
		}, {
			name: "萌娘百科",
			url: /^https?:\/\/zh\.moegirl\.org\/./,
			engineList: "资料",
			enabled: true,
			style: "\
			z-index: 999999;\
			",
			insertIntoDoc: {
				keyword: function() {
					if (document.getElementById('searchText')) return document.getElementById('searchText').value;
					else return document.getElementById('firstHeading').textContent;
				},
				target: 'css;#content',
				where: 'afterBegin',
			},
		}, {
			name: "google book",
			enabled: true,
			url: /^https?:\/\/www\.google\.co.{1,3}\/search\?.*(&btnG=%E6)|(tbm=bks)/,
			change: 'mutationTitle',
			engineList: '资料',
			style: '\
			border-bottom: 1px solid #E5E5E5;\
			border-top: 1px solid #E5E5E5;\
			width:100%;\
			padding-left: 15px;\
			',
			insertIntoDoc: {
				target: 'css;#top_nav',
				where: 'beforeBegin',
			},
		}, {
			name: "互知识",
			url: /^https?:\/\/[a-z]{2,3}\.baike\.com\/[a-z]/,
			enabled: true,
			engineList: "资料",
			style: '\
			position:fixed;\
			top:80px;\
			right:2%;\
			width:90px;\
			z-index:99;\
			',
			insertIntoDoc: {
				keyword: function() {
					var input;
					if (document.getElementsByClassName('ac_input')[0] != undefined) {
						if (document.getElementsByClassName('ac_input')[0].value != "")
							input = document.getElementsByClassName('ac_input')[0].value;
						else if (document.getElementsByClassName('blue')[0].innerHTML != "") input = document.getElementsByClassName('blue')[0].innerHTML;
						else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
					} else if (document.getElementsByClassName('blue')[0].innerHTML != "") input = document.getElementsByClassName('blue')[0].innerHTML;
					else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
					return input;
				},
				target: 'css;body',
				where: 'afterbegin'
			}
		}, {
			name: "wiki",
			url: /^https?:\/\/..\.wikipedia\.org\/w\/index\.php(?!.*\?search=)/,
			enabled: true,
			engineList: "资料",
			style: '\
			border-top:1px solid #D9E1F7;\
			border-bottom:1px solid #D9E1F7;\
			margin-top:5px;\
			',
			insertIntoDoc: {
				target: 'css;#siteNotice',
				where: 'beforeBegin'
			}
		}, {
			name: "wiki[ZH]",
			url: /^https?:\/\/zh\.wikipedia\.org\/(?:zh|wiki\/|w\/index.php\?search=)/,
			enabled: true,
			engineList: "资料",
			style: '\
			border-top:1px solid #D9E1F7;\
			border-bottom:1px solid #D9E1F7;\
			margin-top:5px;\
			',
			insertIntoDoc: {
				keyword: function() {
					if (document.getElementById('searchText'))
						return document.getElementById('searchText').value;
					else return document.getElementById('firstHeading').childNodes[0].textContent;
				},
				target: 'css;#siteNotice',
				where: 'beforeBegin'
			}
		}, {
			name: "wiki[EN]",
			url: /^https?:\/\/en\.wikipedia\.org\/(wiki\/|w\/index\.php\?search=)/,
			enabled: true,
			engineList: "资料",
			style: '\
			border-top:1px solid #D9E1F7;\
			border-bottom:1px solid #D9E1F7;\
			margin-top:5px;\
			',
			insertIntoDoc: {
				keyword: function() {
					if (document.getElementById('searchText'))
						return document.getElementById('searchText').value;
					else return document.getElementById('firstHeading').childNodes[0].textContent;
				},
				target: 'css;#siteNotice',
				where: 'beforeBegin'
			}
		}, {
			name: "wiki[JP]",
			url: /^https?:\/\/ja\.wikipedia\.org\/(wiki\/|w\/index\.php\?search=)/,
			enabled: true,
			engineList: "资料",
			style: '\
			border-top:1px solid #D9E1F7;\
			border-bottom:1px solid #D9E1F7;\
			margin-top:5px;\
			',
			insertIntoDoc: {
				keyword: function() {
					if (document.getElementById('searchText'))
						return document.getElementById('searchText').value;
					else return document.getElementById('firstHeading').childNodes[0].textContent;
				},
				target: 'css;#siteNotice',
				where: 'beforeBegin'
			}
		}, {
			name: "百度知道(search)",
			url: /^https?:\/\/zhidao\.baidu\.com\/search/,
			enabled: true,
			engineList: "资料",
			style: '\
			margin-bottom: 8px;\
			',
			insertIntoDoc: {
				target: 'css;#body',
				where: 'beforeBegin'
			},
		}, {
			name: "百度知道(question)",
			url: /^https?:\/\/zhidao\.baidu\.com\/question/,
			enabled: true,
			engineList: "资料",
			style: '\
			width: 980px;\
			margin: 0 auto;\
			white-space: nowrap;\
			',
			insertIntoDoc: {
				target: 'css;#body',
				where: 'beforeBegin'
			},
			endFix: function() { //插入搜索条后修正绿色背景错位的问题
				var container = document.getElementById('sej-container');
				if (container && document.body.classList.contains('has-menu')) {
					document.body.style.backgroundPosition = '0px ' + (95 + container.clientHeight) + 'px';
				}
			},
		}, {
			name: "知乎",
			url: /^https?:\/\/www\.zhihu\.com\/search\?/,
			enabled: true,
			engineList: "资料",
			style: '\
			border-bottom:1px solid #D9E1F7;\
			margin: 0 auto;\
			',
			insertIntoDoc: {
				target: 'css;.zu-top',
				where: 'afterEnd'
			},
		}, {
			name: "百度文库",
			url: /^https?:\/\/wenku\.baidu\.com\/search\?/,
			enabled: true,
			engineList: "资料",
			style: '\
			border-top:1px solid #D9E1F7;\
			border-bottom:1px solid #D9E1F7;\
			',
			insertIntoDoc: {
				target: 'css;#hd',
				where: 'afterEnd'
			}
		}, {
			name: "豆丁",
			url: /^https?:\/\/www\.docin\.com\/search\.do/,
			enabled: true,
			engineList: "资料",
			style: '\
			padding-top:65px;\
			border-top:1px solid #00000;\
			border-bottom:1px solid #D9E1F7;\
			',
			insertIntoDoc: {
				target: 'css;.nav',
				where: 'beforeBegin'
			}
		},
		// 地图
		{
			name: "百度地图",
			url: /^https?:\/\/map\.baidu\.com\/\?newmap/,
			enabled: true,
			engineList: "map",
			style: '\
			margin-left:20px;\
			border-top:1px solid #00000;\
			border-bottom:1px solid #D9E1F7;\
			',
			insertIntoDoc: {
				target: 'css;#searchWrapper',
				where: 'beforeEnd'
			}
		}, {
			name: "google地图",
			url: /^https?:\/\/www\.google\.co.{1,4}\/maps/,
			enabled: true,
			engineList: "map",
			style: '\
			margin-top: 3px;\
			',
			insertIntoDoc: {
				target: 'css;#omnibox',
				where: 'beforeEnd'
			},
			stylish: '.widget-pane-section-omnibox-spacer{height:90px !important;} .sej-drop-list-trigger{display:none;}',
		}, {
			name: "搜狗地图",
			url: /^https?:\/\/map\.sogou\.com\/#/,
			enabled: true,
			engineList: "map",
			style: '\
			padding-left:15px;\
			display:block;\
			border-top:1px solid #00000;\
			border-bottom:1px solid #D9E1F7;\
			word-break:keep-all;\
			white-space:nowrap;\
			',
			insertIntoDoc: {
				target: 'css;#search_form',
				where: 'afterEnd'
			},
			stylish: '.sej-drop-list-trigger {display:none;}'
		}, {
			name: "Bing地图",
			url: /^https?:\/\/[^.]*\.bing\.com\/ditu\//,
			enabled: true,
			engineList: "map",
			style: '\
			display: inline-block;\
			margin-left:15px;\
			border-top:1px solid #00000;\
			border-bottom:1px solid #D9E1F7;\
			word-break:keep-all;\
			white-space:nowrap;\
			',
			insertIntoDoc: {
				target: 'css;#sw_content',
				where: 'beforeBegin'
			}
		},
		// 音乐
		{
			name: "天天动听",
			url: /^https?:\/\/www\.dongting\.com\/#/,
			enabled: true,
			engineList: "music",
			style: "\
			margin-left:23%;\
			background-color:#E2E2E2;\
			position: fixed;\
			right:0;\
			",
			insertIntoDoc: {
				keyword: 'css;.searchBox',
				target: 'css;.head',
				where: 'beforeEnd'
			}
		}, {
			name: "百度音乐",
			url: /^https?:\/\/music\.baidu\.com\/search/,
			enabled: true,
			engineList: "music",
			insertIntoDoc: {
				target: 'css;.nav-wrapper',
				where: 'beforeBegin'
			}
		}, {
			name: "qq音乐",
			url: /^https?:\/\/cgi\.music\.soso\.com/,
			enabled: true,
			engineList: "music",
			style: "\
			margin:2px auto;\
			",
			insertIntoDoc: {
				target: 'css;#search_result',
				where: 'beforeBegin'
			}
		}, {
			name: "搜狗音乐",
			url: /^https?:\/\/mp3\.sogou\.com\/music\.so/,
			enabled: true,
			engineList: "music",
			insertIntoDoc: {
				target: 'css;#header_sogou',
				where: 'afterEnd'
			}
		}, {
			name: "音悦台",
			url: /^https?:\/\/so\.yinyuetai\.com\/mv\?/,
			enabled: true,
			engineList: "music",
			insertIntoDoc: {
				target: 'css;.search_title',
				where: 'beforeBegin'
			},
		}, {
			name: "一听音乐",
			url: /^https?:\/\/so\.1ting\.com\//,
			enabled: true,
			engineList: "music",
			style: "\
			width: 960px;\
			",
			insertIntoDoc: {
				target: 'css;.nav',
				where: 'beforeBegin'
			}
		}, {
			name: "songtaste",
			url: /^https?:\/\/www\.songtaste\.com\/search/,
			enabled: true,
			engineList: "music",
			style: "\
			word-break:keep-all;\
			white-space:nowrap;\
			background-color:#E6E6E6;\
			",
			insertIntoDoc: {
				target: 'css;head',
				where: 'beforeBegin'
			}
		}, {
			name: "xiami",
			url: /^https?:\/\/www\.xiami\.com\/search/,
			enabled: true,
			engineList: "music",
			style: "\
			word-break:keep-all;\
			margin-right: 205px;\
			",
			insertIntoDoc: {
				target: 'css;.more_cols_left_inner',
				where: 'beforeBegin'
			}
		},

		// 图片
		{
			name: "谷歌图片",
			url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/search\?(.*tbs=sbi)|(.*tbm=isch)/,
			enabled: true,
			engineList: "image",
			style: '\
			margin-left:0px;\
			',
			insertIntoDoc: {
				target: 'css;#top_nav',
				where: 'beforeBegin'
			}
		}, {
			name: "百度图片",
			url: /^https?:\/\/image\.baidu\.c(om|n)\/search/,
			enabled: true,
			engineList: "image",
			style: '\
			margin-left:40px;\
			',
			insertIntoDoc: {
				target: 'css;#search',
				where: 'afterEnd'
			}
		}, {
			name: "360图片",
			url: /^https?:\/\/\image\.haosou\.com\/i\?/,
			enabled: true,
			engineList: "image",
			style: '\
			word-break:keep-all;\
			white-space:nowrap;\
			position:relative;\
			z-index:50;\
			text-align:left;\
			',
			insertIntoDoc: {
				target: 'css;#searchBox',
				where: 'afterBegin'
			},
			etc: function() {
				document.getElementById("searchBox").style.height = '80px';
			}
		}, {
			name: "bing图片",
			url: /^https?:\/\/.*\.bing\.com\/images\/search/,
			enabled: true,
			engineList: "image",
			style: '\
			top:-5px;\
			margin-left:5px;\
			border-collapse:separate;\
			',
			insertIntoDoc: {
				target: 'css;#rfPane',
				where: 'beforeEnd'
			},
		}, {
			name: "搜狗图片",
			url: /^https?:\/\/pic\.sogou\.com\/pic/,
			engineList: "image",
			enabled: true,
			style: "\
			margin-top: 10px;\
			margin-left:35px;\
			",
			insertIntoDoc: {
				target: 'css;.fix_area',
				where: 'beforeEnd'
			},
			stylish: '#hdFix{height:130px !important;}',
		}, {
			name: "有道图片",
			url: /^https?:\/\/image\.youdao\.com\/search/,
			engineList: "image",
			enabled: true,
			style: "\
			",
			insertIntoDoc: {
				target: 'css;#w',
				where: 'beforeBegin'
			}
		}, {
			name: "花瓣",
			url: /^https?:\/\/huaban\.com\/search\/\?/,
			engineList: "image",
			enabled: true,
			style: "\
			width:100%;\
			background-color:#FFFFFF;\
			text-align:center;\
			",
			insertIntoDoc: {
				target: 'css;#header',
				where: 'beforeEnd'
			},
			stylish: '#page{padding-top: 75px;}',
		}, {
			name: "flickr",
			url: /^https?:\/\/www\.flickr\.com\/search/,
			engineList: "image",
			enabled: true,
			style: "\
			position:fixed;\
			top:50px;\
			left: 50%;\
			transform: translate(-50%,0);\
			z-index:1999;\
			",
			insertIntoDoc: {
				keyword: function() {
					var input = document.querySelector("input[type='text'][value]");
					if (input) return input.value;
					else {
						var m = location.search.match(/q=([^&]+)/i);
						if (m) return true;
					}
				},
				target: 'css;body',
				where: 'beforeBegin'
			}
		}, {
			name: "picsearch",
			url: /^http:\/\/(..|...)\.picsearch\.com\/index\.cgi/,
			engineList: "image",
			enabled: true,
			style: "\
			margin-bottom:3px;\
			",
			insertIntoDoc: {
				keyword: 'css;input[name=q]',
				target: 'css;#content',
				where: 'afterBegin'
			}
		}, {
			name: "pixiv",
			url: /^http:\/\/www\.pixiv\.net\/search\.php/,
			engineList: "image",
			enabled: true,
			style: "\
			box-shadow:none;\
			",
			insertIntoDoc: {
				keyword: 'css;input[name=word]',
				target: 'css;body',
				where: 'beforeBegin'
			}
		}, {
			name: "deviantart",
			url: /^https?:\/\/www\.deviantart\.com\/browse\/all\//,
			engineList: "image",
			enabled: true,
			style: "\
			margin-bottom:10px;\
			",
			insertIntoDoc: {
				target: 'css;.browse-top-bar',
				where: 'afterEnd'
			}
		}, {
			name: "jpg4",
			url: /^http:\/\/img\.jpg4\.info\//,
			engineList: "image",
			enabled: true,
			insertIntoDoc: {
				target: 'css;form[name="formMAIN"]',
				where: 'beforeEnd'
			}
		},

		// 下载
		{
			name: "cili008",
			url: /^http:\/\/cili008\.com\/\?topic_title/,
			engineList: "下载",
			enabled: true,
			insertIntoDoc: {
				target: 'css;.header-box',
				where: 'afterEnd',
			},
		}, {
			name: "dmhy",
			url: /^https?:\/\/share\.dmhy\.org\/topics\/list/,
			engineList: "download",
			enabled: true,
			insertIntoDoc: {
				keyword: function() {
					var key = document.querySelector('#keyword').value;
					if (key) return key;
					else key = document.title.split(/「|」/)[1];
					return key;
				},
				target: 'css;.quick_search',
				where: 'afterEnd'
			}
		}, {
			name: "kickass",
			url: /^https?:\/\/kat\.cr\/usearch\//,
			engineList: "download",
			enabled: true,
			insertIntoDoc: {
				target: 'css;#menu',
				where: 'afterEnd'
			},
		}, {
			name: "nyaa",
			url: /^https?:\/\/www\.nyaa\.(se|eu)\/\?page=search/,
			engineList: "download",
			enabled: true,
			style: "\
			top:44px;\
			position: fixed;\
			left: 50%;\
			transform: translate(-50%, 0px);\
			white-space: nowrap;\
			",
			insertIntoDoc: {
				target: 'css;#topbar',
				where: 'afterEnd'
			},
			stylish: '#main{padding-top:70px;}',
		}, {
			name: "sukebei.nyaa",
			url: /^https?:\/\/sukebei\.nyaa\.(se|eu)\/\?page=search/,
			engineList: "download",
			enabled: true,
			style: "\
			top:44px;\
			position: fixed;\
			left: 50%;\
			transform: translate(-50%, 0px);\
			white-space: nowrap;\
			",
			insertIntoDoc: {
				target: 'css;#topbar',
				where: 'afterEnd'
			},
			stylish: '#main{padding-top:70px;}',
		}, {
			name: "xiaohx",
			url: /^https?:\/\/www\.xiaohx\.net\/search\?/,
			engineList: "download",
			enabled: true,
			insertIntoDoc: {
				target: 'css;.header_box',
				where: 'afterEnd'
			},
		}, {
			name: "ed2000",
			url: /^https?:\/\/www\.ed2000\.com\/FileList\.asp/,
			engineList: "download",
			enabled: true,
			style: "\
			word-break:keep-all;\
			white-space:nowrap;\
			left: 50%;\
    		transform: translate(-50%, 0);\
			",
			insertIntoDoc: {
				target: 'css;.topsearch',
				where: 'afterEnd'
			},
		}, {
			name: "bt2mag",
			url: /^https?:\/\/www\.bt2mag\.com\/search\//,
			enabled: true,
			engineList: "download",
			style: '\
			word-break:keep-all;\
			white-space:nowrap;\
			margin:10px auto;\
			',
			insertIntoDoc: {
				target: 'css;.fullsearch-form.search',
				where: 'afterEnd'
			},
			etc: function() {
				if (window.location.href.indexOf('%20') != -1) window.location.href = window.location.href.replace('%20', '+');
			}
		}, {
			name: "torrentkitty",
			url: /^https?:\/\/(www\.)?torrentkitty\.(net|org)\/search\//,
			enabled: true,
			engineList: "download",
			style: '\
			background-color:#FFFFFF;\
			margin-top:50px;\
			',
			insertIntoDoc: {
				keyword: function() {
					return document.getElementsByTagName("h2")[0].innerHTML.slice(19, -1);
				},
				target: 'css;.wrapper',
				where: 'afterEnd'
			}
		}, {
			name: "BTDigg",
			url: /^https?:\/\/btdigg\.org\/search\?/,
			enabled: true,
			engineList: "download",
			insertIntoDoc: {
				target: 'css;.pager',
				where: 'beforeBegin'
			}
		},

		//字幕
		{
			name: "subom",
			url: /^https?:\/\/www\.subom\.net\/search/,
			engineList: "download",
			enabled: true,
			insertIntoDoc: {
				target: 'css;#container',
				where: 'afterBegin'
			}
		}, {
			name: "subhd",
			url: /^https?:\/\/subhd\.com\/search/,
			engineList: "download",
			enabled: true,
			style: "\
			top: -10px;\
			",
			insertIntoDoc: {
				target: 'css;.container.list',
				where: 'beforeBegin'
			}
		}, {
			name: "射手网(伪)",
			url: /^https?:\/\/sub\.makedie\.me\/sub\/\?s/,
			engineList: "download",
			enabled: true,
			insertIntoDoc: {
				target: 'css;#site_header',
				where: 'afterEnd'
			}
		},
		// 购物
		{
			name: "一淘",
			url: /^https?:\/\/s8?\.etao\.com\/search/,
			enabled: true,
			engineList: "shopping",
			insertIntoDoc: {
				target: 'css;#etao-header-bd',
				where: 'beforeBegin'
			}
		}, {
			name: "京东",
			url: /^https?:\/\/search\.jd\.com\/(S|s)earch\?/i,
			enabled: true,
			engineList: "shopping",
			insertIntoDoc: {
				target: 'css;div[id*="nav-201"]',
				where: 'beforeBegin'
			}
		}, {
			name: "淘宝搜索",
			url: /^https?:\/\/(s|haosou\.ai)\.taobao\.com\/search/,
			enabled: true,
			change: 'runAtComplete',
			engineList: "shopping",
			style: "\
			width:100%;\
			text-align:center;\
			",
			insertIntoDoc: {
				target: 'css;body',
				where: 'beforeBegin',
			},
		}, {
			name: "易迅",
			url: /^https?:\/\/searchex\.yixun\.com\/html\?/,
			enabled: true,
			engineList: "shopping",
			style: "\
			text-align: center;\
			background-color:#FFFFFF;\
			",
			insertIntoDoc: {
				target: 'css;.ic_header',
				where: 'beforeEnd'
			}
		}, {
			name: "苏宁",
			url: /^https?:\/\/search\.suning\.com\//,
			enabled: true,
			engineList: "shopping",
			style: "\
			border-bottom:1px solid #E5E5E5;\
			",
			insertIntoDoc: {
				target: 'css;.ng-header',
				where: 'afterEnd'
			}
		}, {
			name: "天猫",
			url: /^https?:\/\/list\.tmall\.com\/\/?search/,
			enabled: true,
			engineList: "shopping",
			style: "\
			border-top:1px solid #E5E5E5;\
			margin-bottom:3px;\
			",
			insertIntoDoc: {
				target: 'css;#header',
				where: 'afterEnd'
			}
		}, {
			name: "亚马逊",
			url: /^https?:\/\/www\.amazon\.cn\/s\/ref/,
			enabled: true,
			engineList: "shopping",
			style: "\
			width: 100%;\
    		text-align: center;\
			",
			insertIntoDoc: {
				target: 'css;#navbar',
				where: 'beforeEnd'
			}
		}, {
			name: "当当",
			url: /^https?:\/\/search\.dangdang\.com\/\?key/,
			enabled: true,
			engineList: "shopping",
			insertIntoDoc: {
				target: 'css;#bd',
				where: 'beforeBegin'
			}
		}, {
			name: "拍拍",
			url: /^https?:\/\/(www|duobao)\.paipai\.com\/(list)?\?/,
			enabled: true,
			engineList: "shopping",
			insertIntoDoc: {
				keyword: 'css;input[type="text"]',
				target: 'css;#toTop',
				where: 'afterEnd'
			}
		},
		// 词典
		{
			name: "汉典",
			url: /^https?:\/\/www\.zdic\.net\/sousuo/,
			enabled: true,
			engineList: "etc",
			insertIntoDoc: {
				target: 'css;.secpan',
				where: 'afterEnd'
			}
		},
	];

	if (typeof exports !== 'undefined') {
		exports.rules = rules;
	}

	reloadDebug();

	// --------------------可设置项结束------------------------

	var debug;

	function reloadDebug() {
		debug = prefs.debug ? console.debug.bind(console) : function() {};
	}

	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function(str) {
			return this.slice(0, str.length) == str;
		};
	}


	function getPostFormHTML(url, args, newTab) { //获取 method 为 POST 的表单的 HTML
		var form = '<form method="post"' +
			' action="' + url + '"' +
			(newTab ? ' target="_blank"' : '') +
			'>';
		for (var arg in args) {
			var input = '<input type="hidden"' +
				' name="' + arg + '"' +
				' value="' + args[arg] + '"' +
				' />';
			form += input;
		}
		form += '</form>';
		return form;
	}

	function wrapToHide(html) { //包装 HTML 元素代码以隐藏该元素
		return '<span style="display:none;">' + html + '</span>';
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

	// 事件支持检测.
	// 比如 eventSupported('fullscreenchange', document);
	function eventSupported(eventName, elem) {
		elem = elem || document.createElement('div');
		var prefix = ['o', 'ms', 'moz', 'webkit', ''];

		var l = prefix.length;
		var pEventName;
		var isFunction;
		var setAttr;

		while (l--) {
			pEventName = 'on' + prefix[l] + eventName;

			if (pEventName in elem) return pEventName.slice(2);
			else if (typeof elem.setAttribute == 'function') { //setAttribute 是元素节点的方法
				setAttr = false;
				if (!elem.hasAttribute(pEventName)) {
					setAttr = true;
					elem.setAttribute(pEventName, 'return;');
				};

				isFunction = typeof elem[pEventName] == 'function';

				if (setAttr) elem.removeAttribute(pEventName);

				if (isFunction) {
					return pEventName.slice(2);
				};
			};
		};

		return false;
	};


	var data = (function() { //保存指定对象相关数据
		'use strict';

		var cache = {
			objs: [],
			data: {},
		};


		function data(obj, key, value) {
			var id = cache.objs.indexOf(obj);
			if (id == -1) {
				id = cache.objs.push(obj) - 1;
			};
			if (!cache.data[id]) cache.data[id] = {}; //初始化
			if (typeof value == 'undefined') { //取值
				return typeof key == 'undefined' ? cache.data[id] : cache.data[id][key];
			} else {
				return cache.data[id][key] = value;
			};
		};

		return data;
	})();

	// 为mouseleave mouseenter事件做个兼容
	// 需要 eventSupported， data函数支持
	var mouseEventListener = (function() {

		var support = {
			mouseleave: eventSupported('mouseleave'),
			mouseenter: eventSupported('mouseenter'),
		};

		var map = {
			mouseleave: 'mouseout',
			mouseenter: 'mouseover',
		};

		return {
			add: function(type, ele, callback) { //事件类型，元素，监听函数
				if (support[type]) {
					ele.addEventListener(type, callback, false); //mouseleave,enter不冒泡，所以在冒泡阶段监听事件，不要担心子孙元素进出发生的事件冒泡上来。
				} else {
					var listener = data(callback, 'mouseELListener');
					if (!listener) {
						listener = function(e) {
							var relatedTarget = e.relatedTarget; //mouseout，去往的元素；mouseover，来自的元素
							// 当mouseout（离开ele）去往的元素不是自己的子孙元素
							// 当mouseover（进入ele）来自的元素不是自己的子孙元素
							if (!ele.contains(relatedTarget)) { //contains函数，自己.contains(自己) 返回true
								callback.call(ele, e);
							};
						};
						data(callback, 'mouseELListener', listener);
					};

					ele.addEventListener(map[type], listener, true);
				};
			},
			remove: function(type, ele, callback) {
				if (support[type]) {
					ele.removeEventListener(type, callback, false);
				} else {
					ele.removeEventListener(map[type], data(callback, 'mouseELListener'), true);
				};
			},
		};
	})();


	function getScrolled(container) { //获取已滚动的距离
		if (container) {
			return {
				x: container.scrollLeft,
				y: container.scrollTop,
			};
		};
		return {
			x: 'scrollX' in window ? window.scrollX : ('pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft || document.body.scrollLeft),
			y: 'scrollY' in window ? window.scrollY : ('pageYOffset' in window ? window.pageYOffset : document.documentElement.scrollTop || document.body.scrollTop),
		};
	};

	function getElement(selector) {
		if (selector.indexOf('css;') == 0) {
			return document.querySelector(selector.slice(4));
		} else {
			return "";
		};
	};

	function toUTF16(str) { //说是UTF16，但其实是dA专用的，是对转义字符进行编码
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
				} else {
					ret.push('%' + charCode.toString(16));
				};
			} else {
				gCode = charCode.toString();
				if (gCode) {
					while (gCode.length < 4) {
						gCode = '0' + gCode;
					};
					ret.push('%26%23' + gCode + '%3B');
				} else {
					/*字库里面没有.*/
				};
			};
		};
		return ret.join('');
	};




	function getFaviconUrl(url, type) {
		var uri = parseUri(url);
		switch (type) {
			case 0:
				return 'https://www.google.com/s2/favicons?domain=' + uri.host;
			default:
				return uri.protocol + '://' + uri.host + '/favicon.ico';
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
		uri[o.ds.name][0]['key'] = (uri.protocol ? uri.protocol : 'http') + '://' + uri.host + (uri.port ? ':' + uri.port : '') + '/';
		uri[o.ds.name][0]['val'] = '/';
		var i = 0,
			tempsub = '/',
			subs = uri[o.key[10]].substr(1).split('/');
		for (var j = 1; j < (subs.length + 1); j++, i++) {
			tempsub += tempsub === '/' ? subs[i] : '/' + subs[i];
			if (subs[i]) {
				uri[o.ds.name][j] = {};
				uri[o.ds.name][j]['key'] = subs[i];
				uri[o.ds.name][j]['val'] = tempsub;
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

	if (typeof exports !== 'undefined') {
		exports.parseDataStr = parseDataStr;
		exports.parseUri = parseUri;
	}

	function addGlobalStyle() {
		// 添加全局样式和自定义样式
		var style = document.getElementById('sej-style');
		if (!style) {
			style = document.createElement('style');
			style.id = 'sej-style';
			style.type = 'text/css';
			style.textContent = MAIN_CSS + '\n' + (matchedRule.stylish || '');
			document.head.appendChild(style);
		}
		var style = document.getElementById('sej-fontawesome');
		if (!style) {
			style = document.createElement('style');
			style.id = 'sej-fontawesome';
			style.type = 'text/css';
			style.textContent = fontawesome;
			document.head.appendChild(style);
		}
	}

	function addContainer(iTarget, iInput) {
		function parseDataStr(str) { //转换文本数据

			var List = str.split(/\n(?=[^\s])/);
			List.forEach(function(eachList) {
				var line = eachList.split(/[\n\r]+/);
				var category = line[0];
				if (isTheSameCategory(category, matchedRule.engineList)) {
					container.innerHTML += '<sejli><sejspan id="sej-expanded-category">' + category + '</sejspan></sejli>'
					parseLine(container, line, true);
				} else {
					var contSejli = document.createElement('sejli');
					contSejli.className = "sej-engine sej-drop-list-trigger"
					contSejli.innerHTML = '<sejspan>' + category + '</sejspan>'
					var sejul = document.createElement('sejul');
					sejul.className = "sej-drop-list";
					parseLine(sejul, line, false);
					contSejli.appendChild(sejul);
					container.appendChild(contSejli);
				}
			})


			str = str.replace(/[\n\r]+[\s\/]*-\s*(\S+):/g, '_POST_ $1:'); //提前处理下特殊的 post 方式

			var parseArgs = function(str) {
				var arr = str.replace(/，/g, ', ').split(/\s*, \s*/);
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
				var flag, flag2;//flag用于判断引擎分类名，以确保后续加入子列表，flag2用于记录子列表完成，可存入。
				for (var i = 0; i < line.length; i++) {
					if (!line[i]) continue;

					if (line[i].indexOf('//') == 0) {
						continue;
					}
					var arr = line[i].replace(/，/g, ', ').split(/\s*, \s*/);
					if (isCurrent && matchedRule.engineList && toRE(matchedRule.url).test(arr[1])) { //去掉跳转到当前引擎
						if(flag==i-1){flag++}
						else if(flag2==i-1){flag2++}
						continue;
					}
					var engine = {};
					if (line[i].indexOf('_POST_') != -1) {
						engine.method = 'POST';
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
						sejul = document.createElement('sejul');
						sejul.className = "sej-drop-list";
						continue;
					}
					if (/\s\s/.test(arr[0])) {
						var url = arr[1];
						var sejli = document.createElement('sejli');
						sejli.innerHTML = getaPattern(arr);
						sejul.appendChild(sejli);
						if (i == flag + 1) { //由于是引擎细分，所以引擎名字上也需要能点击才行
							arr[0] = defaultEngine;
							contSejli = document.createElement('sejli');
							contSejli.innerHTML = getaPattern(arr).replace("sej-engine", "sej-engine sej-drop-list-trigger");
						}
						flag2 = i;
						if (i == line.length - 1) {
							contSejli.appendChild(sejul);
							container.appendChild(contSejli);
						}
						continue;
					}
					if (/\s[^\s]/.test(arr[0])) {
						if (flag2 == i - 1 && sejul != "") {
							contSejli.appendChild(sejul);
							container.appendChild(contSejli);
						}
						sejul = "";
						var sejli = document.createElement('sejli');
						sejli.innerHTML = getaPattern(arr);
						container.appendChild(sejli);
					}
				}
			};

		}

		function getaPattern(arr) {
				if (arr[1].indexOf('_POST_') != -1) {
					engine.method = 'POST';
					var two = line.split(/\s*_POST_\s*/);
					line = two[0];
					engine.args = parseArgs(two[1]);
				}

				var engine = {};
				engine.name = arr[0].trim();
				engine.url = arr[1];
				engine.host = parseUri(engine.url).host;
				if (arr[2]) engine.favicon = arr[2];
				if (!engine.favicon) {
					engine.favicon = getFaviconUrl(engine.url);
				}
				var a = aPattern.replace('$url$', engine.url)
					.replace('$name$', engine.name)
					.replace('$title$', engine.name);
				if (engine.favicon) {
					if(/^fa/.test(engine.favicon))a = a.replace('<img src="$favicon$" class="sej-engine-icon" />', '<i class="fa '+engine.favicon+'"></i>');
					a = a.replace('$favicon$', engine.favicon);
				} else {
					a = a.replace('src="$favicon$"', '');
				}

				if (engine.method && engine.method.toUpperCase() == 'POST') {
					var f = wrapToHide(getPostFormHTML(engine.url, engine.args, prefs.openInNewTab));
					a = a.replace('$form$', f);
					a = a.replace('$onclick$', "this.getElementsByTagName('form')[0].submit();return false;");
				} else {
					a = a.replace('$form$', '');
					a = a.replace('onclick="$onclick$"', '');
				}
				return a;
			}
			// 创建dom
		var aPattern = '<a href="" class="sej-engine"' + (prefs.openInNewTab ? ' target="_blank" ' : ' ') +
			'url="$url$" onclick="$onclick$" _title="$title$">' +
			'<img src="$favicon$" class="sej-engine-icon" />$form$<span>$name$</span></a>';

		var container = document.createElement('sejul');
		container.id = 'sej-container';

		container.addEventListener('mousedown', mousedownhandler, true);
		if (matchedRule.style) {
			container.style.cssText = matchedRule.style;
		}
		// 根据搜索列表的类型得到数据
		var engineListDataStr = engineListData[prefs.engineListDataType] || engineListData.normal;
		parseDataStr(engineListDataStr);
		var isMatched = false; //当前搜索只匹配一次
		container.addEventListener('mousedown', mousedownhandler, true);
		var insertWhere = matchedRule.insertIntoDoc.where; //设置插入的位置

		switch (insertWhere.toLowerCase()) { //插入到文档中
			case 'beforebegin':
				iTarget.parentNode.insertBefore(container, iTarget);
				break;
			case 'afterbegin':
				if (iTarget.firstChild) {
					iTarget.insertBefore(container, iTarget.firstChild);
				} else {
					iTarget.appendChild(container);
				}
				break;
			case 'beforeend':
				iTarget.appendChild(container);
				break;
			case 'afterend':
				if (iTarget.nextSibling) {
					iTarget.parentNode.insertBefore(container, iTarget.nextSibling);
				} else {
					iTarget.parentNode.appendChild(container);
				}
				break;

		};

		var isTwoLine = container.clientHeight / container.children[1].clientHeight > 2;

		// 插入后调整下，如果变成两行，隐藏文字
		if (prefs.hideEnglineLabel == 2 || (prefs.hideEnglineLabel == 1 && isTwoLine)) {
			[].forEach.call(document.querySelectorAll('#sej-container > a[class="sej-engine"] > span'), function(span) {
				var link = span.parentNode;
				link.classList.add('only-icon');
				link.setAttribute('title', span.textContent);
			});
		}

		if (typeof matchedRule.endFix == 'function') {
			try {
				matchedRule.endFix();
			} catch (ex) {
				console.error('endFix 错误', ex);
			}
		}

		function mousedownhandler(e) {
			var target = e.target;
			if (!target.href) target = target.parentNode;

			if (!target || target.className.indexOf('sej-engine') == -1) return;
			if (!target || !this.contains(target)) return;

			var value;
			if (typeof iInput == 'function') value = iInput();
			else {
				if (iInput.nodeName == 'INPUT' || iInput.localName == 'textarea') value = iInput.value;
				else value = iInput.textContent;
			}

			// 根据后代元素中是否存在 form 元素，判断提交方式并进行处理
			// 如果没有 form 元素，将会使用 GET 方法提交；如果有，将会使用 POST 方法提交
			var forms = target.getElementsByTagName('form');
			if (forms.length == 0) { //提交方式为 GET
				target.href = target.getAttribute('url').replace(/%s/g, value); //替换“全部”关键词
			} else { //提交方式为 POST
				var inputs = target.getElementsByTagName('input');
				for (var i = 0; i < inputs.length; i++) inputs[i].value = inputs[i].value.replace(/%s/g, value); //// 替换“全部”关键词
			}
		}
	}

	function run() {
		// 百度搜索插入到顶部搜索条下面就会造成页面部分元素的消失，所以需要每个部分都判断下是否存在
		// 判断插入位置和输入框是否存在
		var iTarget = getElement(matchedRule.insertIntoDoc.target);
		var iInput;
		if (matchedRule.insertIntoDoc.keyword) {
			if (typeof matchedRule.insertIntoDoc.keyword == 'function') {
				iInput = matchedRule.insertIntoDoc.keyword;
				if (!iInput()) {
					return;
				}
			} else {
				iInput = getElement(matchedRule.insertIntoDoc.keyword);
			}
		} else {
			iInput = document.querySelector('input[type="search"],input[name][value]:not([type]),input[type="text"][value][name]');
			if (!iInput) {
				iInput = document.querySelector('input[autocomplete="off"]:not([type]),input[type="text"]');
			}
		}
		debug('插入的位置为 %o', iTarget);
		debug('匹配的输入框为 %o', iInput);

		if (!iTarget || !iInput) {
			debug('不存在插入的位置或匹配的输入框', iTarget, iInput);
			return;
		}

		addGlobalStyle();

		// 判断是否存在
		var container = document.getElementById('sej-container'),
			sejspan = document.querySelector('sejspan.sej-drop-list');

		if (!container || !sejspan) {
			if (container) {
				container.parentNode.removeChild(container);
			}
			addContainer(iTarget, iInput);
		}
	}

	function remove() {
		var elems = document.querySelectorAll('#sej-container, sejspan.sej-drop-list');
		if (!elems) return;

		[].forEach.call(elems, function(elem) {
			elem.parentNode.removeChild(elem);
		});
	}

	// iframe 禁止加载
	if (window.self != window.top) return;

	var matchedRule;

	rules.some(function(rule) {
		if (toRE(rule.url).test(location.href)) {
			matchedRule = rule;
			if (typeof rule.etc == 'function') {
				try {
					rule.etc();
				} catch (ex) {
					console.error('执行 etc 错误', ex);
				}
			}
			return true;
		};
	});


	debug('匹配的规则为', matchedRule);

	if (!matchedRule || !matchedRule.enabled) return;

	if (matchedRule.change) {
		if (matchedRule.change == "mutationTitle") {
			run();
			debug('添加标题节点监视器: title');

			var watch = document.querySelector('title');
			var observer = new MutationObserver(function(mutations) {
				debug('标题发生了变化', document.title);
				run();
			});
			observer.observe(watch, {
				childList: true,
				subtree: true,
				characterData: true
			});
		}
		if (matchedRule.change == "runAtComplete") {
			document.onreadystatechange = function() {
				debug('onreadystatechange');
				if (document.readyState == "complete") {
					run();
				}
			}
		}
	} else run();
})()