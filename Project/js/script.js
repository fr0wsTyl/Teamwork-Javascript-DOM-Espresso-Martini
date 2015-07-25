function game() {

	/* The old way of starting the game (via html button) */
	// var initalLink = document.getElementById('initial');

	// initalLink.style.display = 'none';

	var stage = new Kinetic.Stage({
		container: 'canvas-container',
		width: 840,
		height: 620
	});

	var layer = new Kinetic.Layer();
	var backgroundLayer = new Kinetic.Layer();
	var shotgunLayer = new Kinetic.Layer();

	// background accepts width, height
	var gameBackground = background.init(840, 620);
	var	gameBackgroundImage = background.draw();

	// xPosition yPosition, velocityX, velocityY, width, height, alive (boolean)
	var stamo = duck.init(300, 150, 3, 3, 75, 75, true, 'down-right'),
		stamoImage = stamo.draw();

    //xPosition, yPosition, width, height
    var shooter = shotgun.init(380, 525, 82, 97),
        shooterImage = shooter.draw();

	backgroundLayer.add(gameBackgroundImage);
	stage.add(backgroundLayer);
	layer.add(stamoImage);
	stage.add(layer);
    shotgunLayer.add(shooterImage);
	stage.add(shotgunLayer);

	function animFrame() {
		var velocityX = stamo.velocityX,
			velocityY = stamo.velocityY,
			currentX = stamoImage.getX() + velocityX,
			currentY = stamoImage.getY() + velocityY;

		if (0 >= currentX || currentX >= stage.getWidth() - 75) {
			stamo.velocityX *= -1;
			stamo.getRightDirection();
		}
		if (0 >= currentY || currentY >= stage.getHeight() - 75) {
			stamo.velocityY *= -1;
			stamo.getRightDirection();
		}

		stamoImage.setX(currentX);
		stamoImage.setY(currentY);

		layer.draw();
        shotgunLayer.draw();

		requestAnimationFrame(animFrame);
	}

	animFrame();
}