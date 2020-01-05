/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

describe('ErrorHelper', () => {
    beforeEach(() => {
        jest.mock('./debug');
        jest.mock('xd-dialog-helper');
    });

    describe('showErrorDialog()', () => {
        it('should display a dialog using xd-dialog-helper', () => {
            const ErrorHelper = require('./error');
            ErrorHelper.showErrorDialog('test', 'test');
            expect(require('xd-dialog-helper').showDialog).toHaveBeenCalled();
        });
    });

    describe('handleErrors(operation)', () => {
        it('should not throw even though the operation does', () => {
            const ErrorHelper = require('./error');
            const promise = ErrorHelper.handleErrors(() => {
                throw new Error();
            });

            expect(promise).resolves.toReturn();
        });

        it('should resolve with true when the operation succeeds', () => {
            const ErrorHelper = require('./error');
            const promise = ErrorHelper.handleErrors(async () => {
                return 'abc';
            });

            expect(promise).resolves.toReturnWith(true);
        });

        it('should resolve with false when the operation fails', () => {
            const ErrorHelper = require('./error');
            const promise = ErrorHelper.handleErrors(async () => {
                throw new Error();
            });

            expect(promise).resolves.toReturnWith(false);
        });
    });
});
