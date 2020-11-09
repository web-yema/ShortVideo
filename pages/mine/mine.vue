<template>
	<view>
		<mine/>

	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {

		data() {
			return {
				
			};
		},
		onLoad() {
			
			 let tiems =setInterval(()=>{
				if(this.admin.username){
					clearInterval(tiems)
					  this.socket.emit("online", this.admin.username);
				}
			},100)
		},
		computed:{
			...mapState(['admin'])
		},
		methods:{
			asd(){
				if(this.admin.username){
					console.log()
					
				}
			}
		}
	}
</script>

<style>
 
</style>


