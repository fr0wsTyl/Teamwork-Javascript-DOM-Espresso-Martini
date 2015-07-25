var shotgun = (function() {
    var shotgunImage = new Image();
    shotgunImage.src = 'images/Shotgun/shotgun-not-shooting.png';

    var shotgun = {
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
            });
            stage.addEventListener('mouseup', function() {
                shotgunImage.src = 'images/Shotgun/shotgun-not-shooting.png';
            });
        }
    };

    return shotgun;
}());