<template>
    <div>
        <vue-tree-select
            v-model="selectedItems"
            class="input-tag-one"
            :multiple="false"
            :disable-branch-nodes="true"
            :options="options"
            placeholder="Chọn"
            @select="handleChange"
        />
    </div>
</template>

<script>
import VueTreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    name: 'TreeSelect',
    components: {
        VueTreeSelect
    },
    props: {
        options: {
            type: Array,
            default () {
                return []
            },
            required: true
        },
        value: {
            type: Array,
            default () {
                return []
            }
        },
        idForm: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            selectedItems: null
        }
    },
    watch: {
        selectedItems (val) {
            if (val) {
                this.value[0] = val
            }
        }
    },
    mounted () {
        this.$root.$on('update_banner_data', (data) => {
            if (data.bannerType === this.idForm) {
                this.selectedItems = data.type
            }
        })
    },
    methods: {
        handleChange (node) {
            this.$emit('selectChange', node)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './assets/scss/variable';

    .vue-treeselect {
        .vue-treeselect__input-container {
            input {
                border: unset;
            }
        }

        .vue-treeselect__single-value {
            top: 4px;
            font-weight: normal;
            color: $extra-dark-gray;
        }

        .vue-treeselect__menu {
            font-weight: normal;
            color: $extra-dark-gray;
            font-size: 14px;
        }

        .vue-treeselect__placeholder {
            top: 4px;
            font-weight: 100;
            color: $dark-gray;
            font-size: 14px;
        }

        &:focus, &:hover {
            box-shadow: 0 0 10px $extra-light-blue;
        }

        div:first-child {
            border-color: $extra-light-blue;

            input {
                box-shadow: unset;
            }
        }
    }
</style>
