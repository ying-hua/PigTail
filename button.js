/**
 * 未完成
 * 按钮图片，精灵类
 */
import Sprite from "./Sprite";

export default class Button extends Sprite{
  constructor(name,x,y,event){  //为了方便缩放，x,y为按钮中心点
    super()
    this.touched = false
    this.banned = false
    this.event = event
    this.eventArgv = arguments
    this.zoomRate = 0.9
    this.midX = x
    this.midY = y
    this.sx = this.x
    this.ex = this.x + this.width
    this.sy = this.y
    this.ey = this.y + this.height
  }
  /**
   * 执行按钮事件
   */
  execEvent(){
    if(this.eventArgv.length == 4){
      this.event()
    }
    else if (this.eventArgv.length == 5){
      this.event(this.eventArgv[4])
    }
  }
  renderButton(ctx){
    if(!this.touched){
      this.x = this.sx
      this.y = this.sy
      this.width = this.ex - this.sx
      this.height = this.ey - this.sy
      this.drawToCanvas(ctx)
    }
    else{
      this.x = this.x + (1-this.zoomRate)*this.width/2
      this.y = this.y + (1-this.zoomRate)*this.height/2
      this.width *= this.zoomRate
      this.height *= this.zoomRate
      this.drawToCanvas(ctx)
    }
  }
  /**
   * 判断手指在不在按钮上
   */
  checkIsFingerOnButton(x,y){
    const deviation = 30
    return !!(x >= this.sx - deviation
          && x <= this.ex + deviation
          && y >= this.sy - deviation
          && y <= this.ey + deviation)
  }
}