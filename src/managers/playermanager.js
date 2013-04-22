var Manager = require('../manager')
  , supr = new Manager()

  , util = require('util')

function PlayerManager() 
{
  var PlayerManager
    , _playerByEntity = {}
    , _entitiesByPlayer = {}

  
  PlayerManager = function PlayerManager()
  {
    Manager.apply(this)
  }

  PlayerManager.prototype = supr

  PlayerManager.prototype.setPlayer = function setPlayer( entity, player )
  {
    var entities

    _playerByEntity[e] = player
    if( _entitiesByPlayer[player] ){
      entities = _entitiesByPlayer[player]
    } else {
      entities = new Bag()
      _entitiesByPlayer[player] = entities
    }
    entities.add(e)
  }

  PlayerManager.prototype.getEntitiesOfPlayer = function getEntitiesOfPlayer( player )
  {
    if( !_entitiesByPlayer[player] ) {
      _entitiesByPlayer[player] = new Bag()
    }
    
    return _entitiesByPlayer[player];
  }

  PlayerManager.prototype.removeFromPlayer = function removeFromPlayer( entity )
  {
    var player = _playerByEntity[entity]

    if( player ) {
      _entitiesByPlayer[player] && _entitiesByPlayer[player].remove(entity)
    }
  }

  PlayerManager.prototype.getPlayer = function getPlayer( entity )
  {
    return ( _playerByEntity[entity] || null )
  }

  PlayerManager.prototype.deleted = function deleted( entity )
  {
    this.removeFromPlayer(entity);
  }

  return new PlayerManager()
}

module.exports = PlayerManager
