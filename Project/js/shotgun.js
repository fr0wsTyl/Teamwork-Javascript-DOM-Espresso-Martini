var shotgun = (function() {
    var shotgunImage = new Image(),
        shotgun;
        
        var sound = new Howl({
          urls: ['sounds/shotgun.mp3']
        }).play();

    shotgunImage.src = 'images/Shotgun/shotgun-not-shooting.png';

    shotgun = {
        init: function(x, y, width, height) {
            this.x = x;
            this.y = y;

            this.image = new Kinetic.Image({
                x: this.x,
                y: this.y,
                image: shotgunImage,
                width: width,
                height: height
            });

            return this;
        },
        draw: function() {
            return this.image;
        },
        clicked: function(stage) {
            stage.addEventListener('mousedown', function() {
                shotgunImage.src = 'images/Shotgun/shotgun-shooting.png';
                sound.play();
            });
            stage.addEventListener('mouseup', function() {
                shotgunImage.src = 'images/Shotgun/shotgun-not-shooting.png';
            });

            stage.addEventListener('touchstart', function() {
                shotgunImage.src = 'images/Shotgun/shotgun-shooting.png';
            });
            stage.addEventListener('touchend', function() {
                shotgunImage.src = 'images/Shotgun/shotgun-not-shooting.png';
            });
        }
    };

    return shotgun;
}());