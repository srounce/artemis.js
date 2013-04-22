var EntityManager = require('./entitymanager')
  , ComponentManager = require('./componentmanager')

var World = function()
{
  var World

    , _delta = 0
    , _added = []
    , _changed = []
    , _deleted = []
    , _enable = []
    , _disable = []

    , _managers = []
    , _managersMap = {}
    , _systems = []
    , _systemsMap = {}

    , _entityMgr
    , _componentMgr;
    
  World = function World()
  {
    _entityMgr = new EntityManager();
    this.setManager(_entityMgr);

    _componentMgr = new ComponentManager();
    this.setManager(_componentMgr);
  }

  World.prototype.createEntity = function createEntity()
  {
    return _entityMgr.createEntityInstance();
  }

  World.prototype.getEntity = function getEntity( id )
  {
    return _entityMgr.getEntity(id);
  }

  World.prototype.addEntity = function addEntity( entity )
  {
    _added.push(entity);
  }

  World.prototype.changedEntity = function changedEntity( entity )
  {
    _changed.push(entity);
  }

  World.prototype.deleteEntity = function removeEntity( entity )
  {
    if( _deleted.indexOf(entity) < 0 ) {
      _deleted.push(entity);
    }
  }

  World.prototype.disable = function disable( entity )
  {
    _disable.push(entity);
  }

  World.prototype.enable = function enable( entity )
  {
    _enable.push(entity);
  }

  World.prototype.getManager = function getManager( type )
  {
    return _managersMap[type];
  }

  World.prototype.setManager = function setManager( manager )
  {
    manager.setWorld(this);
    _managersMap[manager.type] = manager;
    _managers.push(manager);
    return manager;
  }

  Object.defineProperty(World.prototype, 'systems', {
    value : _systems
  });

  World.prototype.setSystem = function setSystem( system, passive )
  {
    var isPassive = passive || false;

    system.world = this;
    system.passive = isPassive;

    _systemsMap[system.name] = system;
    _systems.push(system);

    return system;
  }

  World.prototype.deleteSystem = function deleteSystem( system )
  {
    delete _systemsMap[system.name];
    _systems.splice(_systems.indexOf(system), 1);
  }

  World.prototype.deleteManager = function deleteManager( manager )
  {
    var key = Object.keys(_managersMap).filter(function( key ) {
      return obj[key] === manager;
    })[0];

    delete _managersMap[key];
    _managers.splice(_managers.indexOf(manager), 1);
  }

  World.prototype.check = function check( entities, fn )
  {
    if( Boolean(entities.length) ) {
      for( var eKey in entities ) {
        var entity = entities[eKey];
        notifyManagers(fn, entity);
        notifySystems(fn, entity);
      }

      for( var e in entities ) {
        delete entities[e];
      }
    }
  }

  World.prototype.process = function process()
  {
    this.check(_added, function( observer, entity ) {
      observer.added(entity);
    });

    this.check(_changed, function( observer, entity ) {
      observer.changed(entity);
    });

    this.check(_disable, function( observer, entity ) {
      observer.disabled(entity);
    });

    this.check(_enable, function( observer, entity ) {
      observer.enable(entity);
    });

    this.check(_deleted, function( observer, entity ) {
      observer.deleted(entity);
    });

    _componentMgr.clean();

    for( var sysKey in _systems ) {
      sys = _systems[sysKey];
      if( !sys.passive ) {
        sys.doProcess();
      }
    }
  }

  World.prototype.initialize = function initialize()
  {
    _managers.forEach(function( mgr ) {
      mgr.preInitialize();
    })

    _systems.forEach(function( system ) {
      system.preInitialize();
    })
  }

  World.prototype.getComponentManager = function getComponentManager()
  {
    return _componentMgr;
  }

  World.prototype.getEntityManager = function getEntityManager()
  {
    return _entityMgr;
  }

  Object.defineProperty(World.prototype, 'delta', {
    value : _delta
  , writable : true
  })

  return new World();

  function notifySystems( fn, entity )
  {
    for( var key in _systems ) {
      fn(_systems[key], entity);
    }
  }

  function notifyManagers( fn, entity )
  {
    for( var key in _managers ) {
      fn(_managers[key], entity);
    }
  }
}

module.exports = World;
