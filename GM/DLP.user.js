// ==UserScript==
// @name			DownloadPlus - 网盘连接自动填充密码 and 磁力链转种子
// @author			jasonshaw,jasake,ted423
// @namespace		https://github.com/ted423
// @version			3.1
// @updateURL		https://raw.githubusercontent.com/ted423/rules-GM-stylish-UC/master/GM/DLP.user.js
// @description		自动处理网盘链接及其提取码变成支持自动填充密码的方式的链接（百度云、360pan等）
// @grant			unsafeWindow
// @include			*
// @grant			GM_addStyle
// @run-at			document-end
// @copyright		2014+, jasonshaw
// ==/UserScript==
(function() {
	//runningman-fan 免点击显示下载地址
	if (/^http:\/\/www\.runningman-fan\.com\/.+\.html/.test(location.href) && document.querySelector('.content-main #down')) document.querySelector('.content-main #down').outerHTML = document.querySelector('#button_box .buttons').outerHTML;
	var common_reg = /\s*([百度云盘提取密码码访问码]+|360yun|yun|\d{3,4}[pP])[:：]?\s*(<[^>]+>)?\s*([0-9a-zA-Z]{4,})\s*/;
	var pw_reg = /#[0-9a-zA-Z]{4,}/;
	var standBy = false,
		standByList = [/http:\/\/weibo\.com\/.*/i]; //将需要等待js运行之后再运行本代码的，将href正则写入数组
	var prefs = {
		tieba: ['http://jump.bdimg.com/safecheck'], //这个有大量的误操作，因为这只是新浪的短网址，而不一定是网盘，自选使用
		pan: ['http://pan.baidu.com/s/'], //第一个参数定义链接类型，第二个可选参数：后续紧跟着的提取码之类的前缀提示符
		yunpan: ['https://yunpan.360.cn/'],
		pans: ['https://pan.baidu.com/s/'],
		pan2: ['http://pan.baidu.com/share/'],
		pan2s: ['https://pan.baidu.com/share/'],
		ebaidu: ['https://eyun.baidu.com/s/'],
		tpan: ['http://t.cn/'], //这个有大量的误操作，因为这只是新浪的短网址，而不一定是网盘，自选使用
		weiyunpan: ['http://share.weiyun.com/'],
	};

	function panlinkWithPw() {
		var href = window.location.href,
			site = null,
			i = 0;
		while (standByList[i])
			if (standByList[i++].test(href)) {
				standBy = true;
				break;
			}
		var panlinks, r = null,
			reg, nC, nN, pN, pos, subS;
		for (var key in prefs) {
			reg = prefs[key][1] || common_reg;
			panlinks = document.querySelectorAll('a[href^="' + prefs[key][0] + '"]'), i = 0;
			while (panlinks[i]) {
				if (pw_reg.test(panlinks[i].href)) {
					i++;
					continue;
				}
				nN = panlinks[i].nextSibling;
				if (nN != null) {
					if (nN.nodeType === 1) nC = nN.innerHTML;
					else if (nN.nodeType === 3) nC = document.all ? nN.innerText : nN.textContent;
					r = nC.match(reg);
					if (r != null) panlinks[i].href += '#' + r[3];
				}
				if (nN == null || r == null) {
					//处理盘密码就在链接的文本本身上
					r = panlinks[i].innerHTML.match(reg);
					if (r != null) panlinks[i].href += '#' + r[3];
					else {
						pN = panlinks[i].parentNode.parentNode.textContent;
						pos = pN.indexOf(panlinks[i].href);
						subS = pN.substr(pN.indexOf(panlinks[i].href) + 1);
						var pos_end = subS.length,
							temp;
						for (var key1 in prefs) {
							temp = pN.indexOf(prefs[key1][0]);
							if (temp == -1) continue;
							if (temp != pos && temp < pos_end) pos_end = temp;
						}
						subS = subS.substr(0, pos_end - 1);
						r = subS.match(reg) || panlinks[i].parentNode.textContent.match(reg) || pN.match(reg);
						if (r != null) panlinks[i].href += '#' + r[3];
					}
				}
				i++;
			}
		}

		var magnet = document.querySelectorAll('a[href^="magnet"]');
		GM_addStyle("dlp-div{position:fixed;z-index:2147483647;top:calc(50%);left:calc(50% - 250px);padding:20px;background:#eee;border:1px solid black;}\
		");
		[].forEach.call(magnet, function(a) {
			a.onmouseover = function (){a.focus();}
			a.onkeydown = function (){
				if(event.keyCode==77){
					var magnet2torrent = document.getElementsByTagName("dlp-div")[0],str = a.href.match(/\w{40}/g)[0];
					if(magnet2torrent){magnet2torrent.parentNode.removeChild(magnet2torrent);}
					else {
						magnet2torrent = document.createElement('dlp-div');
						magnet2torrent.innerHTML = '<ul><li>itorrents: <a target = "_blank" href="https://itorrents.org/torrent/' + str.toLocaleUpperCase() + '.torrent">https://itorrents.org/torrent/' + str.toLocaleUpperCase() + '.torrent</a></li><li>btcache.me: <a target = "_blank" href="http://btcache.me/torrent/'+str.toLocaleUpperCase()+'">http://btcache.me/torrent/'+str.toLocaleUpperCase()+'</a></li><li>torrage.info: <a target = "_blank" href="https://torrage.info/torrent.php?h='+str.toLocaleUpperCase()+'">https://torrage.info/torrent.php?h='+str.toLocaleUpperCase()+'</a></li><li>downloadtorrentfile: <a target="_blank" href="https://downloadtorrentfile.com/hash/'+str.toLocaleUpperCase()+'">https://downloadtorrentfile.com/hash/'+str.toLocaleUpperCase()+'</a></li></ul>'
						a.onmouseover = function (){magnet2torrent.focus();console.log("focus");}
						magnet2torrent.tabIndex = 0;
						magnet2torrent.onkeydown = function(){debugger;if(event.keyCode==77)magnet2torrent.parentNode.removeChild(magnet2torrent);console.log("remove");}
						document.body.appendChild(magnet2torrent);
					}
				}
			}
		});
	}

	function addMutationObserver(selector, callback) {
			var watch = document.querySelector(selector);
			if (!watch) return;
			var observer = new MutationObserver(function(mutations) {
				var nodeAdded = mutations.some(function(x) {
					return x.addedNodes.length > 0;
				});
				if (nodeAdded) {
					callback();
				}
			});
			observer.observe(watch, {
				childList: true,
				subtree: true
			});
		}
		// 添加下一页和不刷新页面的支持
	if (location.host.indexOf('.ys168.com') > 0) addMutationObserver('#mainMenu', function() {
		panlinkWithPw();
	});
	addMutationObserver('#ct', function() {
		panlinkWithPw();
	});
	if (standBy) {
		document.onreadystatechange = function() {
			if (document.readyState == "complete") panlinkWithPw();
		}
	} else panlinkWithPw();
})();