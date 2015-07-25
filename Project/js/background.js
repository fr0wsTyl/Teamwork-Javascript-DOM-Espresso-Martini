var background = function() {
	var backgroundImage = new Image();

	backgroundImage.src = 'images/Background/background.png';

	var background = {
		init: function(width, height) {
			this.x = 0;
			this.y = 0;
			this.width = width;
			this.height = height;

			this.image = new Kinetic.Image({
				x: this.x,
				y: this.y,
				image: backgroundImage,
				width: this.width,
				height: this.height
			});

			return this;
		},
		draw: function() {
			return this.image;
		},
	};

	return background;
}();