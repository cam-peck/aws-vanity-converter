'use strict';
import { generateVanityWords } from '../../convert-number/generate-vanity-words.mjs';
import { chooseBestVanity } from '../../convert-number/choose-best-vanity.mjs';
import { convertNumberHandler } from '../../convert-number/app.mjs';
import { expect } from 'chai';
import validEvent from '../../events/valid-event.json' assert { type: 'json' };
import invalidEvent from '../../events/invalid-event.json' assert { type: 'json' };

const context = {};

describe('Vanity Number Tests', function () {
    it('responds with three arrays', async () => {
        const witness = '+13179486377';
        const witnessResult = generateVanityWords(witness);

        expect(witnessResult).to.be.an('object');
        expect(witnessResult.realFourWords).to.be.an('array');
        expect(witnessResult.realSevenWords).to.be.an('array');
        expect(witnessResult.jargonFourWords).to.be.an('array');
    });

    it('always responds with 5 words in the jargon-array', async () => {
        const display = '+13173477529';
        const improve = '+13174677683';
        const jargon = '+13174462234';

        const displayResult = generateVanityWords(display);
        const improveResult = generateVanityWords(improve);
        const jargonResult = generateVanityWords(jargon);

        expect(displayResult.jargonFourWords).to.have.length(5);
        expect(improveResult.jargonFourWords).to.have.length(5);
        expect(jargonResult.jargonFourWords).to.have.length(5);
    });

    it('responds with 7-letter words when they exist in the dictionary', async () => {
        const display = '+13173477529';
        const improve = '+13174677683';

        const displayResult = generateVanityWords(display);
        const improveResult = generateVanityWords(improve);

        expect(displayResult.realSevenWords).to.include('display');
        expect(improveResult.realSevenWords).to.include('improve');
    });

    it('responds with 4-letter words when it exists in the dictionary', async () => {
        const best = '+13173472378';
        const good = '+13174674663';

        const bestResult = generateVanityWords(best);
        const goodResult = generateVanityWords(good);

        expect(bestResult.realFourWords).to.include('best');
        expect(goodResult.realFourWords).to.include('good');
    });
});

describe('Choose Best Vanity Tests', function () {
    it('returns 5 vanity numbers with 4-letter jargon words if no valid words are found', async () => {
        const jargon = {
            realFourWords: [],
            realSevenWords: [],
            jargonFourWords: [ 'aadg', 'aadh', 'aadi', 'aaeg', 'aaeh' ]
        };
        const jargonPhoneNumber = '+13174462234';
    
        const jargonResult = chooseBestVanity(jargon, jargonPhoneNumber);

        expect(jargonResult).to.have.length(5);
        expect(jargonResult[0]).to.equal('317-446-AADG');
        expect(jargonResult[1]).to.equal('317-446-AADH');
        expect(jargonResult[2]).to.equal('317-446-AADI');
        expect(jargonResult[3]).to.equal('317-446-AAEG');
        expect(jargonResult[4]).to.equal('317-446-AAEH');
 
    });

    it('returns valid 4-letter words if they are found', async () => {
        const glow = {
            realFourWords: [ 'glow' ],
            realSevenWords: [],
            jargonFourWords: [ 'gjmw', 'gjmx', 'gjmy', 'gjmz', 'gjnw' ]
        };

        const glowPhoneNumber = '+13179934569';
        
        const gone = {
            realFourWords: [
                'gone', 'good',
                'goof', 'home',
                'hone', 'hood',
                'hoof'
            ],
            realSevenWords: [],
            jargonFourWords: [ 'gmmd', 'gmme', 'gmmf', 'gmnd', 'gmne' ]
        };
        const goodPhoneNumber = '+13174674663';

        const glowResult = chooseBestVanity(glow, glowPhoneNumber);
        const goneResult = chooseBestVanity(gone, goodPhoneNumber);
    
        expect(glowResult).to.have.length(5);
        expect(glowResult[0]).to.equal('317-993-GLOW');
        expect(glowResult[1]).to.equal('317-993-GJMW');
        expect(glowResult[2]).to.equal('317-993-GJMX');
        expect(glowResult[3]).to.equal('317-993-GJMY');
        expect(glowResult[4]).to.equal('317-993-GJMZ');

        expect(goneResult).to.have.length(5);
        expect(goneResult[0]).to.equal('317-467-GONE');
        expect(goneResult[1]).to.equal('317-467-GOOD');
        expect(goneResult[2]).to.equal('317-467-GOOF');
        expect(goneResult[3]).to.equal('317-467-HOME');
        expect(goneResult[4]).to.equal('317-467-HONE');
    });

    it('returns valid 7-letter words if they are found', async () => {
        const payment = {
            realFourWords: [ 'menu' ],
            realSevenWords: [ 'payment' ],
            jargonFourWords: [ 'mdmt', 'mdmu', 'mdmv', 'mdnt', 'mdnu' ]
        };
        const paymentPhoneNumber = '+13177296368';

        const paymentResult = chooseBestVanity(payment, paymentPhoneNumber);

        expect(paymentResult).to.have.length(5);
        expect(paymentResult[0]).to.equal('317-PAYMENT');
        expect(paymentResult[1]).to.equal('317-729-MENU');
        expect(paymentResult[2]).to.equal('317-729-MDMT');
        expect(paymentResult[3]).to.equal('317-729-MDMU');
        expect(paymentResult[4]).to.equal('317-729-MDMV');
    });
});

describe('Convert Number Handler Tests', function () {
    it('returns an object with "result: true" when numbers are successfully generated', async () => {
        const validEventResult = await convertNumberHandler(validEvent, context);
        const { result } = validEventResult;
        expect(result).to.equal(true);
    });

    it('returns an object with "result: false" when a number cannot be generated', async () => {
        const invalidEventResult = await convertNumberHandler(invalidEvent, context);
        const { result } = invalidEventResult;
        expect(result).to.equal(false);
    });

    it('returns three vanity numbers for valid phone numbers', async () => {
        const validEventResult = await convertNumberHandler(validEvent, context);
        const { vanityNumber1, vanityNumber2, vanityNumber3 } = validEventResult;
        expect(vanityNumber1).to.equal('317-487-SHIV');
        expect(vanityNumber2).to.equal('317-487-PGGT');
        expect(vanityNumber3).to.equal('317-487-PGGU');
    });
});
