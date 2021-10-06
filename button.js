/**
 * 未完成
 */
import Sprite from "./Sprite";

export default class Button extends Sprite{
  constructor(x,y,func,argv){  //为了方便缩放，x,y为按钮中心点
    super()
    this.touched = false
    this.banned = false
    this.event = func
    this.eventArgv = argv
    this.sx = this.x
    this.ex = this.x + this.width
    this.sy = this.y
    this.ey = this.y + this.height
  }
  /**
   * 执行按钮事件
   */
  execEvent(){
    this.event(this.eventArgv)
  }
  renderButton(){

  }
  /**
   * 判断手指在不在按钮上
   */
  checkIsFingerOnButton(x,y){}
}