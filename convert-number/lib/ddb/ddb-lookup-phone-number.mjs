import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from './ddb-client.mjs';

async function ddbLookupPhoneNumber(numberToLookup) {
    const params = {
        TableName: 'VanityNumbers',
        Key: {
            phoneNumber: { S: numberToLookup }
        }
    }
    try {
        const data = await ddbClient.send(new GetItemCommand(params))
        if (data) return data.Item;
    } catch (err) {
        console.error(err);
    }
}

export { ddbLookupPhoneNumber };