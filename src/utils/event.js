import * as Babel from '@babel/standalone'
import { Notification } from 'element-ui'

function checkoutFuncName(funcString) {
  const reg = /(?<=(exports))(\.|\w)+/g
  const arr = funcString.match(reg) || []
  return arr.map(item => {
    return item.substring(1, item.length)
  })
}

function parseFuncBody(funString) {
  let result
  try {
    result = Babel.transform(funString, { presets: ['es2015'] }).code
  } catch (e) {
    Notification({
      type: 'warning',
      title: '函数解析失败',
      message: e,
      duration: 1000
    })
  }
  return result
}

export function transformFun(funString, trigger, value, context, callback) {
  let result
  const args = 'context, value'
  const body = `${funString} return ${trigger}()`
  const create = new Function(args, body)
  if (funString) result = create(context, value)
  callback && callback(result)
  return result
}

export function getTransformFun(funString, trigger, value, context, callback) {
  let result
  const args = 'context, value'
  const body = `${funString} return ${trigger}`
  const create = new Function(args, body)
  if (funString) result = create(context, value)
  callback && callback(result)
  return result
}

export function parseFuncInstance(funString) {
  const result = []
  const translateCode = parseFuncBody(funString)
  const funcName = checkoutFuncName(translateCode)
  const funcBody = funcName.map((item, index) => {
    const startFlag = `function ${item}() {`
    const endFlag = `function ${funcName[index + 1]}() {`
    const start = translateCode.indexOf(startFlag)
    const end = translateCode.indexOf(endFlag)
    return translateCode.substring(start, end < 0 ? translateCode.length : end)
  })
  funcName.map((item, index) => {
    const method = {
      funcName: item,
      funcBody: funcBody[index],
      type: 'function'
    }
    result.push(method)
  })
  return result
}

export function generateOpenUrlFunc(trigger, url, target) {
  return `function ${trigger}() {
    window.open("${url}", "${target}")
  }`
}

export function generateEvents(events) {
  if (!events) return
  const result = {}
  events.map(item => {
    result[item.trigger] = { ...item }
  })
  return result
}
