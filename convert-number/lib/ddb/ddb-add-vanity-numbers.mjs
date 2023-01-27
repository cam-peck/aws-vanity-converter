import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from './ddb-client.mjs';

async function ddbAddVanityNumbers(phoneNumber, vanityNumbers) { // phoneNumber('+13174877448') & vanityNumbers(['number1', 'number2', ...])
    const params = {
        TableName: 'VanityNumbers',
        Item: {
            phoneNumber: {S: phoneNumber},
            vanityNumber1: { S: vanityNumbers[0]},
            vanityNumber2: { S: vanityNumbers[1]},
            vanityNumber3: { S: vanityNumbers[2]},
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

export { ddbAddVanityNumbers };