"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
let myStatusBarItem;
let itemSettings = vscode.workspace.getConfiguration('statusBarCustomItem');
let colorSettings = vscode.workspace.getConfiguration('statusBarCustomColor');
function activate(context) {
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10000);
    context.subscriptions.push(myStatusBarItem);
    updateStatusBar(context);
}
function updateStatusBar(context) {
    let text = itemSettings.get("text");
    let icon = itemSettings.get("icon");
    let tooltip = itemSettings.get("tooltip");
    let primaryBackground = colorSettings.get("primaryBackgroundColor");
    let secondaryBackground = colorSettings.get("secondaryBackgroundColor");
    let foreground = colorSettings.get("foregroundColor");
    myStatusBarItem.text = `${icon} ${text}`;
    myStatusBarItem.tooltip = tooltip;
    myStatusBarItem.show();
    const workbenchConfiguration = vscode.workspace.getConfiguration('workbench');
    const currentColorCustomizations = workbenchConfiguration.get('colorCustomizations') ?? {};
    const colorCustomizations = { ...currentColorCustomizations };
    if (primaryBackground !== undefined) {
        colorCustomizations['statusBar.background'] = primaryBackground;
    }
    if (secondaryBackground !== undefined) {
        colorCustomizations['statusBar.noFolderBackground'] = secondaryBackground;
        colorCustomizations['statusBar.debuggingBackground'] = secondaryBackground;
    }
    if (foreground !== undefined) {
        colorCustomizations['statusBar.foreground'] = foreground;
        colorCustomizations['statusBar.debuggingForeground'] = foreground;
    }
    if (currentColorCustomizations !== colorCustomizations) {
        workbenchConfiguration.update('colorCustomizations', colorCustomizations, true);
    }
}
//# sourceMappingURL=extension.js.map