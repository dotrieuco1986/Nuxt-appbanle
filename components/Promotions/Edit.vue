<template>
    <div>
        <b-row>
            <b-col sm="12" class="py-3">
                <label class="label-title">{{ title }}</label>
            </b-col>
        </b-row>

        <b-container fluid>
            <b-form @submit="onSubmit">
                <b-form-row class="w-100">
                    <b-col class="ml-2 col mr-5">
                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Mã khuyến mãi</label>
                            </b-col>
                            <b-col sm="9">
                                <input
                                    v-model="promotion.code"
                                    type="text"
                                    required
                                    placeholder="Nhập mã khuyến mãi"
                                >
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Loại khuyến mãi</label>
                            </b-col>
                            <b-col sm="9">
                                <SelectPromotionType
                                    v-model="promotion.format.type"
                                    :options="promotion.formatOptions"
                                />
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Mức giảm</label>
                            </b-col>
                            <b-col sm="9">
                                <input
                                    v-model="promotion.format.value.value"
                                    :disabled="!enable.promotion_format_value_value"
                                    type="number"
                                    required
                                    placeholder="Nhập Mức giảm"
                                >
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Mức giảm tối đa</label>
                            </b-col>
                            <b-col sm="9">
                                <input
                                    v-model="promotion.format.value.max"
                                    :disabled="!enable.promotion_format_value_max"
                                    type="number"
                                    required
                                    placeholder="Nhập mức giảm tối đa"
                                >
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto" />
                            <b-col sm="9">
                                <div class="d-flex align-items-center">
                                    <label>Không giới hạn</label>
                                    <b-form-checkbox
                                        v-model="promotion.format.value.unlimited"
                                        :disabled="!enable.promotion_format_value_unlimited"
                                        class="ml-auto"
                                    />
                                </div>
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Áp dụng cho đơn hàng</label>
                            </b-col>
                            <b-col sm="9">
                                <SelectPromotionType
                                    v-model="promotion.condition.type"
                                    :options="promotion.conditionOptions"
                                />
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Giá trị đơn hàng</label>
                            </b-col>
                            <b-col sm="9">
                                <input
                                    v-model="promotion.condition.value"
                                    :disabled="!enable.promotion_condition_value"
                                    class="w-100"
                                    type="number"
                                    required
                                    placeholder="Nhập giá trị đơn hàng"
                                >
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label for="valueConditionInput">Áp dụng cho cửa hàng</label>
                            </b-col>
                            <b-col sm="9">
                                <div class="promotion-container-business">
                                    <div
                                        v-for="(item, index) in promotion.business.list"
                                        :key="item.value"
                                        class="d-flex align-items-center"
                                        :class="{
                                            'promotion-border-bottom':
                                                index + 1 < promotion.business.list.length,
                                        }"
                                    >
                                        <div>
                                            <span> {{ index + 1 }}. {{ item.name }} </span>
                                        </div>
                                        <div class="ml-auto promotion-margin-5">
                                            <b-form-checkbox
                                                v-model="item.selected"
                                                :disabled="!enable.promotion_business_list"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto" />
                            <b-col sm="9">
                                <div class="d-flex align-items-center">
                                    <b-form-checkbox v-model="promotion.business.all" />
                                    <label lass="ml-2">Áp dụng cho tât cả cửa hàng</label>
                                </div>
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label for="valueConditionInput">Kích hoạt</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-checkbox v-model="promotion.enable" switch size="lg" />
                            </b-col>
                        </b-form-row>
                    </b-col>
                    <b-col>
                        <b-form-row class="py-2">
                            <b-col sm="2" class="my-auto">
                                <label>Mô tả:</label>
                            </b-col>
                            <b-col sm="10">
                                <input
                                    v-model="promotion.description"
                                    type="text"
                                    required
                                    placeholder="Nhập mô tả"
                                >
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Thời gian bắt đầu</label>
                            </b-col>
                            <b-col sm="9">
                                <Datetime id="startTime" v-model="promotion.time.start" label="Chọn thời gian bắt đầu" required />
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label>Thời gian kết thúc</label>
                            </b-col>
                            <b-col sm="9">
                                <Datetime
                                    id="endTime"
                                    v-model="promotion.time.end"
                                    :disabled="!enable.promotion_time_end"
                                    required
                                    label="Chọn thời gian kết thúc"
                                />
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto" />
                            <b-col sm="9">
                                <div class="d-flex align-items-center">
                                    <label>Không hết hạn</label>
                                    <b-form-checkbox
                                        v-model="promotion.time.unlimited"
                                        class="ml-auto"
                                    />
                                </div>
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto">
                                <label for="codeInput">Số lần sử dụng</label>
                            </b-col>
                            <b-col sm="9">
                                <input
                                    v-model="promotion.numberOfUses.value"
                                    :disabled="!enable.promotion_numberOfUses_value"
                                    type="number"
                                >
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto" />
                            <b-col sm="9">
                                <div class="d-flex align-items-center">
                                    <label>Không giới hạn</label>
                                    <b-form-checkbox
                                        v-model="promotion.numberOfUses.unlimited"
                                        class="ml-auto"
                                    />
                                </div>
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="8" class="my-auto">
                                <label
                                    for="codeInput"
                                >Số lần sử dụng tối đa của khách hàng</label>
                            </b-col>
                            <b-col sm="4">
                                <input
                                    v-model="promotion.numberOfUsesPerCustomer.value"
                                    :disabled="!enable.promotion_numberOfUsesPerCustomer_value"
                                    type="number"
                                >
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col sm="3" class="my-auto" />
                            <b-col sm="9">
                                <div class="d-flex align-items-center">
                                    <label>Không hết hạn số lần</label>
                                    <b-form-checkbox
                                        v-model="promotion.numberOfUsesPerCustomer.unlimited"
                                        class="ml-auto"
                                    />
                                </div>
                            </b-col>
                        </b-form-row>

                        <b-form-row class="py-2">
                            <b-col>
                                <div class="d-flex align-items-center">
                                    <label>Cho phép sử dụng chung với chương trình khuyến mãi
                                        khác</label>
                                    <b-form-checkbox v-model="promotion.shared" class="ml-auto" />
                                </div>
                            </b-col>
                        </b-form-row>
                    </b-col>

                    <b-col sm="12">
                        <div class="d-flex align-items-center justify-content-center">
                            <button variant="primary" class="mr-5 promotion-button-cancel" type="button" @click="cancel">
                                Bỏ Qua
                            </button>
                            <button variant="primary" class="ml-5 promotion-button-apply">
                                Hoàn Tất
                            </button>
                        </div>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-container>
    </div>
</template>
<script>
import Datetime from 'vue-ctk-date-time-picker'
import SelectPromotionType from '../../components/Promotions/SelectPromotionType'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import { ConstantsJS } from '../../static/constants'
export default {
    layout: 'admin',
    components: {
        SelectPromotionType,
        Datetime
    },

    data () {
        return {
            promotion: {
                code: '',
                format: {
                    type: { value: '', name: '' },
                    value: { value: '', max: '', unlimited: true }
                },
                condition: {
                    type: { value: '', name: '' },
                    value: ''
                },
                business: {
                    all: false,
                    list: []
                },
                enable: true,
                description: '',
                time: {
                    start: '',
                    end: '',
                    unlimited: true
                },
                numberOfUses: {
                    value: '',
                    unlimited: true
                },
                numberOfUsesPerCustomer: {
                    value: '',
                    unlimited: true
                },
                shared: true,
                formatOptions: [],
                conditionOptions: []
            },
            enable: {
                promotion_format_value_value: true,
                promotion_format_value_max: false,
                promotion_format_value_unlimited: true,
                promotion_condition_value: false,
                promotion_business_list: true,
                promotion_time_end: false,
                promotion_numberOfUses_value: false,
                promotion_numberOfUsesPerCustomer_value: false
            },
            title: ''
        }
    },
    watch: {
        'promotion.format.type' () {
            if (
                this.promotion.format.type.value ===
        this.promotion.formatOptions[0].value
            ) {
                this.enable.promotion_format_value_value = true
                this.enable.promotion_format_value_max = false
                this.enable.promotion_format_value_unlimited = true
            } else if (
                this.promotion.format.type.value ===
        this.promotion.formatOptions[1].value
            ) {
                this.enable.promotion_format_value_value = true
                this.enable.promotion_format_value_max = false
                this.enable.promotion_format_value_unlimited = false
            } else if (
                this.promotion.format.type.value ===
        this.promotion.formatOptions[2].value
            ) {
                this.enable.promotion_format_value_value = false
                this.enable.promotion_format_value_max = false
                this.enable.promotion_format_value_unlimited = true
            }
        },
        'promotion.format.value.unlimited' () {
            if (this.promotion.format.value.unlimited) {
                this.enable.promotion_format_value_max = false
            } else {
                this.enable.promotion_format_value_max = true
            }
        },
        'promotion.condition.type' () {
            if (
                this.promotion.condition.type.value ===
        this.promotion.conditionOptions[0].value
            ) {
                this.enable.promotion_condition_value = false
                this.promotion.condition.value = ''
            } else if (
                this.promotion.condition.type.value ===
        this.promotion.conditionOptions[1].value
            ) {
                this.enable.promotion_condition_value = true
            }
        },
        'promotion.business.all' () {
            if (this.promotion.business.all) {
                this.enable.promotion_business_list = false
                this.promotion.business.list.forEach((element) => {
                    element.selected = true
                })
            } else {
                this.enable.promotion_business_list = true
                this.promotion.business.list.forEach((element) => {
                    element.selected = false
                })
            }
        },
        'promotion.time.unlimited' () {
            if (this.promotion.time.unlimited) {
                this.enable.promotion_time_end = false
                this.promotion.time.end = ''
            } else {
                this.enable.promotion_time_end = true
            }
        },
        'promotion.numberOfUses.unlimited' () {
            if (this.promotion.numberOfUses.unlimited) {
                this.enable.promotion_numberOfUses_value = false
                this.promotion.numberOfUses.value = ''
            } else {
                this.enable.promotion_numberOfUses_value = true
            }
        },
        'promotion.numberOfUsesPerCustomer.unlimited' () {
            if (this.promotion.numberOfUsesPerCustomer.unlimited) {
                this.enable.promotion_numberOfUsesPerCustomer_value = false
                this.promotion.numberOfUsesPerCustomer.value = ''
            } else {
                this.enable.promotion_numberOfUsesPerCustomer_value = true
            }
        }
    },
    mounted () {
        if (this.$route.name === ConstantsJS.ROUTES_NAME.ADMIN.PROMOTION.CREATE) {
            this.title = 'Tạo khuyến mãi'
            this.$api.promotions.createPromotion().then((res) => {
                if (res.status === 'OK') {
                    this.promotion = res.data
                    this.promotion.format.type = this.promotion.formatOptions[0]
                    this.promotion.condition.type = this.promotion.conditionOptions[0]
                }
            })
        } else if (
            this.$route.name === ConstantsJS.ROUTES_NAME.ADMIN.PROMOTION.EDIT
        ) {
            this.title = 'Chỉnh sửa khuyến mãi'
            this.$api.promotions.editPromotion(this.$route.params.id).then((res) => {
                if (res.status === 'OK') {
                    this.promotion = res.data
                    this.promotion.formatOptions.forEach((element) => {
                        if (this.promotion.format.type.value === element.value) {
                            this.promotion.format.type = element
                        }
                    })
                    this.promotion.conditionOptions.forEach((element) => {
                        if (this.promotion.condition.type.value === element.value) {
                            this.promotion.condition.type = element
                        }
                    })
                }
            })
        }
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault()
            this.$api.promotions.updatePromotion(this.promotion).then((res) => {
                if (res.status === 'OK') {
                    this.$router.push({
                        name: ConstantsJS.ROUTES_NAME.ADMIN.PROMOTION.INDEX
                    })
                }
            })
        },
        cancel (evt) {
            evt.preventDefault()
            this.$api.promotions.updatePromotion(this.promotion).then((res) => {
                if (res.status === 'OK') {
                    this.$router.push({
                        name: ConstantsJS.ROUTES_NAME.ADMIN.PROMOTION.INDEX
                    })
                }
            })
            return false
        }
    }
}
</script>

<style  scoped>
input {
  border: 1px solid #ced4da;
  height: 35px;
  font-size: 14px;
}
.label-title{
    color: #ff8f5f;
    font-weight: bold;
    font-size: 16px;
}

label,
span {
  color: #626262;
  font-weight: normal;
  font-size: 14px;
}

.promotion-container-business {
  padding: 10px;
  border: 1px solid #ced4da;
  max-height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
}

.promotion-border-bottom {
  border-bottom: 1px solid #ced4da;
}

button {
  width: 100px;
  height: 40px;
  border-radius: 15px;
  border: none;
  font-size: 14px;
  justify-content: center;
  padding-top: 12px;
}

.promotion-button-apply {
  background-color: #ff8f5f;
  color: white;
}

.promotion-button-cancel {
  background-color: #c7c7c7;
}
</style>
<style >
#startTime-wrapper div, #endTime-wrapper div{
  margin-bottom: 0px;
}

#startTime-input,#endTime-input {
  border-radius: 0px !important;
}
</style>
