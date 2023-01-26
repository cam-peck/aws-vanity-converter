import { checkDictionary } from './lib/check-dictionary.mjs';
import { formatPhoneNumber } from './lib/format-phone-number.mjs';

const keypadObj = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
};

function generateVanityWords (phoneNumber) { 
    const { sevenDigitNumber, check, Error } = formatPhoneNumber(phoneNumber); // check: { 4: t / f, 7: t / f } } where 4 and 7 represent valid 4 & 7 digit numbers
    if (Error) {
        return Error;
    }
    const possibleFirst = keypadObj[sevenDigitNumber[0]];
    const possibleSecond = keypadObj[sevenDigitNumber[1]];
    const possibleThird= keypadObj[sevenDigitNumber[2]];
    const possibleFourth = keypadObj[sevenDigitNumber[3]];
    const possibleFifth = keypadObj[sevenDigitNumber[4]];
    const possibleSixth = keypadObj[sevenDigitNumber[5]];
    const possibleSeventh = keypadObj[sevenDigitNumber[6]];
    
    const jargonSevenWords = [];
    const realSevenWords = [];
    const jargonFourWords = [];
    const realFourWords = [];
    
    for (let i = 0; i < possibleFirst.length; i++) {
      for (let j = 0; j < possibleSecond.length; j++) {
          for (let k = 0; k < possibleThird.length; k++) {
              for (let l = 0; l < possibleFourth.length; l++) {
                  for (let m = 0; m < possibleFifth.length; m++) {
                      for (let n = 0; n < possibleSixth.length; n++) {
                          for (let o = 0; o < possibleSeventh.length; o++) {
                            const curSevenLetterWord = possibleFirst[i] + possibleSecond[j] + possibleThird[k] + possibleFourth[l] +possibleFifth[m] + possibleSixth[n] + possibleSeventh[o];
                            const curFourLetterWord = possibleFourth[l] +possibleFifth[m] + possibleSixth[n] + possibleSeventh[o];
                            if (check[4]) {
                                if (checkDictionary(curFourLetterWord, 4) && !realFourWords.includes(curFourLetterWord)) {
                                    realFourWords.push(curFourLetterWord);
                                } else {
                                    if (jargonFourWords.length < 5) {
                                        jargonFourWords.push(curFourLetterWord);
                                    }
                                } 
                            }
                            if (check[7]) {
                                if (checkDictionary(curSevenLetterWord, 7) && !realSevenWords.includes(curSevenLetterWord)) {
                                    realSevenWords.push(curSevenLetterWord);
                                } else {
                                    if (jargonSevenWords.length < 5) {
                                        jargonSevenWords.push(curSevenLetterWord);
                                    }
                                }
                            }}
                        }
                    }
                }
            }
        }
    }
    return { realFourWords, realSevenWords, jargonFourWords, jargonSevenWords };
}

export { generateVanityWords }