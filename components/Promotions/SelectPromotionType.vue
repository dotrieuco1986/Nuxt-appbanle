<template>
    <b-dropdown
        ref="typeDropdown"
        variant="link"
        toggle-class="text-decoration-none p-0"
        class="w-100"
        no-caret
    >
        <template v-slot:button-content>
            <div class="seleted-button d-flex align-items-center">
                <div>
                    <span>
                        {{ data_selected.name }}
                    </span>
                </div>
                <div class="ml-auto promotion-margin-5">
                    <img
                        class="promotion-selectetion-img float-right"
                        src="~assets/image/icon/promotion-seleted.png"
                    >
                </div>
            </div>
        </template>
        <b-dropdown-form class="w-100">
            <b-row
                v-for="(item, index) in options"
                :key="item.value"
                class="p-2"
                :class="{ 'promotion-border-bottom': index + 1 < options.length }"
            >
                <b-col sm="10">
                    <label>{{ item.name }}</label>
                </b-col>
                <b-col sm="2">
                    <input
                        v-model="data_selected"
                        type="radio"
                        required
                        :value="item"
                        name="some-radios"
                        @change="typeFormatChange"
                    >
                </b-col>
                <b-dropdown-divider />
            </b-row>
        </b-dropdown-form>
    </b-dropdown>
</template>
<script>
export default {
    model: {
        prop: 'selected',
        event: 'selected_event'
    },
    props: {
        selected: {
            required: true,
            default: { name: '', value: '' }
        },
        options: {
            required: true,
            default: []
        }
    },
    data () {
        return {
            data_selected: {
                name: '',
                value: ''
            }
        }
    },
    watch: {
        selected () {
            if (this.data_selected !== this.selected) {
                this.data_selected = this.selected
            }
        }
    },
    methods: {
        typeFormatChange () {
            this.$emit('selected_event', this.data_selected)
            this.$refs.typeDropdown.hide(true)
        }
    }
}
</script>
<style>
.dropdown-menu {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 0;
  transform: translate3d(0px, 36px, 0px);
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: #f9f9f9;
}
</style>
<style  scoped>
.seleted-button {
  width: 100%;
  border: 1px solid #ced4da;
  height: 35px;
  font-size: 14px;
  background-color: rgb(255, 255, 255);
  text-align: left;
  padding-left: 10px;
}

span {
  color: #fe7235;
  font-weight: normal;
  font-size: 14px;
}

label {
  font-weight: normal;
  font-size: 14px;
  color: rgb(98, 98, 98);
}

.promotion-selectetion-img {
  width: 18px;
}

.promotion-border-bottom {
  border-bottom: 1px solid #ced4da;
}
.promotion-margin-5 {
  margin-right: 5px;
}

input:checked {
  background-color: red;
}
</style>
