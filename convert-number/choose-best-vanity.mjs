function chooseBestVanity(vanityWords, phoneNumber) {
    // returns the best 5 vanity numbers from the generated vanity words //
    const { realFourWords, realSevenWords, jargonFourWords } = vanityWords;
    const bestVanityNumbers = [];
    if (realSevenWords.length !== 0) { // add real seven letter words
        for (let i = 0; i < realSevenWords.length; i++) {
            if (bestVanityNumbers.length < 5) {
                const areaCode = phoneNumber.slice(2, 5);
                const sevenLetterVanityWord = realSevenWords[i].toUpperCase();
                bestVanityNumbers.push(`${areaCode}-${sevenLetterVanityWord}`);
            } else break;
        }
    }
    if (realFourWords.length !== 0) { // add real four letter words
        for (let i = 0; i < realFourWords.length; i++) {
            if (bestVanityNumbers.length < 5) {
                const areaCode = phoneNumber.slice(2, 5);
                const firstThreeDigits = phoneNumber.slice(5, 8);
                const fourLetterVanityWord = realFourWords[i].toUpperCase();
                bestVanityNumbers.push(`${areaCode}-${firstThreeDigits}-${fourLetterVanityWord}`);
            } else break;
        }
    }
    let i = 0;
    while (bestVanityNumbers.length < 5) { // fill in remaining slots with 4-letter jargon words
        const areaCode = phoneNumber.slice(2, 5);
        const firstThreeDigits = phoneNumber.slice(5, 8);
        const fourLetterJargonWord = jargonFourWords[i].toUpperCase();
        bestVanityNumbers.push(`${areaCode}-${firstThreeDigits}-${fourLetterJargonWord}`);
        i++;
    }
    return bestVanityNumbers;
}

export { chooseBestVanity };