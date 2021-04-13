/*
 * @Author: your name
 * @Date: 2021-04-10 22:26:31
 * @LastEditTime: 2021-04-13 21:25:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\components\Game\lib\assetsManager\index.js
 */
import Status from './status.enums' 
import {
  init
} from '../../../../api/Game'
export class AssetsManager {
  constructor() {
    this.loadQueue = []
    this.status = Status.INIT
    this.dbName = '$MPANDA.GAME.ASSETS'
    this.dbVersion = 1
    this.tableName = null
  }
  async init() {
    var _this = this
    return new Promise((res, rej) => {
      var DBConnect = this.open()
      DBConnect.onsuccess = (ev) => { 
        this.status = Status.CONNECTED
        res(this)
      }
      DBConnect.onupgradeneeded = async function (ev) {
        console.log('Upgraded!')
        if (!ev.target.result.objectStoreNames.contains('Frames')) {
          var createStore = ev.target.result.createObjectStore('Frames', {
            keyPath:'id',
            autoIncrement: true
          })
          createStore.createIndex('ID', 'id', {
            unique: true
          })
          createStore.createIndex('Base64', 'base64', {
            unique: false
          })
        }
        await _this.download()
        this.status = Status.UPGRADED
        res(this)
      }
    })
  }
  async download() {
    this.status = Status.DOWNLOADING
    await init().then(async res => { 
      const {
        Data
      } = res
      this.setTableName('Frames') 
      for (var id in Data) {
        var obj = {
          id: id,
          base64: Data[id]
        }
        await this.add(obj)
      } 
    })
    this.status = Status.CONNECTED
  }
  open() {
    this.status = Status.CONNECTING
    return window.indexedDB.open(this.dbName, this.dbVersion)
  }
  addToQueue(assets, path) {
    this.loadQueue.push({
      assets,
      path
    })
  }
  setTableName(name) {
    this.tableName = name
  }
  async add(obj) {
    if (this.tableName === null) throw new Error('未设置查询表')
    var DBConnect = this.open()
    var tableName = this.tableName
    DBConnect.onsuccess = function (ev) {
      var addTransation = ev.target.result.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .add(obj)
      addTransation.onsuccess = function (ev) {
        console.log('数据写入成功！', ev)
      }
      addTransation.onerror = function (ev) {
        throw new Error(JSON.stringify(ev))
      }
    }
  }
  async get(index, value) {
    if (this.tableName === null) throw new Error('未设置查询表')
    var tableName = this.tableName
    return new Promise((res, rej) => {
      var DBConnect = this.open()
      DBConnect.onsuccess = function (ev) {
        var getTransation = ev.target.result.transaction([tableName], 'readwrite')
          .objectStore(tableName)
        getTransation.index(index)
        var result = getTransation.get(value)
        result.onsuccess = function (event) {
          console.log('数据读取成功', event.target.result);
          res(event.target.result)
        };
        result.onerror = function (ev) {
          rej(JSON.stringify(ev))
        }
      }
    })
  }
  // goDownload() {
  //   this.status = Status.DOWNLOADING
  // }
  // getAssets() {}

}