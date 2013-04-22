var Bag = require('./util/bag')

function IdentifierPool()
{
  var _ids = new Bag()
    , _nextAvailableId = 0

  var IdentifierPool = function IdentifierPool() { }

  IdentifierPool.prototype.checkOut = function checkOut()
  {
    if( _ids.size() > 0 ) {
      return _ids.removeLast();
    }

    return _nextAvailableId++;
  }

  IdentifierPool.prototype.checkIn = function checkIn( id )
  {
    _ids.add(id);
  }

  return new IdentifierPool();

}

module.exports = IdentifierPool;
