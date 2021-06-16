<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    size="mini"
    label-width="120px"
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="会议类型:" prop="typeId">
          <el-select
            v-model="form.typeId"
            clearable
            placeholder="请选择会议类型"
            style="width: 100%;"
          >
            <el-option
              v-for="item in info.types"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否涉密:" prop="secret">
          <el-radio-group v-model="form.secret">
            <el-radio-button
              v-for="(item, ind) in info.secrets"
              :key="`secrets-${ind}`"
              :label="ind"
            >
              {{ item }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="会议人数:" prop="num">
          <el-input v-model.trim.number="form.num">
            <template slot="append">
              <span style="color: red;">(容纳{{ capacity }}人)</span>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="院内承办单位:" prop="orgId">
          <el-select
            v-model="form.orgId"
            clearable
            filterable
            placeholder="请选择院内承办单位"
            style="width: 100%;"
          >
            <el-option
              v-for="item in info.orgs"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系人:" prop="contacts">
          <el-input v-model.trim="form.contacts" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机:" prop="mobile">
          <el-input v-model.trim="form.mobile" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="会议主题:" prop="subject">
      <el-input v-model.trim="form.subject" />
    </el-form-item>
    <el-form-item label="会议简介:" prop="introduction">
      <el-input v-model.trim="form.introduction" />
    </el-form-item>
    <el-form-item label="参与单位:" prop="participateUnits">
      <el-input v-model.trim="form.participateUnits" />
    </el-form-item>
    <template v-for="(item, ind) in items">
      <el-row v-if="Array.isArray(item)" :key="`form-item-${ind}`">
        <el-col v-for="col in item" :key="col.prop" :span="12">
          <el-form-item :label="`${col.label}:`" :prop="col.prop">
            <br-item :form="form" :item="col" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-else :key="`form-item-${ind}`" :label="`${item.label}:`" :prop="item.prop">
        <br-item :form="form" :item="item" />
      </el-form-item>
    </template>
    <el-form-item label="投影仪:" prop="projector">
      <el-radio-group v-model="form.projector">
        <el-radio-button
          v-for="(item, ind) in info.projector"
          :key="`projector-${ind}`"
          :label="item"
        >
          {{ item }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="备注:">
      <el-input v-model.trim="form.remark" type="textarea" />
    </el-form-item>
  </el-form>
</template>
<script>
import Rules from './rules'
import { getFormInfo, getOrg } from '@/api/boardroom'

export default {
  components: {
    BrItem: () => import('./item')
  },
  mixins: [Rules],
  props: {
    capacity: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      info: {
        types: [],
        orgs: [],
        secrets: ['否', '是'],
        projector: ['需要', '不需要']
      },
      items: [
        {
          prop: 'leaders',
          label: '参会领导',
          options: {
            major: '无院领导或其他单位局级以上领导参会',
            minor: [],
            tips: '若有局级以上领导参会，请选择：',
            multiple: true
          },
          edit: {
            prop: 'otherLeaders',
            label: '其他单位局级以上参会领导姓名',
            visible: true,
            non: true
          }
        },
        [
          {
            prop: 'photograph',
            label: '照相',
            options: {
              major: '无院领导参会或参会领导明确不照相',
              minor: [
                '订会单位自行通知宣传部',
                '委托接待科转告宣传部',
                '待确认'
              ],
              tips: '若领导明确只是需要照相，请选择：'
            }
          },
          {
            prop: 'tableCard',
            label: '桌卡',
            options: {
              major: '不需要',
              minor: [
                '带勘探院名称的院卡',
                '带会议名称的粉卡'
              ],
              tips: '若需要，请选择：'
            }
          }
        ],
        [
          {
            prop: 'banner',
            label: '横幅',
            options: {
              major: '不需要',
              minor: [
                '订会单位自行订购、悬挂',
                '委托接待科(文本框内填写横幅内容)'
              ],
              tips: '若需要，请选择：'
            },
            edit: {
              prop: 'bannerTxt',
              label: '横幅内容',
              visible: false,
              for: 1 // minor index
            }
          },
          {
            prop: 'signpost',
            label: '指路牌',
            options: {
              major: '不需要',
              minor: new Array(6).fill('个').map((i, j) => `${j + 1}${i}`),
              tips: '若需要，请选择：'
            }
          }
        ],
        [
          {
            prop: 'paper',
            label: '摆台纸',
            options: {
              major: '不需要',
              minor: [
                '空白纸',
                '院标抬头纸'
              ],
              tips: '若需要，请选择：'
            }
          },
          {
            prop: 'pen',
            label: '摆台笔',
            options: {
              major: '不需要',
              minor: [
                '黑铅笔',
                '红铅笔',
                '签字笔'
              ],
              tips: '若需要，请选择：',
              multiple: true
            }
          }
        ],
        [
          {
            prop: 'computer',
            label: '电脑',
            options: {
              major: '不需要',
              minor: [
                '订会单位自带笔记本电脑',
                '委托接待科提前布置'
              ],
              tips: '若需要，请选择：'
            }
          },
          {
            prop: 'keepSecret',
            label: '保密',
            options: {
              major: '不需要',
              minor: [
                '屏蔽器',
                '手机屏蔽柜'
              ],
              tips: '若涉密，请选择：',
              multiple: true
            }
          }
        ]
      ],
      form: {
        id: null,
        typeId: null,
        // typeName: null,
        secret: null,
        orgId: null,
        // orgName: null,
        num: null,
        contacts: null,
        mobile: null,
        subject: null,
        introduction: null,
        participateUnits: null,
        leaders: [],
        otherLeaders: null,
        photograph: null,
        tableCard: null,
        banner: null,
        bannerTxt: null,
        signpost: null,
        // report: null, // hide
        projector: null,
        computer: null,
        paper: null,
        pen: [],
        keepSecret: [],
        remark: null
      }
    }
  },
  created() {
    getFormInfo().then(({ data: { types, leaders }}) => {
      this.$set(this.info, 'types', types)
      this.$set(this.items[0].options, 'minor', leaders.map(({ name }) => name))
    })
    getOrg().then(({ data }) => this.$set(this.info, 'orgs', data))
  },
  methods: {
    getFormData() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { bannerTxt, ...other } = this.form
            bannerTxt && (other.banner = `${other.banner}：${bannerTxt}`)
            Object.keys(other).forEach(k =>
              Array.isArray(other[k]) && (other[k] = other[k].join('，')))

            const gn = k => (this.info[`${k}s`].find(it => it.id === other[`${k}Id`]) || {}).name
            resolve(Object.assign(other, { typeName: gn('type'), orgName: gn('org') }))
          } else {
            reject()
          }
        })
      })
    }
  }
}
</script>
<style scoped>
/* .el-form .el-form-item {
  border-top: 1px dashed gray;
  padding-top: 10px;
} */
</style>
