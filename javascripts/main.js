(function(){
	var wh = window.innerHeight || document.body.clientHeight,
	    sections = document.getElementsByTagName("section"), // 四个板块
		titles = document.querySelectorAll(".title"), // 四个标题
		index = document.getElementById("index"), // 首页
		footer = document.getElementById("footer"), // 移动设备底部菜单
		selections = footer.getElementsByTagName("li"),
		backBtns = document.querySelectorAll(".back-btn"), // pc返回首页按钮
		beginWrite = 0; // 项目经历板块是否开始打字机效果

	// 事件绑定
	for(var i = 1; i < titles.length; i++) {
		titles[i].addEventListener("click", showContent, false);
		titles[i].addEventListener("touchend", showContent, false); // 移动设备
		titles[i].addEventListener("touchend", showFooter, false);
	}
	for(i = 0; i < selections.length; i++) {
		selections[i].addEventListener("touchend", footerHander, false);
	}
	for(i = 0; i < backBtns.length; i++) {
		backBtns[i].addEventListener("click", backToIndex, false);
	}
	window.addEventListener("load", resizable, false);
	window.addEventListener("resize", resizable, false);
	selections[0].addEventListener("touchend", preventBackTouch, false); // 移动设备上会出现点击回到首页后又触发了兴趣领域的touch事件
	
	// 板块高度自适应
	function resizable() {
		wh = window.innerHeight || document.body.clientHeight;
		for(var i = 0, slength = sections.length; i < slength; i++) {
			sections[i].style.height = wh+"px";
		}
	}

	// 首屏动画效果
	function showContent() { // 显示标题相关内容
		var nameCarrier = (this.getAttribute("name") == undefined ? this.parentNode : this), // 确定正确获取name值
			contentId = nameCarrier.getAttribute("name");

		document.getElementById(contentId).setAttribute("class", "full-screen bottom-in");
		nameCarrier.parentNode.setAttribute("class", "full-screen top-out");
		// 判断是否开始开始项目经历板块打字机效果
		beginTypeWritter(contentId);
	}

	// 移动设备从首页进入分板块显示底部菜单
	function showFooter() { 
		var nameCarrier = (this.getAttribute("name") == undefined ? this.parentNode : this), // 确定正确获取name值
			contentId = nameCarrier.getAttribute("name");

		footer.style.display="block";
		footerColor(contentId);
	}

	// 移动设备上会出现点击回到首页后又触发了兴趣领域的touch事件
	function preventBackTouch() {
		titles[titles.length-1].removeEventListener("click", showContent, false); // 应当是click的延迟生效导致的，移除即可
	}

	// 移动设备点击底部菜单操作
	function footerHander() { // 集合事件处理函数
		var obj = (this.getAttribute("src") == undefined ? this : this.parentNode), // 虽然很难判断成点到img，但是以防万一
			contentId = findId(obj); // findId中无法获得点击的对象，通过参数传给它

		contentId == "index" ? footer.style.display = "none" : footerColor(contentId); // 改变footer背景颜色及首页隐藏footer
		// 只显示要显示的板块
		for(i = 0; i < sections.length; i++) {
			sections[i].setAttribute("class", "full-screen hide");
		}
		document.getElementById(contentId).setAttribute("class", "full-screen show");
		//  判断是否开始项目经历板块打字机效果
		beginTypeWritter(contentId);
	}

	function footerColor(id){ // 改变footer颜色
		var bgCl;

		if(id == "basic") {
			bgCl = "#0e8dfc";
		}
		else if(id == "exp") {
			bgCl = "#760be2";
		}
		else{
			bgCl = "#77A315";
		}
		footer.style.backgroundColor = bgCl;
	}

	function findId(obj){ // 找到对应的是哪一个板块
		var contentNum,
			contentId;

		for(i = 0; i < selections.length; i++){
			if(selections[i] == obj) {
				contentNum = i;
			}
		}
		switch(contentNum) {
			case 0: contentId = "index";break;
			case 1: contentId = "basic";break;
			case 2: contentId = "exp";break;
			case 3: contentId = "interest";break;
			default: contentId = "index";break;
		}
		return contentId;
	}

	// pc点击返回按钮
	function backToIndex() { //  返回首页
		this.parentNode.setAttribute("class",  "full-screen bottom-out");
		index.setAttribute("class",  "full-screen top-in");
	}

	// 开始项目经历板块打字机效果
	function beginTypeWritter(contentId) {
		if(beginWrite == 0 && contentId == "exp") {
			document.querySelector(".exp-list").typeWritter(100);
			beginWrite = 1;
		}
	}
}())
