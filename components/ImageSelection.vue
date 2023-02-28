<template>
    <div class="image-selection">
        <div class="row">
            <div v-for="item in imageSelected" :key="item.index" class="col-5 mb-3">
                <div class="preview-item">
                    <img :src="autoSetSource && files.length > 0 ? imageUrl + item : item" alt="hinh">
                    <div class="remove-image" @click="removeImage(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 23.999">
                            <g id="close" transform="translate(0 -0.005)">
                                <g id="Group_18" data-name="Group 18" transform="translate(0 0.005)">
                                    <path id="Path_26" data-name="Path 26" d="M20.489,3.516a12,12,0,1,0,0,16.979A12.019,12.019,0,0,0,20.489,3.516ZM16.952,15.542a1,1,0,1,1-1.415,1.415L12,13.419,8.465,16.956A1,1,0,1,1,7.05,15.541L10.586,12,7.049,8.468A1,1,0,0,1,8.464,7.053L12,10.59l3.537-3.537a1,1,0,1,1,1.415,1.415L13.415,12Z" transform="translate(0 -0.005)" fill="#a5a5a5" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <input
                    v-if="multiple"
                    :id="idInput"
                    type="file"
                    class="d-none"
                    name=""
                    accept=".jpg, .jpeg, .png, .gif, .bmp"
                    multiple
                    @change="imageSelectedChange"
                >
                <input
                    v-else
                    :id="idInput"
                    type="file"
                    class="d-none"
                    name=""
                    accept=".jpg, .jpeg, .png, .gif, .bmp"
                    @change="imageSelectedChange"
                >
                <div class="preview-item choose-button" @click="chooseFile">
                    <span class="choose-file">Chọn file</span>
                </div>
            </div>
        </div>
        <div v-if="imageError" class="row mt-2">
            <div class="col invalid-image">
                {{ imageError }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageSelection',
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        idForm: {
            type: String,
            default: ''
        },
        files: {
            type: Array,
            default () {
                return []
            }
        },
        max: {
            type: Number,
            default: 5
        },
        autoLoad: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            idInput: 'image-upload-' + this.idForm,
            imageSelected: this.files,
            imageError: '',
            listImageSeleted: [],
            imageUrl: process.env.SERVER_IMAGE_URL,
            autoSetSource: this.autoLoad
        }
    },
    watch: {
        files (value) {
            this.imageSelected = value
        }
    },
    mounted () {
        this.$root.$on('update_banner_data', (data) => {
            if (data.bannerType === this.idForm) {
                this.imageSelected = data.image
            }
        })
    },
    methods: {
        chooseFile () {
            if (!this.disabled) {
                document.getElementById(this.idInput).click()
            }
        },

        imageSelectedChange (evt) {
            const _this = this
            if (evt && evt.target) {
                const fileInput = evt.target
                if (fileInput.files && fileInput.files.length > 0) {
                    this.autoSetSource = false
                    this.imageSelected = []
                    this.imageError = ''
                    const totalFile = fileInput.files.length
                    for (let i = 0; i < totalFile; i++) {
                        const image = fileInput.files[i]
                        this.listImageSeleted.push(image)

                        if (this.isImageValid(image)) {
                            const img = new Image()
                            img.src = URL.createObjectURL(image)
                            img.onload = function () {
                                const canvas = document.createElement('CANVAS')
                                canvas.height = this.naturalHeight
                                canvas.width = this.naturalWidth

                                const ctx = canvas.getContext('2d')
                                ctx.drawImage(this, 0, 0)

                                const dataURL = canvas.toDataURL('image/png')
                                if (_this.imageSelected.length >= _this.max && i < totalFile - 1) {
                                    _this.imageError = 'Bạn chỉ có thể tải tối đa ' + _this.max + ' hình ảnh.'
                                } else {
                                    _this.imageSelected.push(dataURL)
                                    _this.$root.$emit('change-image', image)
                                }
                            }
                            if (totalFile <= 1) {
                                img.onerror = function () {
                                    fileInput.value = ''
                                    this.imageError = 'File sai định dạng.'
                                    return false
                                }
                            }
                        } else if (totalFile <= 1) {
                            fileInput.value = ''
                            this.imageError = 'File sai định dạng hoặc có kích thước lớn (tối đa 5Mb).'
                            return false
                        }
                    }
                }
            }
        },

        isImageValid (image) {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i
            return allowedExtensions.exec(image.name) && image.size < 5242880
        },
        getImageName (file) {
            return URL.createObjectURL(file)
        },
        removeImage (file) {
            if (this.imageSelected.length === 1) {
                this.imageSelected = []
                document.getElementById(this.idInput).value = ''
            } else {
                const index = this.imageSelected.indexOf(file)
                if (index > -1) {
                    this.imageSelected.splice(index, 1)
                }
            }
            this.$root.$emit('change-image', null)
        },
        removeAllImage () {
            this.imageSelected = []
            document.getElementById(this.idInput).value = ''
        }
    }
}
</script>

<style lang="scss">
    $main-color: #FE7235;
    $invalid-color: red;

    .image-selection {
        .preview-item {
            border-radius: 5px;
            width: 90px;
            height: 90px;
            position: relative;
        }

        .choose-button {
            background-color: white;
            border: 1px dashed $main-color;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .choose-file {
            color: $main-color;
        }

        .preview-item img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }

        .remove-image {
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: pointer;
        }

        .invalid-image {
            color: $invalid-color;
        }
    }
</style>
