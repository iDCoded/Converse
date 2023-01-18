const { contextBridge, ipcRenderer } = require("electron");

const WIN_API = {
	send: (channel, args) => {
		ipcRenderer.send(channel, args);
	},
	listen: (channel, reply) => {
		ipcRenderer.on(channel, reply);
	},
};

contextBridge.exposeInMainWorld("api", WIN_API);
