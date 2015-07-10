Object.prototype.typeWritter = function(delay) {
	var writter = this,
		codes = writter.innerHTML,
		current = 0,
		currentSymbol,
		t = setInterval(write, delay);

	writter.innerHTML = ""; // 清除内容准备写入
	function write() {
		currentSymbol = codes.substr(current, 1); // 获取当前正要写入的字符
		current = (currentSymbol == "<" ? codes.indexOf(">", current) + 1 : current); // 写入若为标签，则跳过标签
		writter.innerHTML = codes.substring(0, current) + (current == codes.length ? " " : "_"); // 将内容写入
		current == codes.length ? clearInterval(t) : current++;
	}

	 
}
