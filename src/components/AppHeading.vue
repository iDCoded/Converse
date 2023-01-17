<template>
	<h1>{{ appName }}</h1>
</template>

<script setup>
const props = defineProps({
	appName: String,
});
</script>
