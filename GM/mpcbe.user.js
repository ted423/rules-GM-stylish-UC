// ==UserScript==
// @name        potplayer mpc-be delete
// @namespace   https://greasyfork.org/users/85
// @description potplayer吧专用mpc-be升级贴处理
// @include     http://tieba.baidu.com/potplayer*
// @include     http://tieba.baidu.com/f?kw=potplayer*
// @run-at         document-start
// @version     1
// @grant       none
// ==/UserScript==

var temp1=/^MPC-BE [1-9]\.[1-9]/i;
var temp,temp2;
function mpcbe(){
temp=document.getElementsByClassName("j_th_tit");
	if(temp[0])
	for(i=0;i<temp.length;i++)
	{console.log("!");
if (temp1.test(temp[i].title))
{
temp2=temp[i].parentNode.parentNode.parentNode.parentNode;
temp2.parentNode.removeChild(temp2);
i--;
}
}
}
mpcbe();



//上面的用document-end才需要调用
var callback = function(records){
records.map(function(record){
	 if(record.addedNodes[0]){
if(record.target.id){
//console.log('Mutation target id: '+i+ ' ' + record.target.id);

	if(record.target.id==="thread_list"){//延迟加载处理
mpcbe();
}

if(record.target.id==="content_leftList")//翻页处理
{
mpcbe();
}
}
else if (record.target.className){
//	console.log('Mutation target class: ' +i+' '+ record.target.className);
if(record.target.className.indexOf("lottey_middle")!=-1){/*世界杯计时的一个玩意。过滤这玩意仅仅因为他太烦了，严重影响我观察页面元素的变动*/

	temp = document.getElementsByClassName("lottey_middle_time")
	if(temp[0])temp[0].parentNode.removeChild(temp[0]);
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
