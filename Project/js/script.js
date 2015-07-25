function game() {
    //All global variables used in 'game' module
    var stage,
        gameBackground,
        gameBackgroundImage,
        shooter,
        shooterImage,
        ducks,
        currentDuck,
        currentDuckImage,
        generatedRandom,
        spawnXPosition,
        spawnYPosition,
        i,
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        NUMBER_OF_DUCKS,
        BIRDS_SIZE,
        BIRDS_SPEED;


    //Assigning default values for the constants
    NUMBER_OF_DUCKS = 4;
    BIRDS_SIZE = 75;
    BIRDS_SPEED = 3;
    CANVAS_WIDTH = 840;
    CANVAS_HEIGHT = 620;

    //Assigning default values for other variables
    ducks = [];
    generatedRandom = 0;
    spawnXPosition = 0;
    spawnYPosition = 0;

    //Initializing KineticJS Stage
    stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
    });

    layer = new Kinetic.Layer();
    backgroundLayer = new Kinetic.Layer();

    // background accepts width, height
    gameBackground = Object.create(background).init(CANVAS_WIDTH, CANVAS_HEIGHT);
    gameBackgroundImage = gameBackground.draw();

    //xPosition, yPosition, width, height
    shooter = Object.create(shotgun).init(380, 525, 82, 97);
    shooterImage = shooter.draw();

    // xPosition yPosition, velocityX, velocityY, width, height, state
    for (i = 0; i < NUMBER_OF_DUCKS; i += 1) {
        generatedRandom = parseInt(Math.random() * 10);
        spawnYPosition = (stage.getHeight() / 2) - generatedRandom * (BIRDS_SIZE / 3);

        if (generatedRandom % 2 === 0) {
            spawnXPosition = 1;
        } else {
            spawnXPosition = stage.getWidth() - BIRDS_SIZE - 10;
        }

        currentDuck = Object.create(duck).init(spawnXPosition, spawnYPosition, BIRDS_SPEED, BIRDS_SPEED, BIRDS_SIZE, BIRDS_SIZE, 'down-right');
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
                currentX >= stage.getWidth() - BIRDS_SIZE ||
                suddenChangeDirectionX % magicNumber === 0) {

                ducky.velocityX *= -1;
                ducky.getRightDirection();
            }

            if (0 >= currentY ||
                currentY >= stage.getHeight() - BIRDS_SIZE ||
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
