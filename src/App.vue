<script setup>
import AppHeading from "./components/AppHeading.vue";
import ChatScreen from "./components/ChatScreen.vue";
import { createClient } from "@supabase/supabase-js";
import { ref, onBeforeMount } from "vue";

var supabase;

let allMessages = ref([]);
let msgContent = ref();

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
					allMessages.value.push(msgContent.value);
					console.log(msgContent.value);
				}
			});
		});
	});
});
</script>

<template>
	<AppHeading appName="Converse" />
	<div v-for="(text, index) in allMessages" :key="index">
		<ChatScreen :chatContent="text" />
	</div>
</template>

<style scoped></style>
