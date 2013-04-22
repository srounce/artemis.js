var Manager = function Manager()
{
  var _world = null;

  var Manager = function Manager()
  {

  }

  Manager.prototype.initialize = function initialize() { }

  Manager.prototype.preInitialize = function preInitialize() {
    this.initialize();
  }

  Manager.prototype.setWorld = function setWorld( world )
  {
    _world = world;
  }

  Manager.prototype.getWorld = function getWorld()
  {
    return _world;
  }

  Manager.prototype.added = function added( entity ) { }

  Manager.prototype.changed = function changed( entity ) { }

  Manager.prototype.deleted = function deleted( entity ) { }

  Manager.prototype.enabled = function enabled( entity ) { }

  Manager.prototype.disabled = function disabled( entity ) { }

  return new Manager();

}

module.exports = Manager;
