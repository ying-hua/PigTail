/**
 * 已完成
 */
import API from "./api"
import DataBus from "./databus"
import Player from "./player"
const databus = new DataBus()
const api = new API()
const PLAY_WHEN_SAFE = 0
const BRAVERY = 0.8
//花色id映射
const PATTERN_ID = {'S':0,'H':1,'C':2,'D':3}
let instance
export default class AI{
  constructor(){
    if(instance) return instance
    instance = this
  }
  /**
   * AI自动选择操作
   * 先计算当前局面的信息
   * 再计算风险值
   * 通过风险值来决定出牌和翻牌的概率
   */
  autoPlay(self,oppo,main){
    //自己的卡牌数量
    let selfCount = 0
    self.handCards.forEach((cards) => {
      selfCount += cards.count
    })
    //对手的卡牌数量
    let oppoCount = 0
    oppo.handCards.forEach((cards) => {
      oppoCount += cards.count
    })
    //放置区的卡牌数量
    let playCount = databus.playZone.count
    //卡组的卡牌数量
    let groupCount = 52 - (selfCount + oppoCount + playCount)
    //必胜局面只翻牌
    if(oppoCount >= 2*groupCount + playCount + selfCount -1){
      if(databus.mode == 2){
        databus.requesting = true
        api.executeOp(main,main.token,main.uuid,0)
      }
      else{
        self.uncover()
      }
    }
    //一般局面
    else{
      let risk = (selfCount + playCount + 1) / (oppoCount + groupCount -1)
      //局面安全
      if(risk < BRAVERY){
        if(Math.random() <= PLAY_WHEN_SAFE){
          this.playCardSafely(self,main)
        }
        else{
          if(databus.mode == 2){
            databus.requesting = true
            api.executeOp(main,main.token,main.uuid,0)
          }
          else{
            self.uncover()
          }
        }
      }
      //局面危险
      else if(risk >= 1){
        this.playCardSafely(self,main)
      }
      //既不安全也不危险
      else{
        if(BRAVERY == 1) return
        let possibilityOfPlay = PLAY_WHEN_SAFE + (risk - BRAVERY)*(1 - PLAY_WHEN_SAFE)/(1 - BRAVERY)
        if(Math.random() <= possibilityOfPlay){
          this.playCardSafely(self,main)
        }
        else{
          if(databus.mode == 2){
            databus.requesting = true
            api.executeOp(main,main.token,main.uuid,0)
          }
          else{
            self.uncover()
          }
        }
      }
    }
  }
  /**
   * 在不吃牌的前提下出数量最多的牌
   * 否则翻牌
   * @param {Player} self self:玩家
   */
  playCardSafely(self,main){
    let topId = ""
    if(databus.playZone.count >= 1){
      topId = databus.playZone.strCards[0][0]
    }
    //如果有牌可出就出花色最多的牌
    if(this.canPlay(self,topId)){
      if(databus.mode == 2){
        databus.requesting = true
        api.executeOp(
          main,
          main.token,
          main.uuid,
          1,
          self.handCards[PATTERN_ID[this.maxPattern(self,topId)]].strCards[0]
        )
        console.log(PATTERN_ID[this.maxPattern(self,topId)])
      }
      else{
        self.playCard(this.maxPattern(self,topId))
      }
    }
    //无牌可出就翻牌
    else{
      if(databus.mode == 2){
        databus.requesting = true
        api.executeOp(main,main.token,main.uuid,0)
      }
      else{
        self.uncover()
      }
    }
  }
  /**
   * 判断在不吃牌的前提下是否可以出牌
   * @param {Player} self self:玩家
   * @param {string} id id:放置区顶部牌花色
   */
  canPlay(self,id){
    let counts = [
      self.handCards[0].count,
      self.handCards[1].count,
      self.handCards[2].count,
      self.handCards[3].count]
    //保证出的牌花色与放置区顶部的牌花色不同
    if(id == 'S'){
      counts.splice(0,1)
    }
    else if(id == 'H'){
      counts.splice(1,1)
    }
    else if(id == 'C'){
      counts.splice(2,1)
    }
    else if(id == 'D'){
      counts.splice(3,1)
    }
    //如果counts数组中有>=1的值返回true
    if(counts.some((count) => {
      return count >= 1
    })) return true
    else return false
  }
  /**
   * 返回最大数量花色
   * @param {*} self 玩家
   * @param {*} topId 放置区顶部牌花色
   */
  maxPattern(self,topId){
    let idCount = [
      {id:'S',count:self.handCards[0].count},
      {id:'H',count:self.handCards[1].count},
      {id:'C',count:self.handCards[2].count},
      {id:'D',count:self.handCards[3].count}
    ]
    if(topId == 'S'){
      idCount.splice(0,1)
    }
    else if(topId == 'H'){
      idCount.splice(1,1)
    }
    else if(topId == 'C'){
      idCount.splice(2,1)
    }
    else if(topId == 'D'){
      idCount.splice(3,1)
    }
    //以count值降序排序
    idCount.sort((a,b) => {
      return b["count"] - a["count"]
    })
    return idCount[0]["id"]
  }
}