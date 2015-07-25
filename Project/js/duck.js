var duck = function() {
	var duck = {
		init: function(x, y, velocityX, velocityY, width, height, state) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.velocityX = velocityX;
			this.velocityY = velocityY;
			this.duckImage = new Image();

			getBirdState(state, this);

			this.image = new Kinetic.Image({
				x: this.x,
				y: this.y,
				image: this.duckImage,
				width: this.width,
				height: this.height
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
			getBirdState(newState, this);

			this.image.image = this.duckImage;
		},
		clicked: function() {
			this.image.addEventListener('click', function() {
				this.destroy();
			});
		}

	};

	function getBirdState(state, bird) {
		switch (state) {
			case 'down-right':
				bird.duckImage.src = 'images/Birds/bird-one.png';
				break;
			case 'up-right':
				bird.duckImage.src = 'images/Birds/bird-two.png';
				break;
			case 'up-left':
				bird.duckImage.src = 'images/Birds/bird-three.png';
				break;
			case 'down-left':
				bird.duckImage.src = 'images/Birds/bird-four.png';
				break;
		}
	}

	return duck;
}();