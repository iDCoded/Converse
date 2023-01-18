<script setup>
const props = defineProps({
	chatContent: String,
});
</script>

<template>
	<div class="flex justify-center content-center p-4">
		<p>{{ props.chatContent }}</p>
	</div>
</template>
