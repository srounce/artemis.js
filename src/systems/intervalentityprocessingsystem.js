var IntervalEntitySystem = require('./intervalentitysystem')
  , supr = IntervalEntitySystem


var IntervalEntityProcessingSystem = function IntervalEntityProcessingSystem( aspect, interval )
{
  var IntervalEntityProcessingSystem = function IntervalEntityProcessingSystem()
  {
    supr.apply(this, [aspect, interval]);
  }

  IntervalEntityProcessingSystem.prototype = new supr(aspect, interval)

  IntervalEntityProcessingSystem.prototype.process = function( entity )
  {

  }

  IntervalEntityProcessingSystem.prototype.processEntities = function( entites )
  {
    for( var key in entites ) {
      this.process(entites[key]);
    }
  }

  return new IntervalEntityProcessingSystem();
}

module.exports = IntervalEntityProcessingSystem
