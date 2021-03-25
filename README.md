# kaholo-plugin-azure-compute
Azure compute plugin for Kaholo.

## Settings
1. Client or App ID(string)**required**
2. Secret or Password(vault)**required**
3. Domain or Tenant ID(string)**required**
4. Subscription ID(string)**required**

## Method Start Machine
Start an Azure Compute virtual machine.

### Parameters
1. Resouece Group(string)**required**
2. Machine Name(string)**required**

## Stop Machine
Power off an Azure Compute virtual machine.

### Parameters
1. Resouece Group(string)**required**
2. Machine Name(string)**required**
3. Skip Shutdown(boolean)**optional** - The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default is false.