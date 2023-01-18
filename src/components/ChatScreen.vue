<script setup>
import Chat from "./Chat.vue";

const props = defineProps({
	chatContent: String,
	user: String,
});
</script>

<template>
	<div class="flex justify-end content-center p-4">
		<Chat :msg="chatContent" :name="user" />
	</div>
</template>
