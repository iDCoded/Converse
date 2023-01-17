const { app, BrowserWindow } = require("electron");

const createWindow = () => {
	const appWin = new BrowserWindow({
		width: 800,
		height: 600,
	});

	if (!app.isPackaged) {
		console.log("App not packaged. Loaded page from localhost.");
		appWin.webContents.openDevTools();
		appWin.loadURL("http://localhost:5173/");
	} else {
		appWin.loadFile("./dist/index.html");
	}
};

app.whenReady().then(() => {
	createWindow();
	console.info(app.name + " is up and running!");
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
