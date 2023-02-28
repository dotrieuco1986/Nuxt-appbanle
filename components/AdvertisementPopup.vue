<template>
    <div>
        <div v-show="isShow">
            <div v-if="data" class="advertisement-popup">
                <div class="text-center">
                    <img :src="imageUrl" alt="">
                </div>
                <p v-if="data.business_name" class="title">
                    {{ data.business_name }}
                </p>
                <p v-if="data.business_address" class="address">
                    {{ data.business_address }}
                </p>
                <p v-if="data.phone" class="phone">
                    Điện thoại: {{ data.phone }}
                </p>
                <div class="border-bottom" />
                <div class="row m-0">
                    <symbolize
                        v-for="item in symbols"
                        id="view-detail"
                        :key="item.id"
                        class="symbol-container"
                        :name="item.name"
                        :icon="item.icon"
                        :status="item.status"
                    />
                </div>
            </div>
            <div v-else-if="!dataID" class="advertisement-popup">
                <p class="address">
                    Bạn có thể tạo quảng cáo trên bất kỳ đường nào trên bản đồ
                </p>
                <div class="border-bottom mt-3 mb-3" />
                <div class="text-center">
                    <button type="button" class="btn btn-primary" @click="pushRoute">
                        TẠO QUẢNG CÁO
                    </button>
                </div>
            </div>
        </div>
        <modal-request-login ref="modalRequestLogin" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Symbolize from './BusinessDetail/Symbolize'
import ModalRequestLogin from './modal/ModalRequestLogin'
export default {
    name: 'AdvertisementPopup',
    components: { ModalRequestLogin, Symbolize },
    props: {
        data: {
            type: Object,
            default () {
                return null
            }
        },
        dataID: {
            type: String,
            required: true,
            default: ''
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            symbols: [
                {
                    id: 1,
                    name: 'Xem chi tiết',
                    status: false,
                    icon: 'store'
                }
            ],
            imageUrl: ''
        }
    },
    computed: {
        ...mapGetters({
            checkIsLoggedIn: 'loggedIn',
            loggedInUser: 'user'
        })
    },
    watch: {
        dataID (val) {
            if (val) {
                this.imageURL()
            } else {
                this.imageUrl = ''
            }
        }
    },
    methods: {
        async imageURL () {
            if (Number(this.dataID) > 0) {
                const response = await this.$api.advertisement.getAdvertisementImage(this.dataID)
                if (response) {
                    this.imageUrl = response
                }
            } else {
                this.imageUrl = process.env.SERVER_IMAGE_URL + this.data.photo
            }
        },
        pushRoute () {
            if (this.loggedInUser) {
                const url = '/advertisement/create'
                this.$router.push({ path: url })
            } else {
                this.$refs.modalRequestLogin.show()
            }
        }
    }
}
</script>

<style lang="scss">
    .advertisement-popup {
        color: #333333;

        img {
            max-height: 150px;
        }

        .title {
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
        }

        .phone {
            font-weight: bold;
        }

        p {
            margin-bottom: 10px;
        }

        button {
            background-color: #4AA9C5;
            border-color: #4AA9C5;
        }
    }
</style>
