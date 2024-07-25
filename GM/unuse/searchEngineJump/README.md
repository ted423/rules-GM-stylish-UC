searchEngineJump-NextStage 是根据 ywzhaiqi 的 searchEngineJump-CE 来进行了乱七八糟更改的版本。


版本9(10)的主要特点如下：
1. 改成了使用多级列表来写
2. 默认点击穿透，鼠标移入右上角点处时可以使用。再次移入时搜索条几乎透明并点击穿透
3. 主要考虑代码维护的便利性，不再有图标，不再有插入位置。只要网址能匹配上，搜索框位置能获取到即可。


最新版本找回了POST的支持(主要我水平烂，瞎改把POST改没了)
范例如下
```
维普, http://lib.cqvip.com/Qikan/Search/Index?from=Qikan_Search_Index/%post#key=u%3D%s#indexKey=%s
```

其中 http://lib.cqvip.com/Qikan/Search/Index?from=Qikan_Search_Index/ 为完整的搜索Url,%post后面的任意内容都会被截取掉，"#"用于分割参数


1337x由于该页面自身有些脚本会对同类站点连接做动作，会影响脚本运行