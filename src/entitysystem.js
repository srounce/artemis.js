var EntitySystem
  , SystemIndexManager
  , BitSet = require('bitset')

EntitySystem = function EntitySystem( aspect )
{
  var EntitySystem

    , _world

    , _systemIndex

    , _actives = []
    , _aspect
    , _allSet
    , _exclusionSet
    , _oneSet

    , _passive
    , _dummy


  EntitySystem = function EntitySystem( aspect )
  {
    _aspect = aspect
    
    _allSet = _aspect.getAllSet();
    _exclusionSet = _aspect.getExclusionSet();
    _oneSet = _aspect.getOneSet();

    _dummy = !_allSet.isEmpty() && !_oneSet.isEmpty();
  }

  EntitySystem.prototype.doProcess = function()
  {
    if( this.checkProcessing() ) {
      this.begin();
      this.processEntities.call(this, _actives);
      this.end();
    }
  }

  EntitySystem.prototype.begin = function() { }

  EntitySystem.prototype.end = function() { }

  EntitySystem.prototype.added = function added( entity )
  {
    check.call(this, entity);
  }

  EntitySystem.prototype.changed = function changed( entity )
  {
    check.call(this, entity);
  }

  EntitySystem.prototype.deleted = function deleted( entity )
  {
    throw new Error('Not implemented');
  }

  EntitySystem.prototype.disabled = function disabled( entity )
  {
    if(entity.getSytemBits().get(_systemIndex)) {
      removeFromSystem(entity);
    }

    throw new Error('Not implemented');
  }

  EntitySystem.prototype.enabled = function enabled( entity )
  {
    check.call(this, entity);
  }

  EntitySystem.prototype.preInitialize = function()
  {
    _systemIndex = SystemIndexManager.getIndexFor(this);
    this.initialize();
  }

  EntitySystem.prototype.initialize = function initialize() { }

  function check( entity )
  {
    var contains
      , interested
      , componentBits

    if( _dummy ) {
      return;
    }

    contains = entity.getSystemBits().get(_systemIndex);
    interested = true; // Possibly. Lets see if this holds up to the following tests...

    componentBits = entity.getComponentBits();

    if( !_allSet.isEmpty() ) {
      for( var i = _allSet.nextSetBit(-1); i >= 0; i = _allSet.nextSetBit(i+1) ) {
        if( !componentBits.get(i) ) {
          interested = false;
          break;
        }
      }
    }

    if( !_exclusionSet.isEmpty() && interested ) {
      interested = !_exclusionSet.intersects(componentBits);
    }

    if( !_oneSet.isEmpty() ) {
      interested = !_oneSet.intersects(componentBits);
    }

    if( interested && !contains ) {
      insertToSystem.call(this, entity);
    } else if ( !interested && contains ) {
      removeFromSystem.call(this, entity);
    }
  } 

  function insertToSystem( entity )
  {
    _actives.push(entity);
    entity.getSystemBits().set(_systemIndex);
    this.onAdded(entity);
  }

  function removeFromSystem( entity )
  {
    _actives.splice(_actives.indexOf(entity), 1);
    entity.getSystemBits().clear(_systemIndex);
    this.onRemoved(entity);
  }

  EntitySystem.prototype.onAdded = function() {}
  
  EntitySystem.prototype.onRemoved = function() {}

  EntitySystem.prototype.processEntities = function( actives ) { } 

  Object.defineProperty(EntitySystem.prototype, 'world', {
    value : _world
  , writable : true
  });

  Object.defineProperty(EntitySystem.prototype, 'passive', {
    value     : _passive
  , writable  : true
  });

  return new EntitySystem( aspect );

}

SystemIndexManager = new function SystemIndexManager()
{
  var _index = -1
    , _indicies = [];

  // private static HashMap<Class<? extends EntitySystem>, Integer> indices = new HashMap<Class<? extends EntitySystem>, Integer>()

  this.getIndexFor = function( type )
  {
    var i = _indicies.indexOf(type);
    if( i === -1 ) {
      i = _index += 1;
      _indicies[i] = type;
    }
    return i;
  }
}

module.exports = EntitySystem;
