<script setup>
import { ref } from "@vue/reactivity";

const clientId = ref("");
const roomName = ref("");
const emit = defineEmits(["client-id", "room-name"]);

function submitId(id) {
	if (id.length > 0) {
		emit("client-id", id);
	}
}
function submitRoomName(name) {
	if (name.length > 0) {
		emit("room-name", name);
	}
}
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<h3 class="text-3xl p-6">Welcome to Converse</h3>
		<div class="input-group items-center justify-center p-4">
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				placeholder="Room ID"
				v-model="clientId"
			/>
			<button class="btn btn-square" @click.prevent="submitId(clientId)">
				+
			</button>
		</div>
		<div class="input-group items-center justify-center p-4">
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				placeholder="Room Name"
				v-model="roomName"
			/>
			<button class="btn btn-square" @click.prevent="submitRoomName(roomName)">
				+
			</button>
		</div>
	</div>
</template>
