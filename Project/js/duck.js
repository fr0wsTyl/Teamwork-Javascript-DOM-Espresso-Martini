var duck = (function() {
	var duckImage = new Image();

	duckImage.src = 'http://www.worldstopbrands.com/_mm/_d/_ext3/78451/big_Duck%20Hunt01.gif';

	var duck = {
		init: function(x, y, velocityX, velocityY) {
			this.x = x;
			this.y = y;
			this.velocityX = velocityX;
			this.velocityY = velocityY;
			this.image = new Kinetic.Image({
				x: this.x,
				y: this.y,
				image: duckImage,
				width: 50,
				height: 50
			});

			return this;
		},
		draw: function() {
			return this.image;
		},
	};

	return duck;
}());