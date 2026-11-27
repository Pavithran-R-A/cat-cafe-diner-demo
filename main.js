"use strict";
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  // Test/launch hook: --window-size=WIDTHxHEIGHT (default 1280x800).
  // Harmless in production; lets QA launch the app at any desktop size.
  let width = 1280, height = 800;
  const sizeArg = process.argv.find(a => a.startsWith("--window-size="));
  if (sizeArg) {
    const m = sizeArg.slice("--window-size=".length).match(/^(\d+)x(\d+)$/);
    if (m) { width = parseInt(m[1], 10); height = parseInt(m[2], 10); }
  }
  const win = new BrowserWindow({
    width,
    height,
    title: "Cat Cafe Diner Demo",
    backgroundColor: "#fff8ec",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    autoHideMenuBar: true,
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "app", "index.html"));
  win.on("closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
  return win;
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
