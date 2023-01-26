import { confirmPhoneNumber } from './confirm-phone-number.mjs';

export const lambdaHandler = async (event, context, callback) => {
    console.log('event: ', event);
    console.log('context: ', context);
    const phoneNumber = event['Details']['ContactData']['CustomerEndpoint']['Address'];
    const vanityNumbers = confirmPhoneNumber(phoneNumber);
    const resultMap = {
        phoneNumber: phoneNumber,
        vanityNumbers: vanityNumbers
    };

    callback(null, resultMap);
};