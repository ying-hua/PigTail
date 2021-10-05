import Interface from "./interface"
import Player from "./player"

const ctx = canvas.getContext('2d')
const databus = new DataBus()

/*
  游戏主函数
*/
export default class Main{
  constructor(){
    this.players=[]
    this.players[0] = new player()
    this.players[1] = new player()
    this.curInterface = new Interface()
    initInterface(0,this,this.players)
    initEvent()
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  /**
   * 初始化事件监听
   */
  initEvent(){
    addEventListener("touchstart",this.touchStartHandler.bind(this))
    addEventListener("touchmove",this.touchMoveHandler.bind(this))
    addEventListener("touchend",this.touchEndHandler.bind(this))
  }
  /**
   * 初始化界面
   * @param {number} name 界面名称 
   * @param {Main} objMain main对象
   * @param {Player} objPlayers 玩家对象
   */
  initInterface(name,objMain,objPlayers){
    this.curInterface.init(name,objMain,objPlayers)
  }
  /**
   * 游戏数据更新
   */
  update(){}
  /**
   * 全局渲染
   */
  render(){}
  /**
   * 渲染玩家手牌、卡组、放置区
   */
  renderGame(){}
  /**
   * 渲染玩家分数
   */
  renderScore(){}
  /**
   * 游戏主循环
   */
  loop() {
    this.update()
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  /**
   * 触摸逻辑
   */
  touchStartHandler(){}
  touchMoveHandler(){}
  touchEndHandler(){}
}