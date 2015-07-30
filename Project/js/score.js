var score = function() {
	var score = {
		init: function(text, color, fontSize, x, y) {
			this.text = text;
			this.color = color;
			this.fontSize = fontSize;
			this.x = x;
			this.y = y;

			this.result = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.result.setAttribute('x', this.x);
			this.result.setAttribute('y', this.y);
			this.result.setAttribute('fill', this.color);
			this.result.setAttribute('font-size', this.fontSize);
			this.result.textContent = this.text;


			return this;
		},
		getScore: function() {
			return this.result;
		}

	};

	return score;
}();