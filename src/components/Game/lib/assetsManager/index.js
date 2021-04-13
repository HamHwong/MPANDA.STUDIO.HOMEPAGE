/*
 * @Author: your name
 * @Date: 2021-04-10 22:26:31
 * @LastEditTime: 2021-04-10 23:37:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\components\Game\lib\assetsManager\index.js
 */
import Status from './status.enums'
export class AssetsManager {
  constructor() {
    this.loadQueue = []
    this.status = Status.INIT  
    this.tableName = null
  }
  async init() { 
    return new Promise((res,rej)=>{
      var DBConnect = this.open()
      DBConnect.onsuccess = function (ev) { 

        if (!ev.target.result.objectStoreNames.contains('Frames')) {
          var createStore = ev.target.result.createObjectStore('Frames',{ autoIncrement: true })
          createStore.createIndex('AssetsName','asset_name',{unique:true})
          createStore.createIndex('bytes','bytes',{unique:false})
        } 
        this.status = Status.CONNECTED
        res(this)
      }
    }) 
  }
  open(){
    return window.indexedDB.open('$MPANDA.GAME.ASSETS')
  }
  addToQueue(assets, path) {
    this.loadQueue.push({
      assets,
      path
    })
  }
  setTableName(name){
    this.tableName = name
  }
  async add({obj}){    
    if(this.tableName===null) throw new Error('未设置查询表')
    var DBConnect = this.open()
    var tableName = this.tableName
    DBConnect.onsuccess = function (ev) { 
      var addTransation = ev.target.result.transaction([tableName],'readwrite')
      .objectStore(tableName)
      .add(JSON.stringify(obj)) 
      addTransation.onsuccess = function(ev){
        console.log('数据写入成功！',ev)
      }
      addTransation.onerror = function(ev){
        throw new Error(JSON.stringify(ev))
      }
    } 
  }
  async get({index,value}){
    if(this.tableName===null) throw new Error('未设置查询表')
    var tableName = this.tableName
    return new Promise((res,rej)=>{
      var DBConnect = this.open()
      DBConnect.onsuccess = function (ev) {
        var getTransation = ev.target.result.transaction([tableName],'readwrite')
        .objectStore(tableName)
        getTransation.index(index) 
        var result = getTransation.get(value) 
        result.onsuccess = function (event) {
          console.log('数据读取成功',event.target.result);
          res(event.target.result)
        };
        result.onerror = function(ev){ 
          rej(JSON.stringify(ev))
        }
      }
    })
  }
  goDownload() {
    this.status = Status.DOWNLOADING
  }
  getAssets() {}

}