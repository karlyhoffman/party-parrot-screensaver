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
        context.clearRect(0, 0, this.width, this.height);
        context.drawImage(
		        this.image,
		        this.frameIndex * this.width / this.frames,   // frame x-position
		        0,                                            // frame y-position
		        this.width / this.frames,                     // image width
		        this.height,                                  // image height
		        0,                                            // canvas x-coordinates
		        0,                                            // canvas y-coordinates
		        (this.width * 1) / this.frames,               // scale image
		        (this.height * 1)                             // scale image
        );
      }
    }

    function party() {
      window.requestAnimationFrame(party);
      partyParrot.animateParrot();
      partyParrot.renderParrot();
    }

    parrotSprite.addEventListener("load", party);

  });
})(jQuery, window, document);
