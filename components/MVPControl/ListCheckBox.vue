<template>
    <div class="list-ck-container row">
        <div v-if="name" class="col-2">
            <span>{{ name }}</span>
        </div>
        <div class="col">
            <div class="container-data">
                <div v-for="item in data" :key="item.id" class="item">
                    <div class="row align-center">
                        <div class="col-1">
                            <mvp-checkbox :checked="checked" @change.native="changeListSelected(item.id,$event.target.checked)" />
                        </div>

                        <div class="col-4">
                            <img
                                class="img-product"
                                :src="setImageSource(item)"
                                alt="Image"
                            >
                        </div>

                        <div class="col">
                            <label>{{ type==='product'?'S':'' }}San Pham: {{ item.name }}</label><br>
                            <span v-if="type==='product'">Ma san pham: {{ item.sku_code }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MvpCheckbox from '@/components/MVPControl/MvpCheckbox'
export default {
    name: 'ListCheckBox',
    components: { MvpCheckbox },
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        name: {
            type: String,
            default: ''
        },
        checked: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            selected: [],
            imageUrl: process.env.SERVER_IMAGE_URL
        }
    },
    methods: {
        changeListSelected (id, isCheck) {
            if (isCheck) {
                this.selected.push(id)
            } else {
                this.selected.pop(id)
            }
        },
        setImageSource (item) {
            let src = this.imageUrl
            if (this.type === 'product') {
                if (item.images.length > 0) {
                    src += item.images[0]
                } else {
                    src += 'no-image.png'
                }
            } else {
                src += item.signboard_photo
            }

            return src
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/_listcheckbox';
</style>
