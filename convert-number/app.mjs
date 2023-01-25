

export const lambdaHandler = async (event, context) => {
    const phoneNumber = event['phoneNumber'];
    const vanityNumbers = getVanityNumbers(phoneNumber);
    try {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Your top 3 vanity numbers are ${vanityNumbers}`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

function getVanityNumbers (string) {
    const result = ['1-800-CALL-CAM', '1-800-CALL-HIM', '1-800-CALL-HER' ];
    return result;
}