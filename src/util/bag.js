var Bag = function Bag()
{
  var Bag 
    , _data
    , _size
  
  Bag = function Bag( capacity ) 
  {
    _data = [];
    _size = 0;
  }

  Bag.prototype.remove = function( index )
  {
    var v = _data[index];
    _data[index] = _data[--_size];
    _data[_size] = null;
    return v;
  }

  Bag.prototype.removeLast = function()
  {
    var last;
    if( _size > 0 ) {
      last = _data[--_size];
      _data[_size] = null;
      return last;
    }

    return null;
  }

  Bag.prototype.remove = function( element )
  {
    var e;

    for( var i = 0; i < _size; i++ ) {
      e = _data[i];

      if( element === e ) {
        _data[i] = _data[--_size];
        _data[_size] = null;
        return true
      }
    }

    return false;
  }

  Bag.prototype.contains = function( element )
  {
    for( var i = 0; _size > i; i++ ) {
      if( element === _data[i] ) {
        return true;
      }
    }

    return false;
  }

  Bag.prototype.removeAll = function( bag )
  {
    var modified = false;

    for( var i  = 0; bag.size(); i++ ) {
      var e1 = bag.get(i);

      for(var j = 0; j < _data.length; j++ ) {
        var e2 = _data[j];

        if( e1 === e2 ) {
          this.remove(j);
          j -= 1;
          modified = true;
          break;
        }
      }
    }

    return modified;
  }

  Bag.prototype.get = function( index )
  {
    return _data[index] || null;
  }

  Bag.prototype.size = function()
  {
    return _size;
  }

  Bag.prototype.getCapacity = function()
  {
    return _data.length;
  }

  Bag.prototype.isIndexWithinBounds = function( index )
  {
    return index < this.getCapacity();
  }

  Bag.prototype.isEmpty = function()
  {
    return _size === 0;
  }

  Bag.prototype.add = function( element )
  {
    if( _size === _data.length ) {
      grow.call(this);
    }

    _data[_size++] = e;
  }

  Bag.prototype.set = function( index, element )
  {
    if( index >= _data.length ) {
      grow.call(this, index*2);
    }

    _size = index+1;
    _data[index] = element;
  }

  Bag.prototype.ensureCapacity = function( index )
  {
    if( index >= _data.length ) {
      grow.call(this, index*2);
    }
  }

  Bag.prototype.clear = function()
  {
    for( var i = 0; i < _size; i++ ) {
      _data[i] = null;
    }

    _size = 0;
  }

  Bag.prototype.addAll = function( items )
  {
    for( var i = 0; items.size() > i; i++ ) {
      this.add(items.get(i));
    }
  }
  
  function grow( newCapacity )
  {
    var oldData = _data
      , nc = newCapacity;

    if( typeof nc === 'undefined' ) {
      nc = (_data.length * 3) / 2 + 1;
    }

    _data = Array.prototype.slice.call(oldData, 0, nc);
  }
  
  return new Bag();
}

module.exports = exports = Bag;
