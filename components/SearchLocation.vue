<template>
    <div id="search-location" class="row bg-content">
        <div class="col-12 group-autocomplete">
            <b-input-group class="margin-top-13">
                <AutoComplete
                    class="col padding-0"
                    :url-autocomplete="urlAutocomplete"
                    :input-text="autocompleteText"
                    :input-style="input_style"
                    :id-textbox="idSearchLocationName"
                    :submit-value="submitValuePlace"
                    :style-spinner="styleSpinner"
                />
                <img src="@/assets/image/icon/target-current.svg" @click="getLocation">
            </b-input-group>
        </div>
        <div v-if="address" class="col-12 text-left address">
            <svg-icon icon="address" has-fill="true" grow-by-height="24px" />
            <span class="margin-top-5 margin-left-10">
                {{ address }}
            </span>
        </div>
        <div class="col-12 text-right search-on-map">
            <svg-icon icon="map-pointer" has-fill="true" grow-by-height="24px" />
            <span class="text-search-on-map text-orange" @click="showMap">
                Tìm trên bản đồ
            </span>
        </div>
    </div>
</template>
<style lang="scss">
    @import '../assets/scss/_variable';
    @import '../assets/scss/_searchlocation';
</style>
<script>
import Constants from '../static/constants'
import AutoComplete from './AutoComplete'
import SvgIcon from './common/SvgIcon'

export default {
    name: 'MapPopupCreate',
    components: {
        AutoComplete,
        SvgIcon
    },
    props: {
        isMapLocation: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
            default: null
        },
        eventMapPopUpName: {
            type: String,
            default: 'model-map-popup'
        }
    },
    data () {
        return {
            input_style: 'border-radius: 0px; padding-right: 35px !important; min-width:70%',
            autocompleteText: '',
            urlAutocomplete: 'street/autocomplete',
            idSearchLocationName: 'autocomplete-search-location',
            styleSpinner: 'color: gray !important;',
            targetMap: [],
            idMapName: 'map-popup'
        }
    },
    methods: {
        showMap () {
            this.$root.$emit(this.eventMapPopUpName)
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
        goToFindPlaceMapPopUp (position) {
            this.pushLink(this.targetMap[1], this.targetMap[0])
        },
        pushLink (lat, lng) {
            if (this.isMapLocation) {
                this.$router.push({
                    name: 'index',
                    query: {
                        updatelat: lat,
                        updatelng: lng
                    }
                })
            } else {
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
        }
    }
}
</script>
