<template>
    <div id="map-popup-search">
        <div class="row margin-0">
            <AutoComplete
                class="col"
                :url-autocomplete="urlAutocomplete"
                :input-text="autocompleteText"
                :input-style="input_style"
                :id-textbox="idSearchAddress"
                :submit-value="addMarkerOnMap"
                :style-spinner="styleSpinner"
            />
        </div>
        <Map :id-map-name="idMapPopUpName" />
        <b-button class="btn-ok w-100" variant="info" @click="goToAddress">
            Ok
        </b-button>
    </div>
</template>
<style lang="scss">
    @import '../assets/scss/_variable';
    @import '../assets/scss/_mappopupsearch';
</style>

<script>
import Map from '../components/Map'
import AutoComplete from '../components/AutoComplete'
export default {
    name: 'MapPopupSearch',
    components: {
        Map,
        AutoComplete
    },
    props: {
        hasEvent: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            input_style: 'border-radius: 0px; padding-right: 35px !important; min-width:70%',
            autocompleteText: '',
            urlAutocomplete: 'street/autocomplete',
            idSearchAddress: 'autocomplete-map-popup-search',
            styleSpinner: 'color: gray !important;',
            idMapPopUpName: 'map-home-popup',
            targetPoint: null,
            address: null,
            place_id: null
        }
    },
    methods: {
        addMarkerOnMap (event, target) {
            const result = {
                name: this.idMapPopUpName,
                data: [target.geometry.coordinates[1], target.geometry.coordinates[0]]
            }
            this.address = target.description
            this.targetPoint = target.geometry.coordinates
            this.place_id = target.id
            this.$root.$emit('create-maker-on-map', result)
        },
        goToAddress () {
            if (this.hasEvent === false) {
                if (this.targetPoint) {
                    this.$router.push({
                        name: 'index',
                        query: {
                            updatelat: this.targetPoint[1],
                            updatelng: this.targetPoint[0]
                        }
                    })
                }
            } else {
                this.$root.$emit('map-popup-search-location', { location: this.targetPoint }, this.address, this.place_id)
            }
        }
    }
}
</script>
