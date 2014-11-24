# 首页性能优化（二期）

## 一期结果

首页性能优化一期从http请求级别做了部分工作，kpi_dom_time从 **7.2**s 到 **4.9** s。

## 本期目标

本期计划从代码级别着手优化，计划从 **4.9**s 到 **4.1**s 。

## 本期调研

根据chrome浏览器限速工具，可以发现3G网络下得DomContentLoaded（kpi_dom_time）时间最接近我们性能监控统计出的平均时间4.9s，因此我们选择3G网络做一组实验，验证js，css，imgs对DomContentLoaded时间的影响。

下表中，n表示没有加载改项，y表示加载改项，time是十次结果的最大值和最小值的区间，以第一行为例：在只加载html页面的情况下，强制刷新10次页面的DomContentLoaded最短为0.6s，最长为0.9s，依此类推。

| html        | css           | js  | imgs | time
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|
|y    | n   | n  | n    | 0.60s ~ 0.90s
|y    | y   | n  | n    | 1.36s ~ 1.70s
|y    | y   | y  | n    | 2.81s ~ 3.19s
|y    | y   | y  | y    | 4.14s ~ 5.88s


通过检查html，css代码，我们发现html和css的优化较复杂；通过上图我们发现html和css的提升空间较小；因此我们将主要精力集中在js和图片的优化上。html和css的优化放在重构进行，html和css是一个前端工程师的基础，没有好的基础，不可能是一个好的前端工程师，写的时候应该认真构思，而不是完全按照自己的经验写。


## 实施方案

1. html & css

	**精简渲染树节点**
	
	    措施 1 ：将二手房推荐，房价趋势，二手房房源精选，租房精选，租房小区排行，热门商业地产，微聊达人隐藏；
	    
	    风险 ：可能部分浏览器会出现页面抖动；
	
	    预计成效 ：将渲染树节点精简1/3；
	    
	    __备注：考虑不同的城市显示的模块也不同，本措施对性提升不大，所以不做；__

3. js

	**重构部分代码 && 放组件中的代码放在J.ready**
	
        措施 1 ：检查代码发现layout.js里面对原型链条扩展的代码，在首页的业务代码并没有使用，考虑将该部分代码在首页去掉；
	
	    风险 ：无；
	
	    措施 2 ：删除FooterHome.js的代码，该段代码与Flink.js雷同，且该文件只在home页面调用；
	
	    风险 ：无；
	
	    措施 3 ：将ButtonHotCityComm.js的代码放在J.ready执行；
	
	    风险：无
	
	    措施 4 ：将晶赞广告的js变量初始化放在J.ready执行，并使用php script_block_begin()和script_block_end()方法包裹，放在页面最后；
	
	    风险：无
	
	    措施 5 ：将ifx广告非顶通的广告放在J.ready执行，通过配置参first实现；
	
	    风险 ：无
	
	    措施 6 ：将TabBarNew.js里面的代码放在J.ready执行；
	
	    风险 ： 无
	
	    预计成效 ：首页业务代码共1282行，删减代码300行左右，相比之前加入J.ready的代码为500行，保守估计DomContentLoaded time减少200ms左右；
	

4. imgs

	**延迟加载**
	
	    措施 1 ：将新房优惠部分的第二屏及以后的图片异步加载，在domContentLoaded之后加载data-src链接的图片，点击翻屏的时候判断图片有没有加载；
	
	    风险 ：domContentLoaded过长的话可能造成非首屏显的图片显示延迟；
	
	    措施 2 ：将热门导购的第二屏及以后的图片异步加载，在domContentLoaded之后加载data-src链接的图片，点击翻屏的时候判断图片有没有加载；
	
	    风险 ：domContentLoaded过长的话可能造成非首屏显的图片显示延迟；
	
	    措施 3 ：将下载app模块gif异步加载，在domContentLoaded之后加载l-src链接的图片；
	
	    风险 ：下载app的gif图片出现较晚；
	
	    预计成效 ：将抢占带宽的图片减少超过1/2，保守估计DomContentLoaded time减少600ms左右；	
	    
	    备注 ：以上措施均通过改写Home.js里面的LazyLoadImage方法实现；

## 时间排期

详情请参考[pmt](url:http://p.corp.anjuke.com/project/detail?id=24514)。



