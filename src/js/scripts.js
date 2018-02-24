(function ($, window, document, undefined) {
  'use strict';
  $(function () {

    var canvas = document.getElementById('screensaver');
    var context = canvas.getContext("2d");

    function resizeCanvas() { // responsive canvas
      context.canvas.width = innerWidth;
      context.canvas.height = innerHeight;
    }
    resizeCanvas();

    var parrotSprite = new Image();
    parrotSprite.src = "assets/img/parrot-x-sm.png";

    var partyParrot = {
      parrot: this,
      width: 640,
  		height: 64,
  		image: parrotSprite,
  		frames: 10,
      xCoor: innerWidth / 2,    // center x coordinate
      yCoor: innerHeight / 2,   // center y coordinate
      xDirection: 3,            // x speed
      yDirection: 3,            // y speed
      headBobbingSpeed: 3,      // lower = faster, higher = slower
      frameIndex: 0,
      count: 0,
      animateParrot: function(parrot) {
        this.count += 1;
        if (this.count > this.headBobbingSpeed) {
          this.count = 0;
          if (this.frameIndex < this.frames - 1) {
            this.frameIndex += 1;
          } else {
            this.frameIndex = 0;
          };
        };
      },
      renderParrot: function(parrot) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
		        this.image,
		        this.frameIndex * this.width / this.frames,   // frame x-position
		        0,                                            // frame y-position
		        this.width / this.frames,                     // image width
		        this.height,                                  // image height
		        this.xCoor,                                   // canvas x-coordinates
		        this.yCoor,                                   // canvas y-coordinates
            this.width / this.frames,                     // scale image x
            this.height                                   // scale image y
        );
      },
      moveParrot: function(parrot) {
        // check x bounds
        if ( this.xCoor + this.height < canvas.width && this.xCoor > -(this.height * 0.1) ) {
          this.xCoor += this.xDirection; // keep going same direction
        } else { // change directions
          this.xDirection = this.xDirection * -1;
          this.xCoor += this.xDirection;
        }

        // check y bounds
        if ( this.yCoor + this.height < canvas.height && this.yCoor > -(this.height * 0.5) ) {
          this.yCoor += this.yDirection; // keep going same direction
        } else { // change directions
          this.yDirection = this.yDirection * -1;
          this.yCoor += this.yDirection;
        }
      }
    }

    function party() {
      window.requestAnimationFrame(party);
      partyParrot.animateParrot();
      partyParrot.renderParrot();
      partyParrot.moveParrot();
    }

    parrotSprite.addEventListener("load", party);

    window.addEventListener('resize', function() {
      resizeCanvas();
    });

  });
})(jQuery, window, document);
