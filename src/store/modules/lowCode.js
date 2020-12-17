import { generateId } from '@/utils/global'

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
  async init({ commit }) {
  },
  async getRules({ commit }) {
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
