function FindProxyForURL(url, host)
{
	proxy = "PROXY 127.0.0.1:1080"
	if (isPlainHostName(host)) return "DIRECT";
	if (shExpMatch(host, "*.sankakucomplex.com" ))return proxy;
	if (shExpMatch(host, "*.eyny.com" ))return proxy;
	if (shExpMatch(host, "*.deviantart.com" ))return proxy;

	if (shExpMatch(host, "*.e-hentai.org" ))return proxy;
	if (shExpMatch(host, "exhentai.org" ))return proxy;

	if (shExpMatch(host, "*.facebook.com" ))return proxy;
	if (shExpMatch(host, "*.facebook.net" ))return proxy;
	if (shExpMatch(host, "*.fbcdn.net" ))return proxy;
	
	if (shExpMatch(host, "*.blogspot.tw" ))return proxy;
	if (shExpMatch(host, "*.blogspot.com" ))return proxy;
	if (shExpMatch(host, "*.blogspot.co.uk" ))return proxy;
	if (shExpMatch(host, "*.blogger.com" ))return proxy;
	if (shExpMatch(host, "*.blogblog.com" ))return proxy;
	if (shExpMatch(host, "*bloggerstop.net" ))return proxy;
	if (shExpMatch(host, "*.google.co*" ))return proxy;
	if (shExpMatch(host, "google.co*" ))return proxy;
	if (shExpMatch(host, "*.googleapis.com" ))return proxy;
	if (shExpMatch(host, "*.google-analytics.com" ))return proxy;
	if (shExpMatch(host, "*.googleusercontent.com" ))return proxy;
	if (shExpMatch(host, "golang.org" ))return proxy;
	if (shExpMatch(host, "*.gstatic.com" ))return proxy;
	if (shExpMatch(host, "*.appspot.com" ))return proxy;
	if (shExpMatch(host, "*.googlecode.com" ))return proxy;
	if (shExpMatch(host, "*.googlevideo.com" ))return proxy;
	if (shExpMatch(host, "*.youtube.com" ))return proxy;
	if (shExpMatch(host, "youtu.be" ))return proxy;
	if (shExpMatch(host, "*.ytimg.com" ))return proxy;
	if (shExpMatch(host, "*.ggpht.com" ))return proxy;

	if (shExpMatch(host, "*.dropbox.com" ))return proxy;
	if (shExpMatch(host, "dropbox.com" ))return proxy;
	if (shExpMatch(host, "*.dropboxstatic.com" ))return proxy;
	if (shExpMatch(host, "*.dropboxusercontent.com" ))return proxy;
	if (shExpMatch(host, "*.cloudfront.net" ))return proxy;

	if (shExpMatch(host, "*.dropbooks.tv" ))return proxy;

	if (shExpMatch(host, "jquery.com" ))return proxy;
	if (shExpMatch(host, "*.jquery.com" ))return proxy;
	
	if (shExpMatch(host, "*.mediafire.com" ))return proxy;
	if (shExpMatch(host, "*.mixpanel.com" ))return proxy;

	if (shExpMatch(host, "mega.nz" ))return proxy;
	if (shExpMatch(host, "mega.co.nz" ))return proxy;
	if (shExpMatch(host, "*.mega.co.nz" ))return proxy;

	if (shExpMatch(host, "*.nyaa.se" ))return proxy;
	if (shExpMatch(host, "*.nyaa.eu" ))return proxy;

	if (shExpMatch(host, "twitter.com" ))return proxy;
	if (shExpMatch(host, "*.twitter.com" ))return proxy;
	if (shExpMatch(host, "*.twimg.com" ))return proxy;
	if (shExpMatch(host, "t.co" ))return proxy;	

	if (shExpMatch(host, "*.btdigg.org" ))return proxy;
	if (shExpMatch(host, "btdigg.org" ))return proxy;

	if (shExpMatch(host, "*.btava.com" ))return proxy;
	if (shExpMatch(host, "*.bt2mag.com" ))return proxy;

	if (shExpMatch(host, "*.crystalmark.info" ))return proxy;
	if (shExpMatch(host, "crystalmark.info" ))return proxy;
	if (shExpMatch(host, "suishoshizuku.com" ))return proxy;


	if (shExpMatch(host, "*.anime-sharing.com" ))return proxy;
	if (shExpMatch(host, "*.cartoonmad.com" ))return proxy;
	if (shExpMatch(host, "*.dmhy.org" ))return proxy;
	if (shExpMatch(host, "*.livestore.org" ))return proxy;
	if (shExpMatch(host, "*.rlcdn.com" ))return proxy;
	if (shExpMatch(host, "*.w.org" ))return proxy;
	if (shExpMatch(host, "*.getlantern.org" ))return proxy;
	if (shExpMatch(host, "*.staticflickr.com" ))return proxy;
	if (shExpMatch(host, "*.iplocationfinder.com" ))return proxy;
	if (shExpMatch(host, "*.i2p2.de" ))return proxy;
	if (shExpMatch(host, "*.silukee.com" ))return proxy;
	if (shExpMatch(host, "*.emeditor.com" ))return proxy;
	if (shExpMatch(host, "*.greatfire.org" ))return proxy;
	if (shExpMatch(host, "*.pixnet.net" ))return proxy;
	if (shExpMatch(host, "*.iceloki.com" ))return proxy;
	if (shExpMatch(host, "*.cyanogenmod.org" ))return proxy;
	if (shExpMatch(host, "*.greasyfork.org" ))return proxy;
	if (shExpMatch(host, "*.cloudfront.net" ))return proxy;
	if (shExpMatch(host, "*.blogimg.jp" ))return proxy;
	if (shExpMatch(host, "goo.gl" ))return proxy;
	if (shExpMatch(host, "*.wnacg.com" ))return proxy;
	if (shExpMatch(host, "*.iobit.com" ))return proxy;
	if (shExpMatch(host, "*.fc2.com" ))return proxy;
	if (shExpMatch(host, "*.github.com" ))return proxy;
	if (shExpMatch(host, "*.nicovideo.jp" ))return proxy;
	if (shExpMatch(host, "*.psiphon.ca" ))return proxy;
	if (shExpMatch(host, "bit.ly" ))return proxy;
	if (shExpMatch(host, "www.w3schools.com" ))return proxy;
	if (shExpMatch(host, "*.xuite.net" ))return proxy;
	if (shExpMatch(host, "sugo.sakura.ne.jp" ))return proxy;
	if (shExpMatch(host, "*.uploaded.net" ))return proxy;
	if (shExpMatch(host, "sourceforge.net" ))return proxy;
	if (shExpMatch(host, "*.twimg.com" ))return proxy;
	if (shExpMatch(host, "*.gamer.com.tw" ))return proxy;
	if (shExpMatch(host, "*.bahamut.com.tw" ))return proxy;
	if (shExpMatch(host, "*.getsymphony.com" ))return proxy;
	if (shExpMatch(host, "*.evozi.com" ))return proxy;
	if (shExpMatch(host, "regex101.com" ))return proxy;
	if (shExpMatch(host, "*.putty.org" ))return proxy;
	if (shExpMatch(host, "*.soul-plus.*" ))return proxy;
	if (shExpMatch(host, "overseas.weibo.com" ))return proxy;
	if (shExpMatch(host, "*.wikipedia.org" ))return proxy;
	if (shExpMatch(host, "hk.answers.yahoo.com" ))return proxy;
	return "DIRECT";
}
