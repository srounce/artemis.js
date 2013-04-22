var EntitySystem = require('./entitysystem')


function EntityProcessingSystem( aspect )
{
  function EntityProcessingSystem( aspect )
  {
    EntitySystem.apply(this, [aspect]);
  }

  EntityProcessingSystem.prototype = new EntitySystem( aspect )

  EntityProcessingSystem.prototype.checkProcessing = function()
  {
    return true;
  }

  EntityProcessingSystem.prototype.processEntities = function( entites )
  {
    for( var key in entites ) {
      this.process(entites[key]);
    }
  }

  return new EntityProcessingSystem( aspect )

}

module.exports = exports = EntityProcessingSystem;
