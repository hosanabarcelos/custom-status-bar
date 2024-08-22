import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "customstatusbar" is now active!');

	const disposable = vscode.commands.registerCommand('customstatusbar.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from customstatusbar!');
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
