var duck = (function() {
	var duckImage = new Image();

	var duck = {
		init: function(x, y, velocityX, velocityY, width, height, alive, state) {
			this.x = x;
			this.y = y;
			this.alive = alive;
			this.velocityX = velocityX;
			this.velocityY = velocityY;

			getBirdState(state);

			this.image = new Kinetic.Image({
				x: this.x,
				y: this.y,
				image: duckImage,
				width: width,
				height: height
			});

			return this;
		},
		draw: function() {
			return this.image;
		},
		getRightDirection: function() {
			if (this.velocityX > 0 && this.velocityY < 0) {
				this.changeState('up-right');
			} else if (this.velocityX < 0 && this.velocityY < 0) {
				this.changeState('up-left');
			} else if (this.velocityX > 0 && this.velocityY > 0) {
				this.changeState('down-right');
			} else if (this.velocityX < 0 && this.velocityY > 0) {
				this.changeState('down-left');
			}
		},
		changeState: function(newState) {
			getBirdState(newState);

			this.image.image = duckImage;
		}
	};

	function getBirdState(state) {
		switch (state) {
			case 'down-right':
				duckImage.src = 'images/Birds/bird-one.png';
				break;
			case 'up-right':
				duckImage.src = 'images/Birds/bird-two.png';
				break;
			case 'up-left':
				duckImage.src = 'images/Birds/bird-three.png';
				break;
			case 'down-left':
				duckImage.src = 'images/Birds/bird-four.png';
				break;
		}
	}

	return duck;
}());