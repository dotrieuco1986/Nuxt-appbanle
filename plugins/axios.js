import { ConstantsJS } from 'static/constants'

export default function ({ $axios, store, route, redirect, error }) {
    // $axios.onRequest((config) => {
    //     const token = store.state.auth.accessToken
    //     if (token) { config.headers.Authorization = `Bearer ${token}` }
    // })

    // $axios.onResponse(response => {
    //     console.log('Response:')
    //     console.log(response)
    // })

    $axios.onResponseError((err) => {
        const code = parseInt(err.response && err.response.status)

        if (code === 401) {
            redirect('/?error=' + ConstantsJS.STR_UNAUTHORIZED + '&redirect_uri=' + route.path)
        }
    })

    $axios.onError((err) => {
        const code = parseInt(err.response && err.response.status)

        if (code === 400) {
            // redirect('/400')
        }
        // else if (code === 500) {
        //     // error({ statusCode: 401, message: err.message })
        //     redirect('/500')
        // }
    })
}
