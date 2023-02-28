<template>
    <div id="create-business">
        <side-bar id="side-bar-create-business" no-btn-close right>
            <div class="vscrollbar">
                <p class="font-size-16">
                    Vui lòng nhập đủ thông tin để tạo mức độ tin cậy cho
                    cửa hàng của bạn
                </p>
                <trust :reliability="score" />
                <div :id="idTagNextPrev.one" class="infomation font-size-14">
                    <div class="margin-bottom-18">
                        <p>Tên cửa hàng <span class="color-red">*</span></p>
                        <label>
                            <input
                                v-model="inputBusinessName"
                                class="input-tag-one"
                                type="text"
                                :name="nameInput.tagInfoOne.businessName"
                                placeholder="Nhập tên cửa hàng"
                                maxlength="200"
                                required
                            >
                        </label>
                        <span :id="nameInput.tagInfoOne.businessName + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Tên người đại diện <span class="color-red">*</span></p>
                        <label>
                            <input
                                v-model="inputBusinessRepresentativeName"
                                class="input-tag-one"
                                type="text"
                                :name="nameInput.tagInfoOne.businessRepresentativeName"
                                placeholder="Nhập tên người đại diện"
                                maxlength="200"
                                required
                            >
                        </label>
                        <span
                            :id="nameInput.tagInfoOne.businessRepresentativeName + strError"
                            class="color-red clear-error"
                        />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Địa chỉ kinh doanh/địa chỉ chi nhánh <span class="color-red">*</span></p>
                        <label id="auto-complete">
                            <auto-complete
                                ref="autocomplete"
                                :url-autocomplete="'street/autocomplete'"
                                :submit-value="getDataAutocomplete"
                                :clear-value="setNullAddress"
                                :autocomplete-text="inputBusinessInfo.addesss"
                                input-style="border-radius: 5px; padding-right: 100px;"
                                icon-style="right: 35px;"
                            />
                            <img src="@/assets/image/icon/target-current.svg" @click="goToAddress">
                        </label>
                        <label class="d-none">
                            <input
                                v-model="inputBusinessInfo.addesss"
                                class="input-tag-one"
                                type="text"
                                :name="nameInput.tagInfoOne.businessAddress"
                                placeholder="Nhập địa chỉ"
                                required
                            >
                        </label>
                        <p class="note-color-green">
                            Tìm một địa chỉ muốn tạo và click
                            <img src="@/assets/image/icon/target-current.svg" @click="goToAddress">
                            để đi tới.
                        </p>
                        <span :id="nameInput.tagInfoOne.businessAddress + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Mặt hàng phân phối <span class="color-red">*</span></p>
                        <div>
                            <vue-tree-select
                                v-model="selectedDistributionItems"
                                :name="nameInput.tagInfoOne.businessProduct"
                                :multiple="false"
                                :disable-branch-nodes="true"
                                :options="optionsDistributionItems"
                                placeholder="Chọn một mặt hàng phân phối"
                            />
                            <span :id="nameInput.tagInfoOne.businessProduct + strError" class="color-red clear-error" />
                        </div>
                        <label class="d-none">
                            <input
                                v-model="selectedDistributionItems"
                                class="input-tag-one"
                                type="text"
                                :name="nameInput.tagInfoOne.businessProduct"
                                placeholder="Chọn một mặt hàng phân phối"
                                required
                            >
                        </label>
                    </div>
                    <div class="margin-bottom-18">
                        <p>Giờ hoạt động của cửa hàng <span class="color-red">*</span></p>
                        <label class="setting-icon" @click="showModalOpenHours">
                            <textarea
                                class="input-tag-one"
                                :name="nameInput.tagInfoOne.businessOpenHours"
                                placeholder="Nhập giờ mở cửa"
                                :value="strEdit"
                                contenteditable="true"
                                readonly
                                required
                            />
                            <svg-icon icon="calendar" class="image-calendar" grow-by-height="22px" />
                        </label>
                        <span :id="nameInput.tagInfoOne.businessOpenHours + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Hình ảnh thật của cửa hàng sản phẩm phân phối <span class="color-red">*</span></p>
                        <image-selection ref="businessImage" />
                        <span :id="nameInput.tagInfoOne.businessImg + strError" class="color-red clear-error" />
                        <div class="color-07070 margin-top-10">
                            Chấp nhận file ảnh, kích thước max 5Mb
                        </div>
                        <label class="d-none">
                            <input
                                class="input-tag-one"
                                type="text"
                                :name="nameInput.tagInfoOne.businessImg"
                                required
                            >
                        </label>
                    </div>
                    <div class="text-align-right">
                        <button
                            type="button"
                            class="btn btn-primary button-next font-size-16"
                            @click="actionPrevNextTag(idTagNextPrev.one, idTagNextPrev.two, 'input-tag-one')"
                        >
                            Tiếp
                        </button>
                    </div>
                </div>
                <div :id="idTagNextPrev.two" class="infomation font-size-14 d-none">
                    <div class="margin-bottom-18">
                        <p>Điện thoại <span class="color-red">*</span></p>
                        <label>
                            <input
                                v-model="inputBusinessTelephone"
                                class="input-tag-two"
                                type="text"
                                :name="nameInput.tagInfoTwo.businessTelephone"
                                placeholder="Nhập số điện thoại"
                                maxlength="15"
                                patterns="^(\+84|\d)\d{7,15}$"
                                required
                            >
                        </label>
                        <span :id="nameInput.tagInfoTwo.businessTelephone + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Email</p>
                        <label>
                            <input
                                v-model="inputBusinessEmail"
                                class="input-tag-two"
                                type="text"
                                :name="nameInput.tagInfoTwo.businessEmail"
                                placeholder="Nhập email"
                                patterns="^(([^<>()\[\]\.,;:\s@\&quot;]+(\.[^<>()\[\]\.,;:\s@\&quot;]+)*)|(\&quot;.+\&quot;))@(([^<>()[\]\.,;:\s@\&quot;]+\.)+[^<>()[\]\.,;:\s@\&quot;]{2,})$"
                                maxlength="180"
                            >
                        </label>
                        <span :id="nameInput.tagInfoTwo.businessEmail + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Trang web</p>
                        <label>
                            <input
                                v-model="inputBusinessWebsite"
                                class="input-tag-two"
                                type="text"
                                :name="nameInput.tagInfoTwo.businessWebside"
                                placeholder="Nhập trang web"
                                maxlength="200"
                                patterns="\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]\{\};:\'.,<>?«»“”‘’]))"
                            >
                        </label>
                        <span :id="nameInput.tagInfoTwo.businessWebside + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Facebook</p>
                        <label>
                            <input
                                v-model="inputBusinessFacebook"
                                class="input-tag-two"
                                type="text"
                                :name="nameInput.tagInfoTwo.businessFacebook"
                                placeholder="Nhập Facebook"
                                maxlength="200"
                                patterns="^(?:(?:http|https):\/\/)?(?:www.)?(?:facebook.com|fb.com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?"
                            >
                        </label>
                        <span :id="nameInput.tagInfoTwo.businessFacebook + strError" class="color-red clear-error" />
                    </div>
                    <div class="row m-0">
                        <div class="col-6 p-0">
                            <p
                                type="button"
                                class="btn btn-primary button-previous"
                                @click="actionPrevNextTag(idTagNextPrev.two, idTagNextPrev.one, null)"
                            >
                                <img src="@/assets/image/icon/icon-previous.svg">
                            </p>
                        </div>
                        <div class="text-align-right col-6 p-0">
                            <p
                                type="button"
                                class="btn btn-primary button-next font-size-16"
                                @click="actionPrevNextTag(idTagNextPrev.two,idTagNextPrev.three, 'input-tag-two')"
                            >
                                Tiếp
                            </p>
                        </div>
                    </div>
                </div>
                <div :id="idTagNextPrev.three" class="infomation font-size-14 d-none">
                    <div class="margin-bottom-18">
                        <p>Loại hình hoạt động</p>
                        <b-form-select
                            v-model="selectedCompanySize"
                            class="height-40 font-size-14"
                            :options="optionsCompanySize"
                            :name="nameInput.tagInfoThree.businessSize"
                        />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Căn cước công dân/CMND/Hộ chiếu</p>
                        <label>
                            <input
                                v-model="inputBusinessPassPort"
                                class="input-tag-three"
                                type="text"
                                :name="nameInput.tagInfoThree.businessPassport"
                                placeholder="Nhập căn cước công dân/ CMND/ hộ chiếu"
                                maxlength="20"
                            >
                        </label>
                        <span :id="nameInput.tagInfoThree.businessPassport + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <p>Ngành nghề</p>
                        <div>
                            <b-form-select
                                v-model="selectedBusinessJobs"
                                class="height-40 font-size-14"
                                :options="optionsBusinessJobs"
                                :name="nameInput.tagInfoThree.businessJob"
                                @change="getSelectedItem"
                            />
                        </div>
                        <p class="note-color-green">
                            Chỉ chọn được một ngành nghề
                        </p>
                        <span :id="nameInput.tagInfoThree.businessJob + strError" class="color-red clear-error" />
                    </div>
                    <div class="margin-bottom-18">
                        <b-checkbox
                            v-for="item in arrayDataCheckBox"
                            v-show="item.idBusinessJob === idShowCheckbox"
                            :id="'cb-business-' + item.id"
                            :key="item.id"
                            v-model="checkedCategories"
                            :value="item.id"
                        >
                            {{ item.text }}
                        </b-checkbox>
                    </div>
                    <div class="row m-0">
                        <div class="col-6 p-0">
                            <p
                                type="button"
                                class="btn btn-primary button-previous"
                                @click="actionPrevNextTag(idTagNextPrev.three, idTagNextPrev.two,null)"
                            >
                                <img src="@/assets/image/icon/icon-previous.svg">
                            </p>
                        </div>
                        <div class="text-align-right col-6 p-0">
                            <p
                                type="button"
                                class="btn btn-primary button-next font-size-16"
                                @click="createBusiness"
                            >
                                Gửi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </side-bar>
        <modal id="modal-open-hours">
            <header class="modal-header">
                <h5 class="modal-title">
                    GIỜ MỞ CỬA
                </h5>
            </header>
            <div class="modal-body">
                <div class="border-bottom-1" />
                <div class="group-day-time">
                    <div class="group-day">
                        <button
                            v-for="item in listDay"
                            :id="item.day"
                            :key="item.day"
                            type="button"
                            :class="(currentDay === item.day ? listColorButton.classChoosing :
                                item.isOpen ? listColorButton.classOpen : listColorButton.classClose)"
                            @click="changeDayItem"
                        >
                            {{ item.name }}
                        </button>
                    </div>
                    <div class="row m-0 padding-top-15">
                        <div class="col-6 p-0">
                            <b-form-checkbox v-model="open" name="check-button" switch size="lg">
                                <span>&nbsp;&nbsp;&nbsp;Mở cửa
                                    <span v-show="openFullDay && open">&nbsp;&nbsp;&nbsp;(Mở cửa cả ngày)</span>
                                </span>
                            </b-form-checkbox>
                        </div>
                        <div class="col-6 p-0 text-right font-size-14 padding-top-5">
                            <span
                                v-show="open"
                                class="orange cursor-pointer"
                                @click="addTagOpenHour(true)"
                            ><u> Thêm giờ mở cửa </u></span>
                        </div>
                    </div>
                </div>
                <div class="background-color-light-blue">
                    <range-slider-time
                        ref="rangeSlider"
                        :arr-data-range-slider="arrayRangeSlider"
                    />
                </div>
            </div>
            <footer class="modal-footer">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="closeModalOpenHours"
                >
                    HOÀN TẤT
                </button>
            </footer>
        </modal>

        <modal id="modal-create-business-success" @closeModal="goToNewBusiness">
            <div class="modal-body">
                <p> Chúc mừng bạn đã tạo kênh bán thành công.</p>
                <label class="font-weight-normal">Vui lòng đến&nbsp;
                    <n-link to="/admin/stores/list">
                        <p class="text-button">
                            quản lý kênh bán
                        </p>
                    </n-link>
                    &nbsp;để cập nhật sản phẩm của bạn.</label>
            </div>
            <footer class="modal-footer">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="goToNewBusiness"
                >
                    OK
                </button>
            </footer>
        </modal>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import ImageSelection from '@/components/ImageSelection.vue'
import Trust from '@/components/BusinessDetail/Trust'
import Modal from '@/components/modal/Modal.vue'
import RangeSliderTime from '@/components/RangeSliderTime.vue'
import VueTreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import AutoComplete from '@/components/AutoComplete'
import { ConstantsJS } from 'static/constants'
import svgIcon from '~/components/common/SvgIcon.vue'

export default {
    components: {
        Trust,
        SideBar,
        ImageSelection,
        Modal,
        RangeSliderTime,
        VueTreeSelect,
        AutoComplete,
        svgIcon
    },
    async fetch () {
        let data = await this.$api.store.getCategories()
        if (data.status === 200 || data.status === 'OK') {
            this.listPLCSKD = data.data
            data.data.forEach((value) => {
                if (value.parent_id === null) {
                    const item = {
                        id: value.id,
                        label: value.name.toUpperCase(),
                        children: []
                    }
                    data.data.forEach((val) => {
                        if (val.parent_id === value.id) {
                            const childItem = { id: val.id, label: val.name }
                            item.children.push(childItem)
                        }
                    })
                    if (item.children.length <= 0) {
                        item.id = value.id + 'S'
                        const childItem = { id: value.id, label: value.name }
                        item.children.push(childItem)
                    }
                    this.optionsDistributionItems.push(item)
                }
            })
        }
        data = await this.$api.store.getIndustryCertifications()
        if (data.status === 200) {
            data.data.forEach((value) => {
                value.items.forEach((val) => {
                    const item1 = { id: null, idBusinessJob: null, text: '', check: false }
                    item1.idBusinessJob = value.id
                    item1.text = val.name
                    item1.id = val.id
                    this.arrayDataCheckBox.push(item1)
                })
                const item2 = { value: value.id, text: value.name }
                this.optionsBusinessJobs.push(item2)
            })
        }
        data = await this.$api.store.getActivityTypes()
        if (data.status === 200) {
            data.data.forEach((value) => {
                const item = { value: value.id, text: value.name }
                this.optionsCompanySize.push(item)
            })
        }
    },
    data () {
        return {
            idNewBusiness: null,
            point: {
                lat: null,
                lng: null
                // lat: 10.775433014355661,
                // lng: 106.70481652021408
            },
            listPLCSKD: null,
            strEdit: null,
            isChangeDataTime: false,
            numberRangeSlider: 0,
            arrayRangeSlider: [
                { id: 'range-slider-one', data: [0, 5], show: false },
                { id: 'range-slider-two', data: [10, 15], show: false },
                { id: 'range-slider-three', data: [15, 20], show: false }
            ],
            strError: '-error',
            idTagNextPrev: {
                one: 'tag-info-one',
                two: 'tag-info-two',
                three: 'tag-info-three'
            },
            inputBusinessName: null,
            inputBusinessRepresentativeName: null,
            inputBusinessInfo: {
                addesss: null,
                location: null,
                id: null
            },
            inputBusinessImg: null,
            imputBusinessOpenHours: null,
            inputBusinessTelephone: null,
            inputBusinessEmail: null,
            inputBusinessWebsite: null,
            inputBusinessFacebook: null,
            inputBusinessPassPort: null,
            nameInput: {
                tagInfoOne: {
                    nameTag: 'tag-info-one',
                    businessName: 'business-name',
                    businessRepresentativeName: 'representative-name',
                    businessAddress: 'business-address',
                    businessProduct: 'business-product',
                    businessOpenHours: 'open-hours',
                    businessImg: 'business-image'
                },
                tagInfoTwo: {
                    nameTag: 'tag-info-two',
                    businessTelephone: 'telephone',
                    businessEmail: 'email',
                    businessWebside: 'webside',
                    businessFacebook: 'facebook'
                },
                tagInfoThree: {
                    nameTag: 'tag-info-three',
                    businessPassport: 'passport',
                    businessJob: 'business-jobs',
                    businessSize: 'business-size'
                }
            },
            selectedDistributionItems: null,
            optionsDistributionItems: [
                // {
                //     id: 'a',
                //     label: 'a',
                //     children: [
                //         { id: 'aa', label: 'aa' },
                //         { id: 'ab', label: 'ab' }
                //     ]
                // }
            ],
            selectedCompanySize: null,
            optionsCompanySize: [
                { value: null, text: 'Chọn một loại hình hoạt động' }
            ],
            selectedBusinessJobs: null,
            optionsBusinessJobs: [
                { value: null, text: 'Chọn một ngành nghề' }
                // { value: 1, text: 'Đối với nhà sản xuất' },
            ],
            idShowCheckbox: 0,
            checkedCategories: [],
            arrayDataCheckBox: [
                // { id: 1, idBusinessJob: 1, text: 'Đăng ký kinh doanh/chứng nhận đầu tư', check: false }
            ],
            open: true,
            openFullDay: true,
            currentDay: 'monday',
            listDay: [
                { day: 'monday', name: 'Thứ 2', nameCharacter: 'Thứ Hai', isOpen: true, openFullDay: true, timeData: null },
                { day: 'tuesday', name: 'Thứ 3', nameCharacter: 'Thứ Ba', isOpen: true, openFullDay: true, timeData: null },
                { day: 'wednesday', name: 'Thứ 4', nameCharacter: 'Thứ Tư', isOpen: true, openFullDay: true, timeData: null },
                { day: 'thursday', name: 'Thứ 5', nameCharacter: 'Thứ Năm', isOpen: true, openFullDay: true, timeData: null },
                { day: 'friday', name: 'Thứ 6', nameCharacter: 'Thứ Sáu', isOpen: true, openFullDay: true, timeData: null },
                { day: 'saturday', name: 'Thứ 7', nameCharacter: 'Thứ Bảy', isOpen: true, openFullDay: true, timeData: null },
                { day: 'sunday', name: 'Chủ nhật', nameCharacter: 'Chủ Nhật', isOpen: true, openFullDay: true, timeData: null }
            ],
            selected: 0,
            listColorButton: {
                classOpen: 'btn btn-choose-day btn-day-open',
                classClose: 'btn btn-choose-day btn-day-close',
                classChoosing: 'btn btn-choose-day btn-day-choosing'
            }
        }
    },
    computed: {
        /**
             * @return {number}
             */
        score () {
            let bResult = 0
            if (this.inputBusinessName) {
                bResult += 0.5
            }
            if (this.inputBusinessRepresentativeName) {
                bResult += 0.5
            }
            if (this.inputBusinessInfo.addesss) {
                bResult += 0.5
            }
            if (this.inputBusinessImg) {
                bResult += 0.5
            }
            if (this.selectedDistributionItems) {
                bResult += 0.5
            }
            if (this.strEdit) {
                bResult += 0.5
            }
            if (this.inputBusinessTelephone) {
                bResult += 0.5
            }
            if (this.inputBusinessWebsite) {
                bResult += 0.5
            }
            if (this.inputBusinessEmail) {
                bResult += 0.5
            }
            if (this.inputBusinessFacebook) {
                bResult += 0.5
            }
            if (this.selectedCompanySize) {
                bResult += 1
            }
            if (this.inputBusinessPassPort) {
                bResult += 1
            }
            if (this.checkedCategories.length >= 2) {
                bResult += 2
            } else if (this.checkedCategories.length > 0) {
                bResult += 1
            }
            return bResult
        }
    },
    watch: {
        open (val) {
            if (val) {
                this.openFullDay = true
            } else {
                this.arrayRangeSlider.forEach((value) => {
                    value.show = false
                })
            }
        },
        inputBusinessPassPort (val) {
            // eslint-disable-next-line no-useless-escape
            this.inputBusinessPassPort = val.replace(/[&\/\\#,_=+()@!^$~%|.'":*?\-<>{}[\]]/g, '')
        },
        inputBusinessTelephone (val) {
            // eslint-disable-next-line no-useless-escape
            this.inputBusinessTelephone = val.replace(/[&\/\\#,_=+()@!^$~%|.'":*?\-<>{}[\];]/g, '').replace(/[a-zA-Z]/g, '')
        }
    },
    mounted () {
        if (this.$route.query.location) {
            this.inputBusinessInfo.location = [this.$route.query.location.split(',')[0], this.$route.query.location.split(',')[1]]
            this.getInfoByLocation()
        }
        this.$root.$on('change-image', (image) => {
            this.inputBusinessImg = image
        })
        this.$root.$on('update-location', (point) => {
            this.inputBusinessInfo.location = [point[0], point[1]]
            this.getInfoByLocation()
        })
        this.$root.$on('open-full-day', (isFullDay) => {
            this.openFullDay = isFullDay
        })
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },
    destroyed () {
        window.removeEventListener('resize', this.handleResize)
        this.$root.$emit('close-popup')
        this.$root.$emit('close-pin-create-business')
    },
    methods: {
        handleResize () {
            const fixNameDay = window.innerWidth < 768
            this.listDay.forEach((value, index) => {
                if (fixNameDay) {
                    value.name = index === 6 ? 'CN' : 'T ' + (index + 2)
                } else {
                    value.name = index === 6 ? 'Chủ nhật' : 'Thứ ' + (index + 2)
                }
            })
        },
        goToNewBusiness () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.STORE,
                params: {
                    id: this.idNewBusiness
                }
            })
        },
        createBusiness () {
            const formData = new FormData()
            let strOpenHours = ''
            this.listDay.forEach((value, index) => {
                strOpenHours += value.nameCharacter + ': '
                if (value.isOpen) {
                    if (value.timeData && !value.openFullDay) {
                        value.timeData.forEach((val) => {
                            if (val.show) {
                                strOpenHours += this.formatterTime(val.data[0]) + '-' + this.formatterTime(val.data[1]) + ';'
                            }
                        })
                    } else {
                        strOpenHours += 'Mở cửa cả ngày;'
                    }
                } else {
                    strOpenHours += 'Đóng cửa;'
                }
            })

            let inputIndustryCertifications = null
            if (this.idShowCheckbox !== 0) {
                inputIndustryCertifications = this.idShowCheckbox
                this.checkedCategories.forEach((value) => {
                    inputIndustryCertifications += ',' + value
                })
            }

            formData.append('position-location', this.inputBusinessInfo.location)
            formData.append('position-address', this.inputBusinessInfo.addesss)
            formData.append('store-name', this.inputBusinessName)
            formData.append('open-hours', strOpenHours)
            formData.append('store-phone', this.inputBusinessTelephone)
            formData.append('store-website', this.inputBusinessWebsite)
            formData.append('store-facebook', this.inputBusinessFacebook)
            formData.append('store-email', this.inputBusinessEmail)
            formData.append('signboard_photo', this.inputBusinessImg)
            formData.append('representation_name', this.inputBusinessRepresentativeName)
            formData.append('activity_type', this.selectedCompanySize)
            formData.append('identification_number', this.inputBusinessPassPort)
            formData.append('industry_certification', inputIndustryCertifications)
            formData.append('reliability', this.score)
            formData.append('distribution_item_id', this.selectedDistributionItems)
            formData.append('signboard_description', '')
            formData.append('photo', '')
            formData.append('id', '0')
            this.submitCreateBusiness(formData)
        },
        async submitCreateBusiness (formData) {
            const response = await this.$api.store.createBusiness(formData)
            if (response.status === 200 || response.status === 'OK') {
                this.$bvModal.show('modal-create-business-success')
                this.idNewBusiness = response.result.id
            }
        },
        async getInfoByLocation () {
            const response = await this.$api.map.getGeocode(this.inputBusinessInfo.location)
            if (response) {
                this.inputBusinessInfo.addesss = response[3]
                this.inputBusinessInfo.id = response[0]
            }
        },
        formatterTime (e) {
            const strFormatHor = e.toString().split('.')
            let realTime = '00:00'
            if (strFormatHor.length === 1) {
                realTime = strFormatHor[0] + ':00'
            } else if (strFormatHor.length === 2) {
                // eslint-disable-next-line no-unused-vars
                realTime = strFormatHor[0] + ':' + strFormatHor[1] * 6
            }
            return realTime
        },
        goToAddress () {
            const element = document.getElementById(this.nameInput.tagInfoOne.businessAddress + this.strError)
            if (this.inputBusinessInfo.location) {
                element.innerHTML = ''
                this.$root.$emit('go-to-address-show-pop-up', this.inputBusinessInfo.location)
            } else {
                element.innerHTML = 'Chưa có địa chỉ không thể tới.'
            }
        },
        getDataAutocomplete (event, data) {
            if (data && data.geometry && data.geometry.coordinates.length > 0) {
                document.getElementById(this.nameInput.tagInfoOne.businessAddress + this.strError).innerHTML = ''
                // this.inputBusinessInfo = data
                this.inputBusinessInfo.addesss = data.description
                this.inputBusinessInfo.id = data.id
                this.inputBusinessInfo.location = [data.geometry.coordinates[1], data.geometry.coordinates[0]]
            } else {
                this.inputBusinessInfo.addesss = null
                this.inputBusinessInfo.id = null
                this.inputBusinessInfo.location = null
            }
        },
        setNullAddress (event) {
            this.inputBusinessInfo.addesss = null
            this.inputBusinessInfo.id = null
            this.inputBusinessInfo.location = null
        },
        showModalOpenHours () {
            this.$bvModal.show('modal-open-hours')
            this.currentDay = this.listDay[0].day
            if (this.listDay[0].timeData) {
                const arrRangeSlider = [
                    { id: this.listDay[0].timeData[0].id, data: this.listDay[0].timeData[0].data, show: this.listDay[0].timeData[0].show },
                    { id: this.listDay[0].timeData[1].id, data: this.listDay[0].timeData[1].data, show: this.listDay[0].timeData[1].show },
                    { id: this.listDay[0].timeData[2].id, data: this.listDay[0].timeData[2].data, show: this.listDay[0].timeData[2].show }
                ]
                this.open = this.listDay[0].isOpen
                this.arrayRangeSlider = arrRangeSlider
            }
        },
        closeModalOpenHours (e) {
            if (this.$refs.rangeSlider && !this.$refs.rangeSlider.errorTime) {
                this.$bvModal.hide('modal-open-hours')
                this.strEdit = 'Sửa giờ mở cửa'
                this.changeDayItem(null)
            }
        },
        addTagOpenHour (e) {
            for (let i = 0; i < this.arrayRangeSlider.length; i++) {
                if (!this.arrayRangeSlider[i].show) {
                    this.arrayRangeSlider[i].show = true
                    this.$root.$emit('check-range-slider-show', this.arrayRangeSlider[i].id)
                    break
                }
            }
        },
        getSelectedItem (e) {
            this.idShowCheckbox = e || 0
            this.checkedCategories = []
        },
        changeDayItem (e) {
            if (e && this.currentDay === e.currentTarget.id) {
                return
            }
            const _this = this
            const itemCurrrentDay = _this.currentDay
            const itemOpenFullDay = _this.openFullDay
            const isOpenTemp = _this.open
            let arrRangeSliderForShow = [
                { id: 'range-slider-one', data: [0, 5], show: false },
                { id: 'range-slider-two', data: [10, 15], show: false },
                { id: 'range-slider-three', data: [15, 20], show: false }
            ]
            this.listDay.forEach((value, index) => {
                const nodeElement = document.getElementById(value.day)
                // Nếu isOpen của ngày đó là true/false nó sẽ dổi thành class có trạng thái mở cửa/đóng cửa
                if (value.isOpen) {
                    nodeElement.className = _this.listColorButton.classOpen
                } else {
                    nodeElement.className = _this.listColorButton.classClose
                }

                // lấy IsOpen của thứ đã chọn (thứ được chuyển qua trong action click)
                if (e && value.day === e.currentTarget.id) {
                    _this.open = value.isOpen
                    _this.openFullDay = value.openFullDay
                    const element = document.getElementById(e.currentTarget.id)
                    element.className = _this.listColorButton.classChoosing
                    if (value.timeData) {
                        arrRangeSliderForShow = value.timeData
                    }
                    _this.currentDay = e.currentTarget.id
                }

                // lưu dữ liệu của thứ current
                if (!_this.$refs.rangeSlider.errorTime && value.day === itemCurrrentDay) {
                    value.isOpen = isOpenTemp
                    value.openFullDay = itemOpenFullDay
                    // eslint-disable-next-line new-cap
                    const arrRangeSliderForSave = [
                        { id: 'range-slider-one', data: [0, 5], show: false },
                        { id: 'range-slider-two', data: [10, 15], show: false },
                        { id: 'range-slider-three', data: [15, 20], show: false }
                    ]
                    arrRangeSliderForSave.forEach((val) => {
                        if (val.id === _this.$refs.rangeSlider.idRangeSliderOne) {
                            val.data = _this.$refs.rangeSlider.valueOne
                            val.show = !itemOpenFullDay && _this.$refs.rangeSlider.isShowRangeOne
                        } else if (val.id === _this.$refs.rangeSlider.idRangeSliderTwo) {
                            val.data = _this.$refs.rangeSlider.valueTwo
                            val.show = !itemOpenFullDay && _this.$refs.rangeSlider.isShowRangeTwo
                        } else if (val.id === _this.$refs.rangeSlider.idRangeSliderThree) {
                            val.data = _this.$refs.rangeSlider.valueThree
                            val.show = !itemOpenFullDay && _this.$refs.rangeSlider.isShowRangeThree
                        }
                    })
                    value.timeData = arrRangeSliderForSave
                }
            })
            _this.arrayRangeSlider = arrRangeSliderForShow
        },
        actionPrevNextTag (idCurrent, idGoto, classChild) {
            let result = false
            this.clearAllError()
            if (classChild && idCurrent) {
                result = this.validateInput(idCurrent, classChild)
            } else {
                result = true
            }

            if (result && idCurrent && idGoto) {
                const elementHide = document.getElementById(idCurrent)
                const elementShow = document.getElementById(idGoto)
                elementHide.classList.add('d-none')
                elementShow.classList.remove('d-none')
            }
        },
        validateInput (idTagCurrent, classChild) {
            const _this = this
            const list = document.getElementById(idTagCurrent).getElementsByClassName(classChild)
            let bResult = true
            for (let i = 0; i < list.length; i++) {
                if (list[i].name === _this.nameInput.tagInfoOne.businessImg) {
                    if (!_this.inputBusinessImg) {
                        document.getElementById(list[i].name + _this.strError).innerHTML = 'Chưa có hình ảnh cửa hàng.'
                        bResult = false
                    } else if (_this.$refs.businessImage.imageError) {
                        bResult = false
                    }
                    continue
                } else if (list[i].name === _this.nameInput.tagInfoOne.businessAddress && this.inputBusinessInfo.addesss === null) {
                    const strMess = list[i].placeholder ? list[i].placeholder + '.' : list[i].ariaPlaceholder + '.'
                    document.getElementById(list[i].name + _this.strError).innerHTML = strMess
                    bResult = false
                    continue
                } else if ((list[i].required && !list[i].value)) {
                    if ((list[i].name === _this.nameInput.tagInfoOne.businessProduct && this.selectedDistributionItems)) {
                        continue
                    }

                    const strMess = list[i].placeholder ? list[i].placeholder + '.' : list[i].ariaPlaceholder + '.'
                    document.getElementById(list[i].name + _this.strError).innerHTML = strMess
                    bResult = false
                    continue
                }

                if (list[i].getAttribute('patterns') && list[i].value) {
                    const patt = RegExp(list[i].getAttribute('patterns'))
                    if (!patt.test(list[i].value)) {
                        document.getElementById(list[i].name + _this.strError).innerHTML = 'Định dạng không đúng.'
                        bResult = false
                    }
                }
            }
            return bResult
        },
        clearAllError () {
            const elementsError = document.querySelectorAll('.clear-error')
            elementsError.forEach(function (element) {
                element.innerHTML = ''
            })
        }
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/_createbusiness";
</style>
