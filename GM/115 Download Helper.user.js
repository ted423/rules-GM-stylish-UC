// ==UserScript==
// @name			115 Download Helper
// @authuer			ted423
// @description		115 Download	Helper
// @include			http://115.com/?ct=pickcode*
// @include			http://115.com/?ct=file*
// @version			2015.01.30.2
// @grant			GM_xmlhttpRequest
// @run-at			document-end
// @namespace		https://greasyfork.org/users/85
// ==/UserScript==
if(self.document.URL.indexOf('http://115.com/?ct=')!=-1){
	var	callback = function(records){
		records.map(function(record){
			if(record.addedNodes[0]){
				if(record.addedNodes[0].baseURI.indexOf('http://115.com/?ct=pickcode')!=-1){
					self.document.getElementsByTagName('a')[1].removeAttribute('target');
					self.document.getElementsByTagName('a')[1].click();
			}
				if(record.target.id=='js_operate_box'){
					if(!document.querySelector('li[menu="export"]')){
						var li = document.createElement('li');
						li.innerHTML = '<span>输出下载链接</span>';
						li.onclick=function(){
							[].forEach.call(selected,function(oneSelected){
							URL="http://web.api.115.com/files/download?pickcode="+oneSelected.getAttribute('pick_code');
							//console.log(URL);
							getDownloadUrl(URL);
							})
						}
					record.target.firstChild.appendChild(li);
					var selected = document.querySelectorAll('li.selected');	
				}
				}	
			}
		})
	}

	var	option = {
		'childList': true,
		'subtree': true,
	};
	function getDownloadUrl(URL){
		GM_xmlhttpRequest({
			method:'GET',
			url:URL,
			header:{
			"Referer":'http://web.api.115.com/bridge_2.0.html?namespace=Core.DataAccess&api=UDataAPI&_t=v5',
			"Range": "bytes=0-1",
		},
		onload:function(response){
			//console.log(response.responseText);
			geturl=JSON.parse(response.responseText).file_url;
			console.log(geturl);
		},
		});
	}

	if(self.document.URL.indexOf('http://115.com/?ct=pickcode')!=-1)
	{
		var	click	=	new	MutationObserver(callback);

		click.observe(document,	option);
	}
	else{
		var	Firstload	=	new	MutationObserver(callback);
		Firstload.observe(document,	option);
		//console.log(self.document.URL);
	}
}