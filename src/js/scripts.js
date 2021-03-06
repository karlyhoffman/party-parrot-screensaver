window.addEventListener('load', function() {

    /* Create Canvas */
    const canvas = document.getElementById('screensaver');
    const context = canvas.getContext("2d");

    function resizeCanvas() { // responsive canvas
      context.canvas.width = innerWidth;
      context.canvas.height = innerHeight;
    }
    resizeCanvas();

    window.addEventListener('resize', function() {
      resizeCanvas();
    });


    /* Create Screensaver Images */
    function screensaverImg(imgSrc, imgWidth, imgHeight, numOfFrames) {
      const image = new Image();
      image.src = imgSrc;
      image.width = imgWidth;
      image.height = imgHeight;
      image.frames = numOfFrames;
      return image;
    };

    const smParrotImg = screensaverImg("assets/img/parrot-x-sm.png", 640, 47, 10);
    const mdParrotImg = screensaverImg("assets/img/parrot-x-md.png", 960, 72, 10);
    const lgParrotImg = screensaverImg("assets/img/parrot-x-lg.png", 1280, 93, 10);

    const partyAnimals = [];

    /* Screensaver Image Constructor */
    function NewPartyParrot(image, startingXpos, startingYpos, speed, headBobbSpeed) {
      this.image = image;
      this.width = image.width;
      this.height = image.height;
      image.frames === undefined ? this.frames = 1 : this.frames = image.frames;
      this.xCoor = startingXpos;                // starting x coordinate
      this.yCoor = startingYpos;                // staring y coordinate
      this.xDirection = speed;                  // x speed
      this.yDirection = speed;                  // y speed
      this.headBobbingSpeed = headBobbSpeed;    // lower = faster, higher = slower
      this.frameIndex = 0;
      this.count = 0;

      partyAnimals.push(this);

      this.renderParrot = function() {
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
      };

      this.spriteAnimation = function() {
        this.count += 1;
        if (this.count > this.headBobbingSpeed) {
          this.count = 0;
          if (this.frameIndex < this.frames - 1) {
            this.frameIndex += 1;
          } else {
            this.frameIndex = 0;
          };
        };
      };

      this.moveParrot = function() {
        // check x bounds
        if ( this.xCoor + this.height < canvas.width && this.xCoor >= 0 ) {
          this.xCoor += this.xDirection; // keep going same direction
        } else { // change directions
          this.xDirection = this.xDirection * -1;
          this.xCoor += this.xDirection;
        };

        // check y bounds
        if ( this.yCoor + this.height < canvas.height && this.yCoor >= 0 ) {
          this.yCoor += this.yDirection; // keep going same direction
        } else { // change directions
          this.yDirection = this.yDirection * -1;
          this.yCoor += this.yDirection;
        };
      };

      this.animate = function() {
        this.renderParrot();
        this.spriteAnimation();
        this.moveParrot();
      }

      // this.animate when images load
      this.party = function() {
        this.image.onload = this.animate();
      };
    };


    /* Create Instances   =   (image, startingXpos, startingYpos, speed/direction, headBobbSpeed) */
    const smallParrot = new NewPartyParrot(smParrotImg, 400, 50, -1, 5);
    const mediumParrot = new NewPartyParrot(mdParrotImg, 0, 0, 2, 3);
    const bigParrot = new NewPartyParrot(lgParrotImg, 1000, 0, 4, 2);

    function partyParrots() { // animate each instance
    	context.clearRect(0, 0, canvas.width, canvas.height);
      partyAnimals.forEach(function(image) {
        image.party();
      });
      window.requestAnimationFrame(partyParrots);
    }
    partyParrots();
});
