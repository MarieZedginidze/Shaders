import * as flames from './flames.js';

const loadImage = () => {
  window.onload = function () {
        // get the image.
        let img = new Image();
        img.src = './image.jpg';

        // wait till image is loaded.
        img.onload = function () {
            fill_canvas(img);       // fill the canvas with the image.
        }

        function fill_canvas(img) {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d'); // create canvas context.

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);       // draw the image to the canvas.

            console.log(canvas.width);

            console.log('set it alight');
            flames.setAflame();
        }
    };
};

const positiveOrNegative = () => {
  return Math.random() < 0.5 ? -1 : 1;
};

const randomDifference = (max) => {
  return positiveOrNegative() * Math.floor(Math.random() * max);
};

const randomBrown = () => {
  return {
    red: 140 + randomDifference(15),
    green: 80 + randomDifference(7),
    blue: 52 + randomDifference(5)
  };
};

const reddenItUp = () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d'); // create canvas context.
console.log("now canvas width is: " + canvas.width);
console.log("canvas.height is: " + canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
console.log('length: ' + imageData.data.length);

let foo = 0;
  for(let i = ((canvas.height * canvas.width * 4) - (canvas.width * 4)); i > 0; i -= (canvas.width * 4)) {
console.log("starting to redden");
    foo++;
    setTimeout(() => {
//console.log("firing the redden");
      for(let j = 0; j < (canvas.width * 4); j += 4) {
        const rgb = randomBrown();
	imageData.data[i + j] = rgb.red;
        imageData.data[i + j + 1] = rgb.green;
        imageData.data[i + j + 2] = rgb.blue;
      }
//console.log("should put image data");
      ctx.putImageData(imageData, 0, 0);
    }, 15 * foo);
    setTimeout(() => {
      for(let j = 0; j < (canvas.width * 4); j += 4) {
        imageData.data[i + j + 3] = 150;
      }
    }, 25 * (foo + 1));
    setTimeout(() => {
      for(let j = 0; j < (canvas.width * 4); j += 4) {
        imageData.data[i + j + 3] = 0;
      }
    }, 30 * (foo + 2));
  }
 
  console.log('fire!');
  flames.setAflame();
  
};

(() => {
  loadImage();
  setTimeout(reddenItUp, 5000);
})();


