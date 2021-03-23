import components from './../../components/Maps/index'
import { objToArr } from './../../utils/utils'
const state = {
  form: [],
  collection: [],
  rules: [],
  current: '',
  styleActives: [],
  page: {
    scriptText: '/**\n' +
      ' * 私有的，可复用的函数\n' +
      ' * 动作面板帮助文档: \n' +
      ' **/\n',
    styles: {},
    props: {},
    methods: [],
    css: ''
  },
  sourceList: [],
  fetchList: [],
  methodsList: [],
  options: {
    labelPosition: 'top',
    labelWidth: 'auto',
    size: 'small',
    statusIcon: false,
    css: '',
    className: ''
  }
}

const actions = {
  formatComponents() {
    const advanced = {
      title: '高级组件',
      components: []
    }
    const web = {
      title: '门户组件',
      components: []
    }
    const basic = {
      title: '基础组件',
      components: []
    }
    const map = {
      advanced,
      web,
      basic
    }
    const collection = []
    components.map(item => {
      map[item.classify].components.push(item)
      collection.push(item)
    })
    return {
      componentsArr: objToArr(map),
      collection
    }
  },
  async init({ commit }) {
    const { componentsArr, collection } = actions.formatComponents()
    commit('SET_COLLECTION', collection)
    return componentsArr
  },
  async getRules() {
    //
  }
}
const mutations = {
  SET_COLLECTION(state, data) {
    state.collection = data
  },
  SET_RULES(state, data) {
    state.rules = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
