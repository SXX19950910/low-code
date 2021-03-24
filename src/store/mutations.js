import { getTransformFun } from '@/utils/event'
import Vue from 'vue'

const hasChild = data => data.field ? data.field.children.length > 0 : data.children.length > 0
const findCall = (list, key, value, callback) => {
  list.map(item => {
    if (item[key] === value) {
      callback(item)
    } else if (hasChild(item)) {
      findCall(item.field.children, key, value, callback)
    }
  })
}

export default {
  INSERT_COMPONENT(state, field) {
    const { parentId, index } = field
    if (!parentId) {
      state.lowCode.form.splice(index, 0, field)
    } else {
      findCall(state.lowCode.form, 'elementId', parentId, (res) => {
        res.field.children.push(field)
      })
    }

  },
  ADD_FORM_ITEM(state, { field, index }) {
    state.lowCode.form.splice(index, 0, field)
  },
  INIT_FORM(state, { items, css }) {
    state.lowCode.form = items
    state.lowCode.page.css = css
  },
  SET_CURRENT_COMPONENT(state, data) {
    state.lowCode.current = data
  },
  SET_FORM_ITEM_OPTION(state, update) {
    const current = state.lowCode.current
    const { id = current.elementId, data } = update
    const set = (children) => {
      children.map(item => {
        if (item.elementId === id) {
          item.field.options = data
        } else if (hasChild(item)) {
          set(item.field ? item.field.children : item.children)
        }
      })
    }
    state.form.form.map(item => {
      if (item.elementId === id) {
        item.field.options = data
      } else if (item.field.children.length > 0) {
        set(item.field.children)
      }
    })
  },
  ADD_FORM_ITEM_OPTION(state, data) {
    const current = state.lowCode.current
    const add = (children) => {
      children.map(item => {
        if (item.elementId === current.elementId) {
          item.field.options.push(data)
        } else if (hasChild(item)) {
          add(item.field ? item.field.children : item.children)
        }
      })
    }
    state.lowCode.form.map(item => {
      if (item.elementId === current.elementId) {
        item.field.options.push(data)
      } else if (item.field.children.length > 0) {
        add(item.field.children)
      }
    })
  },
  DELETE_FORM_ITEM_OPTION(state, data) {
    const current = state.lowCode.current
    const remove = (children) => {
      children.map(item => {
        if (item.elementId === current.elementId) {
          item.field.options.map((tag, tagIndex) => {
            if (tag.label === data.label) {
              item.field.options.splice(tagIndex, 1)
            }
          })
        } else if (hasChild(item)) {
          remove(item.field ? item.field.children : item.children)
        }
      })
    }
    state.lowCode.form.map((item) => {
      if (item.elementId === current.elementId) {
        item.field.options.map((tag, tagIndex) => {
          if (tag.label === data.label) {
            item.field.options.splice(tagIndex, 1)
          }
        })
      } else if (item.field.children.length > 0) {
        remove(item.field.children)
      }
    })
  },
  DELETE_COMPONENT(state, elementId) {
    const remove = (list) => {
      list.map((item, index) => {
        if (item.elementId === elementId) list.splice(index, 1)
        else if (hasChild(item)) {
          remove(item.field ? item.field.children : item.children)
        }
      })
    }
    state.lowCode.form.map((item, index) => {
      if (item.elementId === elementId) state.lowCode.form.splice(index, 1)
      else if (hasChild(item)) {
        remove(item.field.children)
      }
    })
  },
  CLEAR_FORM(state) {
    state.lowCode.form = []
    state.lowCode.current = {}
  },
  COPY_FORM_ITEM(state, { elementId, field }) {
    let currentIndex
    const copy = (children) => {
      children.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0
        const isRight = item.elementId === elementId
        if (isRight) {
          currentIndex = index + 1
          children.splice(currentIndex, 0, field)
        } else if (hasChildren) copy(item.children)
      })
    }
    state.lowCode.form.map((item, index) => {
      const isRight = item.elementId === elementId
      if (isRight) {
        currentIndex = index + 1
        state.form.form.splice(currentIndex, 0, field)
      } else if (hasChild(item)) {
        copy(item.field ? item.field.children : item.children)
      }
    })
  },
  ADD_EVENT_TO_FORM_ITEM(state, { current, eventName, prefix, trigger, funcBody }) {
    const id = current.elementId
    const eventText = `function ${eventName}() {}`
    const event = {
      eventName,
      event: funcBody || eventText,
      prefix,
      trigger
    }
    const set = (list) => {
      list.map(item => {
        if (id === item.elementId) {
          const hasEvent = item.field.events.some(e => e.trigger === event.trigger)
          if (!hasEvent) item.field.events.push(event)
        } else if (hasChild(item)) {
          set(item.field ? item.field.children : item.children)
        }
      })
    }
    state.lowCode.form.map(item => {
      const isRight = id === item.elementId
      if (isRight) {
        const hasEvent = item.field.events.some(e => e.trigger === event.trigger)
        if (!hasEvent) {
          item.field.events.push(event)
        } else {
          item.field.events.map((tag, index) => {
            if (tag.trigger === event.trigger) {
              item.field.events.splice(index, 1, event)
            }
          })
        }
      } else if (hasChild(item)) {
        set(item.field ? item.field.children : item.children)
      }
    })
  },
  SET_PAGE_QUICK_LOCAL(state, local) {
    const x = local.keyArr[0]
    const y = local.keyArr[1]
    const xValue = local.valueArr[0]
    const yValue = local.valueArr[1]
    state.lowCode.page.styles.top = ''
    state.lowCode.page.styles.left = ''
    state.lowCode.page.styles.bottom = ''
    state.lowCode.page.styles.right = ''
    state.lowCode.page.styles[x] = xValue
    state.lowCode.page.styles[y] = yValue
  },
  SET_PAGE_STYLES(state, { key, value }) {
    if (!state.lowCode.page.styles.hasOwnProperty(key)) {
      Vue.set(state.form.page.styles, key, value)
    } else {
      state.form.page.styles[key] = value
    }
  },
  SET_PAGE_PROPS(state, { key, value }) {
    if (!state.lowCode.page.props.hasOwnProperty(key)) {
      Vue.set(state.form.page.props, key, value)
    } else {
      state.form.page.props[key] = value
    }
  },
  SET_FORM_ITEM_STYLES(state, { id, object }) {
    const set = (list) => {
      list.map(item => {
        if (id === item.elementId) {
          for (const key in object) {
            if (object.hasOwnProperty(key)) {
              const nonKey = !item.field.styles.hasOwnProperty(key)
              if (nonKey) Vue.set(item.field.styles, key, object[key])
              else {
                item.field.styles[key] = object[key]
              }
            }
          }
        } else if (hasChild(item)) {
          set(item.field ? item.field.children : item.children)
        }
      })
    }
    state.lowCode.form.map(item => {
      const isRight = id === item.elementId
      if (isRight) {
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const nonKey = !item.field.styles.hasOwnProperty(key)
            if (nonKey) Vue.set(item.field.styles, key, object[key])
            else {
              item.field.styles[key] = object[key]
            }
          }
        }
      } else if (hasChild(item)) {
        set(item.field ? item.field.children : item.children)
      }
    })
  },
  SET_FORM_ITEM_PROPS(state, { id, object }) {
    const setProps = (list) => {
      list.map(item => {
        if (id === item.elementId) {
          for (const key in object) {
            if (object.hasOwnProperty(key)) {
              const nonKey = !item.field.props.hasOwnProperty(key)
              if (nonKey) Vue.set(item.field.props, key, object[key])
              else {
                item.field.props[key] = object[key]
              }
            }
          }
        } else if (hasChild(item)) {
          setProps(item.field ? item.field.children : item.children)
        }
      })
    }
    state.lowCode.form.map(item => {
      const isRight = id === item.elementId
      if (isRight) {
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const nonKey = !item.field.props.hasOwnProperty(key)
            if (nonKey) Vue.set(item.field.props, key, object[key])
            else {
              item.field.props[key] = object[key]
            }
          }
        }
      } else if (hasChild(item)) {
        setProps(item.field ? item.field.children : item.children)
      }
    })
  },
  SET_GLOBAL_METHODS(state, methods) {
    const func = {}
    methods.map(item => {
      func[item.funcName] = getTransformFun(item.funcBody, item.funcName)
    })
    state.lowCode.page.methods = func
    state.lowCode.methodsList = methods
  },
  ADD_SOURCE_ITEM(state, source) {
    state.lowCode.sourceList.push(source)
  },
  ADD_FETCH_ITEM(state, fetch) {
    state.lowCode.fetchList.push(fetch)
  },
  DELETE_FETCH_ITEM(state, fetch) {
    state.lowCode.fetchList.map((item, index) => {
      if (item.name === fetch.name) state.form.fetchList.splice(index, 1)
    })
  },
  DELETE_SOURCE_ITEM(state, source) {
    state.lowCode.sourceList.map((item, index) => {
      if (item.name === source.name) state.form.sourceList.splice(index, 1)
    })
  }
}
