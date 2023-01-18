<script setup>
const props = defineProps({
	msg: String,
	name: String,
});
</script>

<template>
	<div class="chat chat-end">
		<div class="chat-header">{{ props.name }}</div>
		<div class="chat-bubble">{{ props.msg }}</div>
	</div>
</template>
