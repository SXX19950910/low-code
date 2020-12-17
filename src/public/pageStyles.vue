<template>
  <el-form class="styles-options-warp" label-position="top">
    <div class="title-top">
      当前选中：page
    </div>
    <el-collapse v-model="actives">
      <el-collapse-item title="布局" name="layout">
        <div class="margin-padding-area">
          <div class="margin-box">
            <div class="tip-text">margin</div>
            <el-input v-model="pageStyles.marginTop" class="edit-ipt top" placeholder="-" maxlength="3" />
            <el-input v-model="pageStyles.marginBottom" class="edit-ipt bottom" placeholder="-" maxlength="3"/>
            <el-input v-model="pageStyles.marginLeft" class="edit-ipt left special" placeholder="-" maxlength="3" />
            <el-input v-model="pageStyles.marginRight" class="edit-ipt right special" placeholder="-" maxlength="3" />
            <div class="padding-box">
              <el-input v-model="pageStyles.paddingTop" class="edit-ipt top" placeholder="-" maxlength="3" />
              <el-input v-model="pageStyles.paddingBottom" class="edit-ipt bottom" placeholder="-" maxlength="3" />
              <el-input v-model="pageStyles.paddingLeft" class="edit-ipt left" placeholder="-" maxlength="3" />
              <el-input v-model="pageStyles.paddingRight" class="edit-ipt right" placeholder="-" maxlength="3" />
              <div class="place-box"></div>
              <div class="text-tip">padding</div>
            </div>
          </div>
        </div>
        <el-form-item class="mt-10" label="布局模式">
          <el-radio-group v-model="pageStyles.display" size="mini">
            <el-tooltip v-for="item in displayOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
              <el-radio-button :label="item.value">
                <i :class="item.icon" />
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
        <template v-if="pageStyles.display === 'flex'">
          <el-form-item label="主轴方向">
            <el-radio-group v-model="pageStyles.flexDirection" size="small">
              <el-radio-button v-for="item in directionOptions" :label="item.value" :key="item.value">
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="主轴对齐">
            <el-radio-group v-model="pageStyles.justifyContent" size="mini">
              <el-tooltip v-for="item in justifyOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
                <el-radio-button :label="item.value" :key="item.value">
                  <i :class="item.icon" />
                </el-radio-button>
              </el-tooltip>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="辅轴对齐">
            <el-radio-group v-model="pageStyles.alignItems" size="mini">
              <el-tooltip v-for="item in alignOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
                <el-radio-button :label="item.value" :key="item.value">
                  <i :class="item.icon" />
                </el-radio-button>
              </el-tooltip>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="换行">
            <el-radio-group v-model="pageStyles.flexWrap" size="small">
              <el-radio-button v-for="item in warpOptions" :label="item.value" :key="item.value">
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </template>
      </el-collapse-item>
      <el-collapse-item title="文字" name="font">
        <div class="split-area">
          <el-form-item label="字号">
            <el-input-number v-model="pageStyles.fontSize" class="w-100" />
          </el-form-item>
          <el-form-item label="粗细">
            <el-select v-model="pageStyles.fontWeight" class="w-100">
              <el-option v-for="item in fontWeightOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
        <div class="split-area">
          <el-form-item label="行距">
            <el-input-number v-model="pageStyles.lineHeight" class="w-100" />
          </el-form-item>
          <el-form-item label="颜色">
            <el-color-picker v-model="pageStyles.color" class="color-picker"></el-color-picker>
          </el-form-item>
        </div>
        <el-form-item label="对齐方式">
          <el-radio-group v-model="pageStyles.textAlign" size="mini">
            <el-tooltip v-for="item in textAlignOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
              <el-radio-button :label="item.value" :key="item.value">
                <i :class="item.icon" />
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="pageStyles.opacity"></el-slider>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="定位" name="position">
        <el-form-item label="类型">
          <el-radio-group v-model="pageStyles.position" size="mini">
            <el-tooltip v-for="item in positionOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
              <el-radio-button :label="item.value" :key="item.value">
                <i :class="item.icon" />
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="isQuickLocal" label="快速定位">
          <el-select v-model="pageProps.quickLocal" class="w-100" placeholder="快速定位" @change="onQuickLocalChange">
            <el-option v-for="item in quickLocalOptions" :key="item.value" :value="item.value" :label="item.label">
              <i :class="item.icon" class="mr-10"></i>{{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>
        <template v-if="isPosition">
          <div class="split-area">
            <el-form-item label="上">
              <el-input v-model="pageStyles.top" placeholder="上" class="w-100" />
            </el-form-item>
            <el-form-item label="下">
              <el-input v-model="pageStyles.bottom" placeholder="下" class="w-100" />
            </el-form-item>
          </div>
          <div class="split-area">
            <el-form-item label="左">
              <el-input v-model="pageStyles.left" placeholder="左" class="w-100" />
            </el-form-item>
            <el-form-item label="右">
              <el-input v-model="pageStyles.right" placeholder="右" class="w-100" />
            </el-form-item>
          </div>
        </template>
        <el-form-item label="层叠顺序">
          <el-input-number v-model="pageStyles.zIndex" placeholder="z-index" class="w-100" />
        </el-form-item>
        <el-form-item label="浮动">
          <el-radio-group v-model="pageStyles.clear" size="mini">
            <el-tooltip v-for="item in clearOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
              <el-radio-button :label="item.value" :key="item.value">
                <i :class="item.icon" />
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="背景" name="background">
        <el-form-item label="类型">
          <el-radio-group v-model="pageProps.backgroundType" class="w-100" size="mini">
            <el-radio v-for="item in backgroundOptions" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="isBackgroundColor">
          <el-form-item label="颜色">
            <el-color-picker v-model="pageStyles.backgroundColor" class="color-picker"></el-color-picker>
          </el-form-item>
        </template>
        <template v-if="isBackgroundImg">
          <el-form-item label="图片地址">
            <el-input v-model="pageStyles.backgroundImage" placeholder="图片地址" type="text" />
          </el-form-item>
          <el-form-item label="尺寸">
            <el-radio-group v-model="pageStyles.backgroundSize" size="small">
              <el-radio-button v-for="item in backgroundSizeOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="重复显示">
            <el-radio-group v-model="pageStyles.backgroundRepeat" size="mini">
              <el-tooltip  v-for="item in backgroundRepeatOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
                <el-radio-button :label="item.value">
                  <i :class="item.icon" />
                </el-radio-button>
              </el-tooltip>
            </el-radio-group>
          </el-form-item>
          <div class="split-area">
            <el-form-item label="定位">
              <div class="background-local-area">
                <div v-for="item in backgroundLocalOptions" :value="item.value" :class="item.value === currentBackgroundLocal ? 'current' : ''" class="item" @click="handleBackgroundLocalClick(item)">
                  <i :class="item.icon" />
                </div>
              </div>
            </el-form-item>
            <div class="spe-div">
              <el-form-item label="X">
                <el-input v-model="pageStyles.backgroundPositionX" placeholder="X轴偏移" type="text" />
              </el-form-item>
              <el-form-item label="Y">
                <el-input v-model="pageStyles.backgroundPositionY" placeholder="Y轴偏移" type="text" />
              </el-form-item>
            </div>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item title="边框" name="border">
        <el-form-item label="圆角">
          <el-radio-group v-model="pageProps.borderRadiusType" class="w-100" size="mini">
            <el-radio v-for="item in radiusOptions" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="isFixedRadius">
          <div class="split-area">
            <el-form-item label="值">
              <el-slider v-model="pageStyles.borderRadius" :max="30" />
            </el-form-item>
            <el-form-item label="值">
              <el-input-number v-model="pageStyles.borderRadius" :max="30" />
            </el-form-item>
          </div>
        </template>
        <template v-if="isCustomRadius">
          <div class="split-area">
            <el-form-item>
              <div slot="label">
                <i class="iconfont iconyuanjiao-zuoshang fs-20" />
              </div>
              <el-input-number v-model="pageStyles.borderTopLeftRadius" />
            </el-form-item>
            <el-form-item>
              <div slot="label">
                <i class="iconfont iconyuanjiao-youshang fs-20" />
              </div>
              <el-input-number v-model="pageStyles.borderTopRightRadius" />
            </el-form-item>
          </div>
          <div class="split-area">
            <el-form-item>
              <div slot="label">
                <i class="iconfont iconyuanjiao-zuoxia fs-20"></i>
              </div>
              <el-input-number v-model="pageStyles.borderBottomLeftRadius" />
            </el-form-item>
            <el-form-item>
              <div slot="label">
                <i class="iconfont iconyuanjiao-youxia fs-20" />
              </div>
              <el-input-number v-model="pageStyles.borderBottomRightRadius" />
            </el-form-item>
          </div>
        </template>
        <div class="split-area">
          <el-form-item label="边框">
            <div class="background-local-area">
              <div v-for="item in borderSolidOptions" :key="item.value" :class="item.value === currentBorder ? 'current' : ''" class="item" @click="handleBorderClick(item)">
                <i :class="item.icon"></i>
              </div>
            </div>
          </el-form-item>
          <div class="spe-div">
            <el-form-item label="宽度">
              <el-input-number v-model="pageStyles.borderWidth" type="text" />
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="pageStyles.borderColor" class="color-picker" />
            </el-form-item>
          </div>
        </div>
        <el-form-item label="样式">
          <el-radio-group v-model="pageStyles.borderStyle" size="mini">
            <el-tooltip v-for="item in borderStyleOptions" :key="item.value" effect="dark" :content="item.label" placement="top">
              <el-radio-button :label="item.value">
                <i :class="item.icon"></i>
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="阴影">
          <el-radio-group v-model="pageProps.boxShadowType">
            <el-radio label="inset">内阴影</el-radio>
            <el-radio label="out">外阴影</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="pageStyles.boxShadowColor" class="color-picker" />
        </el-form-item>
        <div class="split-area">
          <el-form-item label="x">
            <el-input-number v-model="pageStyles.boxShadowX" type="text" placeholder="X轴" />
          </el-form-item>
          <el-form-item label="y">
            <el-input-number v-model="pageStyles.boxShadowY" type="text" placeholder="Y轴" />
          </el-form-item>
        </div>
        <div class="split-area">
          <el-form-item label="模糊">
            <el-input-number v-model="pageStyles.boxShadowBlur" />
          </el-form-item>
          <el-form-item label="扩展">
            <el-input-number v-model="pageStyles.boxShadowExtend" />
          </el-form-item>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    data() {
      return {
        actives: [],
        currentBackgroundLocal: '',
        currentBorder: '',
        radiusOptions: [
          {
            label: '固定圆角',
            value: 'fixed'
          },
          {
            label: '独立定义',
            value: 'custom'
          }
        ],
        borderStyleOptions: [
          {
            label: '无边框',
            value: 'none',
            icon: 'iconfont iconquxiao1'
          },
          {
            label: '实线',
            value: 'solid',
            icon: 'iconfont iconshixian'
          },
          {
            label: '虚线',
            value: 'dashed',
            icon: 'iconfont iconxuxian'
          },
          {
            label: '点线',
            value: 'dotted',
            icon: 'iconfont iconxuxian'
          }
        ],
        borderSolidOptions: [
          {
            label: '左上角',
            value: 'none-tl',
            icon: ''
          },
          {
            label: '上边框',
            value: 'top',
            icon: 'iconfont iconshangbiankuang',
            styleValue: 'borderTop'
          },
          {
            label: '右上角',
            value: 'none-tr',
            icon: ''
          },
          {
            label: '左边框',
            value: 'left',
            icon: 'iconfont iconzuobiankuang',
            styleValue: 'borderLeft'
          },
          {
            label: '全部边框',
            value: 'all',
            icon: 'iconfont iconbiankuang',
            styleValue: 'border'
          },
          {
            label: '右边框',
            value: 'right',
            icon: 'iconfont iconyoubiankuang',
            styleValue: 'borderRight'
          },
          {
            label: '左下角边框',
            value: 'none-bl',
            icon: ''
          },
          {
            label: '下边框',
            value: 'bottom',
            icon: 'iconfont iconxiabiankuang',
            styleValue: 'borderBottom'
          },
          {
            label: '右边框',
            value: 'none-br',
            icon: ''
          }
        ],
        fontWeightOptions: [
          {
            label: '正常',
            value: 'normal'
          },
          {
            label: '粗体',
            value: 'bold'
          },
          {
            label: '细体',
            value: 'lighter'
          }
        ],
        floatOptions: [
          {
            label: '不浮动',
            value: 'none',
            icon: 'iconfont iconqingchu'
          },
          {
            label: '左浮动',
            value: 'left',
            icon: 'iconfont iconzuocefudong'
          },
          {
            label: '右浮动',
            value: 'right',
            icon: 'iconfont iconyoucefudong'
          }
        ],
        backgroundSizeOptions: [
          {
            label: '默认',
            value: 'unset'
          },
          {
            label: '等比填充',
            value: 'contain'
          },
          {
            label: '等比覆盖',
            value: 'cover'
          }
        ],
        backgroundRepeatOptions: [
          {
            label: '垂直方向和水平方向重复',
            value: 'repeat',
            icon: 'iconfont iconpingpuzhongfu'
          },
          {
            label: '水平方向重复',
            value: 'repeat-x',
            icon: 'iconfont iconweibiaoti-'
          },
          {
            label: '垂直方向重复',
            value: 'repeat-y',
            icon: 'iconfont iconYzhongfu'
          },
          {
            label: '不重复',
            value: 'no-repeat',
            icon: 'iconfont iconquxiao1'
          }
        ],
        clearOptions: [
          {
            label: '不清除',
            value: 'none',
            icon: 'iconfont iconqingchu'
          },
          {
            label: '左清除',
            value: 'left',
            icon: 'iconfont iconrucan'
          },
          {
            label: '右清除',
            value: 'right',
            icon: 'iconfont iconchucan'
          },
          {
            label: '左右清除',
            value: 'both',
            icon: 'iconfont iconzuoyouchucan'
          }
        ],
        justifyOptions: [
          {
            label: '左对齐',
            value: 'flex-start',
            icon: 'iconfont iconzuoduiqi'
          },
          {
            label: '右对齐',
            value: 'flex-end',
            icon: 'iconfont iconyouduiqi'
          },
          {
            label: '水平居中',
            value: 'center',
            icon: 'iconfont iconjuzhong'
          },
          {
            label: '两端对齐',
            value: 'space-between',
            icon: 'iconfont iconliangduanduiqi2'
          },
          {
            label: '横向平分',
            value: 'space-around',
            icon: 'iconfont iconfont-sx'
          }
        ],
        textAlignOptions: [
          {
            label: '左对齐',
            value: 'left',
            icon: 'iconfont iconzuoduiqi'
          },
          {
            label: '居中',
            value: 'center',
            icon: 'iconfont iconjuzhong'
          },
          {
            label: '右对齐',
            value: 'right',
            icon: 'iconfont iconyouduiqi'
          },
          {
            label: '两队对齐',
            value: 'justify',
            icon: 'iconfont iconliangduanduiqi2'
          }
        ],
        backgroundOptions: [
          {
            label: '颜色填充',
            value: 'color',
            icon: 'iconfont icon25color'
          },
          {
            label: '背景图片',
            value: 'img',
            icon: 'iconfont icon18tupian'
          }
        ],
        backgroundLocalOptions: [
          {
            label: '右上角',
            value: 'topLeft',
            icon: 'iconfont iconzuoshangjiao',
            valueArr: ['0', '0']
          },
          {
            label: '居中',
            value: 'top',
            icon: 'iconfont icondingbu',
            valueArr: ['50%', '0']
          },
          {
            label: '右上角',
            value: 'topRight',
            icon: 'iconfont iconyoushangjiao',
            valueArr: ['100%', '0']
          },
          {
            label: '靠左',
            value: 'left',
            icon: 'iconfont iconkaozuo',
            valueArr: ['0', '50%']
          },
          {
            label: '正中间',
            value: 'center',
            icon: 'iconfont iconjuzhong1',
            valueArr: ['50%', '50%']
          },
          {
            label: '靠右',
            value: 'right',
            icon: 'iconfont iconkaoyou',
            valueArr: ['100%', '50%']
          },
          {
            label: '左下角',
            value: 'leftBottom',
            icon: 'iconfont iconzuoxiajiao',
            valueArr: ['0%', '100%']
          },
          {
            label: '底部',
            value: 'bottom',
            icon: 'iconfont icondibu',
            valueArr: ['50%', '100%']
          },
          {
            label: '右下角',
            value: 'rightBottom',
            icon: 'iconfont iconyouxiajiao',
            valueArr: ['100%', '100%']
          }
        ],
        positionOptions: [
          {
            label: '无定位',
            value: 'static',
            icon: 'iconfont iconnianxingbuju'
          },
          {
            label: '相对定位',
            value: 'relative',
            icon: 'iconfont iconxiangduidingwei'
          },
          {
            label: '绝对定位',
            value: 'absolute',
            icon: 'iconfont iconjueduidingwei'
          },
          {
            label: '固定定位',
            value: 'fixed',
            icon: 'iconfont icongudingmoshi'
          },
          {
            label: '粘性定位',
            value: 'sticky',
            icon: 'iconfont iconnianxingbuju'
          }
        ],
        quickLocalOptions: [
          {
            label: '左上角',
            value: 'topLeft',
            icon: 'iconfont iconzuoshangjiao',
            keyArr: ['left', 'top'],
            valueArr: ['0', '0']
          },
          {
            label: '右上角',
            value: 'topRight',
            icon: 'iconfont iconyoushangjiao',
            keyArr: ['top', 'right'],
            valueArr: ['0', '0']
          },
          {
            label: '左下角',
            value: 'bottomLeft',
            icon: 'iconfont iconzuoxiajiao',
            keyArr: ['left', 'bottom'],
            valueArr: ['0', '0']
          },
          {
            label: '右下角',
            value: 'bottomRight',
            icon: 'iconfont iconyouxiajiao',
            keyArr: ['bottom', 'right'],
            valueArr: ['0', '0']
          },
          {
            label: '靠左',
            value: 'centerLeft',
            icon: 'iconfont iconkaozuo',
            keyArr: ['top', 'left'],
            valueArr: ['50%', '0']
          },
          {
            label: '靠右',
            value: 'centerRight',
            icon: 'iconfont iconkaoyou',
            keyArr: ['top', 'right'],
            valueArr: ['50%', '0']
          },
          {
            label: '底部',
            value: 'centerBottom',
            icon: 'iconfont icondibu',
            keyArr: ['left', 'bottom'],
            valueArr: ['50%', '0']
          },
          {
            label: '顶部',
            value: 'centerTop',
            icon: 'iconfont icondingbu',
            keyArr: ['left', 'top'],
            valueArr: ['50%', '0']
          },
          {
            label: '居中',
            value: 'center',
            icon: 'iconfont iconjuzhong1',
            keyArr: ['top', 'left'],
            valueArr: ['50%', '50%']
          }
        ],
        warpOptions: [
          {
            label: '不换行',
            value: 'nowrap'
          },
          {
            label: '正换行',
            value: 'wrap'
          },
          {
            label: '逆换行',
            value: 'wrap-reverse'
          }
        ],
        alignOptions: [
          {
            label: '起点对齐',
            value: 'flex-start',
            icon: 'iconfont iconqidianduiqi'
          },
          {
            label: '终点对齐',
            value: 'flex-end',
            icon: 'iconfont iconzhongdianduiqi1'
          },
          {
            label: '中点对齐',
            value: 'center',
            icon: 'iconfont iconzhongdianduiqi'
          },
          {
            label: '项目的第一行文字基线对齐',
            value: 'baseline',
            icon: 'iconfont iconxiangmudediyihangwenzijixianduiqi'
          },
          {
            label: '占满整个容器的高度',
            value: 'stretch',
            icon: 'iconfont iconStretch'
          }
        ],
        directionOptions: [
          {
            label: '水平',
            value: 'row'
          },
          {
            label: '逆水平',
            value: 'row-reverse'
          },
          {
            label: '垂直',
            value: 'column'
          },
          {
            label: '逆垂直',
            value: 'column-reverse'
          }
        ],
        displayOptions: [
          {
            label: '弹性',
            value: 'flex',
            icon: 'iconfont icondanxingbuju'
          },
          {
            label: '块',
            value: 'block',
            icon: 'iconfont iconmokuai'
          },
          {
            label: '内联',
            value: 'inline',
            icon: 'iconfont iconneilianbuju'
          },
          {
            label: '内联块',
            value: 'inline-block',
            icon: 'iconfont iconneiliankuaibuju'
          },
          {
            label: '内联块',
            value: 'none',
            icon: 'iconfont iconchakan'
          }
        ]
      };
    },
    computed: {
      ...mapGetters(['designForm', 'currentFormItem', 'pageStyles' ,'pageProps']),
      isPosition() {
        const { position } = this.pageStyles
        return position === 'relative' || position === 'absolute' || position === 'fixed'
      },
      isQuickLocal() {
        const { position } = this.pageStyles
        return position === 'absolute' || position === 'fixed'
      },
      isBackgroundColor() {
        const { backgroundType } = this.pageProps
        return backgroundType === 'color'
      },
      isBackgroundImg() {
        const { backgroundType } = this.pageProps
        return backgroundType === 'img'
      },
      isFixedRadius() {
        const { borderRadiusType } = this.pageProps
        return borderRadiusType === 'fixed'
      },
      isCustomRadius() {
        const { borderRadiusType } = this.pageProps
        return borderRadiusType === 'custom'
      }
    },
    methods: {
      ...mapMutations({
        setPageQuickLocal: 'SET_PAGE_QUICK_LOCAL',
        setPageStyles: 'SET_PAGE_STYLES',
        setPageProps: 'SET_PAGE_PROPS'
      }),
      handleBorderClick(border) {
        if (border.icon) {
          this.currentBorder = border.value
          const props = {
            key: 'borderType',
            value: border.styleValue
          }
          this.setPageProps(props)
        }
      },
      handleBackgroundLocalClick(item) {
        this.currentBackgroundLocal = item.value
        const arr = item.valueArr
        const positionX = {
          key: 'backgroundPositionX',
          value: arr[0]
        }
        const positionY = {
          key: 'backgroundPositionY',
          value: arr[1]
        }
        const position = {
          key: 'backgroundPosition',
          value: `${arr[0]} ${arr[1]}`
        }
        this.setPageStyles(position)
        this.setPageStyles(positionX)
        this.setPageStyles(positionY)
      },
      onInputChange() {
        console.log(this.pageStyles)
      },
      onQuickLocalChange(value) {
        const current = this.quickLocalOptions.find(item => item.value === value)
        this.setPageQuickLocal(current)
      },
      handleChange(value) {
      },
      formatTooltip(value) {
        return value / 100
      },
      onInput(a) {
        console.log(a, this.value)
      }
    }
  }
</script>
<style lang="scss">
  .styles-options-warp {
    .title-top {
      padding: 15px;
      background-color: $lightBackground;
      font-size: 14px;
      color: $info;
      border-bottom: 1px solid $border;
    }
    .split-area {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .el-form-item {
        width: 45%;
      }
      .el-input-number--small {
        width: 100%;
      }
    }
    .spe-div {
      width: 50%;
      .el-form-item {
        width: 100%;
        &:first-child {
          margin-bottom: 0 !important;
        }
        &:last-child {
          .el-form-item__label {
            padding-bottom: 2px;
          }
        }
      }
    }
    .color-picker {
      width: 100%;
      .el-color-picker__trigger {
        width: 100%;
      }
    }
    .background-local-area {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      border: 1px solid $border;
      border-right: 0;
      border-top: 0;
      border-radius: 2px;
      .item {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $generalFontColor;
        border-top: 1px solid $border;
        border-right: 1px solid $border;
        cursor: pointer;
        transition: color .3s ease;
        &:hover {
          color: $skyBlue;
        }
        &.current {
          color: $skyBlue;
        }
      }
    }
    .margin-padding-area {
      .margin-box {
        padding: 32px;
        background-color: #ECF5FF;
        border: 1px dashed $skyBlue;
        position: relative;
        .edit-ipt {
          position: absolute;
          .el-input__inner {
            border: 0;
            background-color: transparent;
            text-align: center;
            color: $generalFontColor;
            font-size: 12px;
          }
          &.top {
            width: 100%;
            left: 0;
            top: 0;
          }
          &.bottom {
            width: 100%;
            bottom: 0;
            left: 0;
          }
          &.left {
            width: 100px;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
            .el-input__inner {
              text-align: left;
            }
          }
          &.right {
            width: 100px;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            .el-input__inner {
              text-align: right;
            }
          }
          &.special {
            width: 32px;
            padding: 0 0 0 2px;
            .el-input__inner {
              padding: 0;
              text-align: center;
            }
          }
        }
        .tip-text {
          position: absolute;
          top: 0;
          left: 5px;
          color: $skyBlue;
        }
      }
      .padding-box {
        padding: 25px;
        border: 1px dashed $skyBlue;
        background-color: #ECF5FF;
        position: relative;
        .text-tip {
          color: $skyBlue;
          text-align: center;
          position: absolute;
          top: 2px;
          left: 5px;
        }
        .place-box{
          height: 20px;
        }
      }
    }
  }
</style>
