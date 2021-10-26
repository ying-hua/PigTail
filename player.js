/**
 * 未完成
 * 卡堆位置
 * 主副玩家
 * 通过yourTurn渲染玩家
 */
import DataBus from "./databus"
import Sprite from "./sprite"
import CardStack from "./cardstack"
import API from "./api"
import Poker from "./poker"
const databus = new DataBus()
const api = new API()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
export default class Player {
  //flag为0表示玩家1，为1表示玩家2
  constructor(flag){
    this.flag = flag
    this.name = databus.playerNames[flag]
    this.profilePic = new Sprite()
    this.byAI = false
    this.pokerIcons = new Sprite()
    //玩家手牌数组,0,1,2,3分别为黑桃，红心，梅花，方块
    this.handCards = []
    //whl  玩家手牌位置
    //玩家1手牌
    if(!flag){
      this.handCards[0] = new CardStack(flag,screenWidth*170/780,screenHeight*240/360)
      this.handCards[1] = new CardStack(flag,screenWidth*290/780,screenHeight*240/360)
      this.handCards[2] = new CardStack(flag,screenWidth*410/780,screenHeight*240/360)
      this.handCards[3] = new CardStack(flag,screenWidth*530/780,screenHeight*240/360)
    }
    //玩具2手牌
    else{
      this.handCards[0] = new CardStack(flag,screenWidth*170/780,screenHeight*20/360)
      this.handCards[1] = new CardStack(flag,screenWidth*290/780,screenHeight*20/360)
      this.handCards[2] = new CardStack(flag,screenWidth*410/780,screenHeight*20/360)
      this.handCards[3] = new CardStack(flag,screenWidth*530/780,screenHeight*20/360)
    }

  }
  /**
   * 翻开卡组顶部的牌，并进行同花色判断，若相同就吃牌
   */
  uncover(pokerId){
    if(databus.cardGroup.count == 0) return
    let top = databus.cardGroup.shiftCard()
    if(databus.mode == 2){
      top = new Poker(pokerId,0,0,0)
    }
    top.hide = 0
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
      top = this.handCards[0].shiftCard()
    }
    else if(id == 'H'){
      top = this.handCards[1].shiftCard()
    }
    else if(id == 'C'){
      top = this.handCards[2].shiftCard()
    }
    else if(id == 'D'){
      top = this.handCards[3].shiftCard()
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
      this.handCards[0].addACard(poker)
    }
    else if(pattern == 'H'){
      this.handCards[1].addACard(poker)
    }
    else if(pattern == 'C'){
      this.handCards[2].addACard(poker)
    }
    else if(pattern == 'D'){
      this.handCards[3].addACard(poker)
    }
  }
}