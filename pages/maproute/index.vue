<template>
    <Sidebar width="478px">
        <div class="router-container">
            <div class="row">
                <div class="col-10">
                    <div class="row">
                        <div class="col-12">
                            <div class="router-input-with-icon">
                                <i class="router-icon-search">
                                    <img src="@/assets/image/icon/map-pointer.svg">
                                </i>

                                <AutoComplete
                                    :id-textbox="'router-input_source'"
                                    :submit-value="pushSourceRoute"
                                    :autocomplete-text="source"
                                />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="router-input-with-icon">
                                <i class="router-icon-search">
                                    <img src="@/assets/image/icon/pin.svg">
                                </i>

                                <AutoComplete
                                    :id-textbox="'router-input_target'"
                                    :submit-value="pushTargetRoute"
                                    :autocomplete-text="target"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-2">
                    <img
                        src="@/assets/image/icon/arrow.svg"
                        class="router-img-swap"
                        @click="swapMarkerRouting"
                    >
                </div>
            </div>
        </div>

        <div class="router-container">
            <div class="row">
                <div class="col">
                    <button
                        class="router-button pl-0"
                        data-toggle="tooltip"
                        title="Lái xe"
                        aria-pressed="true"
                        @click="goCarMapRouting"
                    >
                        <img
                            class="router-img-traffic"
                            :class="{ 'router-img-traffic-selected': type==='car' }"
                            src="@/assets/image/icon/traffic-oto.svg"
                        >
                    </button>

                    <button
                        class="router-button"
                        data-toggle="tooltip"
                        title="Đi bộ"
                        aria-pressed="true"
                        @click="goPedestrainMapRouting"
                    >
                        <img
                            class="router-img-traffic"
                            :class="{ 'router-img-traffic-selected': type==='pedestrian' }"
                            src="@/assets/image/icon/traffic-walk.svg"
                        >
                    </button>

                    <button
                        class="router-button"
                        aria-pressed="true"
                        data-toggle="tooltip"
                        title="Đi xe máy"
                        @click="goBikeMapRouting"
                    >
                        <img
                            class="router-img-traffic"
                            :class="{ 'router-img-traffic-selected': type==='bike' }"
                            src="@/assets/image/icon/traffic-moto.svg"
                        >
                    </button>
                </div>
            </div>
        </div>

        <div class="router-border-bottom" />

        <div class="router-container h-100">
            <div class="row">
                <div class="col">
                    <h4 class="router-h4">
                        <a>{{ time }} {{ distance }}</a>
                    </h4>
                </div>
            </div>

            <ul class="router-container-direction">
                <li v-for="item in routing" :key="item.id">
                    <div v-if="item.direction == 'STRAIGHT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Tiếp tục đi thẳng</title>
                                <path
                                    d="M57.85,35.18a1.75,1.75,0,0,1-1.24.51H49V68.57a4,4,0,0,1-8,0V35.7H33.39a1.75,1.75,0,0,1-1.24-.51,1.82,1.82,0,0,1,0-2.57L43.72,18a1.82,1.82,0,0,1,2.57,0L57.85,32.61A1.82,1.82,0,0,1,57.85,35.18Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Đi thẳng trên {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'LEFT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Rẽ sang trái</title>
                                <path
                                    d="M60.95,38.9V68.47a4,4,0,0,1-8,0V38.9a4,4,0,0,0-4-4h-12v7.61a1.75,1.75,0,0,1-.51,1.24,1.82,1.82,0,0,1-2.57,0L19.3,32.18a1.82,1.82,0,0,1,0-2.57L33.86,18a1.82,1.82,0,0,1,2.57,0,1.75,1.75,0,0,1,.51,1.24V26.9h12A12,12,0,0,1,60.95,38.9Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Rẽ trái vào {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'SLIGHT LEFT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Rẽ sang trái</title>
                                <path
                                    d="M60.95,38.9V68.47a4,4,0,0,1-8,0V38.9a4,4,0,0,0-4-4h-12v7.61a1.75,1.75,0,0,1-.51,1.24,1.82,1.82,0,0,1-2.57,0L19.3,32.18a1.82,1.82,0,0,1,0-2.57L33.86,18a1.82,1.82,0,0,1,2.57,0,1.75,1.75,0,0,1,.51,1.24V26.9h12A12,12,0,0,1,60.95,38.9Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Rẽ sang trái vào {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'SHARP LEFT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Ngoặc sang trái</title>
                                <path
                                    d="M64.12,21.52V68.57a4,4,0,0,1-8,0V31.17l-14,14,5.33,5.33A1.75,1.75,0,0,1,48,51.72a1.82,1.82,0,0,1-1.82,1.82L27.7,55.66a1.82,1.82,0,0,1-1.82-1.82L28,35.36a1.82,1.82,0,0,1,1.82-1.82,1.75,1.75,0,0,1,1.24.51l5.43,5.43,20.8-20.8a4,4,0,0,1,6.83,2.83Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Ngoặc trái vào {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'RIGHT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Rẽ sang phải</title>
                                <path
                                    d="M70.65,32.18,56.08,43.75a1.82,1.82,0,0,1-2.57,0A1.75,1.75,0,0,1,53,42.51V34.9H41a4,4,0,0,0-4,4V68.47a4,4,0,0,1-8,0V38.9a12,12,0,0,1,12-12H53V19.29A1.75,1.75,0,0,1,53.51,18a1.82,1.82,0,0,1,2.57,0L70.65,29.61A1.82,1.82,0,0,1,70.65,32.18Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Rẽ phải vào {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'SHARP RIGHT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Ngoặc sang phải</title>
                                <path
                                    d="M64.08,53.84a1.82,1.82,0,0,1-1.82,1.82L43.78,53.54A1.82,1.82,0,0,1,42,51.72a1.75,1.75,0,0,1,.51-1.24l5.33-5.33-14-14v37.4a4,4,0,0,1-8,0V21.52a4,4,0,0,1,6.83-2.83l20.8,20.8,5.43-5.43a1.75,1.75,0,0,1,1.24-.51A1.82,1.82,0,0,1,62,35.36Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Ngoặc phải vào {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'SLIGHT RIGHT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Rẽ sang phải</title>
                                <path
                                    d="M60.43,19.3,58.26,38.18A1.86,1.86,0,0,1,56.4,40h0a1.79,1.79,0,0,1-1.27-.52L49.64,34,37.55,46.1V68.45a4.09,4.09,0,1,1-8.17,0v-24a4.09,4.09,0,0,1,1.2-2.89L43.86,28.23l-5.5-5.5a1.79,1.79,0,0,1-.52-1.27,1.86,1.86,0,0,1,1.86-1.86l18.88-2.17A1.86,1.86,0,0,1,60.43,19.3Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Rẽ sang phải vào {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'U TURN LEFT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Vòng ngược lại</title>
                                <path
                                    d="M63.33,35.63V68.56a4,4,0,0,1-8,0V35.63a10.14,10.14,0,0,0-20.29,0v9.44h7.61a1.75,1.75,0,0,1,1.24.51,1.82,1.82,0,0,1,0,2.57L32.32,62.72a1.82,1.82,0,0,1-2.57,0L18.19,48.15a1.82,1.82,0,0,1,0-2.57,1.75,1.75,0,0,1,1.24-.51H27V35.63a18.14,18.14,0,0,1,36.29,0Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Vòng ngược lại tại {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="item.direction == 'U TURN RIGHT'" class="row">
                        <div class="col-1">
                            <svg class="router-iconrouting" viewBox="0 0 90 112.5" x="0px" y="0px">
                                <title>Vòng ngược lại</title>
                                <path
                                    d="M72,48.09,60.48,62.66a1.82,1.82,0,0,1-2.57,0L46.34,48.09a1.82,1.82,0,0,1,0-2.57A1.75,1.75,0,0,1,47.58,45h7.61V35.63a10.14,10.14,0,0,0-20.29,0V68.56a4,4,0,0,1-8,0V35.63a18.14,18.14,0,0,1,36.29,0V45h7.61a1.75,1.75,0,0,1,1.24.51A1.82,1.82,0,0,1,72,48.09Z"
                                />
                            </svg>
                        </div>

                        <div class="col-11">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Vòng ngược lại tại {{ item.name }}</h6>
                                </div>
                                <div class="col-12">
                                    <p>{{ item.length }} m</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        </ul>
        </div>
    </Sidebar>
</template>

<script>
import Sidebar from '../../components/SideBar'
import { ConstantsJS } from '../../static/constants'
import AutoComplete from '../../components/AutoComplete'

export default {
    name: 'MapRoute',
    components: {
        Sidebar,
        AutoComplete
    },
    data () {
        return {
            source: '',
            target: '',
            routing: [],
            time: '',
            distance: '',
            type: ''
        }
    },

    watch: {
        $route: 'updataStatusButton'
    },

    mounted () {
        this.updataStatusButton()
        this.$root.$on(ConstantsJS.MAP_ROUTE_SOURCE_EMIT, this.sourceAddress)
        this.$root.$on(ConstantsJS.MAP_ROUTE_TARGET_EMIT, this.targetAddress)
        this.$root.$on(ConstantsJS.MAP_ROUTING_EMIT, this.maprouting)
    },

    methods: {
        updataStatusButton () {
            if (this.$route.query.type) {
                this.type = this.$route.query.type
            } else {
                this.type = ConstantsJS.ROUTING_TYPES.PEDESTRIAN
            }
        },
        sourceAddress (param) {
            if (param) {
                this.source = param
            } else {
                this.source = ConstantsJS.STREET_UNKNOWN
            }
        },

        targetAddress (param) {
            if (param) {
                this.target = param
            } else {
                this.target = ConstantsJS.STREET_UNKNOWN
            }
        },

        maprouting (param) {
            const arrayRoute = []
            let sumLength = 0
            let idStreet = 0
            if (param.features) {
                param.features.forEach((element) => {
                    const streetnextname = this.correctStreetName(
                        element.properties.name
                    )
                    const streetnamelength = Math.round(element.properties.length_m)
                    if (
                        idStreet === 0 ||
            streetnextname !== arrayRoute[idStreet - 1].name
                    ) {
                        arrayRoute.push({
                            id: idStreet,
                            name: streetnextname,
                            direction: element.properties.direction,
                            length: streetnamelength
                        })
                        sumLength = sumLength + streetnamelength
                        idStreet++
                    } else {
                        arrayRoute[idStreet - 1].length =
              arrayRoute[idStreet - 1].length + streetnamelength
                    }
                })
                this.routing = arrayRoute
                this.getRoutingDistance(sumLength)
            }
        },

        correctStreetName (name) {
            if (name === null) {
                name = ConstantsJS.STREET_UNKNOWN
            } else {
            }
            return name
        },

        pushSourceRoute (event, data) {
            if (data && data.geometry && data.geometry.coordinates) {
                this.$router.push({
                    name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                    query: {
                        source:
              data.geometry.coordinates[1] + ',' + data.geometry.coordinates[0],
                        target: this.$route.query.target,
                        type: this.$route.params.type
                    }
                })
            }
        },
        pushTargetRoute (event, data) {
            if (data && data.geometry && data.geometry.coordinates) {
                this.$router.push({
                    name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                    query: {
                        source: this.$route.query.source,
                        target:
              data.geometry.coordinates[1] + ',' + data.geometry.coordinates[0],
                        type: this.$route.query.type
                    }
                })
            }
        },
        goCarMapRouting () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    source: this.$route.query.source,
                    target: this.$route.query.target,
                    type: ConstantsJS.ROUTING_TYPES.CAR
                }
            })
        },
        goPedestrainMapRouting () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    source: this.$route.query.source,
                    target: this.$route.query.target,
                    type: ConstantsJS.ROUTING_TYPES.PEDESTRIAN
                }
            })
        },
        goBikeMapRouting () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    source: this.$route.query.source,
                    target: this.$route.query.target,
                    type: ConstantsJS.ROUTING_TYPES.BIKE
                }
            })
        },
        swapMarkerRouting () {
            this.$router.push({
                name: ConstantsJS.ROUTES_NAME.MAPS_ROUTE,
                query: {
                    source: this.$route.query.target,
                    target: this.$route.query.source,
                    type: this.$route.query.type
                }
            })
        },
        getRoutingDistance (distance) {
            distance = Math.ceil(distance)

            let unit = 'm'
            let totalDistance = distance

            if (distance > 1000) {
                totalDistance = distance / 1000
                unit = 'km'
            }

            let speed = 83
            if (this.$route.query.type === ConstantsJS.ROUTING_TYPES.CAR) {
                speed = 340
            } else if (this.$route.query.type === ConstantsJS.ROUTING_TYPES.BIKE) {
                speed = 120
            } else {
                speed = 83
            }

            const time = Math.ceil(distance / speed)
            const hours = Math.floor(time / 60)
            const min = Math.ceil(time % 60)
            let strTime = ''

            if (hours > 0) {
                strTime = hours + ' giờ '
            }
            if (min > 0) {
                strTime = strTime + min + ' phút '
            }

            this.time = strTime
            this.distance = '(' + totalDistance + ' ' + unit + ')'
        }
    }
}
</script>

<style >
.router-container {
  background-color: #fff;
  padding: 20px;
  padding-bottom: 0px;
  /*  background-color: white; */
}

.router-img-swap {
  height: 30px;
  margin-top: 30px;
  cursor: pointer;
  margin-top: 25px;
  margin-left: -20px;
}

.router-h4 {
  font-size: 14px;
}

.router-h4 a {
  color: rgba(254, 114, 53, 1) !important;
  margin-right: 5px;
}

.router-iconrouting {
  width: 40px;
  height: 40px;
  fill: rgba(77, 169, 197, 1);
}

.router-container-direction {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 207px);
  padding: 0px;
}

.router-icon-search {
  z-index: 1;
  margin-top: 6px;
}

.router-input-with-icon {
  position: relative;
}

.router-input-with-icon i {
  position: absolute;
  top: 0;
  left: 1%;
  padding: 0 0 0 8px;
  color: #fe7235;
  transition: 0.2s;
  pointer-events: none;
  font-weight: bolder;
}

#router-input_target,
#router-input_source {
  border-radius: 4px;
  padding-left: 40px !important;
  margin: 0;
  font-size: 14px;
  height: 38px;
  padding: 0 5px;
  outline: none;
  color: #808080;
  margin: 0 0 5px 0;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  display: block;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.06);
  font-weight: 500;
  opacity: 1;
}

.router-border-bottom {
  border-bottom: 1px solid #dee2e6 !important;
}

.router-img-traffic {
  border-radius: 50%;
  border: 2px solid transparent;
}

.router-img-traffic:hover {
  border-radius: 50%;
  border: 2px solid #00beff;
}

.router-img-traffic-selected {
  border: 2px solid #00beff;
}

.router-button {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.router-button:focus {
  outline: 0;
}
</style>
