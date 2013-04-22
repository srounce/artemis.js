var Aspect
  , BitSet = require('bitset')
  , ComponentType = require('./componenttype')

Aspect = function Aspect()
{
  var _allSet
    , _exclusionSet
    , _oneSet

  var Aspect = function Aspect()
  {
    _allSet = new BitSet();
    _exclusionSet = new BitSet();
    _oneSet = new BitSet();
  }

  Aspect.prototype.getAllSet = function getAllSet()
  {
    return _allSet;
  }

  Aspect.prototype.getExclusionSet = function getExclusionSet()
  {
    return _exclusionSet;
  }

  Aspect.prototype.getOneSet = function getOneSet()
  {
    return _oneSet;
  }

  Aspect.prototype.all = function all( type, types )
  {
    _allSet.set(ComponentType.getIndexFor(type));

    types.forEach(function( t, i ) {
      _allSet.set(ComponentType.getIndexFor(t));
    }.bind(this));

    return this;
  }

  Aspect.prototype.exclude = function exclude( type, types )
  {
    _exclusionSet.set(ComponentType.getIndexFor(type));

    for( var t in types ) {
      _exclusionSet.set(ComponentType.getIndexFor(t));
    }

    return this;
  }

  Aspect.prototype.one = function one( type, types )
  {
    _oneSet.set(ComponentType.getIndexFor(type));

    for( var t in types ) {
      _oneSet.set(ComponentType.getIndexFor(t));
    }

    return this;
  }

  return new Aspect();
}

Aspect.getAspectForAll = function getAspectForAll( type, types )
{
  var _types = Array.prototype.slice.call(arguments, 1)
    , aspect = new Aspect();

  aspect.all(type, _types);
  return aspect;
}

Aspect.getAspectForOne = function getAspectForOne( type, types )
{
  var _types = Array.prototype.slice.call(arguments, 1)
    , aspect = new Aspect();

  aspect.one(type, _types);
  return aspect;
}

module.exports = exports = Aspect;
