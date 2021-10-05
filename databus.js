import CardStack from "./cardstack"

let instance
export default class DataBus {
  constructor(){
    if(instance) return instance
    instance = this
    this.reset()
  }
  //重置数据
  reset(){
    this.gameOver = false
    this.gamePaused = false
    this.whoTurn = 0
    this.cardGroup = new CardStack()
    this.playZone = new CardStack()
    this.cardGroup.shuffle()
  }
}