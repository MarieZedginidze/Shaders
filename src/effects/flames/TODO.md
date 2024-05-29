### Running what's here. 

This folder uses webpack to package the js for use by index.html. 
When you clone this, you'll want to run `npm i`, and then `npx webpack`.
Once that's done you can run `node app.js`, which will start a local server listening on port 3001.
Then going to http://localhost:3001 in a browser will show the webpage.

What you should see is an image of a form, with a flame emoji on top.
The flame emoji will start to fall down, and in a few seconds after the image will start to turn red from the bottom up.

### The task

The task here is to make the image "burn up" like a piece of paper.
We can use the fire emoji, or we can use something more elaborate for flames.
The turning the image red effect and then having it disappear, could probably look cooler, but I am concerned about performance. 
Basically if the flames look as cool as the emoji or better, and the image disappears behind the flames as they rise, I think we'll get the effect we want.
