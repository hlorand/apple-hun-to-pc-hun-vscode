/*
 * This file is part of apple-hungarian-layout-to-pc-hungarian.
 *
 * Copyright (C) 2025 Lorand Horvath
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

const vscode = require('vscode');

const charMap = {
    'Ķ': '<',
    ';': '>',
    '|': '<',
    '«': '>',
    //'–': '*',// altgr + -
    '^': '*',  // changed from alrgr + - to altgr + á
    '”': '{}',
    '~': '}',  // not working
    'ń': '[',
    '©': ']',
    'ę': '|',
    '»': '#',
    'ć': '&',
    '„': '@',
    '…': '$',
    '–': ';',  // not working on original pos
    '£': '^',
    '{': '`',
    '@': '\\',
    '&' : '~'
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Extension "apple-hungarian-layout-to-pc-hungarian" is now active.');

    const disposable = vscode.commands.registerCommand('type', async (args) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || !args || typeof args.text !== 'string') return;

        const originalChar = args.text;
        const replacement = charMap[originalChar];

        if (replacement !== undefined) {
            await editor.edit(editBuilder => {
                const selections = editor.selections;
                for (const sel of selections) {
                    editBuilder.insert(sel.start, replacement);
                }
            });
        } else {
            // fallback to default typing
            await vscode.commands.executeCommand('default:type', { text: originalChar });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
