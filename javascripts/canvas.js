(function(){
	var canvas=document.getElementById("canvas"),
		c=canvas.getContext("2d"),
		imageList=new Array(),
		imageBg=new Image();

	canvas.setAttribute("style","position:relative;left:50%;margin-left:-160px;");
	function imagePos(px, py, pw, ph) {
		this.px = px;
		this.py = py;
		this.pw = pw;
		this.ph = ph;
	}
		imageList[0] = new imagePos(10, 10, 140, 190), // html5
		imageList[1] = new imagePos(150, 10, 140, 190), // css3
		imageList[2] = new imagePos(290, 10, 150, 190), // js
		imageList[3] = new imagePos(450, 10, 270, 70), // jquerymobile
		imageList[4] = new imagePos(450, 80, 310, 120), // nodejs
		imageList[5] = new imagePos(760, 10, 170, 190); // phonegap
	imageBg.src = "images/bg.png";
	imageBg.onload = setInterval(showBg,2000);
	function showBg() { // 显示图片
		var i = Math.floor(6*Math.random());
		c.clearRect(0, 0, 320, 320);
		c.globalAlpha = 0.4;
		c.drawImage(
			imageBg,imageList[i].px, 
			imageList[i].py, imageList[i].pw, 
			imageList[i].ph,160-imageList[i].pw/2,
			100-imageList[i].ph/2,imageList[i].pw,
			imageList[i].ph
		);
	}
}())
