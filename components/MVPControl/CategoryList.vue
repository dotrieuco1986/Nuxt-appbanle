<template>
    <div class="">
        <div class="category-list">
            <ul v-if="data.length > 0" class="scroll-item">
                <li v-for="item in data" :key="item.id" class="category-item">
                    <div v-if="item.items.length > 0" class="d-contents" @click="expand(item)">
                        <p :class="classGroup(item,selected)">
                            {{ item.name }}
                        </p>
                        <svg-icon :icon="iconName" />
                    </div>

                    <div v-else class="d-contents" @click="select(item)">
                        <p :class="classChild (item, selected)">
                            {{ item.name }}
                        </p>
                    </div>
                </li>
            </ul>

            <ul v-if="data2.length > 0" class="scroll-item">
                <li v-for="item in data2" :key="item.id" class="category-item">
                    <div v-if="item.items.length > 0" class="d-contents" @click="expand2(item)">
                        <p :class="classGroup(item,selected2)">
                            {{ item.name }}
                        </p>
                        <svg-icon :icon="iconName" />
                    </div>

                    <div v-else class="d-contents" @click="select2(item)">
                        <p :class="classChild (item, selected2)">
                            {{ item.name }}
                        </p>
                    </div>
                </li>
            </ul>

            <ul v-if="data3.length > 0" class="scroll-item">
                <li v-for="item in data3" :key="item.id" class="category-item">
                    <div v-if="item.items.length > 0" class="d-contents" @click="expand3(item)">
                        <p :class="classGroup(item,selected3)">
                            {{ item.name }}
                        </p>
                        <svg-icon :icon="iconName" />
                    </div>

                    <div v-else class="d-contents" @click="select3(item)">
                        <p :class="classChild (item, selected3)">
                            {{ item.name }}
                        </p>
                    </div>
                </li>
            </ul>

            <ul v-if="data4.length > 0" class="scroll-item">
                <li v-for="item in data4" :key="item.id" class="category-item">
                    <div class="d-contents" @click="select4(item)">
                        <p :class="classChild (item, selected4)">
                            {{ item.name }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="d-inline">
            <span> Đã chọn: </span>
            <div class="d-inline text-orange">
                <span v-if="categoryValue">{{ categoryValue }}</span>
            </div>
        </div>
    </div>
</template>

<script>

import SvgIcon from '@/components/common/SvgIcon'

export default {
    name: 'CategoryList',
    components: { SvgIcon },
    props: {
        showValue: {
            type: Boolean,
            default: false
        },
        categories: {
            type: Object,
            default: null
        }
    },
    async fetch () {
        const response = await this.$api.store.getCategoriesDefault()
        this.data = response.data

        if (this.categories && this.data.length > 0) {
            this.syncCategory()
        }
    },
    data () {
        return {
            data: [],
            data2: [],
            data3: [],
            data4: [],
            selected: {
                id: 0,
                value: '',
                active: false
            },
            selected2: {
                id: 0,
                value: '',
                active: false
            },
            selected3: {
                id: 0,
                value: '',
                active: false
            },
            selected4: {
                id: 0,
                value: '',
                active: false
            },
            categoryValue: '',
            categoryId: 0,
            strNext: ' > ',
            iconName: 'next'
        }
    },
    methods: {
        expand (item, isSync = false) {
            this.setValueSelected(this.selected, item, false)
            this.categoryValue = this.selected.value

            const index = isSync ? this.getIndexItem(this.data, item) : this.data.indexOf(item)
            this.data2 = this.data[index].items.length > 0 ? this.data[index].items : []

            // clear data
            this.clearSelected(this.selected2)
            this.clearSelected(this.selected3)
            this.clearSelected(this.selected4)

            this.data3 = []
            this.data4 = []
        },
        expand2 (item, isSync = false) {
            this.setValueSelected(this.selected2, item, false)
            this.categoryValue = this.selected.value + this.strNext + this.selected2.value

            const index = isSync ? this.getIndexItem(this.data2, item) : this.data2.indexOf(item)
            this.data3 = this.data2[index].items.length > 0 ? this.data2[index].items : []

            // clear data
            this.clearSelected(this.selected3)
            this.clearSelected(this.selected4)

            this.data4 = []
        },
        expand3 (item, isSync = false) {
            this.setValueSelected(this.selected3, item, false)
            this.categoryValue = this.selected.value + this.strNext + this.selected2.value + this.strNext + this.selected3.value

            const index = isSync ? this.getIndexItem(this.data3, item) : this.data3.indexOf(item)
            this.data4 = this.data3[index].items.length > 0 ? this.data3[index].items : []

            // clear data
            this.clearSelected(this.selected4)
        },
        select (item) {
            this.setValueSelected(this.selected, item, true)
            this.categoryValue = this.selected.value

            this.data2 = []
            this.data3 = []
            this.data4 = []
        },
        select2 (item) {
            this.setValueSelected(this.selected2, item, true)
            this.categoryValue = this.selected.value + this.strNext + this.selected2.value

            this.data3 = []
            this.data4 = []
        },
        select3 (item) {
            this.setValueSelected(this.selected3, item, true)
            this.categoryValue = this.selected.value + this.strNext + this.selected2.value + this.strNext + this.selected3.value

            this.data4 = []
        },
        select4 (item) {
            this.setValueSelected(this.selected4, item, true)
            this.categoryValue = this.selected.value + this.strNext + this.selected2.value + this.strNext + this.selected3.value + this.strNext + this.selected4.value
        },
        classGroup (item, selected) {
            let className = 'text-overflow'
            if (selected.active && selected.value === item.name) {
                className += ' active'
            }

            return className
        },
        classChild (item, selected) {
            let className = 'text-overflow can'
            if (selected.active && selected.value === item.name) {
                className += ' active'
            }

            return className
        },
        setValueSelected (selected, item, active) {
            selected.id = item.id
            selected.value = item.name
            selected.active = true

            this.categoryId = active ? item.id : 0
        },
        clearSelected (selected) {
            selected = {
                id: 0,
                value: '',
                active: false
            }
        },
        syncCategory () {
            let item = this.categories
            // LV1
            if (item.items.length === 0) {
                this.select(item)
            } else {
                this.expand(item, true)
                item = item.items[0]

                // LV2
                if (item.items.length === 0) {
                    this.select2(item)
                } else {
                    this.expand2(item, true)
                    item = item.items[0]

                    // LV3
                    if (item.items.length === 0) {
                        this.select3(item)
                    } else {
                        this.expand3(item, true)
                        item = item.items[0]

                        // LV4
                        this.select4(item)
                    }
                }
            }
        },
        getIndexItem (dataSource, item) {
            let index = -1
            for (let i = 0; i < dataSource.length; i++) {
                if (item.name === dataSource[i].name) {
                    index = i
                    break
                }
            }
            return index
        }
    }
}
</script>

<style lang="scss">

.category-list {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 16px;
    padding: 10px 0;
    background-color: #fff;
    -webkit-transition: left .5s ease;
    transition: left .5s ease;

    .scroll-item {
        width: 33%;
        min-height: 400px;
        border-left: 1px solid #fff;
        overflow-y: scroll;
        list-style: none;

        .category-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            line-height: 32px;
            padding: 0 16px;
            color: #666;

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 5px;

                &.active {
                    color: #FE7235
                }
            }
        }
    }

    .d-contents {
        display: contents;
    }

    .can {
        font-weight: bold;
    }
}

</style>
