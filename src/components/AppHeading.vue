<template>
	<h1 class="text-6xl flex justify-center">{{ appName }}</h1>
</template>

<script setup>
const props = defineProps({
	appName: String,
});
</script>
