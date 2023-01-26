const sevenLetterWordDictionary = await import('./sevenLetterWordDictionary.mjs');
const fourLetterWordDictionary = await import('./fourLetterWordDictionary.mjs');

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


export const lambdaHandler = async (event, context, callback) => {
    console.log('event: ', event);
    console.log('context: ', context);
    const phoneNumber = event['Details']['ContactData']['CustomerEndpoint']['Address'];
    const vanityNumbers = getVanityNumbers(phoneNumber);
    let resultMap = {
        phoneNumber: phoneNumber,
        vanityNumbers: vanityNumbers
    };

    callback(null, resultMap);
};

  
function getVanityNumbers (phoneNumber) {
    if (phoneNumber.length !== 12) {
      return 'not a valid US number'
    }
    
    const sevenDigitNumber = phoneNumber.slice(5); // last 7 digits
    let vanity;
    if (sevenDigitNumber.includes(0) || sevenDigitNumber.includes(1)) {
      // use the 3 / 4 algo //
      vanity = getThreeFourDigitVanity(sevenDigitNumber)
    } else vanity = getSevenDigitVanity(sevenDigitNumber)
    return vanity;
}
  
function getSevenDigitVanity (phoneNumber) { // gets a vanity code for a seven-digit number
    const possibleFirst = keypadObj[phoneNumber[0]]
    const possibleSecond = keypadObj[phoneNumber[1]]
    const possibleThird= keypadObj[phoneNumber[2]]
    const possibleFourth = keypadObj[phoneNumber[3]]
    const possibleFifth = keypadObj[phoneNumber[4]]
    const possibleSixth = keypadObj[phoneNumber[5]]
    const possibleSeventh = keypadObj[phoneNumber[6]]
    
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
                            const sevenWord = possibleFirst[i] + possibleSecond[j] + possibleThird[k] + possibleFourth[l] +possibleFifth[m] + possibleSixth[n] + possibleSeventh[o];
                            if (sevenLetterWordDictionary.default.includes(sevenWord) && !realSevenWords.includes(sevenWord)) {
                                realSevenWords.push(sevenWord);
                            } else if (jargonSevenWords.length < 5) {
                                jargonSevenWords.push(sevenWord)
                            }
                            const fourWord = possibleFourth[l] +possibleFifth[m] + possibleSixth[n] + possibleSeventh[o];
                            if (fourLetterWordDictionary.default.includes(fourWord.toUpperCase()) && !realFourWords.includes(fourWord)) {
                                realFourWords.push(fourWord);
                            } else if (jargonFourWords.length < 5) {
                                jargonFourWords.push(fourWord)
                            }
                            }
                        }
                    }
                }
            }
        }
    }
    return { realFourWords, realSevenWords, jargonFourWords, jargonSevenWords };
}
  
function getThreeFourDigitVanity (phoneNumber) { // gets a vanity code for three & four digit numbers
    return '487-7448'
}

  
const number1 = "+13174638378"; // witness
const result = getVanityNumbers(number1);
console.log(result)