

export const lambdaHandler = async (event, context, callback) => {
    console.log('event: ', event);
    console.log('context: ', context);
    const phoneNumber = event['Details']['ContactData']['CustomerEndpoint']['Address'];
    const vanityNumbers = getVanityNumbers(phoneNumber);
    let resultMap = {
        phoneNumber: phoneNumber,
        vanityNumbers: vanityNumbers
    };

    callback(null, resultMap);
};

function getVanityNumbers (string) {
    const result = ['1-800-CALL-CAM', '1-800-CALL-HIM', '1-800-CALL-HER' ];
    // code that converts the number here //
    return result;
}