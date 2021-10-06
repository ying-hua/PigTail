/**
 * 未完成
 * 卡牌图片读取
 */
import Sprite from "./sprite";
const POKER_WIDTH = 0
const POKER_HEIGHT = 0

export default class Poker extends Sprite{
  constructor(pokerId,x = 0,y = 0){
    super("",POKER_WIDTH,POKER_HEIGHT,x,y)
    this.touched = false
    this.canBeTouched = false
    this.id = pokerId
  }
  /**
   * 判断手指在不在扑克牌上
   */
  checkIsFingerOnPoker(x,y){}
}