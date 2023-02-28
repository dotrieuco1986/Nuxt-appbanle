
const Pusher = require('pusher-js')

export const PusherService = (function () {
    let instance

    function init () {
        const pusher = new Pusher(process.env.PUSHER_KEY, {
            cluster: process.env.PUSHER_CLUSTER,
            // httpHost: environment.pusher.host,
            wsHost: process.env.PUSHER_HOST,
            key: process.env.PUSHER_KEY,
            wsPort: process.env.PUSHER_PORT,
            enabledTransports: ['ws', 'wss'],
            // disableStats: true,
            forceTLS: process.env.PUSHER_TLS === 'true',
            // disabledTransports: ["flash"],
            useTLS: process.env.PUSHER_TLS === 'true'
            // encrypted: false
            // encrypted: true
        })

        return pusher
    }

    return {
        getInstance () {
            if (!instance) { instance = init() }
            return instance
        }
    }
})()
