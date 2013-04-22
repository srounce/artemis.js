var ComponentManager
  , Manager = require('./manager')
  , Bag = require('./util/bag')
  , supr = new Manager();

ComponentManager = function ComponentManager()
{
  var ComponentManager
    , _componentsByType
    , _deleted = [];

  ComponentManager = function ComponentManager()
  {
    Manager.apply(this);

    _componentsByType = new Bag();
  }

  ComponentManager.prototype = supr;

  ComponentManager.prototype.addComponent = function( entity, type, component )
  {
    var components 

    _componentsByType.ensureCapacity(type.getIndex());
    components = _componentsByType.get(type.getIndex());
    if( components === null ) {
      components = new Bag();
      _componentsByType.set(type.getIndex(), components);
    }

    components.set(entity.getId(), component);

    entity.getComponentBits().set(type.getIndex());
  }

  ComponentManager.prototype.removeComponent = function( entity, type )
  {
    if( entity.getComponentBits().get(type.getIndex()) ) {
      _componentsByType.get(type.getIndex()).set(entity.getId(), null);
      entity.getComponentBits().clear(type.getIndex());
    }
  }

  ComponentManager.prototype.getComponentsFor = function getComponentsFor( entity, fillBag )
  {
    var componentBits = entity.getComponentBits();
    
    for( var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i+1) )
    {
      fillBag.add(_componentsByType.get(i).get(entity.getId()));
    }

    return fillBag;
  }

  ComponentManager.prototype.getComponentsByType = function getComponentsByType( type )
  {
    var components = _componentsByType.get(type.getIndex());
    if( components === null ) {
      components = new Bag();
      _componentsByType.set(type.getIndex(), components);
    }
    return components;
  }

  ComponentManager.prototype.deleted = function deleted( entity )
  {
    _deleted.push(entity);
  }

  ComponentManager.prototype.clean = function clean()
  {
    _deleted.forEach(processDeletedForClean.bind(this));
  }

  return new ComponentManager();
}

function processDeletedForClean( entity ) 
{
  throw new Error('Not implemented: ' + [(this.constructor.name || ''), (arguments.callee.name || '')].join('.'));
}

function removeComponentsOfEntity( entity )
{
  var componentBits = entity.getComponentBits();

  throw new Error('Not implemented: ' + [(this.constructor.name || ''), (arguments.callee.name || '')].join('.'));
}

module.exports = ComponentManager;
