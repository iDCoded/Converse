<script setup>
import AppHeading from "./components/AppHeading.vue";
import ChatScreen from "./components/ChatScreen.vue";
import StartScreen from "./components/StartScreen.vue";
import { createClient } from "@supabase/supabase-js";
import { ref, onBeforeMount } from "vue";

var supabase;

let allMessages = ref([]);
let userName = ref([]);
let msgContent = ref();
let msgId = ref();

let roomName = ref("");
let userClientId;
let clientIdIsProvided = ref(false);

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
						userName.value.push(args[i].name);
					}
					allMessages.value.push(msgContent.value);
				}
			});
		});
	});
});

// FUNCTIONS
function saveClientId(id) {
	userClientId = id;
	clientIdIsProvided.value = true;
}
function saveRoomName(name) {
	roomName.value = name;
}
</script>

<template>
	<StartScreen
		v-if="!clientIdIsProvided"
		@client-id="saveClientId"
		@room-name="saveRoomName"
	/>
	<div v-if="clientIdIsProvided">
		<AppHeading :roomName="roomName" />
		<div class="divider"></div>
		<div v-for="(text, index) in allMessages" :key="index">
			<ChatScreen :chatContent="text" :user="userName[index]" />
		</div>
	</div>
</template>

<style scoped></style>
