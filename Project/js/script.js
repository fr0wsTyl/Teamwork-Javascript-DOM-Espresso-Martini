function game() {
	var initalLink = document.getElementById('initial');

	initalLink.style.display = 'none';

	var stage = new Kinetic.Stage({
		container: 'canvas-container',
		width: 450,
		height: 350
	});

	var layer = new Kinetic.Layer();

	var stamo = duck.init(300, 150, 3, 3),
		stamoImage = stamo.draw();

	layer.add(stamoImage);
	stage.add(layer);


	function animFrame() {
		var velocityX = stamo.velocityX,
			velocityY = stamo.velocityY,
			currentX = stamoImage.getX() + velocityX,
			currentY = stamoImage.getY() + velocityY;

		if (0 >= currentX || currentX >= stage.getWidth() - 50) {
			stamo.velocityX *= -1;
		}
		if (0 >= currentY || currentY >= stage.getHeight() - 50) {
			stamo.velocityY *= -1;
		}

		stamoImage.setX(currentX);
		stamoImage.setY(currentY);

		layer.draw();

		requestAnimationFrame(animFrame);
	}

	animFrame();
}