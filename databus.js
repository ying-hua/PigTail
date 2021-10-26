/**
 * 已完成
 */

import CardStack from "./cardstack"
const screenWidth = window.innerWidth  //780
const screenHeight = window.innerHeight  //475.8
let instance
export default class DataBus {
  constructor(){
    if(instance) return instance
    instance = this
    this.reset()
  }
  //重置数据
  reset(){
    //游戏模式 1单机 2双人 3在线
    this.mode
    //是否为主办方
    this.host = ''
    this.requesting = false
    this.gameStarted = true
    this.gameOver = false
    this.gamePaused = false
    this.whoTurn = 0
    this.playerNames = ["player1","player2"]
    //whl  卡组、放置区位置
    this.cardGroup = new CardStack(0,screenWidth/4-12,screenHeight/2-39)
    this.playZone = new CardStack(2,screenWidth*3/4-60,screenHeight/2-50)
    this.cardGroup.shuffle()
  }
}