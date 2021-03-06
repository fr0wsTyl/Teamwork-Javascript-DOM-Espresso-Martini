function game() {
    //All global variables used in 'game' module
    var stage,
        layer,
        backgroundLayer,
        gameBackground,
        gameBackgroundImage,
        shooter,
        shooterImage,
        i,
        canvas,
        hit,
        gameScore,
        scoreAsHtmlElement,
        divScore,
        svg,

        //Assigning default values for CONSTANTS
        SHOTGUN_X_POSITION = 380,
        SHOTGUT_Y_POSITION = 525,
        SHOTGUN_WIDTH = 82,
        SHOTGUN_HEIGHT = 97,
        NUMBER_OF_DUCKS = 5,
        BIRDS_SIZE = 75,
        BIRDS_SPEED = 3,
        BIRDS_SPEED_FALL = 6,
        CANVAS_WIDTH = 840,
        CANVAS_HEIGHT = 620,
        SCORE_COLOR = 'black',
        SCORE_FONTSIZE = '40px',
        START_GAME_IMAGE_WIDTH = 176,
        START_GAME_IMAGE_HEIGHT = 82,
        MINUTES = 1,

        //Assigning default values for other variables
        ducks = [],
        generatedRandom = 0,
        spawnXPosition = 0,
        spawnYPosition = 0,
        svgWidth = 0,
        svgHeight = 0,
        scorePositionX = 0,
        scorePositionY = 0,
        currentScore = 0;

    svg = document.getElementById('the-svg');
    svgWidth = svg.getAttribute('width');
    svgHeight = svg.getAttribute('height');

    scorePositionX = svgWidth / 2 - 100;
    scorePositionY = svgHeight - 10;

    // score accepts text, color, font-size, x, y
    gameScore = Object.create(score).init('Score: ' + currentScore, SCORE_COLOR, SCORE_FONTSIZE, scorePositionX, scorePositionY);
    scoreAsHtmlElement = gameScore.getScore();

    svg.appendChild(scoreAsHtmlElement);

    //Initializing KineticJS Stage
    stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
    });

    layer = new Kinetic.Layer();
    backgroundLayer = new Kinetic.Layer();
    startScreenLayer = new Kinetic.Layer();

    // background accepts width, height
    gameBackground = Object.create(background).init(CANVAS_WIDTH, CANVAS_HEIGHT);
    gameBackgroundImage = gameBackground.draw();

    //xPosition, yPosition, width, height
    shooter = Object.create(shotgun).init(SHOTGUN_X_POSITION, SHOTGUT_Y_POSITION, SHOTGUN_WIDTH, SHOTGUN_HEIGHT);
    shooterImage = shooter.draw();
    shooter.clicked(stage);

    gameStartButton = Object.create(startGameScreen).init((CANVAS_WIDTH / 2) - (START_GAME_IMAGE_WIDTH / 2), (CANVAS_HEIGHT / 2) - (START_GAME_IMAGE_HEIGHT / 2), START_GAME_IMAGE_WIDTH, START_GAME_IMAGE_HEIGHT);
    gameStartButtonImage = gameStartButton.draw();

    // xPosition yPosition, velocityX, velocityY, width, height, state, isAlive
    for (i = 0; i < NUMBER_OF_DUCKS; i += 1) {
        currentDuck = generateRandomDuck();
        ducks.push(currentDuck);
    }

    backgroundLayer.add(gameBackgroundImage);
    layer.add(shooterImage);
    startScreenLayer.add(gameStartButtonImage);

    stage.add(backgroundLayer);
    stage.add(startScreenLayer);

    startButtonIsPressed('click', gameStartButtonImage, startScreenLayer, layer, stage, MINUTES);
    startButtonIsPressed('touchstart', gameStartButtonImage, startScreenLayer, layer, stage, MINUTES);

    canvas = document.getElementById('canvas-container');
    canvas.style.cursor = "url('images/sights/sight-only.png') 47 47, auto";

    function animFrame() {
        ducks.forEach(function(ducky, index, ducksArray) {
            var velocityX = ducky.velocityX,
                velocityY = ducky.velocityY,
                duckyImage = ducky.draw(),
                currentX = duckyImage.getX() + velocityX,
                currentY = duckyImage.getY() + velocityY,
                suddenChangeDirectionX = parseInt(((Math.random() * 1000) + stage.getHeight() * currentY)),
                suddenChangeDirectionY = parseInt(((Math.random() * 1000) + stage.getWidth() * currentX)),
                rightBorder = stage.getWidth() - BIRDS_SIZE,
                leftBorder = 0,
                topBorder = 0,
                bottomBorder = stage.getHeight() - (stage.getHeight() / 3),
                magicNumber = 237;

            duckIsHit(ducky, 'click');
            duckIsHit(ducky, 'touchstart');

            if (!ducky.isAlive) {
                ducky.velocityX = 0;
                ducky.velocityY = BIRDS_SPEED_FALL;

                currentY = duckyImage.getY() + ducky.velocityY;

                if (currentY >= stage.getHeight() - BIRDS_SIZE) {
                    duckyImage.destroy();

                    currentScore += 1;
                    scoreAsHtmlElement.innerHTML = 'Score: ' + currentScore;

                    ducksArray[index] = generateRandomDuck();
                }
            } else {
                if (leftBorder >= currentX ||
                    currentX >= rightBorder ||
                    suddenChangeDirectionX % magicNumber === 0) {

                    ducky.velocityX *= -1;
                    ducky.getRightDirection();
                }

                if (topBorder >= currentY ||
                    currentY >= bottomBorder ||
                    suddenChangeDirectionY % magicNumber === 0) {

                    ducky.velocityY *= -1;
                    ducky.getRightDirection();
                }
            }

            duckyImage.setX(currentX);
            duckyImage.setY(currentY);
        });

        layer.draw();

        requestAnimationFrame(animFrame);
    }

    animFrame();

    function generateRandomDuck() {
        var generatedRandom = 0,
            spawnXPosition = 0,
            spawnYPosition = 0,
            currentDuck,
            currentDuckImage,
            isAlive = true;

        generatedRandom = parseInt(Math.random() * 10);
        spawnYPosition = (stage.getHeight() / 2) - generatedRandom * (BIRDS_SIZE / 3);

        if (generatedRandom % 2 === 0) {
            spawnXPosition = 1;
        } else {
            spawnXPosition = stage.getWidth() - BIRDS_SIZE - 10;
        }

        currentDuck = Object.create(duck).init(spawnXPosition, spawnYPosition, BIRDS_SPEED,
            BIRDS_SPEED, BIRDS_SIZE, BIRDS_SIZE, 'down-right', isAlive);
        currentDuckImage = currentDuck.draw();
        layer.add(currentDuckImage);
		layer.add(shooterImage);

        return currentDuck;
    }

    function duckIsHit(currentDuck, eventListenerType) {
        currentDuck.image.addEventListener(eventListenerType, function() {
            currentDuck.isAlive = false;
        });
    }

    function startButtonIsPressed(eventListenerType, gameStartButtonImage, startScreenLayer, layer, stage, minutes) {
        gameStartButtonImage.addEventListener(eventListenerType, function() {
            gameStartButtonImage.remove();
            startScreenLayer.draw();
            layer.add(shooterImage);
            stage.add(layer);

            initiateTimer(minutes);
        });
    }

        function initiateTimer(minutes) {
        var countDownMinutes = 60 * minutes,
            display = document.getElementById('timer');

        startTimer(countDownMinutes, display);
    }

    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;

        var refreshIntervalId = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.innerHTML = 'Remaining time: ' + (minutes + ":" + seconds);

            if (--timer < 0) {
                clearInterval(refreshIntervalId);
                stage.destroy();
            }

        }, 1000);

        refreshIntervalId();
    }
}