function game() {
	var initalLink = document.getElementById('initial');

	initalLink.style.display = 'none';

	var stage = new Kinetic.Stage({
		container: 'canvas-container',
		width: 840,
		height: 620
	});

	var layer = new Kinetic.Layer();
	var backgroundLayer = new Kinetic.Layer();

	// background accepts width, height
	var gameBackground = Object.create(background).init(840, 620),
		gameBackgroundImage = gameBackground.draw();

	//xPosition, yPosition, width, height
	var shooter = Object.create(shotgun).init(380, 525, 82, 97),
		shooterImage = shooter.draw();

	var ducks = [],
		numberOfDucks = 2,
		birdsSize = 75,
		speed = 3,
		currentDuck,
		currentDuckImage,
		generatedRandom = 0,
		spawnXPosition = 0,
		spawnYPosition = 0;

	// xPosition yPosition, velocityX, velocityY, width, height, state
	for (var i = 0; i < numberOfDucks; i += 1) {
		generatedRandom = parseInt(Math.random() * 10);
		spawnYPosition = (stage.getHeight() / 2) - generatedRandom * (birdsSize / 3);

		if (generatedRandom % 2 === 0) {
			spawnXPosition = 1;
		} else {
			spawnXPosition = stage.getWidth() - birdsSize - 10;
		}

		currentDuck = Object.create(duck).init(spawnXPosition, spawnYPosition, speed, speed, birdsSize, birdsSize, 'down-right'),
			currentDuckImage = currentDuck.draw();

		ducks.push(currentDuck);
		layer.add(currentDuckImage);
	}

	backgroundLayer.add(gameBackgroundImage);
	stage.add(backgroundLayer);

	layer.add(shooterImage);
	stage.add(layer);

	function animFrame() {
		ducks.forEach(function(ducky) {
			var velocityX = ducky.velocityX,
				velocityY = ducky.velocityY,
				duckyImage = ducky.draw(),
				currentX = duckyImage.getX() + velocityX,
				currentY = duckyImage.getY() + velocityY,
				suddenChangeDirectionX = parseInt(((Math.random() * 1000) + stage.getHeight() * currentY)),
				suddenChangeDirectionY = parseInt(((Math.random() * 1000) + stage.getWidth() * currentX)),
				magicNumber = 237;

			ducky.clicked();

			if (0 >= currentX ||
				currentX >= stage.getWidth() - birdsSize ||
				suddenChangeDirectionX % magicNumber === 0) {

				ducky.velocityX *= -1;
				ducky.getRightDirection();
			}

			if (0 >= currentY ||
				currentY >= stage.getHeight() - birdsSize ||
				suddenChangeDirectionY % magicNumber === 0) {

				ducky.velocityY *= -1;
				ducky.getRightDirection();
			}

			duckyImage.setX(currentX);
			duckyImage.setY(currentY);
		});

		shooter.clicked(stage);

		layer.draw();

		requestAnimationFrame(animFrame);
	}

	animFrame();
}