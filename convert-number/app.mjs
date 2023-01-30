import { generateVanityWords } from "./generate-vanity-words.mjs";
import { chooseBestVanity } from './choose-best-vanity.mjs'
import { ddbAddVanityNumbers } from './lib/ddb/ddb-add-vanity-numbers.mjs'
import { ddbLookupPhoneNumber } from "./lib/ddb/ddb-lookup-phone-number.mjs";
import validEvent from '../events/valid-event.json' assert { type: 'json' };
import invalidEvent from '../events/invalid-event.json' assert { type: 'json' };

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
       
        return {
            result: true, // vanity numbers were successfully created
            vanityNumber1: bestNumbers[0],
            vanityNumber2: bestNumbers[1],
            vanityNumber3: bestNumbers[2],
        }
    } catch (err) { // vanity numbers could not be created due to invalid number
        console.error(err);
        return { result: false };
    }
};
