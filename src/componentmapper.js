var ComponentType = require('./componenttype');

var ComponentMapper = function ComponentMapper( type, world )
{
  var ComponentMapper
    , _type
    , _components
    , _classType
    , _world

  ComponentMapper = function ComponentMapper( type, world )
  {
    _type = ComponentType.getTypeFor(type);
    _components = world.getComponentManager().getComponentsByType(_type);
    _classType = type;
    _world = world;
  }

  ComponentMapper.prototype.get = function get( entity )
  {
    return _components.get(entity.getId());
  }

  ComponentMapper.prototype.getSafe = function( entity )
  {
    if( _components.isIndexWithinBounds(entity.getId()) ) {
      return _components.get(entity.getId());
    }

    return null;
  }

  ComponentMapper.prototype.has = function( entity )
  {
    return this.getSafe(entity) !== null;
  }

  return new ComponentMapper( type, world )
}

ComponentMapper.getFor = function getFor( type, world )
{
  return new ComponentMapper(type, world);
}

module.exports = module = ComponentMapper;
