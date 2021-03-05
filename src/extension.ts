// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "vstodo-sidebar",
            sidebarProvider
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.addTodo", () => {
            //vscode.window.showInformationMessage("Working!");
            const { activeTextEditor } = vscode.window;
            if (!activeTextEditor) {
                vscode.window.showWarningMessage("no active text editor");
                return;
            }

            const text: string = activeTextEditor.document.getText(
                activeTextEditor.selection
            );
            //vscode.window.showInformationMessage("Text: " + text);

            sidebarProvider._view?.webview.postMessage({
                command: "new-todo",
                value: text,
            });
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.helloWorld", () => {
            HelloWorldPanel.createOrShow(context.extensionUri);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.refresh", async () => {
            // HelloWorldPanel.kill();
            // HelloWorldPanel.createOrShow(context.extensionUri);
            await vscode.commands.executeCommand(
                "workbench.action.closeSidebar"
            );
            await vscode.commands.executeCommand(
                "workbench.view.extension.vstodo-sidebar-view"
            );

            // setTimeout(
            //     () =>
            //         vscode.commands.executeCommand(
            //             "workbench.action.webview.openDeveloperTools"
            //         ),
            //     500
            // );
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.askAboutDay", async () => {
            const good = "Good";
            const bad = "Bad";

            const answer = await vscode.window.showInformationMessage(
                "How is your Day?",
                good,
                bad
            );

            switch (answer) {
                case good:
                    vscode.window.showInformationMessage("YAY!! 🌈🦄✨");
                    break;
                case bad:
                    vscode.window.showWarningMessage("Sorry to hear that 😟");
                    break;
                default:
                    break;
            }
        })
    );
}

// this method is called when your extension is deactivated
export function deactivate() {}
