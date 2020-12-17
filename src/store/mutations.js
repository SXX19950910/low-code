import _ from 'loadsh'
import { getTransformFun } from '@/utils/event'
import Vue from 'vue'

const hasChild = data => data.field ? data.field.children.length > 0 : data.children.length > 0
export default {
  ADD_FORM_ITEM(state, { field, index }) {
    state.form.form.splice(index, 0, field)
  },
  INIT_FORM(state, { items, css }) {
    state.form.form = items
    state.form.page.css = css
  },
  SET_CURRENT_FORM_ITEM(state, data) {
    state.form.current = data
  },
  SET_FORM_ITEM_OPTION(state, update) {
    const current = state.form.current
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
    const current = state.form.current
    const add = (children) => {
      children.map(item => {
        if (item.elementId === current.elementId) {
          item.field.options.push(data)
        } else if (hasChild(item)) {
          add(item.field ? item.field.children : item.children)
        }
      })
    }
    state.form.form.map(item => {
      if (item.elementId === current.elementId) {
        item.field.options.push(data)
      } else if (item.field.children.length > 0) {
        add(item.field.children)
      }
    })
  },
  DELETE_FORM_ITEM_OPTION(state, data) {
    const current = state.form.current
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
    state.form.form.map((item) => {
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
  ADD_FORM_ITEM_TO_GRID(state, { parentId, gridId, field, index }) {
    const set = (children) => {
      children.map(item => {
        if (item.elementId === parentId) {
          item.field.children.map(child => {
            if (child.elementId === gridId) {
              child.children.splice(index, 0, field)
            }
          })
        } else if (hasChild(item)) {
          set(item.field ? item.field.children : item.children)
        }
      })
    }
    state.form.form.map((item) => {
      if (item.elementId === parentId) {
        item.field.children.map(tag => {
          if (tag.elementId === gridId) {
            tag.children.splice(index, 0, field)
          } else if (hasChild(item)) {
            set(item.field ? item.field.children : item.children)
          }
        })
      } else if (hasChild(item)) {
        set(item.field.children)
      }
    })
  },
  ADD_FORM_ITEM_TO_FORM(state, { parentId, field, index }) {
    const addField = (list) => {
      list.map(item => {
        if (item.elementId === parentId) {
          item.field.children.splice(index, 0, field)
        } else if (hasChild(item)) {
          addField(item.field ? item.field.children : item.children)
        }
      })
    }
    state.form.form.map((item) => {
      if (item.elementId === parentId) {
        item.field.children.splice(index, 0, field)
      } else if (hasChild(item)) {
        addField(item.field ? item.field.children : item.children)
      }
    })
  },
  DELETE_FORM_ITEM(state, elementId) {
    const remove = (list) => {
      list.map((item, index) => {
        if (item.elementId === elementId) list.splice(index, 1)
        else if (hasChild(item)) {
          remove(item.field ? item.field.children : item.children)
        }
      })
    }
    state.form.form.map((item, index) => {
      if (item.elementId === elementId) state.form.form.splice(index, 1)
      else if (hasChild(item)) {
        remove(item.field.children)
      }
    })
  },
  ADD_FORM_ITEM_TO_CHILDREN(state, formItem) {
    const newFormItem = _.cloneDeep(formItem)
    const parentId = formItem.parentId
    const add = (children) => {
      children.map(item => {
        if (item.elementId === parentId) {
          item.field.children.push(newFormItem)
        } else if (hasChild(item)) {
          add(item.field ? item.field.children : item.children)
        }
      })
    }
    state.form.form.map(item => {
      if (item.elementId === parentId) {
        item.field.children.push(newFormItem)
      } else if (hasChild(item)) {
        add(item.field ? item.field.children : item.children)
      }
    })
  },
  DELETE_FORM_ITEM_TO_CHILDREN(state, { parentId, elementId }) {
    const deleteFormItem = (children) => {
      children.map(item => {
        if (item.elementId === parentId) {
          item.field.children.map((child, childIndex) => {
            if (child.elementId === elementId) item.field.children.splice(childIndex, 1)
          })
        } else if (hasChild(item)) {
          deleteFormItem(item.field ? item.field.children : item.children)
        }
      })
    }
    deleteFormItem(state.form.form)
  },
  CLEAR_FORM(state) {
    state.form.form = []
    state.form.current = {}
  },
  SET_FORM_ITEM_RULE(state, id) {
    const rule = _.cloneDeep(state.form.rules.find(item => item.attrName === id)) || { attrName: '', desc: '', maxLimit: '', maxLimitMsg: '', minLimit: '', minLimitMsg: '', regular: '', regularMsg: '', required: '', requiredMsg: '', status: '', type: '' }
    const current = state.form.current
    const setRule = (children) => {
      children.map(item => {
        const hasChildren = item.children && item.children.length > 0
        const isRight = item.elementId === current.elementId
        if (isRight) {
          item.field.rule = rule
        } else if (hasChildren) setRule(item.children)
      })
    }
    state.form.form.map(item => {
      const isRight = item.elementId === current.elementId
      const hasChildren = item.field.children && item.field.children.length > 0
      if (isRight) {
        item.field.rule = rule
      } else if (hasChildren) {
        setRule(item.field.children)
      }
    })
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
    state.form.form.map((item, index) => {
      const isRight = item.elementId === elementId
      if (isRight) {
        currentIndex = index + 1
        state.form.form.splice(currentIndex, 0, field)
      } else if (hasChild(item)) {
        copy(item.field ? item.field.children : item.children)
      }
    })
  },
  ADD_DRAWER_FORM_ITEM(state, { parentId, field, index }) {
    const set = (list) => {
      list.map(item => {
        const isRight = item.elementId === parentId
        if (isRight) {
          item.field.children.splice(index, 0, field)
        } else if (hasChild(item)) {
          set(item.field ? item.field.children : item.children)
        }
      })
    }
    state.form.form.map(item => {
      const isRight = item.elementId === parentId
      if (isRight) {
        item.field.children.splice(index, 0, field)
      } else if (hasChild(item)) {
        set(item.field ? item.field.children : item.children)
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
    state.form.form.map(item => {
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
    state.form.page.styles.top = ''
    state.form.page.styles.left = ''
    state.form.page.styles.bottom = ''
    state.form.page.styles.right = ''
    state.form.page.styles[x] = xValue
    state.form.page.styles[y] = yValue
  },
  SET_PAGE_STYLES(state, { key, value }) {
    if (!state.form.page.styles.hasOwnProperty(key)) {
      Vue.set(state.form.page.styles, key, value)
    } else {
      state.form.page.styles[key] = value
    }
  },
  SET_PAGE_PROPS(state, { key, value }) {
    if (!state.form.page.props.hasOwnProperty(key)) {
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
    state.form.form.map(item => {
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
    state.form.form.map(item => {
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
    state.form.page.methods = func
    state.form.methodsList = methods
  },
  ADD_SOURCE_ITEM(state, source) {
    state.form.sourceList.push(source)
  },
  ADD_FETCH_ITEM(state, fetch) {
    state.form.fetchList.push(fetch)
  },
  DELETE_FETCH_ITEM(state, fetch) {
    state.form.fetchList.map((item, index) => {
      if (item.name === fetch.name) state.form.fetchList.splice(index, 1)
    })
  },
  DELETE_SOURCE_ITEM(state, source) {
    state.form.sourceList.map((item, index) => {
      if (item.name === source.name) state.form.sourceList.splice(index, 1)
    })
  }
}
