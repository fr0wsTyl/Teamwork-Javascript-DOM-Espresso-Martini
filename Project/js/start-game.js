var startGameScreen = (function () {
	var startScreenImage = new Image();
	startScreenImage.src = 'images/playbutton.png';
	var startGameScreen = {
		init: function(x, y, width, height) {
            this.x = x;
            this.y = y;

            this.image = new Kinetic.Image({
                x: this.x,
                y: this.y,
                image: startScreenImage,
                width: width,
                height: height
            });

            return this;
        },
        draw: function() {
            return this.image;
        }
	};
	return startGameScreen;
})();