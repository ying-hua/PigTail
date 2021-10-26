import DataBus from "./databus"

const databus = new DataBus()
let instance
export default class API{
  constructor(){
    if(instance) return instance
    instance = this
  }
login(main){
    let result
    wx.request({
      url: 'http://172.17.173.97:8080/api/user/login',
      data:{
        student_id:main.studentId,
        password:main.password
      },
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        main.token = res.data.data.token
          if(res.data.status == "200")
            main.initInterface.bind(main)(5,main)
          else
            main.initInterface.bind(main)(0,main)
      }
    })
  }
  createGame(token,main,privacy = true){
    wx.request({
      url: 'http://172.17.173.97:9000/api/game',
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token
      },
      data:{
        "private": privacy
      },
      success (res) {
        console.log(res.data.data.uuid)
        main.uuid = res.data.data.uuid
          if(res.data.code == "200")
            main.initInterface.bind(main)(6,main)
          else
            main.initInterface.bind(main)(0,main)
      }
    })
  }
  joinGame(token,uuid,main){
    if(!uuid) return
    wx.request({
      url: 'http://172.17.173.97:9000/api/game/'+uuid,
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': token
      },
      success (res) {
        main.apiRes = res
        if(res.data.code == "200"){
          main.initInterface.bind(main)(1,main)
          main.initGame.bind(main)()
          databus.mode = 2
          databus.whoTurn = 1
          databus.host = '0'
          main.curInterface.buttons[1].visible = false
          main.curInterface.buttons[2].visible = false
          main.curInterface.buttons[3].visible = false
        }
        else
          main.initInterface.bind(main)(0,main)
      }
    })
  }
  getLastOp(token,uuid,main){
    wx.request({
      url: 'http://172.17.173.97:9000/api/game/'+uuid+'/last',
      method:'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': token
      },
      success (res) {
        main.apiRes = res
        databus.requesting = false
      }
    })
  }
  executeOp(main,token,uuid,type,pokerId){
    wx.request({
      url: 'http://172.17.173.97:9000/api/game/'+uuid,
      method:'put',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': token
      },
      data:{
        "type":type,
        "card":pokerId
      },
      success (res) {
        console.log(res)
        let lastOp = res.data.data.last_code.split(' ')
        if(lastOp[1] == '0'){
          main.players[0].uncover(lastOp[2])
        }
        else{
          main.players[0].playCard(lastOp[2][0])
        }
        databus.requesting = false
      }
    })
  }
}