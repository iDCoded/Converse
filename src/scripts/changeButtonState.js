/**
 *
 * @param {String} id Identifier of the Button HTML ELement.
 * @param {String} state The preferred state of the button. `enabled` or  `disabled`
 */
export function changeButtonState(id, state) {
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
