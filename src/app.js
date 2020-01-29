
const msRest = require('@azure/ms-rest-nodeauth');
const armCompute = require("@azure/arm-compute");

function _getComputeService(action, settings){
	return msRest.loginWithServicePrincipalSecret(
		settings.clientId, settings.secret, settings.domain).then(credentials=>{
			const client = new armCompute.ComputeManagementClient(credentials, settings.subscriptionId);
			return client;
		});
}

function startVm(action,settings){
	return _getComputeService(action,settings).then(client=>{
		return client.virtualMachines.start(action.params.resoueceGroup,action.params.machineName);
	});
}

function stoptVm(action,settings){
	return _getComputeService(action,settings).then(client=>{
		const options = {
			skipShutdown : action.params.skipShutdown || false
		};
		return client.virtualMachines.powerOff(action.params.resoueceGroup,action.params.machineName,options);
	});
}

module.exports = {
	startVm : startVm,
	stoptVm : stoptVm
}

