import './libs/weapp-adapter'

import Main from 'main'

new Main()

/*
import DataBus from './databus'
import Player from './player'
import Sprite from './sprite'
*/


//测试player类和cardstack类
/*
const db = new DataBus()
const player = new Player('aaa',0)
console.log("oringin")
console.log(db.cardGroup.strCards)
console.log(db.playZone.strCards)
for(let i = 0;i < 20;i++){
  player.uncover()
}
console.log("uncover")
console.log(db.cardGroup.strCards)
console.log(db.playZone.strCards)
player.handCards.forEach((cards) => {
  console.log(cards.strCards)
})
player.playCard('S')
player.playCard('H')
player.playCard('C')
player.playCard('D')
console.log("playCard")
console.log(db.cardGroup.strCards)
console.log(db.playZone.strCards)
player.handCards.forEach((cards) => {
  console.log(cards.strCards)
})
player.handCards.forEach((cards) => {
  console.log(cards.count)
})
*/






//测试按钮缩放效果
/*
const ctx = canvas.getContext('2d')
const IMG_HERO = "images/buttons/openAI1.png"
const WIDTH = 80
const HEIGHT = 80
const X = 400
const Y = 100
const alpha = 0.9  //缩小比例
var img = new Sprite(IMG_HERO,WIDTH,HEIGHT,X,Y)
//const img2 = new Sprite(IMG_HERO,alpha*WIDTH,alpha*HEIGHT,(1-alpha)/2*WIDTH+X,(1-alpha)/2*HEIGHT+Y)
//img.drawToCanvas(ctx)
function touchStartHandler(e) {
  e.preventDefault()

  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  if(x >= img.x && x<= img.x+img.width && y >= img.y && y <= img.y+img.height){
    img = new Sprite(IMG_HERO,alpha*WIDTH,alpha*HEIGHT,(1-alpha)/2*WIDTH+X,(1-alpha)/2*HEIGHT+Y)
  }
}
function touchEndHandler(e) {
  e.preventDefault()
  img = new Sprite(IMG_HERO,WIDTH,HEIGHT,X,Y)
}
function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  img.drawToCanvas(ctx)
  //img2.drawToCanvas(ctx)
  window.requestAnimationFrame(loop,canvas)
}
canvas.addEventListener('touchstart', touchStartHandler)
canvas.addEventListener('touchend',touchEndHandler)
loop()
*/



/*
const ctx = canvas.getContext('2d')
const IMG_HERO = "demo/images/bg.jpg"
const WIDTH = 83
const HEIGHT = 83
const X = 101
const Y = 101
const alpha = 0.9  //缩小比例
var img = new Sprite(IMG_HERO,WIDTH,HEIGHT,X,Y)
function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  img.drawToCanvas(ctx)
  //img2.drawToCanvas(ctx)
  window.requestAnimationFrame(loop,canvas)
}
loop()
*/


//测试接口
/*
var token
var uuid
function loop(){
  wx.request({
    url: 'http://172.17.173.97:8080/api/user/login', //仅为示例，并非真实的接口地址
    data:{
      student_id:"031902207",
      password:"hxc241518"
    },
    method:'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success (res) {
      token = res.data.data.token
      console.log(res.data)
      wx.request({
        url: 'http://172.17.173.97:9000/api/game', //仅为示例，并非真实的接口地址
        method:'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'Authorization': token
        },
        success (res) {
          console.log(res.data)
          console.log(res.data.msg)
          uuid = res.data.data.uuid
          console.log(uuid)
          wx.request({
            url: 'http://172.17.173.97:9000/api/game/'+uuid, //仅为示例，并非真实的接口地址
            method:'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'Authorization': token
            },
            success (res) {
              console.log(res.data)
              console.log(res.data.msg)
            }
          })
        }
      })
    }
  })
  loop()
}
loop()
*/

/*
wx.request({
  url: 'http://172.17.173.97:9000/api/game', //仅为示例，并非真实的接口地址
  method:'post',
  header: {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
    'Authorization': token
  },
  success (res) {
    console.log(res.data)
    console.log(res.data.msg)
    console.log(res.statusCode)
    console.log(token)
  }
})
*/
