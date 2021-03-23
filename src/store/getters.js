import _ from 'loadsh'
const getters = {
  designForm: state => state.lowCode.form,
  pageProps: state => state.lowCode.page.props,
  pageStyles: state => state.lowCode.page.styles,
  currentFormItem: state => state.lowCode.current,
  formOptions: state => state.lowCode.options,
  styleActives: state => state.lowCode.styleActives,
  collection: state => state.lowCode.collection,
  pageMethods: state => state.lowCode.page.methods,
  methodsList: state => state.lowCode.methodsList,
  sourceList: state => state.lowCode.sourceList,
  fetchList: state => state.lowCode.fetchList,
  pageCss: state => state.lowCode.page.css,
  designFormTree: (state) => {
    const data = _.cloneDeep(state.lowCode.form)
    const set = (children) => {
      children.map(item => {
        item.children = item.field ? item.field.children : item.children
        if (item.children.length > 0) {
          set(item.field ? item.field.children : item.children)
        }
      })
    }
    data.map(item => {
      item.children = item.field.children
      if (item.field.children.length > 0) {
        set(item.field ? item.field.children : item.children)
      }
    })
    return data
  }
}
export default getters
