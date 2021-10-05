let instance
export default class Music{
  constructor(){
    if(instance) return instance
    instance = this
    this.bgmAudio = new Audio
    this.otherAudio = new Audio  //其他音乐
  }
  playBgm(){}
  playOther(){}  //播放其他音乐
}