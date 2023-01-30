'use strict';
import { generateVanityWords } from '../../generate-vanity-words.mjs';
import { chooseBestVanity } from '../../choose-best-vanity.mjs';
import { lambdaHandler } from '../../app.mjs';
import { ddbClient } from "../../lib/ddb/ddb-client.mjs";
import { ddbAddVanityNumbers } from '../../lib/ddb/ddb-add-vanity-numbers.mjs'
import { ddbLookupPhoneNumber } from "../../lib/ddb/ddb-lookup-phone-number.mjs";
import { mockClient } from 'aws-sdk-client-mock';
import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { expect } from 'chai';
import validEvent from '../../../events/valid-event.json' assert { type: 'json' };
import invalidEvent from '../../../events/invalid-event.json' assert { type: 'json' };

const context = {};

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

    it('always responds with 5 words in the jargon-array', async () => {
        const display = "+13173477529";
        const improve = "+13174677683";
        const jargon = "+13174462234";

        const displayResult = generateVanityWords(display)
        const improveResult = generateVanityWords(improve)
        const jargonResult = generateVanityWords(jargon)

        expect(displayResult.jargonFourWords).to.have.length(5);
        expect(displayResult.jargonSevenWords).to.have.length(5);
        expect(improveResult.jargonFourWords).to.have.length(5);
        expect(improveResult.jargonSevenWords).to.have.length(5);
        expect(jargonResult.jargonFourWords).to.have.length(5);
        expect(jargonResult.jargonSevenWords).to.have.length(5);
    });

    it('responds with 7-letter words when they exist in the dictionary', async () => {
        const display = "+13173477529";
        const improve = "+13174677683";

        const displayResult = generateVanityWords(display)
        const improveResult = generateVanityWords(improve)

        expect(displayResult.realSevenWords).to.include('display');
        expect(improveResult.realSevenWords).to.include('improve');
    });

    it('responds with 4-letter words when it exists in the dictionary', async () => {
        const best = "+13173472378";
        const good = "+13174674663";

        const bestResult = generateVanityWords(best)
        const goodResult = generateVanityWords(good)

        expect(bestResult.realFourWords).to.include('best');
        expect(goodResult.realFourWords).to.include('good');
    });
});

describe('Choose Best Vanity Tests', function () {
    it('returns 5 vanity numbers with 4-letter jargon words if no valid words are found', async () => {
        const jargon = {
            realFourWords: [],
            realSevenWords: [],
            jargonFourWords: [ 'aadg', 'aadh', 'aadi', 'aaeg', 'aaeh' ],
            jargonSevenWords: [ 'ggmaadg', 'ggmaadh', 'ggmaadi', 'ggmaaeg', 'ggmaaeh' ]
        }
        const jargonPhoneNumber = "+13174462234"
    
        const jargonResult = chooseBestVanity(jargon, jargonPhoneNumber)

        expect(jargonResult).to.have.length(5);
        expect(jargonResult[0].slice(6, 10)).to.have.length(4); // check the word
        expect(jargonResult[0].slice(0, 6)).to.equal(jargonPhoneNumber.slice(2, 8)) // check the number
 
    });

    it('returns valid 4-letter words if they are found', async () => {
        const glow = {
            realFourWords: [ 'glow' ],
            realSevenWords: [],
            jargonFourWords: [ 'gjmw', 'gjmx', 'gjmy', 'gjmz', 'gjnw' ],
            jargonSevenWords: [ 'wwdgjmw', 'wwdgjmx', 'wwdgjmy', 'wwdgjmz', 'wwdgjnw' ]
        };

        const glowPhoneNumber = "+13179934569";
        
        const gone = {
            realFourWords: [
              'gone', 'good',
              'goof', 'home',
              'hone', 'hood',
              'hoof'
            ],
            realSevenWords: [],
            jargonFourWords: [ 'gmmd', 'gmme', 'gmmf', 'gmnd', 'gmne' ],
            jargonSevenWords: [ 'gmpgmmd', 'gmpgmme', 'gmpgmmf', 'gmpgmnd', 'gmpgmne' ]
        }
        const goodPhoneNumber = "+13174674663";

        const glowResult = chooseBestVanity(glow, glowPhoneNumber)
        const goneResult = chooseBestVanity(gone, goodPhoneNumber);
    
        expect(glowResult).to.have.length(5);
        expect(glowResult[0].slice(6, 10)).to.equal('glow'); // check the word
        expect(glowResult[0].slice(0, 6)).to.equal(glowPhoneNumber.slice(2, 8)) // check the number

        expect(goneResult).to.have.length(5);
        expect(goneResult[0].slice(6, 10)).to.equal('gone'); // check the word
        expect(goneResult[0].slice(0, 6)).to.equal(goodPhoneNumber.slice(2, 8)) // check the number
    });

    it('returns valid 7-letter words if they are found', async () => {
        const payment = {
            realFourWords: [ 'menu' ],
            realSevenWords: [ 'payment' ],
            jargonFourWords: [ 'mdmt', 'mdmu', 'mdmv', 'mdnt', 'mdnu' ],
            jargonSevenWords: [ 'pawmdmt', 'pawmdmu', 'pawmdmv', 'pawmdnt', 'pawmdnu' ]
          }
        const paymentPhoneNumber = "+13177296368";
          
        const improve = {
            realFourWords: [ 'rove' ],
            realSevenWords: [ 'improve' ],
            jargonFourWords: [ 'pmtd', 'pmte', 'pmtf', 'pmud', 'pmue' ],
            jargonSevenWords: [ 'gmppmtd', 'gmppmte', 'gmppmtf', 'gmppmud', 'gmppmue' ]
        }
        const improvePhoneNumber = "+13174677683"

        const paymentResult = chooseBestVanity(payment, paymentPhoneNumber)
        const improveResult = chooseBestVanity(improve, improvePhoneNumber)

        expect(paymentResult).to.have.length(5);
        expect(paymentResult[0].slice(3, 10)).to.equal('payment'); // check the 7-letter word
        expect(paymentResult[0].slice(0, 3)).to.equal(paymentPhoneNumber.slice(2, 5)) // check the 7-letter vanity number
        expect(paymentResult[1].slice(6, 10)).to.equal('menu'); // check the 5-letter word
        expect(paymentResult[1].slice(0, 6)).to.equal(paymentPhoneNumber.slice(2, 8)) // check the 5-letter vanity number

        expect(improveResult).to.have.length(5);
        expect(improveResult[0].slice(3, 10)).to.equal('improve'); // check the 7-letter word
        expect(improveResult[0].slice(0, 3)).to.equal(improvePhoneNumber.slice(2, 5)) // check the 7-letter vanity number
        expect(improveResult[1].slice(6, 10)).to.equal('rove'); // check the 4-letter word
        expect(improveResult[1].slice(0, 6)).to.equal(improvePhoneNumber.slice(2, 8)) // check the 4-letter vanity number
    });
});

describe('Lambda Handler Tests', function () {
    it('returns an object with "result: true" when numbers are successfully generated', async () => {
        const validEventResult = await lambdaHandler(validEvent, context);
        const { result } = validEventResult;
        expect(result).to.equal(true);
    });

    it('returns an object with "result: false" when a number cannot be generated', async () => {
        const invalidEventResult = await lambdaHandler(invalidEvent, context);
        const { result } = invalidEventResult;
        expect(result).to.equal(false);
    });

    it('returns three vanity numbers for valid phone numbers', async () => {
        const validEventResult = await lambdaHandler(validEvent, context);
        const { vanityNumber1, vanityNumber2, vanityNumber3 } = validEventResult;
        expect(vanityNumber1).to.have.length(10);
        expect(vanityNumber2).to.have.length(10);
        expect(vanityNumber3).to.have.length(10);
    });
});

describe('DyanmoDB tests', function () {
    const dynamoDBMock = mockClient(ddbClient);
    describe('DyanmoDB PUT / POST Tests', function () {
        it('adds valid numbers to the database', async () => {
            dynamoDBMock
                .on(GetItemCommand, {
                    TableName: 'VanityNumbers',
                    Key: {
                        phoneNumber: { S: "+13172698463" }
                    }
                })
                .resolves({
                    phoneNumber: { S: '+13172698463' },
                    vanityNumber3: { S: '317269tine' },
                    vanityNumber1: { S: '317anytime' },
                    vanityNumber2: { S: '317269time' }
                });
            
            const result = await ddbLookupPhoneNumber("+13172698463");
        });
    
    });

    describe('DyanmoDB GET Tests', function () {
        it('adds valid numbers to the database', async () => {
        
        });
    
    });
    
});
