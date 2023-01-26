import { generateVanityWords } from "./generate-vanity-words.mjs";
import { chooseBestVanity } from './choose-best-vanity.mjs'

export const lambdaHandler = (event, context, callback) => {
    const phoneNumber = event['Details']['ContactData']['CustomerEndpoint']['Address'];
    const vanityWords = generateVanityWords(phoneNumber);
    const bestNumbers = chooseBestVanity(vanityWords, phoneNumber);
    const resultMap = {
        phoneNumber: phoneNumber,
        vanityNumber1: bestNumbers[0],
        vanityNumber2: bestNumbers[1],
        vanityNumber3: bestNumbers[2],
    };
    callback(null, resultMap);
};

// TODO: 
    // 1: 
    // 2: LOTS of error handling. Current cases that need handled...
        // invalid number handling (not a US number or not long enough number)
        // no result found handling (4-letter word's number contains a 1 or 0)