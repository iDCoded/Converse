<script setup>
import AppHeading from "./components/AppHeading.vue";
import ChatScreen from "./components/ChatScreen.vue";
import StartScreen from "./components/StartScreen.vue";
import { createClient } from "@supabase/supabase-js";
import { ref, onBeforeMount } from "vue";

var supabase;

let allMessages = ref([]);
let username = ref([]);
let msgContent = ref();
let msgId = ref();

let roomName = ref();
let userClientId = ref();
let canCreateRoom = ref(false);

onBeforeMount(() => {
	api.send("send-db-data");
	api.listen("db-data", (e, args) => {
		supabase = createClient(args.supabaseUrl, args.supabaseKey);
		const messages = async () => {
			let { data: msg, error } = await supabase.from("messages").select("*");
			if (!error) {
				return msg;
			} else {
				console.error(error);
			}
		};
		messages().then(() => {
			const content = (msgContent.value = messages());
			content.then((args) => {
				for (let i = 0; i < args.length; i++) {
					msgContent.value = args[i].content;
					msgId.value = args[i].id;
					if (msgId.value === args[i].id) {
						username.value.push(args[i].name);
					}
					allMessages.value.push(msgContent.value);
				}
			});
		});
	});
});

// FUNCTIONS
function saveClientId(id) {
	canCreateRoom.value = true;
	userClientId.value = id;
}
function saveRoomName(name) {
	roomName.value = name;
}

function createRoom(id, name) {
	console.log(id, name);
}
</script>

<template>
	<StartScreen
		v-if="!canCreateRoom"
		@client-id="saveClientId"
		@room-name="saveRoomName"
		@create-room="createRoom"
	/>
	<div v-if="canCreateRoom">
		<AppHeading :roomName="roomName" />
		<div class="divider"></div>
		<div v-for="(text, index) in allMessages" :key="index">
			<ChatScreen :chatContent="text" :user="username[index]" />
		</div>
	</div>
</template>

<style scoped></style>
