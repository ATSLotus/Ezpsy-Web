<script setup lang="ts">
	import log from "@/assets/utils/log"
  	import router from '@/router/router';
	
</script>

<template>
	<div id="root" class="
	no_scroll_bar">
        <router-view class="content"></router-view>
	</div>
</template>

<style scoped lang="scss">
	@import "@/scss/style.scss";
	#root {
		width: 100%;
		height: 100vh;
		overflow: scroll;
		.content {
			width: 100%;
			height: 100%;
		}
	}
</style>
