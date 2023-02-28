export default $axios => ({
    getEvents () {
        return $axios.get('events')
    },
    getEvent (id) {
        return $axios.get('events/' + id)
    }
})
