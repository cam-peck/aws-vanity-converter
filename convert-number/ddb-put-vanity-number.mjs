import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from './lib/ddb-client.mjs';

async function ddbPutVanityNumber() {
    const params = {
        TableName: 'VanityNumbers',
        Item: {
            phoneNumber: {S: '+14633365592'},
            vanityNumber1: { S: 'test'},
            vanityNumber2: { S: 'test2'},
            vanityNumber3: { S: 'test3'},
        }
    }
    try {
        const data = await ddbClient.send(new PutItemCommand(params))
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export { ddbPutVanityNumber };