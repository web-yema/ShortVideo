<template>
    <view>
        <view class="page-body">
            <view class="btn-area">
                    <uni-segmented-control :current="current" :values="items" style-type='text' @clickItem="onClickItem"></uni-segmented-control >
                    <view class="content">
                        <works v-if="current === 0">
                        </works>
                        <dynamic v-if="current === 1">
                        </dynamic>
                        <like v-if="current === 2">
                            选项卡3的内容
                        </like>
                    </view>
                </view>
        </view>
    </view>
</template>
<script>
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
import works from './m-works/m-works.vue'
import dynamic from './m-dynamic/m-dynamic.vue'
import like from './m-like/m-like.vue'
export default {
    components: {
		uniSegmentedControl,
		works,
		dynamic,
		like,
	
	},
    data() {
        return {
            items: ["作品","动态","喜欢"],
            current: 0
        }
    },
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    }
}
</script>

<style>
	.page-body{
		width: 100%;height: 200vh;
		background-color: #171A23;
	}
	.btn-area{
		width: 100%;height: 50px;
		background-color: #171A23;
		float: left;
	}
</style>
