/**
 * 未完成
 * 卡堆坐标
 */
import Poker from "./poker";
import Sprite from "./sprite";
const CARDSTACK_IMG_SRC = ""
const CARDSTACK_IMG_SRC2 = ""
const CARDSTACK_WIDTH = 0
const CARDSTACK_HEIGHT = 0
//所有扑克牌种类
const stdCardId = ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','SJ','SQ','SK',
                   'H1','H2','H3','H4','H5','H6','H7','H8','H9','H10','HJ','HQ','HK',
                   'C1','C2','C3','C4','C5','C6','C7','C8','C9','C10','CJ','CQ','CK',
                   'D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','DJ','DQ','DK']

export default class CardStack extends Sprite {
  constructor(primary = 0,x = 0,y = 0){
    super(primary?CARDSTACK_IMG_SRC:CARDSTACK_IMG_SRC2,
          CARDSTACK_WIDTH,
          CARDSTACK_HEIGHT,
          x,
          y)
    this.count = 0
    //第一张牌的位置与卡堆位置的偏移量
    this.dx = (primary?0:0)
    this.cards = []
    this.strCards = []
    this.fiX = this.x + this.dx
    this.fiY = this.y
  }
  /**
   * 渲染卡堆
   */
  render(ctx){
    this.drawToCanvas(ctx)
    if(this.count >=2) this.cards[1].drawToCanvas(ctx)
    if(this.count >=1) this.cards[0].drawToCanvas(ctx)
  }
  /**
   * 添加一张牌到卡堆顶部
   * @param {Poker} poker 牌
   */
  addACard(poker){
    poker.touched = false
    poker.canBeTouched = true
    poker.x = this.fiX
    poker.y = this.fiY
    poker.visible = true
    this.cards.unshift(poker)
    this.strCards.unshift(poker.id)
    this.count++
    if(this.count >= 2){
      this.cards[1].canBeTouched = false
      this.cards[1].visible = true
    }
    if(this.count >= 3){
      this.cards[2].canBeTouched = false
      this.cards[2].visible = false
    }
  }
  /**
   * 删去卡堆顶部的牌
   */
  shiftCard(){
    let top = this.cards.shift()
    this.strCards.shift()
    this.count--
    if(this.count >= 1){
      this.cards[0].canBeTouched = true
      this.cards[0].visible = true
    }
    if(this.count >= 2){
      this.cards[1].canBeTouched = false
      this.cards[1].visible = true
    }
    return top
  }
  /**
   * 自动生成一副打乱的扑克牌
   */
  shuffle(){
    this.count = 52
    this.strCards = stdCardId
    //随机打乱顺序
    this.strCards.sort(() => {
      return (0.5-Math.random())
    })
    //通过strCards生成cards
    this.strCards.forEach((id) => {
      let poker = new Poker(id,this.fiX,this.fiY)
      poker.visible = false
      this.cards.push(poker)
    })
    this.cards[0].visible = true
    this.cards[0].canBeTouched = true
    this.cards[1].visible = true
  }
  /**
   * 清空卡堆
   */
  clear(){
    this.count = 0
    this.cards = []
    this.strCards = []
  }
}