/**
 * 未完成
 * 按钮图片，精灵类
 */
import Sprite from "./sprite";
const screenWidth = window.innerWidth  //780
const screenHeight = window.innerHeight  //475.8
const BUTTON_IMG_SRC = "images/buttons/"
//按钮名称映射
const __ = {
  "single":0,
  "multi":1,
  "online":2,
  "surrender":3,
  "return":4,
  "tip":5,
  "title":6,
  "returnOnEnd":7,
  "openAI1":8,
  "closeAI1":9,
  "openAI2":10,
  "closeAI2":11,
  "returnOnTuto":12,
  "createGame":13,
  "joinGame":14,
  "confirmOnJoin":15,
  "login":16,
  "confirmOnPause":17,
  "returnOnPause":18,
  "inputId":19,
  "inputPassword":20,
  "inputUuid":21
}
//whl 按钮坐标和大小
const BUTTON_WIDTH = [83,83,83,60,54,42,120,66,40,40,40,40,54,146,146,92,92,50,50,110,168,160]
const BUTTON_HEIGHT = [241,241,241,34,54,42,222,66,40,40,40,40,54,213,213,40,40,50,50,30,30,30]
const BUTTON_X = [
  screenWidth*300/780,
  screenWidth*450/780,
  screenWidth*600/780,
  screenWidth*700/780,
  0,  //return
  screenWidth*6/780,
  screenWidth*115/780,
  screenWidth/2-33,
  screenWidth*7/8,
  screenWidth*7/8,
  screenWidth/8,
  screenWidth/8,
  0,  //12
  screenWidth*(240)/780,
  screenWidth*(400)/780,
  screenWidth/2 - 40,
  screenWidth/2 - 40,
  screenWidth/2,
  screenWidth/2,
  screenWidth/2 - 45,
  screenWidth/2 - 45,
  screenWidth/2 - 82
]
const BUTTON_Y = [
  screenHeight*75/360,
  screenHeight*75/360,
  screenHeight*75/360,
  screenHeight*160/360,
  screenHeight*25/780,//return
  screenHeight*92/780,
  screenHeight*181/780,
  screenHeight*4/5,
  screenHeight*3/4,
  screenHeight*3/4,
  screenHeight/8,
  screenHeight/8,
  screenHeight*25/780,  //12
  screenHeight*74/360,
  screenHeight*74/360,
  screenHeight*2/3 - 8,
  screenHeight*2/3 - 8, //16
  screenHeight/8,
  screenHeight/8,
  screenHeight/2 - 40,
  screenHeight/2 + 3,
  screenHeight/2 - 10
]
export default class Button extends Sprite{
  /**
   * 
   * @param {*} name name:按钮名称 
   * @param {*} x x,y:按钮中心坐标
   * @param {*} y 
   * @param {*} event 按钮执行的事件回调函数,后面可继续追加回调函数的参数
   */
  constructor(name,event){
    super(BUTTON_IMG_SRC+name+".png",BUTTON_WIDTH[__[name]],BUTTON_HEIGHT[__[name]],BUTTON_X[__[name]],BUTTON_Y[__[name]])
    this.touched = false
    this.event = event
    this.eventArgv = arguments
    //按钮缩放率，title不缩放
    this.zoomRate = 0.97
    if(name == 'title') this.zoomRate = 1
    this.midX = BUTTON_X[name]+BUTTON_WIDTH[name]/2
    this.midY = BUTTON_Y[name]+BUTTON_HEIGHT[name]/2
    this.sx = this.x
    this.ex = this.x + this.width
    this.sy = this.y
    this.ey = this.y + this.height
    this.smallX = this.x + (1-this.zoomRate)*this.width/2
    this.smallY = this.y + (1-this.zoomRate)*this.height/2
    this.smallWidth = this.width*this.zoomRate
    this.smallHeight = this.height*this.zoomRate
  }
  /**
   * 未完成
   * 执行按钮事件
   */
  execEvent(){
    if(this.eventArgv.length == 2){
      this.event()
    }
    else if (this.eventArgv.length == 3){
      this.event(this.eventArgv[2])
    }
    else if(this.eventArgv.length == 4){
      this.event(this.eventArgv[2],this.eventArgv[3])
    }
    else if(this.eventArgv.length == 5){
      this.event(this.eventArgv[2],this.eventArgv[3],this.eventArgv[4])
    }
    else if(this.eventArgv.length == 6){
      this.event(this.eventArgv[2],this.eventArgv[3],this.eventArgv[4],this.eventArgv[5])
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
      this.x = this.smallX
      this.y = this.smallY
      this.width = this.smallWidth
      this.height = this.smallHeight
      this.drawToCanvas(ctx)
    }
  }
  /**
   * 判断手指在不在按钮上
   */
  checkIsFingerOnButton(x,y){
    const deviation = 10
    return !!(x >= this.sx - deviation
          && x <= this.ex + deviation
          && y >= this.sy - deviation
          && y <= this.ey + deviation)
  }
}