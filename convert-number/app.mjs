import { generateVanityWords } from "./generate-vanity-words.mjs";
import { chooseBestVanity } from './choose-best-vanity.mjs'
import { ddbAddVanityNumbers } from './lib/ddb/ddb-add-vanity-numbers.mjs'
import { ddbLookupPhoneNumber } from "./lib/ddb/ddb-lookup-phone-number.mjs";

export const lambdaHandler = async (event, context) => {

    const phoneNumber = event['Details']['ContactData']['CustomerEndpoint']['Address'];

    try {
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
        return resultMap
    } catch (err) {
        console.error(err);
        return err;
    }
};

// TODO:
    // 1: LOTS of unit tests
        // All dynamo functions need unit tests --> check out 'aws-sdk-client-mock' npm package
    // 2: Swap dictionary data from an array to an object (or find better dictionaries) to improve runtime when looking up words
    // 3: README file with project set-up and documentation tracking for the entire project
        // double-check permissions --> probably need to add some permissions via `policies` to the template.yaml file