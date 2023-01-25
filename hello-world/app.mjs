

export const lambdaHandler = async (event, context) => {
    const firstName = event['firstName'];
    const lastName = event['lastName'];
    const message = event['message'];
    try {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `${message} is from ${firstName} ${lastName}.`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
