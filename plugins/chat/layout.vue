<template>
    <div v-if="ownerChat !== null" id="chat-app" class="center">
        <div v-if="!showMain" class="chat-icon">
            <fa-icon :icon="fas.faComments" @click="showChatBox" />
        </div>
        <div v-if="showMain" class="contacts" @scroll.passive="handleScrollContact($event)">
            <i class="fas fa-bars fa-2x" />
            <!-- <div class="contact-title">
                Danh bạ
            </div> -->
            <div v-for="contact in chatData.contacts" :key="contact.user.id" class="contact" :class="{processing: chatData.processing === contact}" @click="processContact(contact)">
                <div class="pic">
                    <img
                        class="rounded-circle"
                        :src="contact.user.image"
                    >
                </div>
                <div v-if="contact.hasUnread()" class="badge">
                    {{ contact.unread }}
                </div>
                <div class="name">
                    {{ nameLimit(contact.user.name) }}
                </div>
                <div class="message">
                    {{ contact.user.desc }}
                </div>
            </div>
            <div v-if="loadingContact" class="text-center">
                <fa-icon :icon="fas.faSpinner" class="fa-pulse loading-message" /><br>
                <span>Tải danh bạ...</span>
            </div>
        </div>
        <div v-if="showMain && chatData.processing == null" class="chat">
            <div class="no-message text-center p-2">
                <img src="https://img.icons8.com/cotton/2x/chat.png">
                <div class="contact-title">
                    Trò chuyện ngay...
                </div>
            </div>
            <div class="close-icon">
                <fa-icon :icon="fas.faTimes" class="close" @click="closeChatBox" />
                <div />
                <div v-if="showMain && chatData.processing != null" class="chat">
                    <div class="contact bar">
                        <div class="pic">
                            <img
                                class="rounded-circle"
                                :src="chatData.processing.user.image"
                            >
                        </div>
                        <div class="name">
                            {{ chatData.processing.user.name }}
                        </div>
                        <!-- <div class="seen">
                            Today at 12:56
                        </div> -->
                        <fa-icon :icon="fas.faTimes" class="close" @click="closeChatBox" />
                    </div>
                    <div id="chat-content" class="messages" @scroll.passive="handleScrollChatContent($event)">
                        <!-- <div class="time">
                            Today at 11:41
                        </div>-->
                        <div v-if="loadingHistory" class="text-center">
                            <fa-icon :icon="fas.faSpinner" class="fa-pulse loading-message" /><br>
                            <span>Tải lịch sử...</span>
                        </div>
                        <div v-for="message in chatData.processing.messages" :key="message.id" class="message" :class="{ mine: message.from == 'mine', yours: message.from == 'yours' }">
                            <fa-icon v-if="message.sending !== null && message.sending === 1" :icon="fas.faSpinner" class="fa-pulse sending" />
                            <div class="content">
                                {{ message.content }}
                            </div>
                            <div class="time">
                                {{ message.time }}
                            </div>
                        </div>
                        <!-- <div class="message mine">
                    <fa-icon v-if="chatData.currentMessage.sending === false" :icon="fas.faSpinner" class="fa-pulse sending" />
                    <div class="content">
                        Kid, where'd you come from?
                    </div>
                    <div class="time">
                        14:41
                    </div>
                </div> -->
                        <div class="message stark" style="display: none">
                            <div class="typing typing-1" />
                            <div class="typing typing-2" />
                            <div class="typing typing-3" />
                        </div>
                    </div>
                    <div class="input">
                        <input ref="chatImage" type="file" style="display: none" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange">
                        <fa-icon :icon="fas.faCamera" @click="$refs.chatImage.click()" />
                        <!-- <fa-icon :icon="fas.faLaughBeam" /> -->
                        <input v-model="chatData.currentMessage.content" placeholder="Gõ tin nhắn tại đây!" type="text" @keyup.enter="sendMessage()" @paste="onPaste">
                        <fa-icon :icon="fas.faPaperPlane" :class="{disabled: !chatData.currentMessage.isHasContent()}" @click="sendMessage()" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import VChat from './handle'
import { ChatMessage } from '~/store/ChatMessage'
import { PusherService } from '~/services/pusher'

export default {
    validate () {
        return false
    },
    data () {
        return {
            eventChatMessage: 'ChatMessageNotification',
            channel: null,
            showMain: false,
            ownerChat: null,
            loadingHistory: false,
            loadingContact: false,
            chatData: {
                contacts: [

                ],
                processing: null,
                currentMessage: {
                    content: null,
                    from: 'mine',
                    sending: false,
                    isHasContent () {
                        return this.content !== null && this.content !== ''
                    }
                }
            },
            requireKeepBottomChatContent: false,
            pageContact: 0,
            hasMoreContact: true
        }
    },
    computed: {
        fas () {
            return fas
        }

    },
    beforeMount () {
        VChat.EventBus.$on('init', ({ ownerId, ownerType }) => {
            this.init(ownerId, ownerType)
        })

        VChat.EventBus.$on('destroy', () => {
            this.destroy()
        })

        VChat.EventBus.$on('start', ({ receiverId, receiverType, receiverName }) => {
            this.start(receiverId, receiverType, receiverName)
        })
    },
    updated () {
        if (this.requireKeepBottomChatContent) {
            this.chatContentScrollToBottom()
            this.requireKeepBottomChatContent = false
        }
    },
    methods: {
        init (ownerId, ownerType) {
            this.destroy()
            if (typeof (ownerId) === 'undefined' || typeof (ownerType) === 'undefined' || ownerId === null || ownerType === null) {
                // console.error('Init chat plugin failed!!!!')
                return
            }
            this.ownerChat = {
                // id: 'B20e74d7715f949c69775b61de0b7a330',
                id: ownerId,
                type: ownerType
            }

            this.pageContact = 0
            this.hasMoreContact = true

            this.channel = PusherService.getInstance().subscribe(this.getPusherChannel())

            this.channel.bind(this.eventChatMessage, (data) => {
                let isNew = true
                for (let i = 0; i < this.chatData.contacts.length; i++) {
                    if (data.chat.chat_room_id === this.chatData.contacts[i].room) {
                        if (this.chatData.contacts[i].isSelected) {
                            const found = this.chatData.contacts[i].messages.some(el => el.id === data.chat.id)
                            if (!found) {
                                this.$api.chat.getSingleMessage(data.chat.id).then((res) => {
                                    this.chatData.contacts[i].messages.push({
                                        content: res.message,
                                        id: res.id,
                                        from: 'yours',
                                        time: res.created_at
                                    })
                                })
                            }
                            if (this.chatData.contacts[i].room === this.chatData.processing.room) {
                                this.requireKeepBottomChatContent = true
                            }
                        }
                        isNew = false
                        if (this.chatData.contacts[i] !== this.chatData.processing) {
                            this.chatData.contacts[i].unread += 1
                        }
                    }
                }
                if (isNew) {
                    this.$api.chat.getContactByRoom(data.chat.chat_room_id, this.ownerChat.id, this.ownerChat.type).then((res) => {
                        const contact = new ChatMessage(res.user, data.chat.chat_room_id, [])
                        contact.unread += 1
                        this.chatData.contacts.push(contact)
                    })
                }
            })

            this.loadContact()
        },
        destroy () {
            if (this.channel !== null) {
                this.channel.unbind(this.eventChatMessage)
                PusherService.getInstance().unsubscribe(this.getPusherChannel())
            }
            this.chatData.contacts = []
            this.chatData.processing = null
            this.chatData.currentMessage.content = null
            this.ownerChat = null
        },
        start (receiverId, receiverType, receiverName) {
            let contact = this.getExistContact({ id: receiverId, type: receiverType })
            if (contact === null) {
                contact = new ChatMessage({
                    id: receiverId,
                    type: receiverType,
                    name: receiverName,
                    image: 'https://pickaface.net/gallery/avatar/unr_tonystark_171030_0220_9v0nmm.png'
                }, null, [])
                this.chatData.contacts.push(contact)
            }
            this.processContact(contact)
        },
        getPusherChannel () {
            return 'chat_channel_' + this.ownerChat.id + '_' + this.ownerChat.type
        },
        showChatBox () {
            this.showMain = true
        },
        closeChatBox () {
            this.showMain = false
        },
        processContact (contact) {
            if ((this.chatData.processing !== null && this.chatData.processing.room !== contact.room) || this.chatData.processing === null) {
                this.chatData.processing = contact
                contact.select()
                if (contact.messages.length === 0) {
                    this.loadChatHistory(contact)
                }
                this.requireKeepBottomChatContent = true
            }
        },
        scrollToEnd () {
            const container = this.$el.querySelector('#chat-content')
            if (container !== null) {
                container.scrollTop = container.scrollHeight
            }
        },
        sendMessage () {
            if (!this.chatData.currentMessage.isHasContent()) {
                return
            }
            if (this.chatData.processing === null) {
                return
            }
            this.chatData.currentMessage.content = this.urlify(this.chatData.currentMessage.content)
            this.sendRawMessage()
        },
        sendRawMessage () {
            const messagePrepareToSend = {
                content: this.chatData.currentMessage.content,
                id: null,
                from: 'mine',
                time: moment().format('DD/MM/YYYY hh:mm:ss'),
                sending: 1
            }
            this.chatData.processing.messages.push(messagePrepareToSend)
            this.chatData.currentMessage.content = null
            this.$api.chat.sendMessage(this.chatData.processing.room, this.ownerChat.id, this.ownerChat.type, this.chatData.processing.user.id, this.chatData.processing.user.type, messagePrepareToSend.content).then((res) => {
                messagePrepareToSend.sending = 0
                messagePrepareToSend.id = res.id
            })
            this.requireKeepBottomChatContent = true
        },
        handleScrollChatContent (e) {
            if (e.target.scrollTop <= 20) {
                this.loadChatHistory(this.chatData.processing)
            }
        },
        handleScrollContact (e) {
            if (e.target.scrollHeight - e.target.scrollTop <= 20 + e.target.clientHeight) {
                this.loadContact()
            }
        },
        loadContact () {
            if (this.hasMoreContact && this.loadingContact === false) {
                this.loadingContact = true
                this.$api.chat.getContacts(this.ownerChat.id, this.ownerChat.type, ++this.pageContact).then((res) => {
                    res.data.forEach((val) => {
                        // const isExists = false
                        const contact = this.getExistContact(val.user)
                        if (contact !== null) {
                            contact.room = val.room.id
                        } else {
                            this.chatData.contacts.push(new ChatMessage(val.user, val.room.id, []))
                        }
                    })
                    this.loadingContact = false
                    if (res.data.length === 0) {
                        this.hasMoreContact = false
                    }
                })
            }
        },
        getExistContact (user) {
            for (let i = 0; i < this.chatData.contacts.length; i++) {
                const contact = this.chatData.contacts[i]
                if (contact.user.id === user.id && contact.user.type === user.type) {
                    return contact
                }
            }
            return null
        },
        loadChatHistory (contact) {
            if (contact.hasMore && contact.isLoading === false) {
                this.loadingHistory = true
                contact.isLoading = true
                this.$api.chat.getMessages(contact.room, contact.page + 1).then((res) => {
                    this.loadingHistory = false
                    contact.page = res.current_page
                    if (res.data.length === 0) {
                        contact.hasMore = false
                    } else {
                        res.data.forEach((val) => {
                            if (val.model_id !== this.ownerChat.id && val.model_type !== this.ownerChat.type) {
                                contact.messages = [
                                    {
                                        content: val.message,
                                        id: val.id,
                                        from: 'yours',
                                        time: moment(val.created_at).format('DD/MM/YYYY hh:mm:ss')
                                    },
                                    ...contact.messages
                                ]
                            } else {
                                contact.messages = [
                                    {
                                        content: val.message,
                                        id: val.id,
                                        from: 'mine',
                                        time: moment(val.created_at).format('DD/MM/YYYY hh:mm:ss')
                                    },
                                    ...contact.messages
                                ]
                            }
                        })
                    }
                    if (contact.page === 1) {
                        this.requireKeepBottomChatContent = true
                    }
                    contact.isLoading = false
                }).catch(() => {
                    contact.isLoading = false
                    // console.log(err.response)
                })
            }
        },
        chatContentScrollToBottom () {
            this.$nextTick(() => this.scrollToEnd())
        },
        urlify (text) {
            const urlRegex = /(https?:\/\/[^\s]+)/g
            return text.replace(urlRegex, function (url) {
                return '<a href="' + url + '">' + url + '</a>'
            })
        },
        onFileChange (e) {
            const file = e.target.files[0]
            const FileSize = file.size / 1024 / 1024 // in MB
            if (FileSize > 2) {
                this.showErrorFile()
                return
            }
            const reader = new FileReader()
            reader.onload = (e) => {
                this.chatData.currentMessage.content = '<img src="' + e.target.result + '" />'
                this.sendRawMessage()
            }
            reader.readAsDataURL(file)
        },
        onPaste (evt) {
            // console.log(evt.clipboardData.items)
            return true
        },
        nameLimit (val) {
            if (val.length > 20) {
                return val.substring(0, 20) + '...'
            }
            return val
        }
    },
    notifications: {
        showErrorFile: {
            type: 'error',
            title: 'Invalid image',
            message: 'File size exceeds 2 MB',
            position: 'bottomRight',
            timeout: 7000
        }
    }
}
</script>

<style lang="scss">
    @import "./style.scss";
</style>
