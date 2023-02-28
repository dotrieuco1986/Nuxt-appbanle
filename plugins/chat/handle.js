import layout from './layout'

const VChat = {
    install (Vue) {
        this.EventBus = new Vue()
        Vue.component('v-chat', layout)
        Vue.prototype.$chat = {
            init (ownerId, ownerType) {
                VChat.EventBus.$emit('init', { ownerId, ownerType })
            },
            destroy () {
                VChat.EventBus.$emit('destroy')
            },
            start () {
                // VChat.EventBus.$emit('start', { receiverId, receiverType, receiverName })
            }
        }
    }
}

export default VChat
