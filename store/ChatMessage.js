export const ChatMessage = class {
    constructor (user, room, messages) {
        this.user = user
        this.room = room
        this.messages = messages
        this.unread = 0
        this.isSelected = false
        this.page = 0
        this.isScrollBottom = false
        this.hasMore = true
        this.isLoading = false
    }

    hasUnread () {
        return this.unread !== null && typeof (this.unread) !== 'undefined' && this.unread > 0
    }

    select () {
        this.unread = 0
        this.isSelected = true
    }
}
