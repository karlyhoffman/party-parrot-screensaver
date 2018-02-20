(function ($, window, document, undefined) {
  'use strict';
  $(function () {

    var img_obj = {
      'source': null,
      'current': 0,
      'total_frames': 10,
      'width': 47,
      'height': 47
    };

    var img = new Image();
    img.onload = function () { // Triggered when image has finished loading.
        img_obj.source = img;  // we set the image source for our object.
    }
    img.src = 'assets/img/parrot-sprite-x@1x.png'; // contains an image of size 256x16
                                  // with 16 frames of size 16x16

    function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
        if (iobj.source != null)
            context.drawImage(iobj.source, iobj.current * iobj.width, 0,
                              iobj.width, iobj.height,
                              x, y, iobj.width, iobj.height);
        iobj.current = (iobj.current + 1) % iobj.total_frames;
                       // incrementing the current frame and assuring animation loop
    }

    function on_body_load() {
        var canvas = document.getElementById('screensaver');
        var context = canvas.getContext("2d");

        setInterval((function (c, i) {
                    return function () {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        draw_anim(c, 10, 10, i);
                    };
        })(context, img_obj), 100);
    };

    on_body_load();


  });
})(jQuery, window, document);
