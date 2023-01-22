<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { changeButtonState } from "../scripts/changeButtonState.js";

const canSubmitId = ref(false);
const canSubmitRoom = ref(false);

const clientId = ref("");
const roomName = ref("");
const emit = defineEmits(["client-id", "room-name", "create-room"]);

onMounted(() => {
	document.querySelector("#room-name-input").disabled = true;
	changeButtonState("create-room-btn", "disabled");
	changeButtonState("room-name-btn", "disabled");
});

function submitId(id) {
	if (canSubmitId) {
		if (id.length > 0) {
			emit("client-id", id);
		}
	}
}
function submitRoomName(name) {
	if (name.length > 0) {
		emit("room-name", name);
	}
}

function enableSubmitId(name) {
	if (name.length > 0) {
		canSubmitId.value = true;
	} else if (name.length == 0) {
		canSubmitId.value = false;
	}
}

function enableSubmitRoom(id) {
	if (id.length > 0) {
		canSubmitRoom.value = true;
		changeButtonState("room-name-btn", "enabled");
		changeButtonState("create-room-btn", "enabled");
		document.querySelector("#room-name-input").disabled = false;
	} else if (id.length == 0) {
		changeButtonState("room-name-btn", "disabled");
		changeButtonState("create-room-btn", "enabled");
		document.querySelector("#room-name-input").disabled = true;
		canSubmitRoom.value = false;
	}
}

function createRoom(id, name) {
	emit("create-room", id, name);
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
				@keyup="enableSubmitRoom(clientId)"
			/>
			<button
				class="btn btn-square"
				@click.prevent="submitId(clientId), submitRoomName(roomName)"
			>
				+
			</button>
		</div>
		<div class="input-group items-center justify-center p-4">
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				id="room-name-input"
				placeholder="Room Name"
				v-model="roomName"
				@keyup="enableSubmitId(roomName)"
			/>

			<button
				id="room-name-btn"
				class="btn btn-square"
				@click.prevent="submitRoomName(roomName)"
			>
				+
			</button>
		</div>
		<div>
			<button
				class="btn btn-info"
				id="create-room-btn"
				@click.prevent="createRoom(clientId, roomName)"
			>
				Create Room
			</button>
		</div>
	</div>
</template>
