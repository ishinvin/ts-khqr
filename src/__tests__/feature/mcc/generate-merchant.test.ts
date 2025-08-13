import { KHQR } from '../../../index';
import { ERROR_CODE, TAG } from '../../../constants';

const accountInfo = {
    tag: TAG.MERCHANT,
    accountID: 'jonhsmith@nbcq',
    merchantName: 'Jonh Smith',
    merchantCity: 'Phnom Penh',
    merchantID: '123456',
    acquiringBank: 'Dev Bank',
};

const positiveCases = [
    {
        statement: 'Feature MCC: Success Generate Merchant KHQR Test 1',
        data: {
            ...accountInfo,
            merchantCategoryCode: '0000',
        },
        result: '00020101021130400014jonhsmith@nbcq01061234560208Dev Bank5204000053031165802KH5910Jonh Smith6010Phnom Penh',
    },
    {
        statement: 'Feature MCC: Success Generate Merchant KHQR Test 2',
        data: {
            ...accountInfo,
            merchantCategoryCode: '1234',
        },
        result: '00020101021130400014jonhsmith@nbcq01061234560208Dev Bank5204123453031165802KH5910Jonh Smith6010Phnom Penh',
    },
];

positiveCases.forEach((data) => {
    test(data.statement, () => {
        const res = KHQR.generate(data.data);
        const sliceIndex = -8;
        expect(res.data?.qr.slice(0, sliceIndex)).toBe(data.result);
    });
});

const negativeCases = [
    {
        statement: 'Feature MCC: Failed Generate Merchant KHQR Test 1',
        data: {
            ...accountInfo,
            merchantCategoryCode: '1A2B',
        },
        result: {
            error: ERROR_CODE.INVALID_MERCHANT_CATEGORY_CODE,
        },
    },
    {
        statement: 'Feature MCC: Failed Generate Merchant KHQR Test 2',
        data: {
            ...accountInfo,
            merchantCategoryCode: '-100',
        },
        result: {
            error: ERROR_CODE.INVALID_MERCHANT_CATEGORY_CODE,
        },
    },
];

negativeCases.forEach((data) => {
    test(data.statement, () => {
        const res = KHQR.generate(data.data);
        expect(res.status.errorCode).toBe(data.result.error.code);
    });
});
