<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const canSubmitId = ref(false);
const canSubmitRoom = ref(false);

const clientId = ref("");
const roomName = ref("");
const emit = defineEmits(["client-id", "room-name", "create-room"]);

/**
 *
 * @param {String} id Identifier of the Button HTML ELement.
 * @param {String} state The preferred state of the button. `enabled` or  `disabled`
 */
function changeButtonState(id, state) {
	const targetButton = document.querySelector("#" + id);
	if (targetButton) {
		if (state == "disabled") {
			targetButton.classList.add("btn-disabled");
		} else if (state == "enabled") {
			targetButton.classList.remove("btn-disabled");
		}
	} else {
		console.error("Button not found. Make sure the ID is correct");
	}
}

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
		document.querySelector("#room-name-btn").classList.remove("btn-disabled");
		document.querySelector("#create-room-btn").classList.remove("btn-disabled");
		document.querySelector("#room-name-input").disabled = false;
	} else if (id.length == 0) {
		document.querySelector("#room-name-btn").classList.add("btn-disabled");
		document.querySelector("#create-room-btn").classList.remove("btn-disabled");
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
