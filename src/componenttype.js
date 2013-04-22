var _componentTypes = {}
  , _currentIndex = 0;

var ComponentType = function ComponentType( type )
{
  var ComponentType
    , _index
    , _type;

  ComponentType = function ComponentType( type )
  {
    _index = _currentIndex += 1;
    _type = type;
  }

  ComponentType.prototype.getIndex = function getIndex()
  {
    return _index;
  }

  ComponentType.prototype.toString = function toString()
  {
    return 'ComponentType[' + _type.name + '](' + _index + ')';
  }

  return new ComponentType(type);
}

ComponentType.getTypeFor = function( component )
{
  var t = _componentTypes[component.name];

  if( typeof t === 'undefined' ) {
    t = new ComponentType(component);
    _componentTypes[component.name] = t;
  }

  return t;
}

ComponentType.getIndexFor = function( component )
{
  return ComponentType.getTypeFor(component).getIndex();
}

module.exports = exports = ComponentType;
