import Main from "./main"
import Player from "./player"
import Sprite from "./Sprite"

export default class Interface{
  constructor(){
    this.name = 0
    this.buttons = []
    this.main = null
    this.players = null
    this.aniId = 0
    this.init()
  }
  /**
   * 初始化界面
   * @param {number} intName 
   * @param {Main} objMain 
   * @param {Player} objPlayers 
   */
  init(intName = 0,objMain,objPlayers){
    if(this.name == 0 ){
      this.background = new Sprite()
      this.buttons[0] = null
      this.buttons[1] = null
    }
    else{}
  }
  /**
   * 渲染界面
   */
  renderInterface(){}
}