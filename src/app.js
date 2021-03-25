const msRest = require('@azure/ms-rest-nodeauth');
const armCompute = require("@azure/arm-compute");

async function startVm(action,settings){
	const [resourceGroup, machineName] = getParams(action);
	const client = await _getComputeService(settings);
	return client.virtualMachines.start(resourceGroup, machineName);
}

async function stopVm(action,settings){
	const [resourceGroup, machineName] = getParams(action);
	const client = await _getComputeService(settings);
	const options = {
		skipShutdown : action.params.skipShutdown || false
	};
	return client.virtualMachines.powerOff(resourceGroup, machineName,options);
}

// helpers
/**
 * Internal function for handling authentication and generation of compute mamagement client
 * @param {*} settings 
 * @returns ComputeManagementClient
 */
async function _getComputeService(settings){
	if (!settings.clientId || !settings.secret || !settings.domain || !settings.subscriptionId){
		throw "Not all settings were provided!";
	}
	// Create credentials from the clientId, secret and domain
	const creds = await msRest.loginWithServicePrincipalSecret(
		settings.clientId, settings.secret, settings.domain);
	return new armCompute.ComputeManagementClient(credentials, settings.subscriptionId);
}

function getParams(action){
	const resourceGroup = (action.params.resoueceGroup || "").trim(); 
	const machineName = (action.params.machineName || "").trim();
	if (!resourceGroup || !machineName){
		throw "Not all required parameters was given";
	}
	return [resourceGroup, machineName];
}

module.exports = {
	startVm : startVm,
	stoptVm : stopVm
}

