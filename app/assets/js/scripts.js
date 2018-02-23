/*!
 * PartyParrotScreensaver
 * Party Parrot Screensaver
 * https://karlyhoffman.com
 * @author Karly Hoffman
 * @version 1.0.5
 * Copyright 2018. MIT licensed.
 */
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
      speed: 3,
      frameIndex: 0,
      count: 0,
      animateParrot: function(parrot) {
        this.count += 1;
        if (this.count > this.speed) {
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
		        0,                                            // canvas x-coordinates
		        0,                                            // canvas y-coordinates
            this.width / this.frames,                     // scale image x
            this.height                                   // scale image y
        );
      }
    }

    function party() {
      window.requestAnimationFrame(party);
      partyParrot.animateParrot();
      partyParrot.renderParrot();
    }

    parrotSprite.addEventListener("load", party);

    $(window).on( "resize", function() {
        resizeCanvas();
    });

  });
})(jQuery, window, document);
