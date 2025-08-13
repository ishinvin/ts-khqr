import { CURRENCY, ERROR_CODE, TAG } from '../../../constants';
import { KHQR } from '../../../index';

const accountInfo = {
    tag: TAG.INDIVIDUAL,
    accountID: 'johnsmith@devb',
    merchantName: 'Jonh Smith',
    merchantCity: 'PHNOM PENH',
};

const testData = [
    {
        statement: 'Expiration timestamp is required for dynamic KHQR',
        data: {
            ...accountInfo,
            currency: CURRENCY.USD,
            amount: 101.3,
        },
        result: {
            error: ERROR_CODE.EXPIRATION_TIMESTAMP_REQUIRED,
        },
    },
    {
        statement: 'Expiration timestamp is in the past',
        data: {
            ...accountInfo,
            currency: CURRENCY.USD,
            amount: 101.3,
            expirationTimestamp: 1727260807000,
        },
        result: {
            error: ERROR_CODE.EXPIRATION_TIMESTAMP_IN_THE_PAST,
        },
    },
    {
        statement: 'Expiration timestamp length is invalid',
        data: {
            ...accountInfo,
            currency: CURRENCY.USD,
            amount: 101.3,
            expirationTimestamp: 1727260807,
        },
        result: {
            error: ERROR_CODE.EXPIRATION_TIMESTAMP_LENGTH_INVALID,
        },
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const res = KHQR.generate(data.data);
        expect(res.status.errorCode).toBe(data.result.error.code);
    });
});
