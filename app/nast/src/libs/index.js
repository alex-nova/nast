import { libs as customLibs, } from './../userApp'
import Api from './api'
import Bus from './bus'
import Cookie from './cookie'
import Http from './http'
import Date from './date'
import Session from './session'
import Storage from './storage'
import config from '../config'


const libs = {
  Api: customLibs.Api || Api,
  Bus: customLibs.Bus || Bus,
  Cookie: customLibs.Cookie || Cookie,
  Http: customLibs.Http || Http,
  Date: customLibs.Date || Date,
  Session: customLibs.Session || Session,
  Storage: customLibs.Storage || Storage,
}

const bus = new libs.Bus()
const cookie = new libs.Cookie()
const date = new libs.Date()
const http = new libs.Http()
const session = new libs.Session()
const storage = new libs.Storage()
const api = new libs.Api({ config, http, })


export default {
  /** @type {BusInterface} */
  bus,
  /** @type {ApiInterface} */
  api,
  /** @type {CookieInterface} */
  cookie,
  /** @type {DateInterface} */
  date,
  /** @type {HttpInterface} */
  http,
  /** @type {SessionInterface} */
  session,
  /** @type {StorageInterface} */
  storage,
}
