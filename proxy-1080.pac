function FindProxyForURL(url, host) {
	var proxy = "SOCKS5 127.0.0.1:1080;";
	var needDomain = {
		"amazonaws.com": 1,
		"blogger.com": 1,
		"blogspot.com": 1,
		"blogspot.jp": 1,
		"blogspot.tw": 1,
		"btava.com": 1,
		"crystalmark.info": 1,
		"dropbox.com": 1,
		"dropboxstatic.com": 1,
		"dropboxusercontent.com": 1,
		"dropbooks.tv": 1,
		"eyny.com": 1,
		"e-hentai.org": 1,
		"facebook.com": 1,
		"facebook.net": 1,
		"fbcdn.net": 1,
		"fc2.com": 1,
		"getlantern.org": 1,
		"gamer.com.tw": 1,
		"gbf.wiki": 1,
		"ggbases.com": 1,
		"ggpht.com": 1,
		"github.com": 1,
		"google.com": 1,
		"google.com.hk": 1,
		"google.co.jp": 1,
		"google.co.kr": 1,
		"googleapis.com": 1,
		"googleusercontent.com": 1,
		"googlevideo.com": 1,
		"granbluefantasy.jp": 1,
		"gstatic.com": 1,
		"hkgolden.com": 1,
		"isohunt.to": 1,
		"live.com": 1,
		"livedoor.jp": 1,
		"wikia.com": 1,
		"youtube.com": 1,
		"youtu.be": 1,
		"ytimg.com": 1,
		"mmxdm.net": 1,
		"mbga.jp": 1,
		"andapp.jp": 1,
		"mobage.jp": 1,
		"nyaa.se": 1,
		"nyaa.eu": 1,
		"tumblr.com": 1,
		"thepiratebay.org": 1,
		"toranoana.jp": 1,
		"twitter.com": 1,
		"twimg.com": 1,
		"t.co": 1,
		"sourceforge.net": 1,
		"archive.org": 1,
		"wikipedia.org": 1,
		"wnacg.org": 1,
	}
	var specialDomain ={
		"com.tw": 1,
		"com.hk": 1,
		"net.hk": 1,
		"org.hk": 1,
		"edu.hk": 1,
		"idv.hk": 1,
		"gov.hk": 1,
		"co.jp": 1,
		"ac.jp": 1,
		"ad.jp": 1,
		"ed.jp": 1,
		"go.jp": 1,
		"gr.jp": 1,
		"lg.jp": 1,
		"ne.jp": 1,
		"or.jp": 1,
		"co.kr": 1
	}
	var suffix;
	var pos = host.lastIndexOf('.');

	if (isPlainHostName(host)) return "DIRECT";


	pos = host.lastIndexOf('.', pos - 1);
	if (pos == -1) {
		if (Object.hasOwnProperty.call(needDomain, host)) {
			return proxy;
		}
	}
	suffix = host.substring(pos + 1);
	if (Object.hasOwnProperty.call(specialDomain, suffix)){
		pos = host.lastIndexOf('.', pos - 1);
		suffix = host.substring(pos + 1);
	}
	if (Object.hasOwnProperty.call(needDomain, suffix)) {
		return proxy;
	}
	return "DIRECT";
}