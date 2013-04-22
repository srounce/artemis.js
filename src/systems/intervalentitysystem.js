var EntitySystem = require('../entitysystem')
  , supr = EntitySystem


var IntervalEntitySystem = function IntervalEntitySystem( aspect, interval )
{
  var IntervalEntitySystem
    , _since = 0
    , _interval = interval || 0

  var IntervalEntitySystem = function IntervalEntitySystem()
  {
    supr.apply(this, [aspect])
  }

  IntervalEntitySystem.prototype = new supr(aspect)

  IntervalEntitySystem.prototype.checkProcessing = function()
  {
    _since += this.world.delta
    if( _since >= _interval ) {
      _since -= _interval
      return true
    }
    return false
  }

  return new IntervalEntitySystem()

}

module.exports = IntervalEntitySystem
