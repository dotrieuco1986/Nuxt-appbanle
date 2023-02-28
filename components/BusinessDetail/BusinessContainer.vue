<template>
    <div v-if="id || advertisementId" class="business-info-container">
        <div :class="[small==='true'?'m-0':'','row']">
            <no-ssr>
                <VueSlickCarousel v-if="typeView==='store'" name="slick" v-bind="settings">
                    <div v-for="item in photos" :key="item" :class="[small?'slick-height':'']">
                        <img :src="imgUrl + item" alt="Thumbnail" class="thumbnail-style">
                    </div>
                </VueSlickCarousel>
                <VueSlickCarousel v-if="typeView==='adv'" name="slick" v-bind="settings">
                    <img :src="imgUrl + photoAdvertisement" alt="Thumbnail" class="thumbnail-style">
                </VueSlickCarousel>
            </no-ssr>
        </div>

        <div class="m-negative-3">
            <div class="item-info">
                <b-form-radio :class="[online?'online':'','p-0']" disabled>
                    <span class="name">{{ name }}</span>
                </b-form-radio>
            </div>

            <div class="item-info">
                <span>{{ address }}</span>
            </div>

            <div v-if="small==='true' && typeView === 'adv' && phone" class="item-info">
                <span style="font-weight: bold">Điện thoại: {{ phone }}</span>
            </div>

            <div v-if="typeView === 'store'" class="item-info">
                <no-ssr>
                    <StarRating
                        class="float-left"
                        :rating="rating"
                        :read-only="true"
                        :increment="0.1"
                        :star-size="20"
                        :show-rating="false"
                    />
                </no-ssr>
                <span class="text-star">{{ rating }}/{{ MAX_STAR }} ({{ reviewNumber }})</span>
            </div>
            <trust v-if="typeView === 'store'" class="item-info" :reliability="reliability" :small="small" />
        </div>

        <div class="row container-symbol">
            <symbolize
                v-if="typeView === 'adv'"
                :id="id"
                :modal-id="'sale-channel'+modalId"
                name="Kênh bán"
                icon="store"
            />

            <symbolize
                v-if="typeView === 'store'"
                :id="id"
                name="Chỉ đường"
                icon="road-sign"
                :geometry="geometry"
            />
            <symbolize
                v-if="typeView === 'store'"
                :id="id"
                name="Sản phẩm"
                icon="cart"
            />
            <symbolize
                v-if="typeView === 'store'"
                :id="id"
                name="Yêu thích"
                icon="heart"
                :address="address"
                :photos="photos"
                :active="statusHeart"
            />
            <symbolize
                :id="id"
                name="Chia sẻ"
                icon="share"
                :store-name="name"
                :address="address"
                :modal-id="'share-business'+modalId"
                :photos="photos"
            />

            <symbolize
                :id="advertisementId?advertisementId:id"
                name="Báo cáo"
                icon="maps-and-location"
                :modal-id="'report-business'+modalId"
                :store-name="name"
                :address="address"
                :type="type"
                :active="statusReport"
                :note="noteReport"
            />
        </div>
    </div>
</template>

<script>
import Trust from './Trust'
import Symbolize from './Symbolize'

export default {
    name: 'BusinessContainer',
    components: { Symbolize, Trust },
    props: {
        id: {
            type: String,
            required: true
        },
        advertisementId: {
            type: String,
            default: ''
        },
        modalId: {
            type: String,
            default: ''
        },
        online: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: ''
        },
        rating: {
            type: Number,
            default: 5
        },
        reviewNumber: {
            type: Number,
            default: 123
        },
        reliability: {
            type: Number,
            default: 0
        },
        photos: {
            type: Array,
            default: null
        },
        small: {
            type: String,
            default: 'false'
        },
        geometry: {
            type: Object,
            required: true
        },
        statusHeart: {
            type: Boolean,
            default: false
        },
        statusReport: {
            type: Boolean,
            default: false
        },
        noteReport: {
            type: String,
            default: ''
        },
        typeView: {
            type: String,
            default: 'store'
        },
        photoAdvertisement: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            MAX_STAR: 5,
            settings: {
                lazyLoad: 'ondemand',
                dots: true,
                fade: true,
                infinite: true,
                autoplay: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            },
            imgUrl: process.env.SERVER_IMAGE_URL
        }
    }
}
</script>

<style type="scss">
.business-info-container {
    font-size: 14px;
}

.name {
    padding-top: 4px;
    font-size: 16px;
    font-weight: bold;
}

.item-info {
    padding-bottom: 5px;
}

.container-symbol {
    border-top: 1px solid #CBD4DA;
    display: flex;
    justify-content: space-around;
}

.thumbnail-style {
    object-fit: cover;
    min-height: 150px;
}

.m-negative-3 {
    padding: 0 -15px;
}

.slick-height {
    height: 150px;
}
</style>
