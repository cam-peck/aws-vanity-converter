function chooseBestVanity(vanityWords, phoneNumber) {  // { realFourWords: [], realSevenWords: [], jargonFourWords: [], jargonSevenWords: [] }
    const { realFourWords, realSevenWords, jargonFourWords, jargonSevenWords } = vanityWords;
    const bestVanityNumbers = [];
    if (realSevenWords.length !== 0) {
        for (let i = 0; i < realSevenWords.length; i++) {
            if (bestVanityNumbers.length < 5) {
                const phonePortion = phoneNumber.slice(2, 5);
                const vanityPortion = realSevenWords[i];
                bestVanityNumbers.push(phonePortion + vanityPortion)
            } else break;
        }
    }
    if (realFourWords.length !== 0) {
        for (let i = 0; i < realFourWords.length; i++) {
            if (bestVanityNumbers.length < 5) {
                const phonePortion = phoneNumber.slice(2, 8);
                const vanityPortion = realFourWords[i];
                bestVanityNumbers.push(phonePortion + vanityPortion)
            } else break;
        }
    }
    let i = 0;
    while (bestVanityNumbers.length < 5) {
        const phonePortion = phoneNumber.slice(2, 8);
        const vanityPortion = jargonFourWords[i];
        bestVanityNumbers.push(phonePortion + vanityPortion)
        i++;
    }
    return bestVanityNumbers;
}

export { chooseBestVanity };