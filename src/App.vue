<script setup lang="ts">
	import log from "@/assets/utils/log"
  	import router from '@/router/router';
	
</script>

<template>
	<div id="root">
        <router-view class="content"></router-view>
	</div>
</template>

<style scoped lang="scss">
	#root {
		width: 100%;
		height: 100vh;
		.content {
			width: 100%;
			height: 100%;
		}
	}
</style>
