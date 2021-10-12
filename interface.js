/**
 * 未完成
 * 背景图片
 */
import Button from "./button"
import Main from "./main"
import Player from "./player"
import Sprite from "./Sprite"
const main = new Main()

export default class Interface{
  constructor(){
    this.name = 0
    this.buttons = []
    this.init()
  }
  /**
   * 初始化界面
   * @param {number} intName 
   * @param {Main} objMain 
   * @param {Player} objPlayers 
   */
  init(intName,objPlayers){
    if(this.name == 0 ){
      this.background = new Sprite()
      this.buttons[0] = new Button(0,10,10,main.initInterface.bind(main),intName)
      this.buttons[1] = null
    }
    else{}
  }
  /**
   * 渲染界面
   */
  render(ctx){
    this.background.drawToCanvas(ctx)
    this.buttons.forEach((btn) => {
      btn.drawToCanvas(ctx)
    })
  }
}