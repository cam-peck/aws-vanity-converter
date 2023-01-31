function formatPhoneNumber (phoneNumber) { 
    // checks for US number code and uncreatable vanity numbers (0 or 1 in number) //
    if (phoneNumber.length !== 12 || phoneNumber.slice(0, 2) !== '+1') { // phone number is not a US number
        throw new Error('A vanity code could not be created for your phone number. Ensure your number does not contain a 1 or 0 in the last four digits and that you are using a valid US number.');
    }
    const sevenDigitNumber = phoneNumber.slice(5); // last 7 digits
    const fourDigitNumber = phoneNumber.slice(8); // last 4 digits
    let canBeSeven = true;
    let canBeFour = true;
    if (fourDigitNumber.includes(0) || fourDigitNumber.includes(1)) {
        canBeFour = false;
        canBeSeven = false;
    } else if (sevenDigitNumber.includes(0) || sevenDigitNumber.includes(1)) canBeSeven = false;
    if (canBeSeven && canBeFour) return { sevenDigitNumber, check: { 4: true, 7: true }};
    if (!canBeSeven && canBeFour) return { sevenDigitNumber, check: { 4: true, 7: false }};
    if (!canBeSeven && !canBeFour) throw new Error('A vanity code could not be created for your phone number. Ensure your number does not contain a 1 or 0 in the last four digits and that you are using a valid US number.');
}

export { formatPhoneNumber };