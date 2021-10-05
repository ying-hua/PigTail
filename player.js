/**
 * 未完成
 * 卡堆位置
 * 主副玩家
 */
import DataBus from "./databus"
import Sprite from "./sprite"
import CardStack from "./cardstack"
const databus = new DataBus()
export default class Player {
  constructor(plaName,primary){
    this.name = plaName
    this.profilePic = new Sprite()
    this.byAI = false
    this.yourTurn = false
    this.pokers = []
    this.pokerIcons = new Sprite()
    this.spades = new CardStack(0,0,0)
    this.hearts = new CardStack(0,0,0)
    this.clubs = new CardStack(0,0,0)
    this.diamonds = new CardStack(0,0,0)
  }
  /**
   * 翻开卡组顶部的牌，并进行同花色判断，若相同就吃牌
   */
  uncover(){
    let top = databus.cardGroup.shiftCard()
    if(this.compare(top)){
      this.eat(top)
      databus.playZone.cards.forEach((poker) =>{
        this.eat(poker)
      })
      databus.playZone.clear()
    }
    else{
      databus.playZone.addACard(top)
    }
  }
  /**
   * 出某花色的牌
   * @param {string} id 花色
   */
  playCard(id){
    let top
    if(id == 'S'){
      top = this.spades.shiftCard()
    }
    else if(id == 'H'){
      top = this.hearts.shiftCard()
    }
    else if(id == 'C'){
      top = this.clubs.shiftCard()
    }
    else if(id == 'D'){
      top = this.diamonds.shiftCard()
    }
    if(!top) return
    if(this.compare(top)){
      this.eat(top)
      databus.playZone.cards.forEach((poker) =>{
        this.eat(poker)
      })
      databus.playZone.clear()
    }
    else{
      databus.playZone.addACard(top)
    }
  }
  /**
   * 比较当前的牌和放置区顶部的牌花色是否相同
   * @param {Poker} poker 需要对比的牌
   */
  compare(poker){
    if(databus.playZone.count >= 1 && poker.id[0] == databus.playZone.strCards[0][0]){
      return true
    }
    else{
      return false
    }
  }
  /**
   * 将牌放入玩家某个花色的牌堆中
   * @param {Poker} pk 要吃的牌
   */
  eat(pk){
    let poker = pk
    let pattern = poker.id[0]
    if(pattern == 'S'){
      this.spades.addACard(poker)
    }
    else if(pattern == 'H'){
      this.hearts.addACard(poker)
    }
    else if(pattern == 'C'){
      this.clubs.addACard(poker)
    }
    else if(pattern == 'D'){
      this.diamonds.addACard(poker)
    }
  }
}