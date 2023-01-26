'use strict';
import { generateVanityWords } from '../../generate-vanity-words.mjs';
import { lambdaHandler } from '../../app.mjs';
import { expect } from 'chai';
var event, context;

describe('Vanity Number Tests', function () {
    it('responds with four arrays', async () => {
        const number1 = "+13179486377"; // witness
        const result = generateVanityWords(number1)

        expect(result).to.be.an('object');
        expect(result.realFourWords).to.be.an('array');
        expect(result.realSevenWords).to.be.an('array');
        expect(result.jargonFourWords).to.be.an('array');
        expect(result.jargonSevenWords).to.be.an('array');
    });

    it('responds with a 5-length jargon array', async () => {
        const display = "+13173477529";
        const improve = "+13174677683";
        const payment = "+13177296368";
        const jargon1 = "+13174462234";
        const jargon2 = "+13179934569";

        const displayResult = generateVanityWords(display)
        const improveResult = generateVanityWords(improve)
        const paymentResult = generateVanityWords(payment)
        const jargon1Result = generateVanityWords(jargon1)
        const jargon2Result = generateVanityWords(jargon2)

        expect(displayResult.jargonFourWords).to.have.length(5);
        expect(displayResult.jargonSevenWords).to.have.length(5);
        expect(improveResult.jargonFourWords).to.have.length(5);
        expect(improveResult.jargonSevenWords).to.have.length(5);
        expect(paymentResult.jargonFourWords).to.have.length(5);
        expect(paymentResult.jargonSevenWords).to.have.length(5);
        expect(jargon1Result.jargonFourWords).to.have.length(5);
        expect(jargon1Result.jargonSevenWords).to.have.length(5);
        expect(jargon2Result.jargonFourWords).to.have.length(5);
        expect(jargon2Result.jargonSevenWords).to.have.length(5);
    });

    it('responds with a 7-letter word when it exists in the dictionary', async () => {
        const display = "+13173477529";
        const improve = "+13174677683";
        const payment = "+13177296368";
        const success = "+13177822377";

        const displayResult = generateVanityWords(display)
        const improveResult = generateVanityWords(improve)
        const paymentResult = generateVanityWords(payment)
        const successResult = generateVanityWords(success)

        expect(displayResult.realSevenWords).to.include('display');
        expect(improveResult.realSevenWords).to.include('improve');
        expect(paymentResult.realSevenWords).to.include('payment');
        expect(successResult.realSevenWords).to.include('success');
    });

    it('responds with a 4-letter word when it exists in the dictionary', async () => {
        const best = "+13173472378";
        const good = "+13174674663";
        const kick = "+13177295425";
        const nice = "+13177826423";
        const bestResult = generateVanityWords(best)
        const goodResult = generateVanityWords(good)
        const kickResult = generateVanityWords(kick)
        const niceResult = generateVanityWords(nice)

        expect(bestResult.realFourWords).to.include('best');
        expect(goodResult.realFourWords).to.include('good');
        expect(kickResult.realFourWords).to.include('kick');
        expect(niceResult.realFourWords).to.include('nice');
    });
});
