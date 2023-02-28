<script>
function recursivelyRemoveFill (el) {
    if (!el) {
        return
    }
    el.removeAttribute('fill');
    [].forEach.call(el.children, (child) => {
        recursivelyRemoveFill(child)
    })
}
export default {
    props:
    {
        icon: {
            type: String,
            default: null
        },
        hasFill: {
            type: String,
            default: 'false'
        },
        growByHeight: {
            type: String,
            default: null
        }
    },
    mounted () {
        if (this.$el.firstElementChild.nodeName === 'svg') {
            const svgElement = this.$el.firstElementChild
            // use `viewBox` attribute to get the svg's inherent width and height
            const viewBox = svgElement.getAttribute('viewBox').split(' ').map(n => Number(n))
            const widthToHeight = (viewBox[2] / viewBox[3]).toFixed(2)
            if (this.hasFill === 'true') {
                // recursively remove all fill attribute of element and its nested children
                recursivelyRemoveFill(svgElement)
            }
            // set width and height relative to font size
            // if growByHeight is true, height set to 1em else width set to 1em and remaining is calculated based on widthToHeight ratio
            if (this.growByHeight) {
                svgElement.setAttribute('height', this.growByHeight)
                svgElement.setAttribute('width', this.growByHeight)
            } else {
                svgElement.setAttribute('width', '1em')
                svgElement.setAttribute('height', `${1 / widthToHeight}em`)
            }
            svgElement.classList.add('svg-class')
        }
    }
}
</script>

<template>
    <span class="svg-icon" v-html="require(`!html-loader!../../static/images/icons/${icon}.svg`)" />
</template>

<style lang="scss" scoped>
</style>
