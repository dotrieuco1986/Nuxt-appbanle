<template>
    <div id="stores" class="col-12">
        <b-row class="my-1 head-area">
            <b-col sm="2">
                <label class="label-title">Quản Lý Khuyến Mãi</label>
            </b-col>
            <b-col sm="6">
                <b-form inline @submit="queryPage">
                    <b-form-input
                        v-model="query"
                        type="text"
                        class="search-form"
                        placeholder="Tìm kiếm sản phẩm"
                        name="query"
                    />
                    <b-button type="submit" class="btn-search">
                        <font-awesome-icon icon="search" />
                    </b-button>
                </b-form>
            </b-col>
            <b-col sm="4">
                <a class="btn btn-add-store" @click="handleCreate">
                    <font-awesome-icon icon="plus" />Tạo khuyến mãi
                </a>
            </b-col>
        </b-row>
        <b-row class="my-1 count-area">
            <b-col sm="12">
                <button class="promotion-button-delete" @click="handleDeleteList">
                    <img src="~assets/image/icon/promotion-delete.png">Xóa Chương Trình Khuyến Mãi
                </button>
                <h2 class="item float-right">
                    {{ total }} khuyến mãi
                </h2>
            </b-col>
            <!--  <b-col sm="12">
                <h2 class="item">
                    {{ total }} khuyến mãi
                </h2>
            </b-col>       -->
        </b-row>
        <div id="list-stores">
            <b-row
                v-for="(item, index) in items"
                :key="index"
                class="my-1 item-store"
            >
                <b-col sm="1" class="promotion-margin-auto">
                    <b-form-checkbox
                        v-model="item.selected"
                        value="true"
                        unchecked-value="false"
                        class="promotion-margin-auto"
                    />
                </b-col>

                <b-col sm="1">
                    <img
                        class="promotion-img"
                        src="~assets/image/icon/gift_box.svg"
                        :alt="item.description"
                    >
                </b-col>

                <b-col sm="3" class="promotion-margin-auto">
                    Khuyến Mãi {{ item.description }}
                    <br>
                    {{ item.enable == 1 ? "Đang" : "Ngừng" }} Hoạt Động
                </b-col>

                <b-col sm="3" class="promotion-text-align-right promotion-margin-auto">
                    <b-row>
                        <b-col sm="10">
                            Xóa
                        </b-col>
                        <b-col sm="2">
                            <a @click="handleDeleteItem(item)">
                                <font-awesome-icon icon="trash" />
                            </a>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="10">
                            Chỉnh Sửa Thông Tin
                        </b-col>
                        <b-col sm="2">
                            <a @click="handleEdit(item)">
                                <font-awesome-icon icon="pencil-alt" />
                            </a>
                        </b-col>
                    </b-row>
                </b-col>

                <b-col sm="4" class="promotion-text-align-right promotion-margin-auto">
                    <b-row>
                        <b-col> Bắt Đầu: {{ item.time_start }} </b-col>
                    </b-row>

                    <b-row>
                        <b-col> Kết Thúc: {{ item.time_end }} </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
        <template>
            <div id="paginate" class="overflow-auto">
                <b-pagination
                    v-model="currentPage"
                    align="center"
                    :limit="1"
                    :total-rows="total"
                    :per-page="perPage"
                    :hide-ellipsis="true"
                    aria-controls="list-stores"
                    class="mt-4"
                    @input="getPromotion"
                >
                    <template v-slot:first-text>
                        <span class="color-primary">
                            <font-awesome-icon icon="fast-backward" />
                        </span>
                    </template>
                    <template v-slot:prev-text>
                        <span class="color-primary">
                            <font-awesome-icon icon="step-backward" />
                        </span>
                    </template>
                    <template v-slot:next-text>
                        <span class="color-primary">
                            <font-awesome-icon icon="step-forward" />
                        </span>
                    </template>
                    <template v-slot:last-text>
                        <span class="color-primary">
                            <font-awesome-icon icon="fast-forward" />
                        </span>
                    </template>
                    <template v-slot:page="{ page, active }">
                        <b v-show="active">{{ page }}</b>
                        trong {{ lastPage }}
                    </template>
                </b-pagination>
            </div>
        </template>
    </div>
</template>
<style lang="scss">
@import "../../../assets/scss/_variable";
@import "../../../assets/scss/_btable";
@import "../../../assets/scss/_stores";
@import "../../../assets/scss/_paginate";
</style>
<script>
import { ConstantsJS } from '../../../static/constants'
export default {
    layout: 'admin',
    components: {},
    data () {
        return {
            total: 0,
            perPage: 2,
            currentPage: 1,
            items: [],
            hasData: false,
            open: true,
            lastPage: 0,
            query: ''
        }
    },
    watch: {
        items () {
            this.items.forEach((element) => {
                element.selected = false
            })
        }
    },

    mounted () {
        this.getPromotion()
    },
    methods: {
        getPromotion () {
            this.$api.promotions.getPromotionStore(this.currentPage, this.query).then((res) => {
                if (res) {
                    this.total = res.total
                    this.perPage = res.per_page
                    this.currentPage = res.current_page
                    this.items = res.data
                    this.lastPage = res.last_page
                }
            })
        },
        handleEdit (item) {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.ADMIN.PROMOTION.EDIT,
                params: {
                    id: item.id
                }
            })
        },
        handleCreate () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.ADMIN.PROMOTION.CREATE
            })
        },
        handleDeleteItem (item) {
            this.$api.promotions.deletePromotion({ id: [item.id] }).then((res) => {
                if (res.status === 'OK') {
                    this.getPromotion()
                }
            })
        },
        handleDeleteList () {
            const list = []
            this.items.forEach((element) => {
                if (element.selected) {
                    list.push(element.id)
                }
            })
            if (list.length) {
                this.$api.promotions.deletePromotion({ id: list }).then((res) => {
                    if (res.status === 'OK') {
                        this.getPromotion()
                    }
                })
            }
        },
        queryPage (evt) {
            evt.preventDefault()
            this.currentPage = 1
            this.getPromotion()
        }
    },
    head () {
        return {
            title: 'Quản lý khuyến mãi'
        }
    }
}
</script>

<style scoped>
.promotion-text-align-right {
  text-align: right;
}

.promotion-img {
  width: 60px;
  height: auto;
  float: left;
  margin: 10px;
  border-radius: 10px;
}

.promotion-margin-auto {
  margin: auto;
}

.promotion-button-delete{
height: 35px;
border: 1px solid #FE7235;
color: #FE7235;
background-color: white;
border-radius: 5px;
display:inline-block;
font-size: 14px;
padding: 5px;
}

.promotion-button-delete img{
    width: auto;
}

</style>
