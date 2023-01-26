import { generateVanityNumbers } from "./generate-vanity-numbers.mjs";

function confirmPhoneNumber (phoneNumber) {
    if (phoneNumber.length !== 12) {
      return 'not a valid US number';
    }
    
    const sevenDigitNumber = phoneNumber.slice(5); // last 7 digits
    const fourDigitNumber = phoneNumber.slice(8); // last 4 digits
    let canBeSeven = true;
    let canBeFour = true;
    if (fourDigitNumber.includes(0) || fourDigitNumber.includes(1)) {
        canBeFour = false;
        canBeSeven = false;
    } else if (sevenDigitNumber.includes(0) || sevenDigitNumber.includes(1)) canBeSeven = false;
    if (canBeSeven && canBeFour) return generateVanityNumbers(sevenDigitNumber, { check: { 4: true, 7: true } });
    if (!canBeSeven && canBeFour) return generateVanityNumbers(sevenDigitNumber, { check: { 4: true, 7: false } });
    if (!canBeSeven && !canBeFour) return generateVanityNumbers(sevenDigitNumber, { check: { 4: false, 7: false } });
}

export { confirmPhoneNumber };