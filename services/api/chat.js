export default $axios => ({
    getContacts (senderId, senderModel, page = 1) {
        return $axios.$get('/chat/contacts/' + senderId + '/' + senderModel + '?page=' + page)
    },
    getMessages (roomId, page = 1) {
        return $axios.$get('/chat/messages/' + roomId + '?page=' + page)
    },
    sendMessage (roomId, senderId, senderModel, receiverId, receiverModel, message) {
        return $axios.post('/chat/message', {
            sender_id: senderId,
            sender_model: senderModel,
            receiver_id: receiverId,
            receiver_model: receiverModel,
            room: roomId,
            message
        })
    },
    getContactByRoom (roomId, senderId, senderModel) {
        return $axios.$get('/chat/contact-by-room/' + roomId + '/' + senderId + '/' + senderModel)
    },
    getSingleMessage (messageId) {
        return $axios.$get('/chat/message-single/' + messageId)
    }
})
