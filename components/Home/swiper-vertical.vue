<template>
    <view class="page">
        <swiper class="swiper" :circular="circular" :vertical="true" @change="onSwiperChange">
            <swiper-item v-for="item in videoList" :key="item.id">
				<view class="a">
					{{item.id}}
				</view>
                <video class="video" :id="item.id" :ref="item.id" :src="item.src" :controls="true" :loop="true"
                    :show-center-play-btn="false"></video>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
    const videoData = [{
            src: 'https://videocdn.jellow.site/lh0OiCCMRYRILZcyqfv3UTF0Lvly.mp4?sign=291c437e7751f3c6d179fbda0fa3a00e&t=5f962c71'
        },
        {
            src: 'https://videocdn.jellow.site/lr2GzKAHbbLQYz1aL4s3Vex60zmM.mp4?sign=0a2585d2c6c104e39e0822c87784331e&t=5f962c71'
        },
        {
            src: 'https://videocdn.jellow.site/lnL-O11plr4eYOarEe9HPRQLM5Im.mp4?sign=cc4b828c91db2516c99feeef1ab94c32&t=5f963037'
        },
        {
            src: 'https://videocdn.jellow.site/lqfGoNfiK-5XSu4TNR9laSZ2XKtF.mp4?sign=191b80a8eb5c56e66fd475e52ccd0727&t=5f963037'
        },
        {
            src: 'https://videocdn.jellow.site/lggGoIIjgdz716Ip1S9GzqL2v1fm.mp4?sign=2a2ddb7a8373efc91b5b0883836a145b&t=5f963037'
        },
        {
            src: 'https://videocdn.jellow.site/lhKKmM_YU-6a206UlpaNpYT2DCRg.mp4?sign=4fa528d0bdf350c54847026602363ca2&t=5f963083'
        }
    ];

    export default {
        data() {
            return {
                circular: true,
                videoList: [{
                        id: "video0",
                        src: "",
                        img: ""
                    },
                    {
                        id: "video1",
                        src: "",
                        img: ""
                    },
                    {
                        id: "video2",
                        src: "",
                        img: ""
                    }
                ],
                videoDataList: []
            }
        },
        onLoad(e) {},
        onReady() {
            this.init();
            this.getData();
        },
        methods: {
            init() {
                this._videoIndex = 0;
                this._videoContextList = [];
                for (var i = 0; i < this.videoList.length; i++) {
                    this._videoContextList.push(uni.createVideoContext('video' + i, this));
                }
                this._videoDataIndex = 0;
            },
            getData(e) {
                this.videoDataList = videoData;
                setTimeout(() => {
                    this.updateVideo(true);
                }, 200)
            },
            onSwiperChange(e) {
                let currentIndex = e.detail.current;
                if (currentIndex === this._videoIndex) {
                    return;
                }

                let isNext = false;
                if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
                    isNext = true;
                } else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
                    isNext = false;
                } else if (currentIndex > this._videoIndex) {
                    isNext = true;
                }

                if (isNext) {
                    this._videoDataIndex++;
                } else {
                    this._videoDataIndex--;
                }

                if (this._videoDataIndex < 0) {
                    this._videoDataIndex = this.videoDataList.length - 1;
                } else if (this._videoDataIndex >= this.videoDataList.length) {
                    this._videoDataIndex = 0;
                }

                this.circular = (this._videoDataIndex != 0);

                if (this._videoIndex >= 0) {
                    this._videoContextList[this._videoIndex].pause();
                    this._videoContextList[this._videoIndex].seek(0);
                }

                this._videoIndex = currentIndex;

                setTimeout(() => {
                    this.updateVideo(isNext);
                }, 200);
            },
            getNextIndex(isNext) {
                let index = this._videoIndex + (isNext ? 1 : -1);
                if (index < 0) {
                    return this.videoList.length - 1;
                } else if (index >= this.videoList.length) {
                    return 0;
                }
                return index;
            },
            getNextDataIndex(isNext) {
                let index = this._videoDataIndex + (isNext ? 1 : -1);
                if (index < 0) {
                    return this.videoDataList.length - 1;
                } else if (index >= this.videoDataList.length) {
                    return 0;
                }
                return index;
            },
            updateVideo(isNext) {
                this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
                this.$set(this.videoList[this.getNextIndex(isNext)], 'src', this.videoDataList[this.getNextDataIndex(isNext)].src);
                setTimeout(() => {
                    this._videoContextList[this._videoIndex].play();
                }, 200);
                console.log("v:" + this._videoIndex + " d:" + this._videoDataIndex + "; next v:" + this.getNextIndex(
                    isNext) + " next d:" + this.getNextDataIndex(isNext));
            }
        }
    }
</script>

<style>
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }
    /* #endif */

    .page {
        flex: 1;
        width: 750rpx;
    }

    .swiper {
        flex: 1;
        background-color: #007AFF;
    }

    .swiper-item {
        flex: 1;
    }

    .video {
        flex: 1;
        /* #ifndef APP-PLUS */
        width: 100%;
        /* #endif */
    }
</style>
