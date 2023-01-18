<template>
	<h1 class="text-6xl flex justify-center">{{ roomName }}</h1>
</template>

<script setup>
const props = defineProps({
	roomName: String,
});
</script>
