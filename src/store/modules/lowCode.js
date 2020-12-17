import { generateId } from '../../utils/global'
import Api from '@/api'

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
    const params = { parameter: {}}
    const res = await Api.form.getFormItems(params)
    if (res && res.success) {
      const collection = res.data.map((item, index) => {
        const newItem = { ...item }
        const field = JSON.parse(newItem.itemValue)
        return {
          id: newItem.id,
          label: field.name,
          active: false,
          type: field.type,
          key: newItem.itemKey,
          field,
          icon: field.icon,
          elementId: `${generateId()}${index}`
        }
      })
      commit('SET_COLLECTION', collection)
    }
  },
  async getRules({ commit }) {
    const params = { parameter: { page: 1, pageSize: 1000 }}
    const res = await Api.form.getFormItemRules(params)
    if (res.success) commit('SET_RULES', res.data.list)
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
