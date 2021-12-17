import common = require('oci-common')
import { ObjectStorageClient, requests, models } from 'oci-objectstorage'
import { nullStringSafe } from './nullSafeChecker'

export const puturlgenerate = async (): Promise<string> => {
    const provider: common.ConfigFileAuthenticationDetailsProvider = new common.ConfigFileAuthenticationDetailsProvider()

    const bucketName: string = nullStringSafe(process.env.BUCKET_NAME)
    const namespaceName: string = nullStringSafe(process.env.NAME_SPACE)
    const regionId: string = nullStringSafe(process.env.REGION_ID)
    const serviceName = 'objectstorage'

    const client = new ObjectStorageClient({ authenticationDetailsProvider: provider })
    
    const today = new Date()
    const neverExpires = new Date(today)
    neverExpires.setMinutes(neverExpires.getMinutes() + 30)

    const createPreauthenticatedRequestDetails = {
        name: 'puturlgenerate' + today.toString(),
        accessType: models.CreatePreauthenticatedRequestDetails.AccessType.AnyObjectWrite,
        timeExpires: neverExpires
    } as models.CreatePreauthenticatedRequestDetails

    const createPreauthenticatedRequest: requests.CreatePreauthenticatedRequestRequest = {
        bucketName,
        namespaceName,
        createPreauthenticatedRequestDetails
    }

    const resp = await client.createPreauthenticatedRequest(createPreauthenticatedRequest)
    const generated_uri: string = resp.preauthenticatedRequest.accessUri
    const result_url: string = 'https://' + serviceName + '.' + regionId + '.oraclecloud.com' + generated_uri

    return result_url
}

export const geturlgenerate = async (): Promise<string> => {
    const provider: common.ConfigFileAuthenticationDetailsProvider = new common.ConfigFileAuthenticationDetailsProvider()

    const bucketName = nullStringSafe(process.env.BUCKET_NAME)
    const namespaceName = nullStringSafe(process.env.NAME_SPACE)
    const regionId = nullStringSafe(process.env.REGION_ID)
    const serviceName = 'objectstorage'

    const client = new ObjectStorageClient({ authenticationDetailsProvider: provider })
    
    const today = new Date()
    const neverExpires = new Date(today)
    neverExpires.setMinutes(neverExpires.getMinutes() + 30)

    const createPreauthenticatedRequestDetails = {
        name: 'geturlgenerate' + today.toString(),
        accessType: models.CreatePreauthenticatedRequestDetails.AccessType.AnyObjectRead,
        timeExpires: neverExpires
    } as models.CreatePreauthenticatedRequestDetails
    const createPreauthenticatedRequest: requests.CreatePreauthenticatedRequestRequest = {
        bucketName,
        namespaceName,
        createPreauthenticatedRequestDetails
    }

    const resp = await client.createPreauthenticatedRequest(createPreauthenticatedRequest)
    const generated_uri = resp.preauthenticatedRequest.accessUri
    const result_url = 'https://' + serviceName + '.' + regionId + '.oraclecloud.com' + generated_uri

    return result_url
}