import { checkDictionary } from './check-dictionary.mjs'

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

function generateVanityNumbers (phoneNumber, options) { // phoneNumber is 7 digits, options include valid number data as { check: { 4: t / f, 7: t / f } }
    const possibleFirst = keypadObj[phoneNumber[0]];
    const possibleSecond = keypadObj[phoneNumber[1]];
    const possibleThird= keypadObj[phoneNumber[2]];
    const possibleFourth = keypadObj[phoneNumber[3]];
    const possibleFifth = keypadObj[phoneNumber[4]];
    const possibleSixth = keypadObj[phoneNumber[5]];
    const possibleSeventh = keypadObj[phoneNumber[6]];
    
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
                            if (options.check[4]) {
                                if (checkDictionary(curFourLetterWord, 4) && !realFourWords.includes(curFourLetterWord)) {
                                    realFourWords.push(curFourLetterWord);
                                } else {
                                    if (jargonFourWords.length < 5) {
                                        jargonFourWords.push(curFourLetterWord);
                                    }
                                } 
                            }
                            if (options.check[7]) {
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

export { generateVanityNumbers }