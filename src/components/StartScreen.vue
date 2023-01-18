<script setup>
import { ref } from "@vue/reactivity";

const clientId = ref("");
const emit = defineEmits(["client-id"]);

function submitId(id) {
	if (id.length > 0) {
		emit("client-id", id);
	}
}
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<h3 class="text-3xl p-6">Welcome to Converse</h3>
		<div class="input-group items-center justify-center">
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				placeholder="Type Here"
				v-model="clientId"
			/>
			<button class="btn btn-square" @click.prevent="submitId(clientId)">
				+
			</button>
		</div>
	</div>
</template>
