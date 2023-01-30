import { sevenLetterWordDictionary } from './seven-letter-word-dictionary.mjs';
import { fourLetterWordDictionary } from './four-letter-word-dictionary.mjs';

function checkDictionary (word, wordLength) {
    // checks dictionary for valid 4 or 7 letter words //
    switch (wordLength) {
    case 4:
        if (fourLetterWordDictionary[word.toUpperCase()]) {
            return true;
        } return false;
    case 7:
        if (sevenLetterWordDictionary[word.toLowerCase()]) {
            return true;
        } return false;
    default:
        return false;
    }
}

export { checkDictionary };