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
    // 1: Work on DynamoDB integration
    // 2: Lots more unit tests for convert-number functions