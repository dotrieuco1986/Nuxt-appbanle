<template>
    <MVPAutoComplete
        :id-textbox="idTextbox"
        :input-text="autocompleteText"
        :input-style="inputStyle"
        :icon-style="iconStyle"
        :url-autocomplete="urlAutocomplete"
        :submit-value="submitValue"
        :clear-value="clearValue"
        :place-holder-textbox="placeHolder"
        :read-only="readOnly"
    />
</template>

<script>
import MVPAutoComplete from 'mvp-autocomplete'
export default {
    name: 'AutoComplete',
    components: {
        MVPAutoComplete
    },
    props: {
        idTextbox: {
            type: String,
            default: 'keyword-auto'
        },
        urlAutocomplete: {
            type: String,
            default: 'autocomplete'
        },
        autocompleteText: {
            type: String,
            default: ''
        },
        submitValue: {
            type: Function,
            required: true
        },
        // eslint-disable-next-line vue/require-default-prop
        clearValue: {
            type: Function
        },
        inputStyle: {
            type: String,
            default: 'border-radius: 5px; padding-right: 35px;'
        },
        iconStyle: {
            type: String,
            default: ''
        },
        placeHolder: {
            type: String,
            default: 'Nhập địa chỉ'
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
        }
    }
}
</script>

<style lang="scss">
    .autocomplete-input {
        position: relative;

        .autocomplete-clear {
            position: absolute;
            top: 9px;
            right: 7px;
            cursor: pointer;
        }

        .autocomplete-spinner {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 9px;
            right: 7px;
        }

        input {
            border-radius: 5px;
            border: 1px solid #ced4da;
        }

        input:read-only {
            background-color: #e9ecef;
            opacity: 1;
        }
    }

    .autocomplete-items {
        position: absolute;
        border: 1px solid #d4d4d4;
        border-bottom: none;
        border-top: none;
        z-index: 9999;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;

        div {
            padding: 10px;
            cursor: pointer;
            background-color: #fff;
            border-bottom: 1px solid #d4d4d4;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        /*when hovering an item:*/
        div:hover {
            background-color: #e9e9e9;
        }

        /*when navigating through the items using the arrow keys:*/
        .autocomplete-active {
            background-color: DodgerBlue !important;
            color: #ffffff;
        }
    }
</style>
