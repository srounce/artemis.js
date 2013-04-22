var Entity
  , ComponentType = require('./componenttype')
  , BitSet = require('bitset')
  , UUID = require('./util/uuid')


Entity = function Entity( world, id )
{
  var Entity

    , _uuid
    
    , _id
    , _componentBits
    , _systemBits

    , _world
    , _entityMgr
    , _componentMgr


  Entity = function Entity( world, id )
  {
    _world = world;
    _id = id;

    _entityMgr = _world.getEntityManager();
    _componentMgr = _world.getComponentManager();

    _componentBits = new BitSet();
    _systemBits = new BitSet();

    this.reset();
  }

  Entity.prototype.reset = function reset()
  {
    _systemBits.clear();
    _componentBits.clear();

    _uuid = UUID.randomUUID();
  }

  Entity.prototype.getId = function getId()
  {
    return _id;
  }

  Entity.prototype.addComponent = function addComponent( component, type )
  {
    if( typeof type === 'undefined' ) {
      return this.addComponent(component, ComponentType.getTypeFor(component.constructor));
    }

    _componentMgr.addComponent(this, type, component);

    return this;
  }

  Entity.prototype.addToWorld = function addToWorld()
  {
    _world.addEntity(this);
  }

  Entity.prototype.getComponentBits = function() 
  {
    return _componentBits;
  }

  Entity.prototype.getSystemBits = function()
  {
    return _systemBits;
  }

  Entity.prototype.toString = function toString()
  {
    return 'Entity[' + _id + ']';
  }

  return new Entity( world, id )
}

module.exports = exports = Entity;
