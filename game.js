import './libs/weapp-adapter'

//import Main from './js/main'

//new Main()


import DataBus from './databus'
import Player from './player'
import Sprite from './sprite'



//测试player类和cardstack类
/*
const db = new DataBus()
const player = new Player('aaa',0)
console.log("oringin")
console.log(db.cardGroup.strCards)
console.log(db.playZone.strCards)
for(let i = 0;i < 52;i++){
  player.uncover()
}
console.log("uncover")
console.log(db.cardGroup.strCards)
console.log(db.playZone.strCards)
console.log(player.spades.strCards)
console.log(player.hearts.strCards)
console.log(player.clubs.strCards)
console.log(player.diamonds.strCards)
player.playCard('S')
player.playCard('H')
player.playCard('C')
player.playCard('D')
console.log("playCard")
console.log(db.cardGroup.strCards)
console.log(db.playZone.strCards)
console.log(player.spades.strCards)
console.log(player.hearts.strCards)
console.log(player.clubs.strCards)
console.log(player.diamonds.strCards)
*/

/*
db.cardGroup.cards.forEach((pk) => {
  console.log(pk.id)
})
*/