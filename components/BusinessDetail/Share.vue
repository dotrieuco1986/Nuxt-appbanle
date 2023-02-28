<template>
    <div id="share-business">
        <h5 class="m-0">
            CHIA SẺ
        </h5>

        <div class="record">
            <span>{{ storeName }}</span>
            <label>{{ address }}</label>
        </div>
        <div class="record">
            <span>Liên kết để chia sẻ</span>
            <div class="row pr-3">
                <div class="col pr-0">
                    <mvp-textbox id="linkCopy" ref="linkCopy" :value="link" />
                </div>
                <div class="float-right" @click="copyToClipboard">
                    <mvp-button name="Copy" />
                </div>
            </div>
        </div>
        <div class="d-flex">
            <div class="btn-share" @click="shareFacebook">
                <svg-icon icon="facebook" />
            </div>
            <div class="btn-share">
                <div
                    class="zalo-share-button cursor-pointer"
                    style="position: absolute;"
                    data-oaid="579745863508352884"
                    data-layout="4"
                    data-color="blue"
                    data-customize="false"
                >
                    <svg-icon icon="zalo" />
                </div>
            </div>
            <div class="btn-share">
                <svg-icon icon="youtube" />
            </div>
            <div class="btn-share">
                <svg-icon icon="instagram" />
            </div>
        </div>
    </div>
</template>

<script>
import MvpTextbox from '../MVPControl/MvpTextbox'
import MvpButton from '../MVPControl/MvpButton'
import SvgIcon from '../common/SvgIcon'

export default {
    name: 'Share',
    components: { SvgIcon, MvpButton, MvpTextbox },
    props: {
        storeName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        photos: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            link: window.location.href,
            imgUrl: process.env.SERVER_IMAGE_URL
        }
    },
    mounted () {
        // eslint-disable-next-line
        ZaloSocialSDK.reload()
    },
    methods: {
        shareFacebook () {
            const urlShare = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href
            window.open(urlShare, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=585,height=368')
        },
        copyToClipboard () {
            document.querySelector('#linkCopy').select()
            document.execCommand('copy')
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/scss/_share';
</style>
