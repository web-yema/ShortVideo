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
		}
	}
</script>

<style lang="less">

</style>
