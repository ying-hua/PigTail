/**
 * 未完成
 * 背景图片
 */
import API from "./api"
import Button from "./button"
import DataBus from "./databus"
import Main from "./main"
import Player from "./player"
import Sprite from "./sprite"
/**
 * 背景图片
 * 0 主界面
 * 1 游戏界面
 * 2 教程界面
 * 3 游戏结束界面
 * 4 在线模式登录界面
 * 5 创建加入房间界面
 * 6 等待玩家界面
 * 7 输入uuid界面
 * 8 暂停游戏界面
 */
//whl 界面背景图片
const BACKGROUND_IMG_SRC = [
  "images/backgrouds/bg0.jpg",
  "images/backgrouds/bg1.jpg",
  "images/backgrouds/bg2.jpg",
  "images/backgrouds/end.jpg",
  "images/backgrouds/login.jpg",
  "images/backgrouds/bg1.jpg",
  "images/backgrouds/bg6.jpg",
  "images/backgrouds/uuid.jpg",
  "images/backgrouds/black.jpg"
]
const screenWidth = window.innerWidth  //780
const screenHeight = window.innerHeight  //475.8
//背景的宽度和高度
const BACKGROUND_WIDTH = screenWidth
const BACKGROUND_HEIGHT = screenHeight
const databus = new DataBus()
const api = new API()
export default class Interface{
  constructor(){
    this.name = 0
    this.buttons = []
  }
  /**
   * 初始化界面
   * @param {number} intName intName：界面名称
   * @param {Main} objMain objMain:main对象
   * @param {Player} objPlayers objPlayers:玩家对象
   */
  init(intName,main){
    this.name = intName
    this.background = new Sprite(BACKGROUND_IMG_SRC[intName],BACKGROUND_WIDTH,BACKGROUND_HEIGHT)
    //主界面
    if(this.name == 0){
      //单机模式按钮
      this.buttons[0] = new Button(
        "single",
        (intName,main) => {
          databus.mode = 0
          main.initInterface.bind(main)(intName,main)
          main.initGame.bind(main)()
          databus.whoTurn = false
          main.curInterface.buttons[1].visible = false
          main.curInterface.buttons[2].visible = false
          main.curInterface.buttons[3].visible = false
        },
        1,
        main
      )
      //双人模式按钮
      this.buttons[1] = new Button(
        "multi",
        (intName,main) => {
          databus.mode = 1
          main.initInterface.bind(main)(intName,main)
          main.initGame.bind(main)()
          databus.whoTurn = false
          main.curInterface.buttons[1].visible = false
          main.curInterface.buttons[3].visible = false
        },
        1,
        main
      )
      //在线模式按钮
      this.buttons[2] = new Button("online",main.initInterface.bind(main),4,main)
      //教程按钮
      this.buttons[3] = new Button("tip",main.initInterface.bind(main),2,main)
      //猪尾巴按钮
      this.buttons[4] = new Button("title",main.initInterface.bind(main),0,main)
    }
    //游戏进行界面
    else if(this.name == 1){
      //玩家1托管按钮
      this.buttons[0] = new Button(
        "openAI1",
        (main) => {
          main.players[0].byAI = true
          this.buttons[1].visible = true
          this.buttons[0].visible = false
        },
        main
      )
      //玩家1取消托管按钮
      this.buttons[1] = new Button(
        "closeAI1",
        (main) => {
          main.players[0].byAI = false
          this.buttons[1].visible = false
          this.buttons[0].visible = true
        },
        main
      )
      //玩家2托管按钮
      this.buttons[2] = new Button(
        "openAI2",
        (main) => {
          main.players[1].byAI = true
          this.buttons[2].visible = false
          this.buttons[3].visible = true
        },
        main
      )
      //玩家2取消托管按钮
      this.buttons[3] = new Button(
        "closeAI2",
        (main) => {
          main.players[1].byAI = false
          this.buttons[2].visible = true
          this.buttons[3].visible = false
        },
        main
      )
      // 返回主菜单按钮
      this.buttons[4] = new Button("return",main.initInterface.bind(main),0,main)
      //投降按钮
      //this.buttons[5] = new Button("surrender",main.initInterface.bind(main),3,main)
      
    }
    //教程界面
    else if(this.name == 2){
      //返回主菜单按钮
      this.buttons[0] = new Button("returnOnTuto",main.initInterface.bind(main),0,main)
    }
    //游戏结束界面
    else if(this.name == 3){
      //返回主菜单按钮
      this.buttons[0] = new Button("returnOnEnd",main.initInterface.bind(main),0,main)
    }
    //在线模式登录界面
    else if(this.name == 4){
      // 返回主菜单按钮
      this.buttons[0] = new Button("returnOnTuto",main.initInterface.bind(main),0,main)
      // 输入学号按钮
      this.buttons[1] = new Button(
        "inputId",
        (main) => {
          wx.showKeyboard({
            confirmHold: true,
            confirmType: "done",
            defaultValue: '',
            maxLength: 100,
            multiple: true,
          })
          wx.onKeyboardConfirm((res) => {
            main.studentId = res.value
            wx.hideKeyboard()
            wx.offKeyboardConfirm()
            main.initInterface.bind(main)(4,main)
          })
        },
        main
      )
      // 输入密码按钮
      this.buttons[2] = new Button(
        "inputPassword",
        (main) => {
          wx.showKeyboard({
            confirmHold: true,
            confirmType: "done",
            defaultValue: '',
            maxLength: 100,
            multiple: true,
          })
          wx.onKeyboardConfirm((res) => {
            main.password = res.value
            wx.hideKeyboard()
            wx.offKeyboardConfirm()
            main.initInterface.bind(main)(4,main)
          })
        },
        main
      )
      // 登录按钮
      this.buttons[3] = new Button("login",api.login,main)
    }
    //登录完成后的创建和加入对局界面
    else if(this.name == 5){
      //返回主菜单按钮
      this.buttons[0] = new Button("returnOnTuto",main.initInterface.bind(main),0,main)
      //创建对局按钮
      this.buttons[1] = new Button("createGame",api.createGame,main.token,main)
      //加入对局按钮
      this.buttons[2] = new Button("joinGame",main.initInterface.bind(main),7,main)
    }
    //等待玩家界面
    else if(this.name == 6){
      //返回主菜单按钮
      this.buttons[0] = new Button("returnOnTuto",main.initInterface.bind(main),0,main)
    }
    //输入uuid界面
    else if(this.name == 7){
      //返回主菜单按钮
      this.buttons[0] = new Button("returnOnTuto",main.initInterface.bind(main),0,main)
      //输入uuid按钮
      this.buttons[1] = new Button(
        "inputUuid",
        (main) => {
          wx.showKeyboard({
            confirmHold: true,
            confirmType: "done",
            defaultValue: '',
            maxLength: 100,
            multiple: true,
          })
          wx.onKeyboardConfirm((res) => {
            main.uuid = res.value
            wx.hideKeyboard()
            wx.offKeyboardConfirm()
            main.initInterface.bind(main)(7,main)
          })
        },
        main
      )
      //确定按钮
      this.buttons[2] = new Button("confirmOnJoin",api.joinGame,main.token,main.uuid,main)
    }
    //暂停界面
    else if(this.name == 8){
      //确定退出
      //this.buttons[0] = new Button("confirmOnPause",main.initInterface.bind(main),0,main)
      //回到游戏
      //this.buttons[1] = new Button("returnOnPause",main.initInterface.bind(main),0,main)
    }
  }
  /**
   * 渲染界面
   */
  render(ctx){
    //渲染背景和按钮
    this.background.drawToCanvas(ctx)
    this.buttons.forEach((btn) => {
      btn.renderButton(ctx)
    })
  }
}