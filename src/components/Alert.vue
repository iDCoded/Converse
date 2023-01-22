<template>
	<div class="absolute">
		<div class="fixed bottom-8 left-12 right-12">
			<div v-if="isError(alertType)">
				<div class="alert alert-error shadow-lg">
					<span>Error!</span>
				</div>
			</div>
			<div
				v-else-if="isWarning(alertType)"
				class="alert alert-warning shadow-lg"
			>
				<span>Warning!</span>
			</div>
			<div v-else-if="isInfo(alertType)" class="alert alert-info shadow-lg">
				<span>Warning!</span>
			</div>
			<div
				v-else-if="isSuccess(alertType)"
				class="alert alert-success shadow-lg"
			>
				<span>Warning!</span>
			</div>
			<div v-else class="alert">
				<span>This is an alert</span>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	alertType: String,
});

const isError = (alert) => {
	if (alert == "Error") return true;
	else return false;
};
const isWarning = (alert) => {
	if (alert == "Warning") return true;
	else return false;
};
const isInfo = (alert) => {
	if (alert == "Info") return true;
	else return false;
};
const isSuccess = (alert) => {
	if (alert == "Success") return true;
	else return false;
};
</script>
