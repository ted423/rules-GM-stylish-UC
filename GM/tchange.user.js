// ==UserScript==
// @name         Tieba changer
// @version     3.7
// @description  贴吧一些微调
// @grant          none
// @run-at         document-start
// @include      http://tieba.baidu.com/*
// @namespace https://greasyfork.org/users/85
// @downloadURL https://greasyfork.org/scripts/788/code.user.js
// @updateURL https://greasyfork.org/scripts/788/code.meta.js
// ==/UserScript==

var i=flags=0;
var temp;
function ed2k(){/*ed2k处理*/
temp = document.getElementsByClassName("j_d_post_yingyin_url");
	if(temp[0])
	for(j=0;j<temp.length;j++)temp[0].className="";
}

function quanwang(){/*拳王贴处理*/
temp=document.getElementsByClassName("icon_anchor");
	while(temp.length!=0){
	if(temp[0].title==="点击参加拳王争霸赛"){
	var temp2=temp[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	temp2.parentNode.removeChild(temp2);
	}
	else temp[0].className="";
	}
}

function huodong(){/*活动转贴处理*/
temp=document.getElementsByClassName("tb_tag_forward");
	while(temp.length!=0){
	var temp2=temp[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	temp2.parentNode.removeChild(temp2);
	}
}

function huodong1(){/*活动处理*/
temp=document.querySelector("IMG[alt='活动']");
	while(temp){
	var temp2=temp.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	temp2.parentNode.removeChild(temp2);
	temp=document.querySelector("IMG[alt='活动']");
	}
}

function tdoutu(){/*T豆贴带图片的处理 只有firefox需要*/
temp=document.getElementsByClassName("reward_frs_list_wrap")
	if(temp[0])
	for(i=0;i<temp.length;i++)
	if(temp[i].nextElementSibling)
	if(temp[i].nextElementSibling.firstChild.nextElementSibling.nextElementSibling){
var	temp2=temp[i].nextElementSibling.firstChild.nextElementSibling.nextElementSibling;
	temp2.parentNode.removeChild(temp2);
	temp2=temp[i].nextElementSibling.firstChild.nextElementSibling.nextElementSibling;
	temp2.parentNode.removeChild(temp2);
}
}

function emotion(){/*个人用默认表情处理*/

if(document.querySelector(".s_tab_btn.selected"))
if(document.querySelector(".s_tab_btn.selected").dataset.type==="face"){
temp=document.querySelector(".s_layer_table > tbody:nth-child(1) > tr:nth-child(6)")
if(temp)
temp.parentNode.removeChild(temp);
temp=document.querySelector(".s_layer_table > tbody:nth-child(1) > tr:nth-child(6)")
if(temp)
temp.parentNode.removeChild(temp);
}
}
/*
tdoutu();
huodong();
quanwang();
ed2k();
huodong1();
*/
//上面的用document-end才需要调用
var callback = function(records){
records.map(function(record){
	 if(record.addedNodes[0]){
if(record.target.id){
//console.log('Mutation target id: '+i+ ' ' + record.target.id);
if(record.target.id==="j_p_postlist")ed2k();//翻页处理
	if(flags===1)
	if(record.target.id==="thread_list"){//延迟加载处理
	huodong();
	quanwang();
	tdoutu();
}

if(record.target.id==="content_leftList")//翻页处理
{
	flags=1;
	huodong();
	quanwang();
	tdoutu();
	huodong1();
}
}
else if (record.target.className){
//	console.log('Mutation target class: ' +i+' '+ record.target.className);
if(record.target.className.indexOf("lottey_middle")!=-1){/*世界杯计时的一个玩意。过滤这玩意仅仅因为他太烦了，严重影响我观察页面元素的变动*/

	temp = document.getElementsByClassName("lottey_middle_time")
	if(temp[0])temp[0].parentNode.removeChild(temp[0]);
   	}
   	
   	if(record.target.className.indexOf("tbui_panel_content")!=-1){//表情处理
   		emotion();
   	}
   
   	if(record.target.className.indexOf("lzl_")!=-1){//LZL
   		ed2k();
   	}
   	}
   
  	/*
   	console.log('Mutation type: ' +i+' '+ record.type); 
   	
  	if(record.addedNodes[0]){
  	console.log('Mutation node: ' +i+' '+ record.addedNodes[0].nodeName);
  	if(record.addedNodes[0].id)
  	console.log('Mutation node id: ' +i+' '+ record.addedNodes[0].id);
  	if(record.addedNodes[0].className)
  		console.log('Mutation node class: ' +i+' '+ record.addedNodes[0].className);
}
   	
   	if(record.target.data)
   	console.log('Mutation data: ' +i+' '+ record.target.data);
   	
   	i++;*/
   	}
});

};
var mo = new MutationObserver(callback);

var option = {
	'childList': true, 
    'subtree': true,
};
mo.observe(document, option);
