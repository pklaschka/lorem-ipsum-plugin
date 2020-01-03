/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

describe('binary length search ("src/functions/binary-length-search.js"', () => {
    beforeEach(() => {
        jest.mock('../src/helpers/debug', () => ({
            log: jest.fn()
        }));
    });

    it('should find the correct value n=5 where it clips for n > 5', () => {
        const binaryLengthSearch = require('../src/functions/binary-length-search');
        const n = binaryLengthSearch(20, 1, n => n > 5);
        expect(n).toBe(5);
    });

    it('should find the correct value n=5 where it clips for n < 5', () => {
        const binaryLengthSearch = require('../src/functions/binary-length-search');
        const n = binaryLengthSearch(1, 20, n => n < 5);
        expect(n).toBe(5);
    });
});
