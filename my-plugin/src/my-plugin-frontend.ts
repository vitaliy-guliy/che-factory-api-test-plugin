
/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';
import * as che from '@eclipse-che/plugin';

export function start(context: theia.PluginContext) {
    const testGetCurrentWorkspace = {
        id: 'test-get-current-workspace',
        label: "[TEST] Get current Workpsace"
    };
    context.subscriptions.push(theia.commands.registerCommand(testGetCurrentWorkspace, (...args: any[]) => {
        che.workspace.getCurrentWorkspace().then(w => {
            console.log('workspace ', w);
        });
    }));

    const testGetFactoryById = {
        id: 'test-get-factory-by-id',
        label: "[TEST] Get factory by ID"
    };
    context.subscriptions.push(theia.commands.registerCommand(testGetFactoryById, async (...args: any[]) => {
        let factoryId = 'factory27207ot86qyvtva1';
        theia.window.showInformationMessage(`Get Factory with ID ${factoryId}`);

        try {
            const result: che.Factory = await che.factory.getById(factoryId);
            console.log('factory ', result);

        } catch (eee) {
            console.log('ERROR ', eee);
        }
    }));
}

export function stop() {
}
