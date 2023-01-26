import { sevenLetterWordDictionary } from './seven-letter-word-dictionary.mjs';
import { fourLetterWordDictionary } from './four-letter-word-dictionary.mjs';

function checkDictionary (word, wordLength) { // gets a vanity code for three & four digit numbers
    switch (wordLength) {
        case 4:
            if (fourLetterWordDictionary.includes(word.toUpperCase())) {
                return true;
            } return false;
        case 7:
            if (sevenLetterWordDictionary.includes(word.toLowerCase())) {
                return true;
            } return false;
        default:
            return false; // invalid word length
    }
}

export { checkDictionary };