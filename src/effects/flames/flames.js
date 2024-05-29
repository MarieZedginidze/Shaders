import { EntityComponentSystem } from 'javascript-entity-component-system';

export const setAflame = () => {
  const ecs = new EntityComponentSystem();

  const canvas = document.getElementById('canvas2');
  let context = canvas.getContext('2d');
console.log("canvas: ", canvas);
  const viewport = {width: 400, height: 500}; // this should be set based on the canvs.

  const physicsComponent = {
    name: "physics",
    state: {
      accelerationY: 1,
      velocityX: 0,
      velocityY: 1
    }
  };

  const emojis = [`🔥`];

  let positionComponents = [];
  let emojiComponents = [];

//  for(var i = 0; i < 20; i++) {
    positionComponents.push({
      name : "position", // + Math.floor(Math.random() * 1000),
      componentType: 'position',
      state: {
	x: Math.floor(Math.random() * viewport.width),
	y: (viewport.height - 250) - (Math.floor(Math.random() * 100))
      }
    });
    emojiComponents.push({
      name: 'text', // + Math.floor(Math.random() * 1000),
      componentType: 'text',
      state: {
	  text: emojis[0],
	  font: '40px Verdana'
      }
    });
//  }

  const physicsProcessor = {
    name: "physicsProcessor",
    required: ["position", "physics"],
    update(entity, components, processor) {
      const [position, physics] = components;

console.log('calling physics processor');
      physics.state.velocityY += physics.state.accelerationY;
      physics.state.velocityX *= (Math.random() < 0.5 ? -1 : 1);

      position.state.y += physics.state.velocityY
      position.state.x += physics.state.velocityX
    }
  };

  const textProcessor = {
    name: 'textProcessor',
    required: ['position', 'text'],
    update(entity, components, processor) {
	const [position, text] = components;
console.log('should print flame');

	if(position.state.remove) {
	    return;
	}

console.log('should really print flame at: ', position.state.x, position.state.y);
console.log(text.state);
console.log(context);
	context.translate(position.state.x, position.state.y);
	context.font = text.state.font;
	context.fillStyle = 'black';
	context.fillText(text.state.text, 0, 0);
	context.translate(-position.state.x, -position.state.y)
    }
  };

  positionComponents.forEach(component => ecs.addComponent(component));
  ecs.addComponent(physicsComponent)

  emojiComponents.forEach(component => ecs.addComponent(component));

  ecs.addProcessor(physicsProcessor);
  ecs.addProcessor(textProcessor);

  const ent = ecs.createEntity('foo', [
    'position',
    'physics',
    'text'
  ], [
    'physicsProcessor',
    'textProcessor'
  ]);
  ecs.addEntity(ent);

  setInterval(() => {
    console.log("should add some flames");
    context.clearRect(0, 0, canvas.width, canvas.height);
//    context = canvas.getContext('2d');
    ecs.update();
  }, 100);
};
