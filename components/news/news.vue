<template>
	<view class="msg">
		<top></top>
		<chatlist></chatlist>
	</view>
</template>

<script>
	import top from './top.vue'
	import chatlist from './chatlist.vue'
	export default {
		components:{
			top,
			chatlist
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped>

	.msg{
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #161823;
	}
</style>
