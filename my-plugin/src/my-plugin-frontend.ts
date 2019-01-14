
/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';

import * as che from '@eclipse-che/plugin';
import { che as cheApi } from '@eclipse-che/api';

let context: theia.PluginContext;

const testWorkspaceID = 'workspacecutmcf2ut3ftiodx';
// let testFactoryID = 'factoryvin9eq6960ppie96';
let testFactoryID = 'factoryeqgl3njxrn37z5eq';

let workWS: cheApi.workspace.Workspace | undefined = undefined;

export function start(c: theia.PluginContext) {
    context = c;

    theia.window.showInformationMessage('Test Workspace: ' + testWorkspaceID);

    testGetCurrentWorkspace();
    testGetAllWorkspaces();

    testGetWorkspaceById();
    testAddServersToWorkspace();
    testUpdateWorkspace();

    testGetFactoryById();
}

export function stop() {
}

function testGetCurrentWorkspace() {
    const command = {
        id: 'test-get-current-workspace',
        label: "[TEST] Get current Workpsace"
    };

    context.subscriptions.push(theia.commands.registerCommand(command, (...args: any[]) => {
        che.workspace.getCurrentWorkspace().then(w => {
            console.log('workspace ', w);
        });
    }));
}

function testGetAllWorkspaces() {
    const command = {
        id: 'test-get-all-workspaces',
        label: "[TEST] Get All Workspaces"
    };

    context.subscriptions.push(theia.commands.registerCommand(command, (...args: any[]) => {
        che.workspace.getAll().then(workspaces => {
            console.log('workspaces ', workspaces);
        });
    }));
}

function testGetWorkspaceById() {
    const command = {
        id: 'test-get-workspace-by-id',
        label: "[TEST] 1 - Get Workpsace by ID"
    };

    context.subscriptions.push(theia.commands.registerCommand(command, (...args: any[]) => {
        che.workspace.getById(testWorkspaceID).then(w => {
            console.log('workspace ', w);
            workWS = w;
        });
    }));
}

function testAddServersToWorkspace() {
    const command = {
        id: 'test-add-servers-to-workspace',
        label: "[TEST] 2 -Add Servers to Workpsace"
    };

    context.subscriptions.push(theia.commands.registerCommand(command, (...args: any[]) => {
        console.log('<< workWS ', workWS);

        if (workWS === undefined) {
            theia.window.showInformationMessage('> Working Workspace is not SET');
            return;
        }

        console.log('>> process workspace ' + workWS.config!.name);

        const out = theia.window.createOutputChannel('Process ' + workWS.config!.name);
        out.show(true);
        out.appendLine('Hello!');
        out.appendLine(' ');

        let environments = workWS.config!.environments;
        for (let env in environments!) {
            out.appendLine('> environment: ' + env);

            try {
                const environment = environments![env];
                const machines = environment.machines;

                for (let m in machines!) {
                    out.appendLine('    > machine: ' + m);
                    const machine = machines![m];
                    const servers = machine.servers!;

                    const server: cheApi.workspace.ServerConfig = {
                        attributes: {},
                        protocol: 'http',
                        port: '100500'
                    };

                    servers['test-server'] = server;
                }

            } catch (error) {
                out.appendLine('<< strange error: ' + error.message);
            }
        }

        console.log('>> ready workspace ', workWS);

    }));

}

function testUpdateWorkspace() {
    const command = {
        id: 'test-update-workspace',
        label: "[TEST] 3 -Update Workpsace"
    };

    context.subscriptions.push(theia.commands.registerCommand(command, (...args: any[]) => {
        console.log('>> workspace to update ', workWS);

        if (workWS === undefined) {
            theia.window.showInformationMessage('> Working Workspace is not SET');
            return;
        }

        che.workspace.update(testWorkspaceID, workWS).then(() => {
            theia.window.showInformationMessage('>> Workspace updated: ' + testWorkspaceID);
        });

    }));
}

function testGetFactoryById() {
    const command = {
        id: 'test-get-factory-by-id',
        label: "[TEST] Get factory by ID"
    };

    context.subscriptions.push(theia.commands.registerCommand(command, async (...args: any[]) => {
        try {
            const result: cheApi.factory.Factory = await che.factory.getById(testFactoryID);
            console.log('factory ', result);
            theia.window.showInformationMessage('Factory received');

        } catch (eee) {
            console.log('ERROR ', eee);
            theia.window.showErrorMessage('Unable to get a factory by ID ' + testFactoryID);
        }
    }));
}
