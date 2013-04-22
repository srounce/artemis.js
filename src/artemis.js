var ARTEMIS = function(){}

ARTEMIS.prototype = new ARTEMIS

ARTEMIS.prototype.__proto__ = {
  Manager : require('./manager')
, ComponentManager : require('./componentmanager')
, EntityManager : require('./entitymanager')

, Aspect : require('./aspect')
, ComponentMapper : require('./componentmapper')
, ComponentType : require('./componenttype')

, Entity : require('./entity')
, EntityManager : require('./entitymanager')
, EntitySystem : require('./entitysystem')
, EntityProcessingSystem : require('./entityprocessingsystem')

, Systems : {
    IntervalEntitySystem : require('./systems/intervalentitysystem')
  , IntervalEntityProcessingSystem : require('./systems/intervalentityprocessingsystem')
  }

, Utils : {
    Bag : require('./util/bag')
  , UUID : require('./util/uuid')
  }

, World : require('./world')
}

ARTEMIS.prototype.prototype = new ARTEMIS

module.exports = new ARTEMIS
