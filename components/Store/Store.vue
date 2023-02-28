<template>
    <div id="store-create" class="col-12">
        <b-row class="my-1 head-area">
            <b-col sm="12">
                <b-breadcrumb :items="breadcrumbs" />
            </b-col>
        </b-row>
        <div class="row">
            <div class="col-md-12">
                <form class="form-custom create">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group row">
                                <label
                                    for="store-name"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.name') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-name"
                                        v-model="storeData.name"
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('store.label.name')"
                                    >
                                    <span v-show="!storeData.name" class="text-red">{{ error.name.required }}</span>
                                    <span v-show="storeData.name.length > 50" class="text-red">{{ error.name.length }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-name"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.reliability') }}:
                                </label>
                                <div class="col-sm-9">
                                    <trust :reliability="score" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-owner-name"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.representation_name') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-owner-name"
                                        v-model="storeData.representation_name"
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('store.label.placeholder.representation_name')"
                                    >
                                    <span v-show="!storeData.representation_name" class="text-red">{{ error.representation_name.required }}</span>
                                    <span v-show="storeData.representation_name.length > 50" class="text-red">{{ error.representation_name.length }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-owner-id"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.representation_id_number') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-owner-id"
                                        v-model="storeData.representation_id_number"
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('store.label.representation_id_number')"
                                    >
                                    <span v-show="!storeData.representation_id_number" class="text-red">{{ error.representation_id_number.required }}</span>
                                    <span v-show="storeData.representation_id_number.length > 50" class="text-red">{{ error.representation_id_number.length }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-email"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.email') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-email"
                                        v-model="storeData.email"
                                        type="email"
                                        class="form-control"
                                        :placeholder="$t('store.label.placeholder.email')"
                                    >
                                    <span v-show="!storeData.email" class="text-red">{{ error.email.required }}</span>
                                    <span v-show="storeData.email.length > 50" class="text-red">{{ error.email.length }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-phone"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.phone') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-phone"
                                        v-model="storeData.phone"
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('store.label.placeholder.phone')"
                                    >
                                    <span v-show="!storeData.phone" class="text-red">{{ error.phone.required }}</span>
                                    <span v-show="storeData.phone.length > 15" class="text-red">{{ error.phone.length }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-address"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.address') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <div class="input-group-prepend">
                                        <input
                                            id="store-address"
                                            v-model="storeData.address"
                                            type="text"
                                            class="form-control"
                                            disabled
                                            :placeholder="$t('store.label.placeholder.address')"
                                            @click="showMap"
                                        >
                                        <div class="input-group-text">
                                            <font-awesome-icon
                                                icon="map-marker-alt"
                                                @click="showMap"
                                            />
                                        </div>
                                    </div>
                                    <span v-show="!storeData.address" class="text-red">{{ error.address }}</span>
                                </div>
                                <Modal id="store-choose-address">
                                    <MapPopupSearch :has-event="true" />
                                </Modal>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-business-type"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.activity_type') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <select
                                        id="store-business-type"
                                        v-model="storeData.activity_type.id"
                                        name="store-business-type"
                                        class="form-control"
                                    >
                                        <option value="0">
                                            {{ $t('store.label.select_activity_type') }}
                                        </option>
                                        <template v-for="(child, idx) in listActivityTypes">
                                            <option :key="idx" :value="child.id">
                                                {{ child.name }}
                                            </option>
                                        </template>
                                    </select>
                                    <span v-show="!storeData.activity_type.id" class="text-red">{{ error.activity_type }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-business-type"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.business_areas') }}:<span class="text-red"> *</span>
                                </label>
                                <div class="col-sm-9">
                                    <select
                                        id="store-business-type"
                                        v-model="storeData.type_id[0]"
                                        name="store-business-type"
                                        class="form-control"
                                    >
                                        <option value="0">
                                            {{ $t('store.label.select_business_areas') }}
                                        </option>
                                        <optgroup
                                            v-for="(item, index) in listParentCategories"
                                            :key="index"
                                            :label="item.name"
                                        >
                                            <template v-for="(child, idx) in listChildCategories">
                                                <option v-if="item.id === child.parentid" :key="idx" :value="child.id">
                                                    {{ child.name }}
                                                </option>
                                            </template>
                                        </optgroup>
                                    </select>
                                    <span v-show="!storeData.type_id[0]" class="text-red">{{ error.type_id }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-job-type"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.business_lines') }}:
                                </label>
                                <div class="col-sm-9">
                                    <select
                                        id="store-job-type"
                                        v-model="storeData.industry_parent"
                                        name="store-job-type"
                                        class="form-control"
                                        @change="getChildBusinessLines"
                                    >
                                        <option value="0" selected>
                                            {{ $t('store.label.select_business_lines') }}
                                        </option>
                                        <option
                                            v-for="(item, index) in listParentBusinessLines"
                                            :key="index"
                                            :value="item.id"
                                        >
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-sm-3 col-form-label label-custom"
                                >&nbsp;</label>
                                <div class="col-sm-9">
                                    <b-form-checkbox-group
                                        v-model="checkArrayChildBusinessLinesId"
                                        :options="listChildBusinessLinesBelongsToParentId"
                                        value-field="id"
                                        text-field="name"
                                        class="b-form-checkbox-custome"
                                    /> <br>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-open-time"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.open_hours') }}:
                                </label>
                                <div class="col-sm-9 box-show-time">
                                    <textarea
                                        id="store-open-time"
                                        v-model="strEdit"
                                        name="store-open-time"
                                        class="form-control"
                                        @click="showOpenTime"
                                    />
                                    <span @click="showOpenTime">
                                        <svgIcon
                                            class="curser-pointer"
                                            icon="fa-edit"
                                            has-fill="false"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-social"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.socials') }}:
                                </label>
                                <div class="col-sm-9">
                                    <div
                                        v-for="(item, index) in storeData.socials"
                                        :key="index"
                                        class="row br-style"
                                    >
                                        <div class="col-11">
                                            <input
                                                :id="'store-social' + index"
                                                v-model="$v.storeData.socials.$each[index].url.$model"
                                                :class="{ 'group-error': $v.storeData.socials.$each[index].url.$error }"
                                                type="text"
                                                class="form-control"
                                                placeholder="https://facebook.com/abc"
                                            >
                                            <span v-if="!$v.storeData.socials.$each[index].url.url" class="msg-error">{{ $t('store.error.socials') }}</span>
                                        </div>
                                        <div class="col-1 text-right">
                                            <span @click="handleSocialItem(item)">
                                                <svgIcon
                                                    :icon="item.isFirstRow ? 'fa-plus' : 'fa-minus'"
                                                    grow-by-height="15px"
                                                    has-fill="false"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-social"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.website') }}:
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        id="store-website"
                                        v-model="$v.storeData.website.$model"
                                        type="text"
                                        class="form-control"
                                        placeholder="https://domain.com/"
                                    >
                                    <span v-if="!$v.storeData.website.url" class="text-red">{{ $t('store.error.website') }}</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.shipping') }}:
                                </label>
                            </div>
                            <div
                                v-for="(item, index) in shippingConfigs"
                                :key="index"
                                class="form-group row"
                            >
                                <label
                                    class="col-sm-3 col-form-label label-custom text-right"
                                >{{ index + 1 }}.
                                </label>
                                <div class="col-sm-9">
                                    <div class="form-group row">
                                        <div class="col-3">
                                            <div class="form-group row">
                                                <div class="col-12">
                                                    <input
                                                        v-model="item.from"
                                                        type="number"
                                                        class="form-control"
                                                        :placeholder="$t('store.label.placeholder.shipping.from')"
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-group row">
                                                <div class="col-12">
                                                    <input
                                                        v-model="item.to"
                                                        type="number"
                                                        class="form-control"
                                                        :placeholder="$t('store.label.placeholder.shipping.to')"
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-5">
                                            <div class="form-group row">
                                                <div class="col-12">
                                                    <input
                                                        v-model="item.money"
                                                        type="text"
                                                        class="form-control"
                                                        :placeholder="$t('store.label.placeholder.shipping.money')"
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-1 text-right">
                                            <span @click="handleShippingFee(item)">
                                                <svgIcon
                                                    :icon="item.isFirstRow ? 'fa-plus' : 'fa-minus'"
                                                    grow-by-height="15px"
                                                    has-fill="false"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-additional-info"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.note_optional') }}:
                                </label>
                                <div class="col-sm-9 box-show-time">
                                    <textarea
                                        id="store-additional-info"
                                        v-model="storeData.signboard_description"
                                        rows="5"
                                        name="store-additional-info"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    for="store-images"
                                    class="col-sm-3 col-form-label label-custom"
                                >{{ $t('store.label.images_additional') }}:
                                </label>
                                <div class="col-sm-9">
                                    <ImageSelection ref="childImages" :files="listImages" :multiple="true" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <label
                                for="store-signboard-image"
                                class="col-sm-12 col-form-label label-custom label-signboard"
                            >{{ $t('store.label.select_signboard') }} <span class="text-red"> *</span></label>
                            <div class="col">
                                <span class="upload-signboard" @click="openSelectImage">
                                    <span> {{ $t('store.label.upload') }} </span>
                                </span>
                            </div>
                            <input ref="signboardInput" class="d-none" type="file" accept=".jpg, .jpeg, .png, .gif, .bmp" @change="onFileChange"> <br>
                            <div
                                class="col-sm-12 text-center -text-gray"
                            >
                                {{ $t('store.validate_text.max_size_1m') }} <br>
                                {{ $t('store.validate_text.file_type_accepted') }} <br>
                                {{ $t('store.validate_text.rate_accepted') }}
                            </div>
                            <br>
                            <span v-show="error.signboard_photo.required" class="text-red">{{ error.signboard_photo.required }}</span>
                            <span v-show="error.signboard_photo.file_type" class="text-red">{{ error.signboard_photo.file_type }}</span>
                            <span v-show="error.signboard_photo.file_size" class="text-red">{{ error.signboard_photo.file_size }}</span>
                            <span v-show="error.signboard_photo.file_scale" class="text-red">{{ error.signboard_photo.file_scale }}</span>
                            <div class="row">
                                <div v-if="storeData.signboard_photo_review === null" class="preview-item col">
                                    <img v-if="storeData.signboard_photo" :src="imgUrl + storeData.signboard_photo" alt="hinh">
                                    <span v-if="storeData.signboard_photo" class="btn-remove-preview" @click="removePreview">x</span>
                                </div>
                                <div v-else class="preview-item col">
                                    <img v-if="storeData.signboard_photo_review" :src="storeData.signboard_photo_review" alt="hinh">
                                    <span v-if="storeData.signboard_photo_review" class="btn-remove-preview" @click="removePreview">x</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group row">
                                <div class="col-6 text-right">
                                    <ButtonAdmin
                                        :type="resetBtn.type"
                                        :class="resetBtn.class"
                                        :text="resetBtn.text"
                                        @click="handleReset"
                                    />
                                </div>
                                <div class="col-6 text-left">
                                    <ButtonAdmin
                                        :type="submitBtn.type"
                                        :class="submitBtn.class"
                                        :text="submitBtn.text"
                                        @click="handleSubmit"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <modal id="store-modal-open-hours">
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
                                <span>&nbsp;&nbsp;&nbsp;Mở cửa</span>
                                <span v-show="openFullDay && open">&nbsp;&nbsp;&nbsp;(Mở cửa cả ngày)</span>
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
                    HOÀN THÀNH
                </button>
            </footer>
        </modal>
        <modal-show-message id="modal-show-message" :msg="message.text" :class-defined="message.class" :icon="message.icon" @close-click="close" />
        <modal-confirm
            id="modal-reset-store"
            :description="'Bạn có chắc chắn muốn bỏ qua thay đổi?'"
            :ok-txt="'Đồng ý'"
            :ok-cancel="'Hủy bỏ'"
            @ok-click="okReset"
        />
    </div>
</template>
<style lang="scss">
@import "~/assets/scss/_global";
@import "~/assets/scss/_btable";
@import "~/assets/scss/_stores";
@import "~/assets/scss/_breadcrumb";
#store-choose-address {
    .modal-body {
        padding: 0;
    }
}
#store-modal-open-hours {
    .custom-control-label {
        font-size: 14px;
        padding-top: 5px;
        cursor: pointer;

        span {
            color: $extra-dark-gray;
        }
    }

    .custom-control-input:checked ~ .custom-control-label::before, .custom-control-input:hover {
        border-color: $green;
        background-color: $green;
    }

    .border-bottom-1 {
        border-bottom: solid 1px $extra-light-blue;
        margin: 0 16px;
    }

    .btn-secondary {
        display: none;
    }

    .btn-primary {
        background-color: $orange;
        border: 1px solid $orange;
    }

    footer {
        display: block;
        text-align: center;
        background-color: $light-gray;
    }

    .modal-body:first-child {
        background-color: $white;
        border-radius: 5px;
    }

    .modal-body {
        padding: 0;

        .padding-lr-16 {
            padding-left: 16px;
            padding-right: 16px;
        }

        .group-day-time {
            padding: 16px;
            background-color: $white;
            box-shadow: 0 3px #0000001a;
            -webkit-border-bottom-right-radius: 5px;
            -webkit-border-bottom-left-radius: 5px;

            .group-day {
                button {
                    margin-right: 15px;
                    padding-top: 2px;
                }
            }
        }

        .modal-title {
            font-weight: 600;
        }

        .modal-header {
            border-bottom: unset;

            .close {
                padding: unset;
                margin: -4rem -2rem -1rem auto;
            }
        }

        .btn-choose-day {
            text-align: center;
            vertical-align: middle;
            height: 30px;
            width: 87px;
            border-radius: 50px;
            color: #fff;
            padding: 0 0 2px 0;
            font-size: 14px;
            line-height: 1.5;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .btn-day-choosing {
            background-color: $orange;
            border: 1px solid $orange;

            &:focus {
                outline: none;
                box-shadow: unset;
            }
        }

        .btn-day-open {
            background-color: $blue;
            border: 1px solid $blue;

            &:focus {
                outline: none;
                box-shadow: unset;
            }
        }

        .btn-day-close {
            background-color: $gray;
            border: 1px solid $gray;

            &:focus {
                outline: none;
                box-shadow: unset;
            }
        }
        .orange {
            color: $orange;
        }

        .cursor-pointer {
            cursor: pointer;
        }
    }

    .modal-dialog {
        max-width: 60%;
    }

    .background-color-light-blue {
        background-color: $light-blue;
    }
}
.msg-error {
    display: none;
}
.group-error {
    border-color: red;
}
.group-error + .msg-error {
    display: block;
    color: red;
}
.custom-checkbox {
    display: block;
}
</style>
<script>
import ModalShowMessage from '@/components/modal/ModalShowMessage'
import Trust from '@/components/BusinessDetail/Trust'
import ModalConfirm from '@/components/modal/ModalConfirm'
import { validationMixin } from 'vuelidate'
import { url } from 'vuelidate/lib/validators'
import svgIcon from '~/components/common/SvgIcon.vue'
import ButtonAdmin from '~/components/buttons/ButtonAdmin.vue'
import ImageSelection from '~/components/ImageSelection.vue'
import RangeSliderTime from '~/components/RangeSliderTime.vue'
import MapPopupSearch from '~/components/MapPopupSearch'
export default {
    layout: 'admin',
    components: {
        svgIcon,
        ButtonAdmin,
        ImageSelection,
        RangeSliderTime,
        ModalShowMessage,
        Trust,
        ModalConfirm,
        MapPopupSearch
    },
    mixins: [validationMixin],
    props: {
        headTitle: {
            type: String,
            default: 'Tạo Cửa Hàng'
        }
    },
    async fetch () {
        const result = await this.$api.store.getCategories()
        const listCategoriesData = result.data
        for (let index = 0; index < listCategoriesData.length; ++index) {
            if (listCategoriesData[index].parent_id) {
                const objdata = { id: listCategoriesData[index].id, name: listCategoriesData[index].name, parentid: listCategoriesData[index].parent_id, state: false }
                this.listChildCategories.push(objdata)
            } else {
                this.listParentCategories.push(listCategoriesData[index])
            }
        }
    },
    validations: {
        storeData: {
            website: {
                url
            },
            socials: {
                $each: {
                    url: {
                        url
                    }
                }
            }
        }
    },
    data () {
        return {
            breadcrumbs: [
                {
                    text: 'Quản Lý Cửa Hàng',
                    href: '/admin/stores/list'
                },
                {
                    text: this.headTitle,
                    active: true
                }
            ],
            submitBtn: {
                text: 'Hoàn Tất',
                type: 'submit',
                class: 'btn btn-sucess-custom'
            },
            resetBtn: {
                text: 'Bỏ Qua',
                type: 'reset',
                class: 'btn btn-reset-custom'
            },
            listActivityTypes: [],
            listChildCategories: [],
            listParentCategories: [],
            listParentBusinessLines: [],
            listChildBusinessLinesBelongsToParentId: [],
            open: true,
            openFullDay: true,
            currentDay: 'monday',
            selected: 0,
            listColorButton: {
                classOpen: 'btn btn-choose-day btn-day-open',
                classClose: 'btn btn-choose-day btn-day-close',
                classChoosing: 'btn btn-choose-day btn-day-choosing'
            },
            listDay: [
                { day: 'monday', name: 'thứ 2', nameCharacter: 'Thứ Hai', isOpen: true, openFullDay: true, timeData: null },
                { day: 'tuesday', name: 'thứ 3', nameCharacter: 'Thứ Ba', isOpen: true, openFullDay: true, timeData: null },
                { day: 'wednesday', name: 'thứ 4', nameCharacter: 'Thứ Tư', isOpen: true, openFullDay: true, timeData: null },
                { day: 'thursday', name: 'thứ 5', nameCharacter: 'Thứ Năm', isOpen: true, openFullDay: true, timeData: null },
                { day: 'friday', name: 'thứ 6', nameCharacter: 'Thứ Sáu', isOpen: true, openFullDay: true, timeData: null },
                { day: 'saturday', name: 'thứ 7', nameCharacter: 'Thứ Bảy', isOpen: true, openFullDay: true, timeData: null },
                { day: 'sunday', name: 'chủ nhật', nameCharacter: 'Chủ Nhật', isOpen: true, openFullDay: true, timeData: null }
            ],
            arrayRangeSlider: [
                { id: 'range-slider-one', data: [0, 5], show: false },
                { id: 'range-slider-two', data: [10, 15], show: false },
                { id: 'range-slider-three', data: [15, 20], show: false }
            ],
            listActiveHours: [],
            strEdit: '',
            storeData: {
                id: '0',
                name: '',
                type: '',
                phone: '',
                photo: '',
                photos: [],
                address: '',
                type_id: [0],
                website: '',
                facebook: '',
                socials: [],
                active_hours: '',
                position_location: null,
                signboard_photo: null,
                signboard_photo_review: null,
                facade_photo: null,
                certification_photo: null,
                signboard_description: '',
                email: '',
                has_shipping_fee: true,
                business_lines: [],
                activity_type: {
                    id: 0,
                    name: ''
                },
                representation_name: '',
                representation_id_number: '',
                industry_parent: 0,
                industry_certification: [0],
                active: false
            },
            firstSocial: {
                url: '',
                isFirstRow: true
            },
            firstShippingFee: {
                id: 0,
                from: '',
                to: '',
                money: '',
                isFirstRow: true
            },
            imgUrl: process.env.SERVER_IMAGE_URL,
            message: {
                class: 'error',
                text: '',
                icon: 'close'
            },
            error: {
                name: {
                    required: '',
                    length: ''
                },
                representation_name: {
                    required: '',
                    length: ''
                },
                representation_id_number: {
                    required: '',
                    length: ''
                },
                address: '',
                signboard_photo: {
                    required: '',
                    file_type: '',
                    file_size: '',
                    file_scale: ''
                },
                type_id: '',
                phone: {
                    required: '',
                    length: ''
                },
                email: {
                    required: '',
                    length: ''
                },
                activity_type: ''
            },
            image: {
                width: 0,
                height: 0
            },
            checkArrayChildBusinessLinesId: [],
            shippingConfigs: [],
            listImages: []
        }
    },
    computed: {
        score () {
            let bResult = 0
            if (this.storeData.name) {
                bResult += 0.5
            }
            if (this.storeData.representation_name) {
                bResult += 0.5
            }
            if (this.storeData.representation_id_number) {
                bResult += 1
            }
            if (this.storeData.address) {
                bResult += 0.5
            }
            if (this.storeData.signboard_photo) {
                bResult += 0.5
            }
            if (this.storeData.type_id.length > 1) {
                bResult += 0.5
            }
            if (this.strEdit) {
                bResult += 0.5
            }
            if (this.storeData.phone) {
                bResult += 0.5
            }
            if (this.storeData.website) {
                bResult += 0.5
            }
            if (this.storeData.email) {
                bResult += 0.5
            }
            if (this.storeData.socials.length > 0 && this.storeData.socials[0].url !== '') {
                bResult += 0.5
            }
            if (this.storeData.activity_type.id !== 0) {
                bResult += 1
            }

            bResult += this.checkArrayChildBusinessLinesId.length >= 2 ? 2 : this.checkArrayChildBusinessLinesId.length === 1 ? 1 : 0

            return bResult
        }
    },
    mounted () {
        this.getActivityTypes()
        this.getIndustryCertifications()

        if (this.$route.params.id) {
            this.getShippingConfigs()
            this.getStoreData()
        } else {
            if (this.shippingConfigs.length === 0) {
                this.shippingConfigs.push(this.firstShippingFee)
            }
            if (this.storeData.socials.length === 0) {
                this.storeData.socials.push(this.firstSocial)
            }
        }
        this.$root.$on('open-full-day', (isFullDay) => {
            this.openFullDay = isFullDay
        })

        this.$root.$on('map-popup-search-location', (locations, address) => {
            this.getDataAddress(locations, address)
            this.$bvModal.hide('store-choose-address')
        })
    },
    methods: {
        getStoreData () {
            this.$api.store.getStoreById(this.$route.params.id).then((store) => {
                if (store.data === 'Connection Failure') {
                    this.getStoreData()
                } else {
                    this.storeData.id = store.data.id
                    this.storeData.name = store.data.name
                    this.storeData.type = store.data.type
                    this.storeData.phone = store.data.phone
                    this.storeData.photos = store.data.photos
                    this.storeData.address = store.data.address
                    this.storeData.type_id = store.data.type_id
                    this.storeData.website = store.data.website !== null ? store.data.website : ''
                    this.storeData.facebook = store.data.facebook
                    this.storeData.socials = store.data.socials !== null ? store.data.socials : []
                    this.storeData.position_location = store.data.geometry.coordinates[1] + ',' + store.data.geometry.coordinates[0]
                    this.storeData.signboard_photo = store.data.signboard_photo
                    this.storeData.facade_photo = store.data.facade_photo
                    this.storeData.certification_photo = store.data.certification_photo
                    this.storeData.signboard_description = store.data.signboard_description
                    this.storeData.email = store.data.email
                    this.storeData.has_shipping_fee = store.data.has_shipping_fee
                    this.storeData.reliability = this.score
                    this.storeData.activity_type.id = store.data.activity_type.id
                    this.storeData.representation_name = store.data.representation_name
                    this.storeData.representation_id_number = store.data.representation_id_number ? store.data.representation_id_number : ''
                    this.storeData.industry_parent = store.data.industry_certifications[0].id
                    this.storeData.industry_certification = store.data.industry_certifications
                    this.storeData.active = store.data.active

                    if (store.data.active_hours) {
                        let hours = store.data.active_hours

                        hours = hours + 'T'
                        const pattern = /(\d+\w+;\D)|(Đóng cửa;)|(Closed;)|(Mở cửa cả ngày;)|(Open 24 hours;)/g
                        const lstConvert = hours.match(pattern)

                        const lstOpenHours = []
                        lstConvert.forEach(function (entry) {
                            const n = hours.indexOf(entry)

                            const valueItem = hours.substring(0, n + entry.length - 1)
                            lstOpenHours.push(valueItem)
                            hours = hours.replace(valueItem, '')
                        })

                        const _this = this
                        lstOpenHours.forEach(function (value, index) {
                            const arrayData = [
                                { id: 'range-slider-one', data: [0, 5], show: false },
                                { id: 'range-slider-two', data: [10, 15], show: false },
                                { id: 'range-slider-three', data: [15, 20], show: false }
                            ]
                            if (value.includes('Mở cửa cả ngày')) {
                                _this.listDay[index].isOpen = true
                                _this.listDay[index].openFullDay = true
                            } else if (value.includes('Đóng cửa')) {
                                _this.listDay[index].isOpen = false
                                _this.listDay[index].openFullDay = false
                            } else {
                                const arrTime = value.split(' ')[2].split(';')
                                _this.listDay[index].isOpen = true
                                _this.listDay[index].openFullDay = false
                                arrTime.forEach(function (val, ind) {
                                    const element = val.split('-')
                                    if (element.length > 1) {
                                        arrayData[ind].show = true
                                        arrayData[ind].data[0] = parseFloat(element[0].split(':')[0]) + parseFloat(element[0].split(':')[1]) / 60
                                        arrayData[ind].data[1] = parseFloat(element[1].split(':')[0]) + parseFloat(element[0].split(':')[1]) / 60
                                    }
                                })
                            }

                            _this.listDay[index].timeData = arrayData
                        })
                        this.strEdit = ''
                        this.listDay.forEach((value, index) => {
                            this.strEdit += value.nameCharacter + ': '
                            if (value.isOpen) {
                                if (value.timeData && !value.openFullDay) {
                                    value.timeData.forEach((val) => {
                                        if (val.show) {
                                            this.strEdit += this.formatterTime(val.data[0]) + '-' + this.formatterTime(val.data[1]) + ';'
                                        }
                                    })
                                    this.strEdit += '\n'
                                } else {
                                    this.strEdit += 'Mở cửa cả ngày \n'
                                }
                            } else {
                                this.strEdit += 'Đóng cửa \n'
                            }
                        })
                    }

                    if (store.data.socials !== null) {
                        this.storeData.socials = []
                        store.data.socials.forEach((value, index) => {
                            const social = {}
                            social.url = value
                            social.isFirstRow = false
                            if (index === 0) {
                                social.isFirstRow = true
                            }
                            this.storeData.socials.push(social)
                        })
                    } else {
                        this.storeData.socials.push(this.firstSocial)
                    }
                    if (store.data.photos.length) {
                        store.data.photos.forEach((image, index) => {
                            this.listImages.push(this.imgUrl + this.storeData.photos[index].photo_reference)
                        })
                    }
                    // this.$root.$emit('update_banner_data', images)
                }
            })
        },
        getShippingConfigs () {
            this.$api.store.getBusinessShippingConfigs(this.$route.params.id).then((item) => {
                this.shippingConfigs = []
                item.data.forEach((value, index) => {
                    const shippingConfig = {}
                    shippingConfig.id = value.id
                    shippingConfig.from = value.condition.from
                    shippingConfig.to = value.condition.to
                    shippingConfig.money = value.condition.money
                    shippingConfig.isFirstRow = false
                    if (index === 0) {
                        shippingConfig.isFirstRow = true
                    }
                    this.shippingConfigs.push(shippingConfig)
                })
            }).catch((error) => {
                if (error.response && this.shippingConfigs.length === 0) {
                    this.shippingConfigs.push(this.firstShippingFee)
                }
            })
        },
        getIndustryCertifications () {
            this.$api.store.getIndustryCertifications().then((res) => {
                const listBusinessLines = res.data
                if (listBusinessLines === 'Connection Failure') {
                    this.getIndustryCertifications()
                } else {
                    for (let index = 0; index < listBusinessLines.length; ++index) {
                        this.listParentBusinessLines.push(listBusinessLines[index])
                    }
                    const arr = []
                    if (this.storeData.industry_certification.length) {
                        if ((typeof this.storeData.industry_certification[0].items) !== 'undefined') {
                            this.storeData.industry_certification[0].items.forEach((item) => {
                                arr.push(item.id)
                            })
                        }
                    }
                    if (this.listParentBusinessLines.length > 0) {
                        this.listChildBusinessLinesBelongsToParentId = []
                        this.listParentBusinessLines.forEach((val) => {
                            if (val.id === parseInt(this.storeData.industry_parent)) {
                                val.items.forEach((child) => {
                                    if (arr.includes(child.id)) {
                                        this.checkArrayChildBusinessLinesId.push(child.id)
                                    }
                                    this.listChildBusinessLinesBelongsToParentId.push(child)
                                })
                            }
                        })
                    }
                }
            }).catch((error) => {
                if (error.response) {
                    this.message.class = 'error'
                    this.message.text = error.response.data.message
                    this.message.icon = 'close'
                    this.$bvModal.show('modal-show-message')
                }
            })
        },
        getActivityTypes () {
            this.$api.store.getActivityTypes().then((res) => {
                const activityTypes = res.data
                if (activityTypes !== 'Connection Failure') {
                    for (let index = 0; index < activityTypes.length; ++index) {
                        this.listActivityTypes.push(activityTypes[index])
                    }
                } else {
                    this.getActivityTypes()
                }
            })
        },
        getDataAddress (locations, address) {
            this.storeData.address = address
            this.storeData.position_location = locations.location[1] + ',' + locations.location[0]
        },
        showMap () {
            this.$bvModal.show('store-choose-address')
        },
        showOpenTime () {
            this.$bvModal.show('store-modal-open-hours')
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
        handleShippingFee (item) {
            if (item.isFirstRow) {
                const newShippingConfig = {
                    id: 0,
                    from: '',
                    to: '',
                    money: '',
                    isFirstRow: false
                }
                this.shippingConfigs.push(newShippingConfig)
            } else {
                const indexOfItem = this.shippingConfigs.indexOf(item)
                this.shippingConfigs.splice(indexOfItem, 1)
            }
        },
        openSelectImage () {
            this.$refs.signboardInput.click()
        },
        handleSubmit (e) {
            e.preventDefault()
            this.$v.$touch()
            const error = this.$v.$invalid

            let isError = false
            if (!this.storeData.name) {
                this.error.name.required = 'Chưa nhập tên cửa hàng'
                isError = true
            } else if (this.storeData.name.length > 50) {
                this.error.name.length = 'Tên cửa hàng không quá 50 kí tự'
                isError = true
            } else {
                this.error.name.required = ''
                this.error.name.length = ''
            }
            if (!this.storeData.representation_name) {
                this.error.representation_name.required = 'Chưa nhập tên người đại diện'
                isError = true
            } else if (this.storeData.representation_name.length > 50) {
                this.error.representation_name.length = 'Tên người đại diện không quá 50 kí tự'
                isError = true
            } else {
                this.error.representation_name.required = ''
                this.error.representation_name.length = ''
            }
            if (!this.storeData.representation_id_number) {
                this.error.representation_id_number.required = 'Chưa nhập số CMND/Passport của người đại diện'
                isError = true
            } else if (this.storeData.representation_id_number.length > 50) {
                this.error.representation_id_number.length = 'số CMND/Passport của người đại diện không quá 50 kí tự'
                isError = true
            } else {
                this.error.representation_id_number.required = ''
                this.error.representation_id_number.length = ''
            }
            if (!this.storeData.address) {
                this.error.address = 'Chưa nhập địa chỉ cơ sở kinh doanh'
                isError = true
            } else {
                this.error.address = ''
            }
            if (!this.storeData.signboard_photo) {
                this.error.signboard_photo.required = 'Chưa tải lên hình ảnh bảng hiệu'
                isError = true
            } else {
                this.error.signboard_photo.required = ''
            }
            if (!this.storeData.type_id[0]) {
                this.error.type_id = 'Chưa chọn lĩnh vực kinh doanh'
                isError = true
            } else {
                this.error.type_id = ''
            }
            if (!this.storeData.phone) {
                this.error.phone.required = 'Chưa nhập số điện thoại'
                isError = true
            } else if (this.storeData.phone.length > 15) {
                this.error.phone.length = 'Số điện thoại không quá 15 kí tự'
                isError = true
            } else {
                this.error.phone.required = ''
                this.error.phone.length = ''
            }
            if (!this.storeData.email) {
                this.error.email.required = 'Chưa nhập địa chỉ email'
                isError = true
            } else if (this.storeData.email.length > 50) {
                this.error.email.length = 'Địa chỉ email không quá 50 kí tự'
                isError = true
            } else {
                this.error.email.required = ''
                this.error.email.length = ''
            }
            if (!this.storeData.activity_type.id) {
                this.error.activity_type = 'Chưa chọn loại hình hoạt động'
                isError = true
            } else {
                this.error.activity_type = ''
            }
            if (isError || error) {
                return
            }

            this.storeData.business_lines = this.checkArrayChildBusinessLinesId
            this.storeData.business_lines.push(this.storeData.industry_parent)

            let strOpenHours = ''
            if (this.strEdit !== '') {
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
            }

            const formData = new FormData()
            formData.append('id', this.storeData.id)
            formData.append('store-name', this.storeData.name)
            formData.append('type', this.storeData.type)
            formData.append('store-phone', this.storeData.phone)
            formData.append('position-address', this.storeData.address)
            formData.append('distribution_item_id', this.storeData.type_id)
            formData.append('socials', JSON.stringify(this.storeData.socials))
            formData.append('store-website', this.storeData.website)
            formData.append('store-facebook', this.storeData.facebook)
            formData.append('open-hours', strOpenHours)
            formData.append('position-location', this.storeData.position_location)
            formData.append('signboard_photo', this.storeData.signboard_photo)
            formData.append('signboard_photo_file', this.storeData.signboard_photo_file)
            formData.append('facade_photo', this.storeData.facade_photo)
            formData.append('certification_photo', this.storeData.certification_photo)
            formData.append('signboard_description', this.storeData.signboard_description)
            formData.append('store-email', this.storeData.email)
            formData.append('has_shipping_fee', this.storeData.has_shipping_fee)
            formData.append('shipping_fee_configs', JSON.stringify(this.shippingConfigs))
            formData.append('reliability', this.score)
            formData.append('representation_name', this.storeData.representation_name)
            formData.append('identification_number', this.storeData.representation_id_number)
            formData.append('activity_type', this.storeData.activity_type.id)
            formData.append('industry_certification', this.storeData.business_lines)
            formData.append('active', this.storeData.active)

            const images = this.$refs.childImages.listImageSeleted
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append('photo' + i, images[i])
                }
                formData.append('totalImage', images.length)
            } else {
                formData.append('totalImage', 0)
            }

            this.$api.store.createBusiness(formData).then((res) => {
                const _this = this
                _this.message.class = 'success'
                _this.message.text = 'Lưu cửa hàng thành công'
                _this.message.icon = 'check'
                _this.$bvModal.show('modal-show-message')
            }).catch((error) => {
                if (error.response) {
                    this.message.class = 'error'
                    this.message.text = 'Lưu cửa hàng thất bại: ' + error.response.data.message
                    this.message.icon = 'close'
                    this.$bvModal.show('modal-show-message')
                }
            })
        },
        close () {
            if (this.message.class === 'success') {
                this.$router.push({
                    path: '/admin/stores/list'
                })
            }
        },
        handleReset (e) {
            this.$bvModal.show('modal-reset-store')
        },
        okReset () {
            this.$router.push({
                path: '/admin/stores/list'
            })
        },
        formatterTime (e) {
            const strFormatHor = e.toString().split('.')
            let realTime = '00:00'
            if (strFormatHor.length === 1) {
                realTime = strFormatHor[0] + ':00'
            } else if (strFormatHor.length === 2) {
                realTime = strFormatHor[0] + ':' + strFormatHor[1] * 6
            }
            return realTime
        },
        getChildBusinessLines (event) {
            this.getChildBusinessLine(event.target.value)
        },
        getChildBusinessLine (id) {
            const that = this
            this.storeData.industry_parent = id
            const arr = []
            if (this.storeData.industry_certification && ((typeof this.storeData.industry_certification[0].items) !== 'undefined')) {
                this.storeData.industry_certification[0].items.forEach((item) => {
                    arr.push(item.id)
                })
            }
            if (that.listParentBusinessLines.length > 0) {
                that.checkArrayChildBusinessLinesId = []
                that.listChildBusinessLinesBelongsToParentId = []
                that.listParentBusinessLines.forEach((val) => {
                    if (val.id === parseInt(id)) {
                        val.items.forEach((child) => {
                            if (arr.includes(child.id)) {
                                that.checkArrayChildBusinessLinesId.push(child.id)
                            }
                            that.listChildBusinessLinesBelongsToParentId.push(child)
                        })
                    }
                })
            }
        },
        closeModalOpenHours (e) {
            if (this.$refs.rangeSlider && !this.$refs.rangeSlider.errorTime) {
                this.strEdit = ''
                this.changeDayItem(null)
                this.listDay.forEach((value, index) => {
                    this.strEdit += value.nameCharacter + ': '
                    if (value.isOpen) {
                        if (value.timeData && !value.openFullDay) {
                            value.timeData.forEach((val) => {
                                if (val.show) {
                                    this.strEdit += this.formatterTime(val.data[0]) + '-' + this.formatterTime(val.data[1]) + ';'
                                }
                            })
                            this.strEdit += '\n'
                        } else {
                            this.strEdit += 'Mở cửa cả ngày \n'
                        }
                    } else {
                        this.strEdit += 'Đóng cửa \n'
                    }
                })
                this.$bvModal.hide('store-modal-open-hours')
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
        onFileChange (e) {
            const that = this
            const file = e.target.files[0]
            if (file) {
                that.error.signboard_photo.required = ''
                const url = URL.createObjectURL(file)
                const img = new Image()
                img.onload = function () {
                    if ((this.height + this.height) !== this.width) {
                        that.storeData.signboard_photo = null
                        that.storeData.signboard_photo_review = null
                        that.error.signboard_photo.file_scale = 'Hình ảnh không đúng tỉ lệ 2:1'
                        that.error.signboard_photo.file_size = ''
                        that.error.signboard_photo.file_type = ''

                        return false
                    } else if (file.size > 1000000) {
                        that.storeData.signboard_photo = null
                        that.storeData.signboard_photo_review = null
                        that.error.signboard_photo.file_scale = ''
                        that.error.signboard_photo.file_size = 'Hình ảnh tải lên phải nhỏ hơn 1MB'
                        that.error.signboard_photo.file_type = ''
                        return false
                    } else {
                        that.error.signboard_photo.file_scale = ''
                        that.error.signboard_photo.file_size = ''
                        that.error.signboard_photo.file_type = ''

                        that.storeData.signboard_photo = file
                        that.storeData.signboard_photo_review = url
                    }
                }
                img.onerror = function () {
                    that.storeData.signboard_photo = null
                    that.storeData.signboard_photo_review = null
                    that.error.signboard_photo.file_scale = ''
                    that.error.signboard_photo.file_size = ''
                    that.error.signboard_photo.file_type = 'File sai định dạng.'
                    return false
                }
                img.src = url
            }
        },
        handleSocialItem (item) {
            if (item.isFirstRow) {
                const newSocial = {
                    url: '',
                    isFirstRow: false
                }
                this.storeData.socials.push(newSocial)
            } else {
                const indexOfItem = this.storeData.socials.indexOf(item)
                this.storeData.socials.splice(indexOfItem, 1)
            }
        },
        removePreview () {
            this.storeData.signboard_photo = null
            this.storeData.signboard_photo_review = null
        }
    },
    head () {
        return {
            title: 'Quản lý cửa hàng'
        }
    }
}
</script>
