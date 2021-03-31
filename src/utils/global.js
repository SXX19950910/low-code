import _ from 'loadsh'

export function generateId() {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

export function updateFormItemId(updateData) {
  const isLayout = type => ['grid', 'buttonDrawer'].includes(type)
  const data = _.cloneDeep(updateData)
  data.elementId = generateId()
  const set = (children) => {
    children.map((item, index) => {
      item.elementId = `${item.elementId}${index}`
    })
  }
  if (isLayout(data.type)) {
    data.field.children.map((item, index) => {
      item.elementId = `${item.elementId}${index}`
      item.parentId = `${data.elementId}`
      if (item.children && item.children.length > 0) {
        set(item.children)
      }
    })
  }
  return data
}

const getFormItemEventsOptions = (type) => {
  const result = {
    input: [
      {
        label: 'onChange',
        value: 'onChange'
      },
      {
        label: 'onFocus',
        value: 'onFocus'
      },
      {
        label: 'onBlur',
        value: 'onBlur'
      },
      {
        label: 'onClear',
        value: 'onClear'
      }
    ],
    button: [
      {
        label: 'onClick',
        value: 'onClick'
      }
    ],
    select: [
      {
        label: 'onChange',
        value: 'onChange'
      },
      {
        label: 'onBlur',
        value: 'onBlur'
      },
      {
        label: 'onClear',
        value: 'onClear'
      },
      {
        label: 'onFocus',
        value: 'onFocus'
      },
      {
        label: 'onVisibleChange',
        value: 'onVisibleChange'
      }
    ],
    radioGroup: [
      {
        label: 'onChange',
        value: 'onChange'
      }
    ],
    checkbox: [
      {
        label: 'onChange',
        value: 'onChange'
      }
    ],
    date: [
      {
        label: 'onChange',
        value: 'onChange'
      },
      {
        label: 'onBlur',
        value: 'onBlur'
      },
      {
        label: 'onFocus',
        value: 'onFocus'
      }
    ],
    group: [
      {
        label: 'onChange',
        value: 'onChange'
      }
    ],
    choose: [
      {
        label: 'onChange',
        value: 'onChange'
      }
    ],
    textarea: [
      {
        label: 'onChange',
        value: 'onChange'
      },
      {
        label: 'onBlur',
        value: 'onBlur'
      },
      {
        label: 'onFocus',
        value: 'onFocus'
      }
    ],
    addressBook: [
      {
        label: 'onSelect',
        value: 'onSelect'
      },
      {
        label: 'onBlur',
        value: 'onBlur'
      },
      {
        label: 'onFocus',
        value: 'onFocus'
      }
    ],
    time: [
      {
        label: 'onChange',
        value: 'onChange'
      },
      {
        label: 'onBlur',
        value: 'onBlur'
      },
      {
        label: 'onFocus',
        value: 'onFocus'
      }
    ]
  }
  return result[type] || []
}

export function formatFormItem(field) {
  const newField = _.cloneDeep(field)
  const paramsKey = newField.field.paramsKey
  const type = newField.field.type
  newField.id = generateId()
  newField.elementId = generateId()
  newField.field.eventOptions = getFormItemEventsOptions(type)
  newField.field.paramsKey = paramsKey || `${newField.elementId}_${type}`
  newField.field.props = {}
  newField.field.styles = {}
  newField.field.events = []
  newField.field.value = ''
  newField.field.arrValue = []
  newField.field.parentId = ''
  newField.field.rule = {
    attrName: '',
    desc: '',
    maxLimit: '',
    maxLimitMsg: '',
    minLimit: '',
    minLimitMsg: '',
    regular: '',
    regularMsg: '',
    required: '',
    requiredMsg: '',
    status: '',
    type: ''
  }
  newField.field.ruleName = ''
  const createChildren = (type) => {
    let result = []
    switch (type) {
      case 'grid':
        result = [
          {
            icon: 'iconfont icon42danlanbuju',
            label: '单栏',
            parentId: newField.elementId,
            span: 12,
            elementId: `${generateId()}1`,
            field: {
              props: {},
              styles: {},
              children: []
            }
          },
          {
            icon: 'iconfont icon42danlanbuju',
            label: '单栏',
            parentId: newField.elementId,
            span: 12,
            elementId: `${generateId()}2`,
            field: {
              children: []
            }
          }
        ]
        break
    }
    return result
  }
  newField.field.children = createChildren(newField.field.type)
  const propsKeyMap = [
    {
      key: 'className',
      value: ''
    },
    {
      key: 'borderType',
      value: ''
    },
    {
      key: 'boxShadowType',
      value: ''
    },
    {
      key: 'editable',
      value: false
    },
    {
      key: 'readonly',
      value: false
    },
    {
      key: 'clearable',
      value: false
    },
    {
      key: 'placeholder',
      value: ''
    },
    {
      key: 'format',
      value: 'yyyy-MM-dd'
    },
    {
      key: 'type',
      value: ''
    },
    {
      key: 'showPassword',
      value: false
    },
    {
      key: 'plain',
      value: false
    },
    {
      key: 'moreVisible',
      value: false
    },
    {
      key: 'resize',
      value: ''
    },
    {
      key: 'showWordLimit',
      value: false
    },
    {
      key: 'rows',
      value: 2
    },
    {
      key: 'maxlength',
      value: 99999
    },
    {
      key: 'autosize',
      value: false
    },
    {
      key: 'gutter',
      value: 0
    },
    {
      key: 'justify',
      value: 'start'
    },
    {
      key: 'align',
      value: 'top'
    },
    {
      key: 'startPlaceholder',
      value: ''
    },
    {
      key: 'endPlaceholder',
      value: ''
    },
    {
      key: 'rangeSeparator',
      value: '—'
    },
    {
      key: 'unlinkPanels',
      value: false
    },
    {
      key: 'disabled',
      value: false
    },
    {
      key: 'size',
      value: 'small'
    },
    {
      key: 'circle',
      value: false
    },
    {
      key: 'round',
      value: false
    },
    {
      key: 'tableKey',
      value: ''
    },
    {
      key: 'quickLocal',
      value: ''
    },
    {
      key: 'backgroundType',
      value: ''
    },
    {
      key: 'borderRadiusType',
      value: ''
    },
    {
      key: 'boxShadowType',
      value: ''
    },
    {
      key: 'labelPosition',
      value: ''
    },
    {
      key: 'labelWidth',
      value: ''
    },
    {
      key: 'statusIcon',
      value: false
    },
    {
      key: 'css',
      value: ''
    },
    {
      key: 'autoplay',
      value: true
    },
    {
      key: 'loop',
      value: true
    },
    {
      key: 'interval',
      value: 3000
    },
    {
      key: 'direction',
      value: 'horizontal'
    },
    {
      key: 'indicatorPosition',
      value: 'none'
    },
    {
      key: 'height',
      value: ''
    },
    {
      key: 'slidesPerView',
      value: ''
    },
    {
      key: 'spaceBetween',
      value: 20
    }

  ]
  propsKeyMap.map(item => {
    newField.field.props[item.key] = item.value
  })
  return newField
}

export function removeAllNonItem() {
  const $list = document.querySelectorAll('.middle-form-content .none-item')
  $list.forEach(item => {
    item.remove()
  })
}

export function getWidget(type, props) {
  let context
  switch (type) {
    case 'grid':
      context = _.assign({
        icon: 'iconfont icon42danlanbuju',
        label: '单栏',
        parentId: '',
        span: 12,
        elementId: generateId(),
        field: {
          props: {},
          styles: {},
          children: []
        }
      }, props)
      break
  }
  return context
}
