<template>
    <div class="content">
        <div class="row bg-content">
            <p class="title lora-bold-italic padding-bottom-10">
                Săn hàng shop,<br>
                thêm nhiều ưu đãi ...
            </p>
            <div class="col-12 padding-0">
                <SearchLocation :is-map-location="false" />
            </div>
        </div>
        <Modal id="map-popup">
            <MapPopupSearch />
        </Modal>
    </div>
</template>

<script>
import Modal from '../components/modal/Modal'
import MapPopupSearch from '../components/MapPopupSearch'
import SearchLocation from '../components/SearchLocation'
import Constants from '../static/constants'

export default {
    layout: 'landing',
    components: {
        SearchLocation,
        Modal,
        MapPopupSearch
    },
    data () {
        return {
            input_style: 'border-radius: 15px; padding-right: 35px !important; min-width:70%',
            autocompleteText: '',
            urlAutocomplete: 'autocomplete',
            idSearchLinkCSDK: 'search-link-cskd',
            idSearchAddress: 'search-address',
            styleSpinner: 'color: gray !important;',
            targetMap: []
        }
    },
    mounted () {
        this.checkLocationExits()
    },
    methods: {
        checkLocationExits () {
            this.$store.dispatch('address/getAddress')
            const myGoollow68Location = this.$store.state.address.myGoollow68Location
            if (myGoollow68Location) {
                this.$router.push({
                    name: 'index',
                    query: {
                        updatelat: myGoollow68Location.lat,
                        updatelng: myGoollow68Location.lng
                    }
                })
            }
        },
        showMap () {
            this.$bvModal.show('map-popup')
        },
        getLocation () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.gotoFindPlace)
            }
        },
        gotoFindPlace (position) {
            this.pushLink(position.coords.latitude, position.coords.longitude)
        },
        submitValuePlace (event, data) {
            this.pushLink(data.geometry.coordinates[1], data.geometry.coordinates[0])
        },
        addMarkerOnMap (event, data) {
            this.targetMap = data.geometry.coordinates
            this.$root.$emit('create-maker-on-map', data.geometry.coordinates)
        },
        goToFindPlaceMapPopUp (position) {
            this.pushLink(this.targetMap[1], this.targetMap[0])
        },
        pushLink (lat, lng) {
            this.$router.push({
                name: 'find',
                query: {
                    businesstypeid: 0,
                    location: lat + ',' + lng,
                    radius: Constants.DEFAULT_RADIUS,
                    text: ' '
                }
            })
        }
    },
    head () {
        return {
            title: 'User Restaurant Listing'
        }
    }
}
</script>
