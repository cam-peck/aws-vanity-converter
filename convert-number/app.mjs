

export const lambdaHandler = async (event, context) => {
    console.log('event: ', event);
    console.log('context: ', context);
    const phoneNumber = event['Details']['ContactData']['CustomerEndpoint']['Address'];
    const vanityNumbers = getVanityNumbers(phoneNumber);
    try {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Your top 3 vanity numbers are ${vanityNumbers} and number was ${phoneNumber}`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

function getVanityNumbers (string) {
    // code that converts the number here //
    const result = ['1-800-CALL-CAM', '1-800-CALL-HIM', '1-800-CALL-HER' ];
    return result;
}