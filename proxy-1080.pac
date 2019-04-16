function FindProxyForURL(url, host) {
	var proxy = "PROXY 127.0.0.1:1080;";
	var needDomain = {
		//facebook
		"facebook.com": 1,
		"facebook.net": 1,
		"fbcdn.net": 1,
		"fbsbx.com": 1,
		"instagram.com": 1,
		"cdninstagram.com": 1,
		//google
		"appspot.com": 1,
		"blogger.com": 1,
		"blogspot.com": 1,
		"blogspot.jp": 1,
		"blogspot.tw": 1,
		"ggpht.com": 1,
		"google.bt": 1,
		"google.com": 1,
		"google.com.hk": 1,
		"google.com.sg": 1,
		"google.co.jp": 1,
		"google.co.kr": 1,
		"google-analytics": 1,
		"googleapis.com": 1,
		"googletagmanager.com": 1,
		"googleusercontent.com": 1,
		"googlevideo.com": 1,
		"gstatic.com": 1,
		"withgoogle.com": 1,
		"youtube.com": 1,
		"youtu.be": 1,
		"ytimg.com": 1,
		//microsoft
		"live.com": 1,
		"1drv.com": 1,
		"office365.com": 1,
		"skype.com": 1,
		"microsoft.com": 1,
		//Steam
		"community.steam-api.com": 1,
		"steamcommunity.com": 1,
		"steampowered.com": 1,
		"steamstatic.com": 1,
		//twitter
		"twitter.com": 1,
		"twitch.tv": 1,
		"jtvnw.net": 1,
		"ttvnw.net": 1,
		"twimg.com": 1,
		"t.co": 1,
		//
		"akamaihd.net": 1,
		"akamaized.net": 1,
		"archive.org": 1,
		"amazon.co.jp": 1,
		"amazonaws.com": 1,
		"anidex.info": 1,
		"anirena.com": 1,
		"autolyric.com": 1,
		"books.com.tw": 1,
		"box.com": 1,
		"btava.com": 1,
		"cangku.in": 1,
		"cnbtkitty.xyz": 1,
		"crystalmark.info": 1,
		"digbt.org": 1,
		"discordapp.net" :1,
		"discordapp.com" :1,
		"discord.gg" :1,
		"dmhy.org" :1,
		"donmai.us" :1,
		"dropbox.com": 1,
		"dropboxstatic.com": 1,
		"dropboxusercontent.com": 1,
		"dropbooks.tv": 1,
		"duckduckgo.com": 1,
		"eset.com": 1,
		"eyny.com": 1,
		"e-hentai.org": 1,
		"exhentai.org": 1,
		"fc2.com": 1,
		"gamer.com.tw": 1,
		"getchu.com": 1,
		"getlantern.org": 1,
		"gamer.com.tw": 1,
		"gbf.wiki": 1,
		"ggbases.com": 1,
		"gghpt.com": 1,
		"github.com": 1,
		"githubassets.com": 1,
		"githubusercontent.com": 1,
		"granbluefantasy.jp": 1,
		"greasyfork.org": 1,
		"hkgolden.com": 1,
		"ibb.co": 1,
		"imgur.com": 1,
		"javlibrary.com": 1,
		"lightnovel.cn": 1,
		"lilith-soft.com": 1,
		"limetorrents.info": 1,
		"livedoor.jp": 1,
		"wikia.com": 1,
		"mmxdm.net": 1,
		"mbga.jp": 1,
		"andapp.jp": 1,
		"mobage.jp": 1,
		"mega.nz": 1,
		"mega.co.nz": 1,
		"nyaa.si": 1,
		"nyoo.moe": 1,
		"offcloud.com": 1,
		"pantsu.cat": 1,
		"peazip.org": 1,
		"piapro.jp": 1,
		"pixiv.net": 1,
		"pximg.net": 1,
		"playoverwatch.com": 1,
		"proxifier.com": 1,
		"ptt.cc": 1,
		"quora.com": 1,
		"quoracdn.net": 1,
		"reddit.com": 1,
		"shadowsocks.org": 1,
		"sourceforge.net": 1,
		"thepiratebay.org": 1,
		"tineye.com": 1,
		"tinypic.com": 1,
		"tokyotosho.info": 1,
		"toranoana.jp": 1,
		"tumblr.com": 1,
		"vivaldi.net": 1,
		"wikipedia.org": 1,
		"wnacg.org": 1,
		"yahoo.com": 1,
		"yahoo.co.jp": 1,
		"yande.re": 1
	}
	var specialDomain ={
		"com.tw": 1,
		"com.sg": 1,
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