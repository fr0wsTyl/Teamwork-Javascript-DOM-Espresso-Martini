var startGameScreen = (function () {
	var startScreenImage = new Image(),
			startGameScreen;

		startScreenImage.src = 'images/playbutton.png';
		startGameScreen = {
		init: function(x, y, width, height) {
            this.x = x;
            this.y = y;

            this.image = new Kinetic.Image({
                x: this.x,
                y: this.y,
                image: startScreenImage,
                width: this.width,
                height: this.height
            });

            return this;
        },
        draw: function() {
            return this.image;
        }
	};
	return startGameScreen;
})();
