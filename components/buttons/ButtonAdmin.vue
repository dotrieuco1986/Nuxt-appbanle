<template>
    <button :type="type" :class="className" @click="handleClick">
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'ButtonAdmin',
    components: {
    },
    props: {
        text: {
            type: String,
            default: '',
            description: 'text for button'
        },
        type: {
            default: 'submit'
        },
        className: {
            default: ''
        }
    },
    data () {
        return { }
    },
    methods: {
        handleClick (evt) {
            this.$emit('click', evt)
        }
    }
}
</script>
