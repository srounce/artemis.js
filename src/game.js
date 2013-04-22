var fs = require('fs')

  , World = require('./world')
  , AssetLibrary = require('./content/assetlibrary')
  , EntityFactory = require('./entityfactory')

  , PlayerManager = require('./managers/playermanager')

  , RenderSystem = require('./systems/rendersystem')
  , PlayerControllerSystem = require('./systems/playercontrollersystem')
  , MovementSystem = require('./systems/movementsystem')
  , SimulationSystem = require('./systems/simulationsystem')

  , PlayerControllerComponent = require('./components/playercontrollercomponent')

  , KeyboardInput = require('./inputs/keyboardinput')
  , LeapInput = require('./inputs/leapinput')
  , _controllerMap = JSON.parse(fs.readFileSync(__dirname + '/config/defaultcontrols.json'))

  , THREE = require('three')

  , ShaderList = require('./shaders/shaderlist')


var Game = function Game( tickRate ) 
{
  var Game

    , _world
    , _tickRate = tickRate

    , _renderSystem
    , _simulationSystem
  
  Game = function Game() 
  {
    _world = new World();

    _world.setManager(new PlayerManager());

    _world.setSystem(new PlayerControllerSystem());
    _simulationSystem = _world.setSystem(new SimulationSystem());
    _world.setSystem(new MovementSystem());

    _renderSystem = _world.setSystem(new RenderSystem(), true);

    var assets = AssetLibrary.getInstance()
      , keyboardInput = new KeyboardInput(_controllerMap)
      , leapInput = new LeapInput(_controllerMap)

    _world.initialize();
    this.tick(Date.now());
    requestAnimationFrame(this.render.bind(this));

    console.dir(ShaderList.grass)
    
    assets.fetch('/assets\\models/player.js', AssetLibrary.AssetTypes.JSON_MODEL, function( assets ) {
      var e = EntityFactory.createPlayer(_world, {
        position : { x : 0, y : 80, z : 0 }
      , mesh : {
          geometry : assets[0]
        }
      //, material : new THREE.ShaderMaterial(ShaderList.grass)
      , material : assets[1][0]
      })
      //e.addComponent(new PlayerControllerComponent(keyboardInput))
      e.addComponent(new PlayerControllerComponent(leapInput))
      //_renderSystem.trackEntity(e)

      EntityFactory.createBall(_world, {
        position : { x : 0, y : 200, z : 0 }
      })
    })


    EntityFactory.createGroundPlane(_world, {
      material : new THREE.ShaderMaterial(ShaderList.grass)
    })

    EntityFactory.createSkylight(_world)

    EntityFactory.createPointLight(_world, {
      position : {
        x : 10
      , y : 150
      , z : -20
      }
    })
  }

  Game.prototype.tick = function( lastframe )
  {
    var now;
    _world.process();

    now = performance.now();
    _world.delta = _tickRate / (now - lastframe);

    if( _simulationSystem.simWorld ) {
      _simulationSystem.simWorld.step((now - lastframe) / 100);
    }

    setTimeout(function() {
      this.tick.call(this, now);
    }.bind(this), _tickRate);
  }

  Game.prototype.render = function()
  {
    requestAnimationFrame(this.render.bind(this));
    
    _renderSystem.process();
  }

  return new Game();
}

module.exports = exports = Game;
