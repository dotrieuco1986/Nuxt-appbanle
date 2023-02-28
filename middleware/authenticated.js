import { ConstantsJS } from 'static/constants'

export default function ({ store, error, route, redirect }) {
    // If the user is not authenticated
    if (!store.state.auth.loggedIn) {
        return redirect('/?error=' + ConstantsJS.STR_UNAUTHORIZED + '&redirect_uri=' + route.path)
    }
}
