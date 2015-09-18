function FindProxyForURL(url, host)
{
	proxy = "PROXY 127.0.0.1:8087"
	if (isPlainHostName(host)) return "DIRECT";

	if (shExpMatch(host, "*.google.*" ))return proxy;
	if (shExpMatch(host, "google.*" ))return proxy;
	if (shExpMatch(host, "*.googleapis.com" ))return proxy;
	if (shExpMatch(host, "*.google-analytics.com" ))return proxy;
	if (shExpMatch(host, "*.googleusercontent.com" ))return proxy;
	if (shExpMatch(host, "golang.org" ))return proxy;
	if (shExpMatch(host, "*.gstatic.com" ))return proxy;
	if (shExpMatch(host, "*.appspot.com" ))return proxy;
	if (shExpMatch(host, "*.googlecode.com" ))return proxy;
	if (shExpMatch(host, "*.googlevideo.com" ))return proxy;
	if (shExpMatch(host, "*.youtube.com" ))return proxy;
	if (shExpMatch(host, "*.ytimg.com" ))return proxy;
	if (shExpMatch(host, "*.ggpht.com" ))return proxy;

	if (shExpMatch(host, "*.dropbox.com" ))return proxy;
	if (shExpMatch(host, "dropbox.com" ))return proxy;
	if (shExpMatch(host, "*.dropboxstatic.com" ))return proxy;
	if (shExpMatch(host, "*.dropboxusercontent.com" ))return proxy;
	if (shExpMatch(host, "*.cloudfront.net" ))return proxy;

	if (shExpMatch(host, "*.dropbooks.tv" ))return proxy;


	if (shExpMatch(host, "twitter.com" ))return proxy;
	if (shExpMatch(host, "*.twitter.com" ))return proxy;
	if (shExpMatch(host, "*.twimg.com" ))return proxy;
	if (shExpMatch(host, "t.co" ))return proxy;	

	if (shExpMatch(host, "*.blogspot.com" ))return proxy;
	if (shExpMatch(host, "*.blogspot.co.uk" ))return proxy;
	if (shExpMatch(host, "*.blogger.com" ))return proxy;
	if (shExpMatch(host, "*.blogblog.com" ))return proxy;
	if (shExpMatch(host, "*bloggerstop.net" ))return proxy;

	if (shExpMatch(host, "*.mediafire.com" ))return proxy;
	if (shExpMatch(host, "*.mixpanel.com" ))return proxy;

	if (shExpMatch(host, "*.facebook.com" ))return proxy;

	if (shExpMatch(host, "*.btdigg.org" ))return proxy;
	if (shExpMatch(host, "btdigg.org" ))return proxy;

	if (shExpMatch(host, "mega.nz" ))return proxy;
	if (shExpMatch(host, "mega.co.nz" ))return proxy;
	if (shExpMatch(host, "*.mega.co.nz" ))return proxy;

	if (shExpMatch(host, "*.btava.com" ))return proxy;
	if (shExpMatch(host, "*.bt2mag.com" ))return proxy;

	if (shExpMatch(host, "*.cloudfront.net" ))return proxy;
	if (shExpMatch(host, "*.eyny.com" ))return proxy;
	if (shExpMatch(host, "*.dmhy.org" ))return proxy;
	if (shExpMatch(host, "*.blogimg.jp" ))return proxy;
	if (shExpMatch(host, "goo.gl" ))return proxy;
	if (shExpMatch(host, "*.wnacg.com" ))return proxy;
	if (shExpMatch(host, "*.iobit.com" ))return proxy;
	if (shExpMatch(host, "*.fc2.com" ))return proxy;
	if (shExpMatch(host, "*.github.com" ))return proxy;
	if (shExpMatch(host, "*.nicovideo.jp" ))return proxy;
	if (shExpMatch(host, "*.nyaa.se" ))return proxy;
	if (shExpMatch(host, "*.psiphon.ca" ))return proxy;
	if (shExpMatch(host, "bit.ly" ))return proxy;
	if (shExpMatch(host, "www.w3schools.com" ))return proxy;
	if (shExpMatch(host, "*.xuite.net" ))return proxy;
	if (shExpMatch(host, "sugo.sakura.ne.jp" ))return proxy;
	if (shExpMatch(host, "*.uploaded.net" ))return proxy;
	if (shExpMatch(host, "*.anime-sharing.com" ))return proxy;
	if (shExpMatch(host, "*.twimg.com" ))return proxy;
	if (shExpMatch(host, "*.gamer.com.tw" ))return proxy;
	if (shExpMatch(host, "*.bahamut.com.tw" ))return proxy;
	if (shExpMatch(host, "*.amazonaws.com" ))return proxy;
	if (shExpMatch(host, "*.getsymphony.com" ))return proxy;
	if (shExpMatch(host, "yande.re" ))return proxy;
	if (shExpMatch(host, "*.yande.re" ))return proxy;
	if (shExpMatch(host, "*.e-hentai.org" ))return proxy;
	if (shExpMatch(host, "exhentai.org" ))return proxy;
	if (shExpMatch(host, "*.evozi.com" ))return proxy;
	if (shExpMatch(host, "*.putty.org" ))return proxy;
	if (shExpMatch(host, "*.soul-plus.*" ))return proxy;
	return "DIRECT";
}
