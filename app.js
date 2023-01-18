const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
require("dotenv").config();

const createWindow = () => {
	const appWin = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "./src/backend/preload.js"),
		},
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

/* Inter-Process Communications */
ipcMain.on("app-mounted", (event, args) => {
	console.log(args);
});

ipcMain.on("send-db-data", (e, args) => {
	const dbData = {
		supabaseUrl: process.env.SUPABASE_URL,
		supabaseKey: process.env.SUPABASE_KEY,
	};
	e.sender.send("db-data", dbData);
});
