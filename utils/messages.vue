<template>
	<view >
		<uni-popup ref="popup" type="message">
		  <uni-popup-message :type="msg.succe" :message="msg.messages"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	export default {
		components: {
		  uniPopupMessage,
		},
		 data () {
		    return {
				msg:{}
		    }
		  },
		  mounted () {
		     this.$refs.popup.open();
		  }
		 
		}
</script>


<style>
</style>
