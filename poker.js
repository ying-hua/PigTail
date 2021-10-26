/**
 * 未完成
 * 卡牌图片读取
 */
import Sprite from "./sprite";
const POKER_IMG_PREFIX = "images/cards/suits/"
const POKER_BAKC_SRC = "images/cards/other/back.png"
const POKER_WIDTH = 52
const POKER_HEIGHT = 78
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Poker extends Sprite{
  constructor(pokerId,x = 0,y = 0,hide = 0){
    super(`${POKER_IMG_PREFIX + pokerId}.png`,POKER_WIDTH,POKER_HEIGHT,x,y)
    this.hide = hide
    this.touched = false
    this.id = pokerId
  }
  /**
   * 判断手指在不在扑克牌上
   */
  checkIsFingerOnPoker(x,y){
    const deviation = 30
    return !!(x >= this.x - deviation
            && x <= this.x + this.width + deviation
            && y >= this.y - deviation
            && y <= this.y + this.height + deviation)
  }
  /**
   * 根据手指的位置设置卡牌的位置
   * 保证手指处于卡牌中间
   * 同时限定卡牌的活动范围限制在屏幕中
   */
  setPokerPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if (disX < 0) disX = 0

    else if (disX > screenWidth - this.width) disX = screenWidth - this.width

    if (disY <= 0) disY = 0

    else if (disY > screenHeight - this.height) disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }
  render(ctx){
    if(this.hide){
      this.img.src = POKER_BAKC_SRC
    }
    else{
      this.img.src = `${POKER_IMG_PREFIX + this.id}.png`
    }
    this.drawToCanvas(ctx)
  }
}