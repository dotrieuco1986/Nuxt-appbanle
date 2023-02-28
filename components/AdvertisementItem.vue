<template>
    <div v-if="data" class="advertisement-item">
        <img
            v-show="imageUrl"
            :id="data.id"
            draggable="true"
            :src="imageUrl"
            alt=""
            @dragstart="dragStart"
        >
        <img
            v-show="imageName"
            :id="'image-marker' + data.id"
            class="touch-image"
            :src="imageUrl"
            alt=""
            :name="imageName"
        >
        <div class="quantity rounded-circle">
            <span>{{ data.quantity }}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AdvertisementItem',
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            imageUrl: '',
            imageName: '',
            position: {
                clientX: 0,
                clientY: 0
            }
        }
    },
    mounted () {
        this.imageURL()
        this.addEventDragImage()
    },
    methods: {
        dragStart (ev) {
            ev.dataTransfer.setData('advertisement-item-id', ev.target.id)
        },
        addEventDragImage () {
            const _this = this
            const box = document.getElementById(this.data.id)
            box.addEventListener('touchmove', function (e) {
                e.preventDefault()
                // grab the location of touch
                const touchLocation = e.targetTouches[0]
                _this.imageName = _this.data.id

                // assign box new coordinates based on the touch.
                const image = document.getElementById('image-marker' + _this.data.id)
                image.style.left = (touchLocation.pageX - 30 - window.scrollX) + 'px'
                image.style.top = (touchLocation.pageY - 30 - window.scrollY) + 'px'
                image.style.position = 'fixed'
                _this.position.clientX = touchLocation.pageX
                _this.position.clientY = touchLocation.pageY
            })
            box.addEventListener('touchend', function (e) {
                e.preventDefault()
                _this.$root.$emit('handle_touch_move', _this.imageName, _this.position)
                _this.imageName = ''
            })
        },
        async imageURL () {
            const response = await this.$api.advertisement.getAdvertisementImage(this.data.id)
            if (response) {
                this.imageUrl = response
            }
        }
    }
}
</script>

<style lang="scss">
    @import './assets/scss/variable';

    .advertisement-item {
        padding: 10px 5px;
        position: relative;
        margin-top: 10px;

        .quantity {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #4AA9C5;
            color: white;
            width: 25px;
            height: 25px;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            border: 1px solid white;
        }

        img {
            cursor: pointer;
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 50%;
        }

        .touch-image {
            position: absolute; top: 10px
        }
    }
</style>
