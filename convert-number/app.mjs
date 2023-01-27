import { generateVanityWords } from "./generate-vanity-words.mjs";
import { chooseBestVanity } from './choose-best-vanity.mjs'
import { ddbAddVanityNumbers } from './lib/ddb/ddb-add-vanity-numbers.mjs'
import { ddbLookupPhoneNumber } from "./lib/ddb/ddb-lookup-phone-number.mjs";

export const lambdaHandler = async (event, callback) => {

    const phoneNumber = event['Details']['ContactData']['CustomerEndpoint']['Address'];

    const lookupResult = await ddbLookupPhoneNumber(phoneNumber);
    let bestNumbers;
    if (lookupResult) {
        bestNumbers = [lookupResult.vanityNumber1.S, lookupResult.vanityNumber2.S, lookupResult.vanityNumber3.S ];
    } else {
        const vanityWords = generateVanityWords(phoneNumber);
        bestNumbers = chooseBestVanity(vanityWords, phoneNumber);
        await ddbAddVanityNumbers(phoneNumber, bestNumbers);
    }
   
    const resultMap = {
        vanityNumber1: bestNumbers[0],
        vanityNumber2: bestNumbers[1],
        vanityNumber3: bestNumbers[2],
    };
    callback(null, resultMap);
};

// TODO:
    // 1: Work on DynamoDB integration
        // Read DynamoDB documentation on AWS Site
        // Figure out how to initialize a db from template.yaml
        // Add code for GET requests from the database
        // Add code for POST requests to the databasey
        // Add tests for DynamoDB --> AWS.mock()???
    // 2: Lots more unit tests for convert-number functions