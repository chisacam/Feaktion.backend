import common = require('oci-common')
import { ObjectStorageClient, requests, models } from 'oci-objectstorage'

export const puturlgenerate = async (): Promise<string> => {
    const provider: common.ConfigFileAuthenticationDetailsProvider = new common.ConfigFileAuthenticationDetailsProvider()

    const bucketName = 'feaktion'
    const namespaceName = 'cnycu6m6oxz7'
    const regionId = 'ap-seoul-1'
    const serviceName = 'objectstorage'

    const client = new ObjectStorageClient({ authenticationDetailsProvider: provider })
    
    const today = new Date()
    const neverExpires = new Date(today)
    neverExpires.setMinutes(neverExpires.getMinutes() + 30)

    // use date for generating a random unique id which can be used as a par id
    const createPreauthenticatedRequestDetails = {
        name: 'puturlgenerate',
        accessType: models.CreatePreauthenticatedRequestDetails.AccessType.AnyObjectWrite,
        timeExpires: neverExpires
    } as models.CreatePreauthenticatedRequestDetails
    const createPreauthenticatedRequest: requests.CreatePreauthenticatedRequestRequest = {
        bucketName: bucketName,
        namespaceName: namespaceName,
        createPreauthenticatedRequestDetails: createPreauthenticatedRequestDetails
    }

    const resp = await client.createPreauthenticatedRequest(createPreauthenticatedRequest)
    const generated_uri = resp.preauthenticatedRequest.accessUri
    const result_url = 'https://' + serviceName + '.' + regionId + '.oraclecloud.com' + generated_uri

    return result_url
}

export const geturlgenerate = async (): Promise<string> => {
    const provider: common.ConfigFileAuthenticationDetailsProvider = new common.ConfigFileAuthenticationDetailsProvider()

    const bucketName = 'feaktion'
    const namespaceName = 'cnycu6m6oxz7'
    const regionId = 'ap-seoul-1'
    const serviceName = 'objectstorage'

    const client = new ObjectStorageClient({ authenticationDetailsProvider: provider })
    
    const today = new Date()
    const neverExpires = new Date(today)
    neverExpires.setMinutes(neverExpires.getMinutes() + 30)

    // use date for generating a random unique id which can be used as a par id
    const createPreauthenticatedRequestDetails = {
        name: 'geturlgenerate',
        accessType: models.CreatePreauthenticatedRequestDetails.AccessType.AnyObjectRead,
        timeExpires: neverExpires
    } as models.CreatePreauthenticatedRequestDetails
    const createPreauthenticatedRequest: requests.CreatePreauthenticatedRequestRequest = {
        bucketName: bucketName,
        namespaceName: namespaceName,
        createPreauthenticatedRequestDetails: createPreauthenticatedRequestDetails
    }

    const resp = await client.createPreauthenticatedRequest(createPreauthenticatedRequest)
    const generated_uri = resp.preauthenticatedRequest.accessUri
    const result_url = 'https://' + serviceName + '.' + regionId + '.oraclecloud.com' + generated_uri

    return result_url
}