<template>
    <div id="mainmap" class="fs-inner-container">
        <div class="map-container">
            <div :id="idMapName" />
        </div>
        <div v-if="findShops.status > 0">
            {{ test() }}
        </div>

        <advertisement-popup
            ref="PopupMap"
            :data="advertisementData.data"
            :data-i-d="advertisementData.id"
            :is-show="advertisementData.isShow"
        />
        <map-popup-create
            ref="MapPopupCreate"
            :link="link"
            :show="showPopupCreateBusiness"
        />

        <business-container
            :id="businessInfo.id"
            ref="PopupBusiness"
            :name="businessInfo.name"
            :type="businessInfo.type"
            :address="businessInfo.address"
            :phone="businessInfo.phone"
            :reliability="businessInfo.reliability"
            :photos="businessInfo.photos"
            :geometry="businessInfo.geometry"
            :status-heart="businessInfo.statusHeart"
            :status-report="businessInfo.statusReport"
            :note-report="businessInfo.noteReport"
            :type-view="businessInfo.typeView"
            modal-id="0"
            small="true"
        />
        <popup-info ref="PopupBusinessInfo" :info="busInfoShort" />
        <modal id="modal-map" size="sm">
            <div class="text-center">
                <span>Vị trí không hợp lệ!</span>
            </div>
        </modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import phottoMarker from '@/assets/image/icon/marker-icon.png'
import phottoSourceMarker from '@/assets/image/icon/source-marker-icon.png'
import AdvertisementPopup from '../components/AdvertisementPopup'
import MapPopupCreate from '../components/MapPopupCreate'
import { ConstantsJS } from '../static/constants'
import BusinessContainer from './BusinessDetail/BusinessContainer'
import '@/components/BusinessDetail/PopupInfo'
import Modal from './modal/Modal'
import PopupInfo from './BusinessDetail/PopupInfo'
const iconMarker = {
    ads: '/images/icons/ads.svg',
    pin: '/images/icons/pin.svg',
    build: '/images/icons/build.svg',
    fashion: '/images/icons/fashion.svg',
    interiors: '/images/icons/interiors.svg',
    laptop: '/images/icons/laptop.svg',
    medical: '/images/icons/medical.svg',
    motobike: '/images/icons/motobike.svg',
    spa: '/images/icons/spa.svg',
    supermarket: '/images/icons/supermarket.svg'
}
const imgUrl = process.env.SERVER_IMAGE_URL
export default {
    name: 'Map',
    components: {
        PopupInfo,
        Modal,
        BusinessContainer,
        AdvertisementPopup,
        MapPopupCreate
    },
    props: {
        idMapName: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            newLocationCreateBusiness: null,
            createBusinessPointType: null,
            showPopupCreateBusiness: false,
            link: '/createbusiness',
            map: null,
            msg: '',
            advertisementData: {
                data: null,
                id: '',
                isShow: false
            },
            currentPointType: null,
            businessInfo: {
                id: '',
                type: '',
                name: '',
                address: '',
                geometry: {}
            },
            sourceMarker: null,
            targetMarker: null,
            currentMarker: null,
            group: null,
            routingStyle: {
                color: '#0066FF',
                weight: 5,
                opacity: 0.65
            },
            geojsonLayerPoint: null,
            busInfoShort: null,
            removePinCrateStore: false
        }
    },
    computed: mapState({
        findShops: state => state.map.findShops
    }),
    watch: {
        $route: 'loadMapRoute'
    },
    mounted () {
        this.intMap()
        this.$root.$on('map-around-circle', (data, lat, lng, radius, zoom) => {
            this.circleRound(data, lat, lng, radius, zoom)
        })

        this.$root.$on('add_marker_on_map', (param) => {
            this.addMarkerOnMap(param)
        })

        this.$root.$on('show_detail_business', (param) => {
            // your code goes here
            this.showDetailBusiness(param)
        })
        this.$bvModal.show('create-business-popup')
        this.$root.$on('go-to-address-show-pop-up', (Point) => {
            if (Point) {
                this.goToAddressShowPopup(Point)
            }
        })
        this.$root.$on('close-popup', () => {
            this.map.closePopup()
        })
        this.$root.$on('close-pin-create-business', () => {
            this.map.removeLayer('createBusinessPoint')
        })
        this.$root.$on('open-business-info', (layerId) => {
            this.showBussinessInfo(layerId)
        })
        this.$root.$on('close-business-info', (layerId) => {
            this.closeBussinessInfo(layerId)
        })
        this.$root.$on('show-advertisement-on-map', (data) => {
            this.showAdvertisementOnMap(data)
        })
        this.$root.$on('create-maker-on-map', (data) => {
            this.createMarker(data)
        })
        this.$root.$on('clear-all', () => {
            this.clearAll()
        })
        window.dispatchEvent(new Event('resize'))
    },
    methods: {
        intMap () {
            this.currentPointType = this.$L.icon({
                iconUrl: '/images/icons/pin.svg',
                iconSize: [25, 38], // size of the icon
                iconAnchor: [12, 38]
            })

            this.createBusinessPointType = this.$L.icon({
                iconUrl: iconMarker.ads,
                iconSize: [25, 38], // size of the icon
                iconAnchor: [12, 38]
            })

            this.map = new this.$mvp.maps.Map(this.idMapName, {
                center: {
                    lat: 10.775433014355661,
                    lng: 106.70481652021408
                },
                zoom: 15,
                mapUrl: process.env.API_URL,
                geocodeUr: 'api/geocode',
                revision: process.env.REVISION
            })
            this.setGeocodeCallback()
            if (this.$route.name === ConstantsJS.ROUTES_NAME.MAPS_ROUTE) {
                this.intMapRoute()
                this.loadMapRoute()
            }
        },

        setGeocodeCallback () {
            const _this = this
            const resultCallback = this.$L.Util.bind(this.showGetFeatureInfo, this)
            this.map.setGeocodeCallback(function (result, status) {
                if (status === _this.$mvp.maps.GeocoderStatus.OK) {
                    resultCallback(result)
                }
            })
        },
        showGetFeatureInfo (content) {
            if (content) {
                if (content.place_id) {
                    this.map.closePopup()
                    this.goToAddressShowPopup([
                        content.location.lat,
                        content.location.lng
                    ])
                } else {
                    this.map.removeLayer('createBusinessPoint')
                    this.map.closePopup()
                    this.advertisementData = {
                        data: null,
                        id: '',
                        isShow: true
                    }
                    this.map.openPopup(this.$refs.PopupMap.$el, content.location, {
                        closeButton: false,
                        minWidth: 250
                    })
                }
            }
        },
        isOnCreateBusinessPage () {
            return location.pathname === '/createbusiness'
        },
        isOnMainPage () {
            return location.pathname === '/'
        },
        isOnMapRoutePage () {
            return location.pathname === '/maproute'
        },
        test () {
            alert('call map ok')
        },
        showAdvertisementOnMap (data) {
            this.map.removeAllLayers()
            this.map.closePopup()
            const L = this.$L
            const _this = this

            if (this.map.hasLayer('geojsonLayerPoint')) {
                this.geojsonLayerPoint.clearLayers()
            }

            this.geojsonLayerPoint = L.geoJSON(data, {
                pointToLayer (feature, latlng) {
                    return L.marker(latlng, {
                        icon: _this.currentPointType
                    })
                }
            }).on('click', this.mouseoverAdsInfo)
                .on('mouseover', this.mouseoverAdsInfo)
                .on('mouseout', function (e) {
                    e.layer.closePopup()
                })
            this.map.addLayer('geojsonLayerPoint', this.geojsonLayerPoint)
            this.geojsonLayerPoint.bringToFront()
        },
        goToAddressShowPopup (Point) {
            if (this.isOnMapRoutePage()) { return }
            const L = this.$L
            const _this = this
            this.link = '/createbusiness?location=' + Point[0] + ',' + Point[1]
            this.map.closePopup()
            this.map.removeLayer('createBusinessPoint')
            const marker = L.marker(Point, { icon: this.createBusinessPointType, draggable: true })
                .on('dragend', async function (e) {
                    await _this.checkLocationOnPlot(e.target.getLatLng(), marker)
                })
            this.map.addLayer('createBusinessPoint', marker)

            if (!this.isOnCreateBusinessPage() && this.$refs.MapPopupCreate.$el) {
                _this.showPopupCreateBusiness = true
                marker.bindPopup(this.$refs.MapPopupCreate.$el,
                    { minWidth: 400 }).openPopup()
                    .on('popupclose', function (e) {
                        _this.showPopupCreateBusiness = false
                        if (!(_this.isOnCreateBusinessPage() || _this.isOnMainPage())) {
                            _this.map.removeLayer('createBusinessPoint')
                        }
                    })
            } else if (this.isOnCreateBusinessPage()) {
                this.$root.$emit('update-location', Point)
            }
            this.map.setView(Point, this.map.getViewZoom())
        },
        async checkLocationOnPlot (coordinates, marker) {
            const _this = this
            this.map.closePopup()
            const response = await this.$api.map.checkLocationInPlot(
                coordinates.lat + ',' + coordinates.lng
            )
            if (response.status === 'OK') {
                if (!this.isOnCreateBusinessPage() && this.$refs.MapPopupCreate.$el) {
                    _this.showPopupCreateBusiness = true
                    marker.bindPopup(this.$refs.MapPopupCreate.$el, { minWidth: 400 }).openPopup()
                        .on('popupclose', function (e) {
                            _this.showPopupCreateBusiness = false
                            if (!(_this.isOnCreateBusinessPage() || _this.isOnMainPage())) {
                                _this.map.removeLayer('createBusinessPoint')
                            }
                        })
                }
                this.map.setView([coordinates.lat, coordinates.lng], this.map.getViewZoom())
                this.$root.$emit('update-location', [coordinates.lat, coordinates.lng])
            }
        },
        async addMarkerOnMap (data) {
            this.map.closePopup()
            if (data) {
                const L = this.$L
                const _this = this
                const coordsX = data.coordX
                const coordsY = data.coordY
                const coordinates = this.map.containerPointToLatLng([coordsX, coordsY])
                const newCoordinates = await this.checkLocationonRoad(coordinates)
                if (newCoordinates) {
                    const adsDatas = data.adsData
                    const marker = L.marker([newCoordinates[0], newCoordinates[1]], {
                        icon: _this.currentPointType,
                        draggable: true,
                        alt: adsDatas.id
                    })
                        .on('dragend', async function (e) {
                            const newCoordinates = await _this.checkLocationonRoad(
                                e.target.getLatLng()
                            )
                            if (newCoordinates) {
                                _this.showMapPopup(adsDatas, e.target)
                                _this.updateAds(
                                    false,
                                    adsDatas,
                                    newCoordinates[0] + ',' + newCoordinates[1]
                                )
                            }
                        })
                        .on('mouseover', function (e) {
                            _this.showMapPopup(adsDatas, e.target)
                        })

                    this.map.addLayer(
                        'currentPoint:' + newCoordinates[0] + '-' + newCoordinates[1],
                        marker
                    )
                    this.showMapPopup(adsDatas, marker)
                    this.updateAds(
                        true,
                        adsDatas,
                        newCoordinates[0] + ',' + newCoordinates[1]
                    )
                }
            }
        },
        async checkLocationonRoad (coordinates) {
            const response = await this.$api.map.getRoadLocation(
                coordinates.lat + ',' + coordinates.lng
            )
            if (response.status === 'OK') {
                return response.result
            }
            this.$bvModal.show('modal-map')
            return null
        },
        showMapPopup (adsDatas, marker) {
            this.advertisementData = {
                data: adsDatas,
                id: adsDatas.id,
                isShow: true
            }
            this.map.closePopup()
            marker
                .bindPopup(this.$refs.PopupMap.$el, {
                    closeButton: false,
                    minWidth: 350
                })
                .openPopup()
        },
        updateAds (isNew, data, location) {
            this.$root.$emit('update_quang_cao', isNew, data, location)
        },
        mouseoverAdsInfo (e) {
            this.showMapPopup(e.layer.feature, e.layer)
        },
        zoomFromCenterPointBaseOnRadius (map, circleRadius) {
            this.map.fitBounds(circleRadius.getBounds())
        },
        circleRound (data, lat, lng, radius, zoom) {
            // this.map.removeAllLayers()
            this.map.removeAllLayers()
            this.map.closePopup()
            const L = this.$L
            if (zoom) {
                this.map.setView([lat, lng], 10)
            }
            if (this.geojsonlayerAutoComplete != null) {
                this.geojsonlayerAutoComplete.clearLayers()
                this.geojsonlayerAutoComplete = null
            }

            this.map.addLayer(
                'currentPoint',
                L.marker([lat, lng], {
                    icon: this.currentPointType
                })
            )

            this.circleRadius = L.featureGroup()
            L.circle([lat, lng], {
                radius,
                color: 'white',
                weight: 0.1,
                opacity: 1,
                fillColor: 'rgb(77, 169, 197)',
                fillOpacity: 0.2
            }).addTo(this.circleRadius)

            this.map.addLayer('circleFeatureGroup', this.circleRadius)

            if (!data || data.features.length === 0) {
                if (this.map.hasLayer('geojsonLayerPoint')) {
                    this.geojsonLayerPoint.clearLayers()
                }
                return
            }
            if (this.map.hasLayer('geojsonLayerPoint')) {
                this.geojsonLayerPoint.clearLayers()
            }
            // if (this.map.hasLayer('geojsonLayerPoint')) {
            //     this.geojsonLayerPoint.clearLayers()
            //     this.geojsonLayerPoint.addData(data)
            // } else {
            this.geojsonLayerPoint = L.geoJSON(data, {
                pointToLayer (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.icon({
                            iconUrl: iconMarker[feature.parent_nameslug]
                                ? iconMarker[feature.parent_nameslug]
                                : iconMarker.supermarket,
                            iconSize: [25, 38], // size of the icon
                            iconAnchor: [12, 38]
                        })
                    })
                },
                onEachFeature (feature, layer) {
                    if (feature.id) {
                        layer._leaflet_id = 'layer-' + feature.id
                    } else {
                        layer._leaflet_id = 'layer-' + feature.place_id
                    }
                }
            })
                .on('click', this.mouseoverBussinessInfo)
                .on('mouseover', this.mouseoverBussinessInfo)
                .on('mouseout', function (e) {
                    e.layer.closePopup()
                })
            this.map.addLayer('geojsonLayerPoint', this.geojsonLayerPoint)
            // }

            setTimeout(
                this.zoomFromCenterPointBaseOnRadius(this.map, this.circleRadius),
                500
            )
            this.geojsonLayerPoint.bringToFront()
        },
        mouseoverBussinessInfo (e) {
            this.showPopupBussinessInfo(e.layer)
        },
        showBussinessInfo (layerId) {
            if (this.map.hasLayer('geojsonLayerPoint')) {
                const layer = this.geojsonLayerPoint.getLayer('layer-' + layerId)
                if (layer !== undefined) {
                    this.showPopupBussinessInfo(layer)
                }
            }
        },
        closeBussinessInfo (layerId) {
            if (this.map.hasLayer('geojsonLayerPoint')) {
                const layer = this.geojsonLayerPoint.getLayer('layer-' + layerId)
                if (layer !== undefined) {
                    layer.closePopup()
                }
            }
        },
        showPopupBussinessInfo (layer) {
            const dataElement = layer.feature
            this.busInfoShort = {
                id: dataElement.id,
                title: dataElement.name,
                thumb: imgUrl + dataElement.photo_reference,
                address: dataElement.formatted_address
            }
            layer.bindPopup(this.$refs.PopupBusinessInfo.$el, {
                closeButton: false,
                minWidth: 200
            })
                .openPopup()
        },
        showDetailBusiness (params) {
            this.businessInfo = params
            this.map.closePopup()

            this.map.removeAllLayers()

            const L = this.$L
            const marker = L.marker(
                [params.geometry.coordinates[1], params.geometry.coordinates[0]],
                {
                    icon: this.currentPointType
                }
            )

            this.map.addLayer('currentPoint', marker)
            marker
                .bindPopup(this.$refs.PopupBusiness.$el, {
                    closeButton: false,
                    minWidth: 400
                })
                .openPopup()

            this.map.setView(
                [params.geometry.coordinates[1], params.geometry.coordinates[0]],
                this.map.getViewZoom()
            )
        },
        createMarker (data) {
            if (data.name === this.idMapName) {
                this.map.removeAllLayers()
                this.currentMarker = null
                const L = this.$L
                this.currentMarker = L.marker(data.data, {
                    icon: this.currentPointType
                })
                this.map.setView(data.data, this.map.getViewZoom())
                this.map.addLayer('currentPoint', this.currentMarker)
            }
        },
        intMapRoute () {
            this.map._map.on('click', this.pushMapRoute)
        },

        pushMapRoute (e) {
            const location = e.latlng.lat + ',' + e.latlng.lng
            if (this.$route.query.source) {
                this.$router.push({
                    name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                    query: {
                        source: this.$route.query.source,
                        target: location,
                        type: this.$route.query.type
                    }
                })
            } else {
                this.$router.push({
                    name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                    query: {
                        source: location,
                        type: this.$route.query.type
                    }
                })
            }
        },
        loadMapRoute () {
            if (this.$route.name === ConstantsJS.ROUTES_NAME.MAPS_ROUTE) {
                if (this.$route.query.source) {
                    const locateSource = this.$route.query.source.split(',')
                    this.getAddressFromLatLng(locateSource[0], locateSource[1], true)
                    this.map.setView([locateSource[0], locateSource[1]], 15)
                }

                if (this.$route.query.target) {
                    const locateTarget = this.$route.query.target.split(',')
                    this.getAddressFromLatLng(locateTarget[0], locateTarget[1], false)
                }

                if (this.$route.query.source && this.$route.query.target) {
                    if (this.group) {
                        this.group.removeFrom(this.map._map)
                    }
                    this.getRouting()
                }
            } else {
                if (this.sourceMarker) {
                    this.map._map.removeLayer(this.sourceMarker)
                }
                if (this.targetMarker) {
                    this.map._map.removeLayer(this.targetMarker)
                }

                if (this.group) {
                    this.group.removeFrom(this.map._map)
                }
            }
        },

        getAddressFromLatLng (lat, lng, applyForSource) {
            const location = lat + ',' + lng
            this.$api.mapRoute.geoCode(location).then((res) => {
                this.createMarkerRouting(lat, lng, applyForSource, res)
            })
        },

        createMarkerRouting (lat, lng, applyForSource, res) {
            const markerTitle = applyForSource ? 'source' : 'target'
            const markerIcon = this.getMarkerIcon(applyForSource, res)

            // new marker

            if (applyForSource) {
                if (this.sourceMarker) {
                    this.map._map.removeLayer(this.sourceMarker)
                }

                this.sourceMarker = null
                this.sourceMarker = this.$L
                    .marker([lat, lng], {
                        alt: markerTitle,
                        draggable: true, // default true
                        icon: markerIcon
                    })
                    .addTo(this.map._map)
                    .on('dragend', this.dragendSourceMapRoute)

                this.$root.$emit(ConstantsJS.MAP_ROUTE_SOURCE_EMIT, res.data[3])
            } else {
                if (this.targetMarker) {
                    this.map._map.removeLayer(this.targetMarker)
                }

                this.targetMarker = null
                this.targetMarker = this.$L
                    .marker([lat, lng], {
                        alt: markerTitle,
                        draggable: true, // default true
                        icon: markerIcon
                    })
                    .addTo(this.map._map)
                    .on('dragend', this.dragendTargetMapRoute)

                this.$root.$emit(ConstantsJS.MAP_ROUTE_TARGET_EMIT, res.data[3])
            }
        },
        dragendSourceMapRoute (e) {
            const location =
        e.target.getLatLng().lat + ',' + e.target.getLatLng().lng
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    source: location,
                    target: this.$route.query.target,
                    type: this.$route.query.type
                }
            })
        },
        dragendTargetMapRoute (e) {
            const location =
        e.target.getLatLng().lat + ',' + e.target.getLatLng().lng
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    target: location,
                    source: this.$route.query.source,
                    type: this.$route.query.type
                }
            })
        },
        getMarkerIcon (applyForSource, res) {
            let address = ConstantsJS.PIN_LOCATION
            if (res.data[3]) {
                address = res.data[3].split(',')[0]
            }

            let strHtml = ''

            if (applyForSource) {
                strHtml =
          '<img class="routing-source-icon-image" src="' +
          phottoSourceMarker +
          '"/>' +
          '<span id="sourcemarker" class="routing-icon-lable">' +
          address +
          '</span>'
            } else {
                strHtml =
          '<img class="routing-source-icon-image" src="' +
          phottoMarker +
          '"/>' +
          '<span id="sourcemarker" class="routing-icon-lable">' +
          address +
          '</span>'
            }

            return new this.$L.DivIcon({
                className: 'my-div-icon',
                iconSize: [25, 25],
                html: strHtml
            })
        },

        getRouting () {
            const locateSource = this.$route.query.source.split(',')
            const latSource = locateSource[0]
            const lngSource = locateSource[1]

            const locateTarget = this.$route.query.target.split(',')
            const latTarget = locateTarget[0]
            const lngTarget = locateTarget[1]

            if (this.group) {
                this.group.removeFrom(this.map._map)
            }

            const url =
        (this.$route.query.type
            ? this.$route.query.type
            : ConstantsJS.ROUTING_TYPES.PEDESTRIAN) +
        '/' +
        lngSource +
        '/' +
        latSource +
        '/' +
        lngTarget +
        '/' +
        latTarget
            this.$api.mapRoute.getRoutingOfType(url).then((res) => {
                if (res.data.features.length > 0) {
                    this.handleRoutingJson(res.data)
                    this.$root.$emit(ConstantsJS.MAP_ROUTING_EMIT, res.data)
                }
            })
        },

        handleRoutingJson (data) {
            this.group = this.$L.featureGroup().addTo(this.map._map)
            this.$L
                .geoJson(data, {
                    onEachFeature: this.onEachFeature,
                    style: this.routingStyle
                })
                .addTo(this.group)
        },

        onEachFeature (feature, myLayer) {
            this.$L.geoJson(feature.geometry).addTo(this.group) // Add all lines
        },
        clearAll () {
            this.map.removeAllLayers()
            this.map.closePopup()
        }
    }
}
</script>

<style>
.fs-inner-container {
  z-index: 10;
  height: calc(100vh - 80px);
}

.map-container {
  height: 100%;
  width: 100%;
}

.routing-icon-lable {
  color: #fe7235;
  width: 65px;
  position: absolute;
  left: 25px;
  top: 2px;
  text-align: left;
  font-weight: bold;
  text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff,
    1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
}
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
}
.leaflet-popup-content-wrapper {
  border-radius: 6px;
}
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
  bottom: 25px !important;
}
</style>
