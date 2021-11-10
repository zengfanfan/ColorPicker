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
	picker.activate(config.read());

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(config.id + ".run", () => {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInformationMessage("Running " + config.name + " ...");
		picker.activate(config.read());
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	picker.deactivate();
}
