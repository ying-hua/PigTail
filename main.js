/**
 * 游戏主函数
 * 未完成
 * update,托管，接口
 */
import Interface from "./interface"
import Player from "./player"
import DataBus from "./databus"
import Sprite from "./sprite"
import AI from "./ai"
import API from "./api"

const ctx = canvas.getContext('2d')
const databus = new DataBus()
const api = new API()
//花色映射
const PATTERNS = ['S','H','C','D']
const PLAYER_BOX_SRC = "images/cards/other/box.png"
const ZONE_BOX_SRC = "images/cards/other/place_zone.png"
const screenWidth = window.innerWidth  //780
const screenHeight = window.innerHeight  //475.8
/*
  游戏主函数
*/
export default class Main{
  constructor(){
    this.initMain()
  }
  /**
   * 初始化main
   */
  initMain(){
    this.players=[]
    this.studentId = "031902207"
    this.password = "hxc241518"
    this.token = ""
    this.uuid = "anuashHsn9as"
    this.apiRes = null
    this.curInterface = new Interface()
    this.bindLoop = this.loop.bind(this)
    this.initInterface(0,this)
    addEventListener("touchstart",this.touchStartHandler.bind(this))
    addEventListener("touchmove",this.touchMoveHandler.bind(this))
    addEventListener("touchend",this.touchEndHandler.bind(this))
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  /**
   * 初始化界面
   * 界面名称用数字表示
   * 0：初始界面
   * 1：游戏中界面
   * 2：游戏规则界面
   * 3: 游戏结束界面
   * 4: 游戏暂停界面
   * 5: 
   * @param {number} name 界面名称
   * @param {Main} objMain main对象
   */
  initInterface(name,objMain){
    if(name != 1){
      databus.gameStarted = false
    }
    this.curInterface = new Interface()
    this.curInterface.init(name,objMain)
  }
  /**
   * 初始化游戏数据
   * 清空玩家手牌
   */
  initGame(){
    databus.reset()
    this.curPoker = null
    this.players[0] = new Player(0)
    this.players[1] = new Player(1)
    this.ai = new AI()
    this.initBox()
    if(databus.mode == 0){
      this.players[1].byAI = true
    }
  }
  /**
   * 等待玩家
   */
  waitPlayer(){
    //等待玩家界面
    if(this.curInterface.name != 6) return
    if(databus.requesting) return
    if(!!this.apiRes){
      //console.log(this.apiRes.data.code)
      databus.requesting = false
      //等待玩家成功 ，加入游戏
      if(this.apiRes.data.code == "200"
        && this.apiRes.data.data.last_code == ''){
        this.initInterface.bind(this)(1,this)
        this.initGame.bind(this)()
        databus.mode = 2
        databus.host = '1'
        this.curInterface.buttons[1].visible = false
        this.curInterface.buttons[2].visible = false
        this.curInterface.buttons[3].visible = false
      }
      this.apiRes = null
    }
    else{
      databus.requesting = true
      api.getLastOp(this.token,this.uuid,this)
    }
  }
  /**
   * 游戏进行时获取玩家操作
   */
  getPlayerOp(){
    if(this.curInterface.name != 1) return
    if(databus.requesting) return
    if(databus.whoTurn == 0) return
    if(!!this.apiRes){
      //console.log(this.apiRes.data.code)
      //对手出了牌
      if(!!this.apiRes.data.data.last_code
        && this.apiRes.data.data.last_code[0] == databus.host){
        databus.whoTurn = 0
        //对手出牌
        let lastOp = this.apiRes.data.data.last_code.split(" ")
        if(lastOp[1] == '0'){
          this.players[1].uncover(lastOp[2])
        }
        else if(lastOp[1] == '1'){
          this.players[1].playCard(lastOp[2][0])
        }
      }
      this.apiRes = null
    }
    //若apiRes为空则获取操作
    else{
      databus.requesting = true
      api.getLastOp(this.token,this.uuid,this)
    }
  }
  /**
   * 游戏数据更新
   */
  update(){
    if(!databus.gameStarted || databus.gameOver || databus.gamePaused) return
    //游戏结束判断
    if(databus.cardGroup.count == 0){
      databus.gameOver = true
      this.initInterface(3,this)
    }
    //AI自动出牌
    if(databus.whoTurn == 0){
      if(this.players[0].byAI){
        if(databus.whoTurn == 1)
          databus.whoTurn = 0
        else 
          databus.whoTurn = 1
        this.ai.autoPlay(this.players[0],this.players[1],this)
      }
    }
    else{
      if(this.players[1].byAI){
        if(databus.whoTurn == 1)
          databus.whoTurn = 0
        else 
          databus.whoTurn = 1
        this.ai.autoPlay(this.players[1],this.players[0],this)
      }
    }
    
  }
  /**
   * 全局渲染
   */
  render(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.curInterface.render(ctx)
    if(databus.gameStarted && !databus.gameOver && !databus.gamePaused){
      this.renderBox(ctx)
      this.renderCards(ctx)
      this.renderCounts(ctx)
    }
    //渲染输入的学号密码
    if(this.curInterface.name == 4){
      ctx.fillStyle = '#000000'
      ctx.font = '18px italic'
      //学号
      ctx.fillText(
        this.studentId,
        screenWidth/2 - 40,
        screenHeight/2 - 15
      )
      //密码
      ctx.fillText(
        this.password,
        screenWidth/2 - 40,
        screenHeight/2 + 25
      )
    }
    //等待界面渲染uuid
    if(this.curInterface.name == 6){
      ctx.fillStyle = '#000000'
      ctx.font = '18px italic'
      //uuid
      ctx.fillText(
        this.uuid,
        screenWidth/2 - 80,
        screenHeight/2 - 10
      )
    }
    //加入房间界面渲染输入的uuid
    if(this.curInterface.name == 7){
      ctx.fillStyle = '#000000'
      ctx.font = '18px italic'
      //uuid
      ctx.fillText(
        this.uuid,
        screenWidth/2 - 80,
        screenHeight/2 + 10
      )
    }
    //渲染游戏结束时的文本
    if(databus.gameOver && this.curInterface.name == 3){
      //计算玩家的卡牌数量
      let count1 = 0
      let count2 = 0
      for(let i = 0 ; i < 4 ; i++){
        count1 += this.players[0].handCards[i].count
        count2 += this.players[1].handCards[i].count
      }
      //whl  游戏结束时渲染的文本
      ctx.fillStyle = '#ffff00'
      ctx.font = '26px italic'
      //玩家1名字
      ctx.fillText(
        this.players[0].name,
        screenWidth/4-10,
        screenHeight/2-20
      )
      //玩具2名字
      ctx.fillText(
        this.players[1].name,
        screenWidth*3/4-66,
        screenHeight/2-20
      )
      //玩家1手牌数量
      ctx.fillText(
        '还剩'+count1+'张牌',
        screenWidth/4-24,
        screenHeight/2+76
      )
      //玩具2手牌数量
      ctx.fillText(
        '还剩'+count2+'张牌',
        screenWidth*3/4-80,
        screenHeight/2+76
      )
      //玩家1获胜时打印
      if(count1 < count2){
        ctx.fillText(
          '胜利!',
          screenWidth/4,
          screenHeight/4
        )
        ctx.fillText(
          '失败...',
          screenWidth*3/4-55,
          screenHeight/4
        )
      }
      //玩具2胜利时打印
      else if(count1 > count2){
        ctx.fillText(
          '失败...',
          screenWidth/4,
          screenHeight/4
        )
        ctx.fillText(
          '胜利!',
          screenWidth*3/4-55,
          screenHeight/4
        )
      }
      //平局时打印
      else{
        ctx.fillText(
          '平局',
          screenWidth/2-28,
          screenHeight/4
        )
      }
    }
  }
  /**
   * 渲染玩家手牌、卡组、放置区
   * 和正在被触摸的牌
   */
  renderCards(ctx){
    databus.cardGroup.render(ctx)
    databus.playZone.render(ctx)

    this.players[0].handCards.forEach((cards) => {
      cards.render(ctx)
    })
    this.players[1].handCards.forEach((cards) => {
      cards.render(ctx)
    })
    if(!!this.curPoker){
      this.curPoker.drawToCanvas(ctx)
    }
  }
  /**
   * 渲染卡牌数量
   */
  //whl
  renderCounts(ctx){
    ctx.fillStyle = '#faff00'
    ctx.font = '20px italic'
    if(databus.cardGroup.count > 0){
      ctx.fillText(
        databus.cardGroup.count,
        databus.cardGroup.fiX+19,//13,74
        databus.cardGroup.fiY+45
      )
    }
    if(databus.playZone.count > 0){
      ctx.fillText(
        databus.playZone.count,
        databus.playZone.fiX+19,
        databus.playZone.fiY+45
      )
    }
    this.players[0].handCards.forEach((cards) => {
      if(cards.count > 0){
        ctx.fillText(
          cards.count,
          cards.fiX + 19,
          cards.fiY + 45
        )
      }
    })
    this.players[1].handCards.forEach((cards) => {
      if(cards.count > 0){
        ctx.fillText(
          cards.count,
          cards.fiX + 19,
          cards.fiY + 45
        )
      }
    })
  }
  /**
   * 渲染放牌的盒子
   * @param {*} ctx 
   */
  renderBox(ctx){
    this.box.forEach((eachBox) => {
      eachBox.drawToCanvas(ctx)
    })
  }
  /**
   * 初始化放牌的盒子
   */
  initBox(){
    this.box = []
    //whl  盒子大小和位置
    this.box[0] = new Sprite(
      ZONE_BOX_SRC,
      80,
      100,
      databus.playZone.x - 12,
      databus.playZone.y - 12)
    this.players[0].handCards.forEach((cards,i) => {
      this.box[i+1] = new Sprite(
        PLAYER_BOX_SRC,
        80,
        100,
        cards.x - 12,
        cards.y - 12)
    })
    this.players[1].handCards.forEach((cards,i) => {
      this.box[i+5] = new Sprite(
        PLAYER_BOX_SRC,
        80,
        100,
        cards.x - 15,
        cards.y - 10)
    })
  }
  /**
   * 游戏主循环
   */
  loop() {
    this.update()
    this.render(ctx)
    this.waitPlayer()
    this.getPlayerOp()
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  /**
   * 触摸开始逻辑
   * 手指触摸屏幕时触发
   */
  touchStartHandler(e){
    e.preventDefault()
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    //监听界面中的所有可见按钮，被触摸时touched为1
    for(let i = 0;i < this.curInterface.buttons.length;i++){
      if(this.curInterface.buttons[i].visible
         && this.curInterface.buttons[i].checkIsFingerOnButton(x,y)){
        this.curInterface.buttons[i].touched = true
        break
      }
    }
    //如果游戏进行中则监听卡牌，卡牌可见且被触摸时touched为1，并使手指位于卡牌中心
    if(this.curInterface.name != 1) return
    //监听卡组第一张牌
    if(databus.whoTurn == 0 || databus.mode != 2){
      if(databus.cardGroup.count
        && databus.cardGroup.cards[0].visible
        && databus.cardGroup.cards[0].checkIsFingerOnPoker(x,y)){
        databus.cardGroup.cards[0].touched = true
        this.curPoker = databus.cardGroup.cards[0]
        databus.cardGroup.cards[0].setPokerPosAcrossFingerPosZ(x,y)
      }
    }
    //根据whoTurn监听两玩家四种花色手牌第一张
    if(databus.whoTurn == 0){
      for(let i = 0; i < 4; i++){
        if(this.players[0].handCards[i].count
          && this.players[0].handCards[i].cards[0].visible
          && this.players[0].handCards[i].cards[0].checkIsFingerOnPoker(x,y)){
            this.players[0].handCards[i].cards[0].touched = true
            this.curPoker = this.players[0].handCards[i].cards[0]
            this.players[0].handCards[i].cards[0].setPokerPosAcrossFingerPosZ(x,y)
            break
          }
      }
    }
    //非在线模式监听玩家2
    else if(databus.mode != 2){
      for(let i = 0; i < 4; i++){
        if(this.players[1].handCards[i].count
          && this.players[1].handCards[i].cards[0].visible
          && this.players[1].handCards[i].cards[0].checkIsFingerOnPoker(x,y)){
            this.players[1].handCards[i].cards[0].touched = true
            this.curPoker = this.players[1].handCards[i].cards[0]
            this.players[1].handCards[i].cards[0].setPokerPosAcrossFingerPosZ(x,y)
            break
          }
      }
    }
  }
  /**
   * 触摸位移逻辑
   * 触摸在屏幕上的手指移动时触发
   * @param {*} e 
   */
  touchMoveHandler(e){
    e.preventDefault()
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    //监听所有按钮，若手指移出按钮范围，则松开按钮
    for(let i = 0;i < this.curInterface.buttons.length;i++){
      if(this.curInterface.buttons[i].visible
        && this.curInterface.buttons[i].touched
        && !this.curInterface.buttons[i].checkIsFingerOnButton(x,y)){
        this.curInterface.buttons[i].touched = false
      }
    }
    //游戏进行时监听卡牌，使卡牌跟随手指移动，并使手指位于卡牌中间
    if(this.curInterface.name != 1) return
    //监听卡组
    if(databus.cardGroup.count
      && databus.cardGroup.cards[0].touched){
      databus.cardGroup.cards[0].setPokerPosAcrossFingerPosZ(x,y)
    }
    //监听玩家手牌
    if(databus.whoTurn == 0){
      for(let i = 0; i < 4; i++){
        if(!this.players[0].handCards[i].count
          || !this.players[0].handCards[i].cards[0].touched) continue
        this.players[0].handCards[i].cards[0].setPokerPosAcrossFingerPosZ(x,y)
      }
    }
    else{
      for(let i = 0; i < 4; i++){
        if(!this.players[1].handCards[i].count
          || !this.players[1].handCards[i].cards[0].touched) continue
        this.players[1].handCards[i].cards[0].setPokerPosAcrossFingerPosZ(x,y)
      }
    }
  }
  /**
   * 触摸结束逻辑
   * 手指从屏幕上拿开时触发
   */
  touchEndHandler(){
    //清除当前触摸的卡牌
    this.curPoker = null
    //执行触摸的按钮事件
    for(let i = 0;i < this.curInterface.buttons.length;i++){
      if(this.curInterface.buttons[i].touched){
        this.curInterface.buttons[i].touched = false
        this.curInterface.buttons[i].execEvent()
      }
    }
    //游戏进行时监听卡牌
    if(this.curInterface.name != 1) return
    //监听卡组，若卡组的牌碰到放置区，则根据whoTurn使玩家执行翻牌操作
    if(databus.cardGroup.count
      && databus.cardGroup.cards[0].touched){
      databus.cardGroup.cards[0].touched = false
      //碰到放置区
      if(databus.cardGroup.cards[0].isCollideWith(databus.playZone)){
        if(databus.whoTurn == 0){
          //在线模式发送请求
          if(databus.mode == 2){
            databus.requesting = true
            api.executeOp(this,this.token,this.uuid,0)
          }
          //非在线模式直接翻牌
          else{
            this.players[0].uncover()
          }
        }
        else{
          this.players[1].uncover()
        }
        if(databus.whoTurn == 1)
          databus.whoTurn = 0
        else 
          databus.whoTurn = 1
      }
      //没碰到放置区，卡牌归位
      else{
        databus.cardGroup.cards[0].x = databus.cardGroup.fiX
        databus.cardGroup.cards[0].y = databus.cardGroup.fiY
      }
      return
    }
    //监听玩家手牌，若卡牌碰到放置区，则根据whoTurn使玩家执行出牌操作
    //i的值表示出的花色，用PATTERN数组转换成字符串
    if(databus.whoTurn == 0){
      for(let i = 0; i < 4; i++){
        if(!this.players[0].handCards[i].count
          || !this.players[0].handCards[i].cards[0].touched) continue
        this.players[0].handCards[i].cards[0].touched = false
        //碰到放置区
        if(this.players[0].handCards[i].cards[0].isCollideWith(databus.playZone)){
          //在线模式发送请求
          databus.requesting = true
          if(databus.mode == 2){
            api.executeOp(
              this,
              this.token,
              this.uuid,
              1,
              this.players[0].handCards[i].strCards[0])
          }
          //非在线模式直接出牌
          else{
            this.players[0].playCard(PATTERNS[i])
          }
          if(databus.whoTurn == 1)
            databus.whoTurn = 0
          else 
            databus.whoTurn = 1
        }
        //没碰到放置区，卡牌归位
        else{
          this.players[0].handCards[i].cards[0].x = this.players[0].handCards[i].fiX
          this.players[0].handCards[i].cards[0].y = this.players[0].handCards[i].fiY
        }
      }
    }
    else{
      for(let i = 0; i < 4; i++){
        if(!this.players[1].handCards[i].count
          || !this.players[1].handCards[i].cards[0].touched) continue
        this.players[1].handCards[i].cards[0].touched = false
        if(this.players[1].handCards[i].cards[0].isCollideWith(databus.playZone)){
          this.players[1].playCard(PATTERNS[i])
          if(databus.whoTurn == 1)
          databus.whoTurn = 0
        else 
          databus.whoTurn = 1
        }
        else{
          this.players[1].handCards[i].cards[0].x = this.players[1].handCards[i].fiX
          this.players[1].handCards[i].cards[0].y = this.players[1].handCards[i].fiY
        }
      }
    }
  }
}