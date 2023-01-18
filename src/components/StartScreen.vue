<script setup>
import { ref } from "@vue/reactivity";

const clientId = ref("");
const roomName = ref("");
const emit = defineEmits(["client-id", "room-name", "can-create-room"]);

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
function createRoom(id, name) {}
function checkForId() {
	const btn = document.querySelector("#room-name-btn");
	if (clientId.value.length > 0) {
		btn.classList.remove("btn-disabled");
	} else {
		btn.classList.add("btn-disabled");
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
				@focus="checkForId"
			/>

			<button
				id="room-name-btn"
				class="btn btn-square btn-disabled"
				@click.prevent="submitRoomName(roomName)"
			>
				+
			</button>
		</div>
		<div>
			<button
				class="btn btn-info"
				@click.prevent="createRoom(clientId, roomName)"
			>
				Create Room
			</button>
		</div>
	</div>
</template>
