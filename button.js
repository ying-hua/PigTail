import Sprite from "./Sprite";

export default class Button extends Sprite{
  constructor(func,argv){
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
}