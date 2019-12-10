"use strict";

import { app, protocol, BrowserWindow, dialog, Menu, shell, ipcMain } from "electron";
import {
  createProtocol,
  // eslint-disable-next-line no-unused-vars
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

/**
 * shows directory dialog and return array with path(s)
 * @returns {Array} array the user chosen (frist item)
 */
// eslint-disable-next-line no-unused-vars
async function openDirectoryDialog () {
  win.hide();
  const userAnwser = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  const path = userAnwser.filePaths[0];
  console.log(`[i][background.js] path: ${path}`);
  win.show();
  return path;
}

/**
 * main application menue
 * @type {Array}
 */
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Folder",
        async click () {
          win.webContents.send("chosen-directory", { path: await openDirectoryDialog() });
        },
        accelerator: "CmdOrCtrl+Shift+N"
      },
      {
        label: "Remove all folders",
        click () {
          win.webContents.send("remove-all-folders", {});
        }
      },
      {
        type: "separator"
      },
      {
        label: "Exit",
        role: "quit",
        accelerator: "CmdOrCtrl+Q"
      }
    ]
  },
  {
    label: "Extras",
    submenu: [
      {
        label: "Reload",
        role: "reload",
        accelerator: "CmdOrCtrl+R"
        // CmdOrCtrl+P
      },
      {
        label: "Toggle Dev Tools",
        role: "toggledevtools"
      }
    ]
  }
];

const ApplicationMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(ApplicationMenu);

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  win.once("ready-to-show", () => {
    win.show();
  });
  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// todo: file context menue:
ipcMain.on("file-context", (event, args) => {
  const { path } = args;
  const contextTemplate = [
    {
      label: "Open in Explorer",
      click() { shell.showItemInFolder(path); },
    },
  ];
  const fileContextMenu = Menu.buildFromTemplate(contextTemplate);
  fileContextMenu.popup({ window: win });
});