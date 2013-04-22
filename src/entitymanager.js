var Manager = require('./manager')
  , Entity = require('./entity')
  , IdentifierPool = require('./identifierpool')
  , BitSet = require('bitset')
  , supr = new Manager();

var EntityManager = function()
{
  var EntityManager
    
    , _entities = []
    , _disabled

    , _active = 0
    , _added = 0
    , _created = 0
    , _deleted = 0

    , _identifierPool


  EntityManager = function EntityManager()
  {
    Manager.apply(this);

    _disabled = new BitSet();

    _identifierPool = new IdentifierPool();
  }

  EntityManager.prototype = supr;

  EntityManager.prototype.createEntityInstance = function createEntityInstance()
  {
    var entity = new Entity(this.getWorld(), _identifierPool.checkOut());
    _created += 1;
    return entity;
  }

  EntityManager.prototype.added = function added( entity )
  {
    _active += 1;
    _added += 1;
    _entities[entity.getId()] = entity;
  }

  EntityManager.prototype.deleted = function deleted( entity )
  {
    var eId = entity.getId();

    delete _entities[eId];

    _disabled.clear(eId);

    _identifierPool.checkIn(eId);

    _active -= 1;
    _deleted += 1;
  }

  EntityManager.prototype.enabled = function enabled( entity )
  {
    _disabled.clear(entity.getId());
  }

  EntityManager.prototype.disabled = function disabled( entity )
  {
    _disabled.set(entity.getId());
  }

  EntityManager.prototype.isActive = function isActive( entityId )
  {
    return typeof _entities[entityId] !== 'undefined';
  }

  EntityManager.prototype.isEnabled = function isEnabled( entityId )
  {
    return !_disabled.get(entityId);
  }

  return new EntityManager()
}

function getActiveCamera()
{
  return {}
}

module.exports = exports = EntityManager;
