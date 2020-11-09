<template>
	<view>
		<news></news>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		mounted() {
			this.$store.dispatch("admins");
		},
		// onPullDownRefresh(){
		// 	this.$store.dispatch("admins");
		// 	this.index=this.index+1
		// }
		
	}
</script>

<style lang="less">

</style>
