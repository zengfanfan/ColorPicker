// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as config from './config';
import * as picker from './picker';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// This line of code will only be executed once when your extension is activated
	config.debug(config.name + " is active.");
	config.toast(config.name + " is active.");
	picker.activate();
	// Apply settings as soon as changed.
	let dispose = vscode.workspace.onDidChangeConfiguration(()=>{
		picker.deactivate();
		picker.activate();
	});
	context.subscriptions.push(dispose);
}

// this method is called when your extension is deactivated
export function deactivate() {
	picker.deactivate();
}
