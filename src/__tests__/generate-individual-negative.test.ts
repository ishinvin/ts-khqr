import { KHQR, QRPayload, TAG, CURRENCY } from '../index';
import { ERROR_CODE } from '../constants';

const testData: { statement: string; data: QRPayload; result: { error: { code: number; message: string } } }[] = [
    {
        statement: 'Bakong account ID length error',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'johnsmith00123456789012345678912345@devb',
            merchantName: 'Jonh Smith',
            merchantCity: 'PHNOM PENH',
            currency: CURRENCY.USD,
            amount: 1,
            additionalData: {
                billNumber: 'INV-2021-07-65822',
            },
        },
        result: {
            error: ERROR_CODE.BAKONG_ACCOUNT_ID_LENGTH_INVALID,
        },
    },
    {
        statement: 'Bakong Account ID invalid error',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmithnbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            currency: CURRENCY.KHR,
            amount: 50000,
            additionalData: {
                mobileNumber: '85512345678',
            },
        },
        result: {
            error: ERROR_CODE.BAKONG_ACCOUNT_ID_INVALID,
        },
    },
    {
        statement: 'Bakong Account ID not found or null',
        data: {
            tag: TAG.INDIVIDUAL,
            //@ts-ignore
            accountID: null,
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            amount: 50000,
            additionalData: {
                storeLabel: 'BKK-1',
            },
        },
        result: {
            error: ERROR_CODE.BAKONG_ACCOUNT_ID_REQUIRED,
        },
    },
    {
        statement: 'Merchant name length error',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: '012345678901234567890123456789',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.MERCHANT_NAME_LENGTH_INVALID,
        },
    },
    {
        statement: 'Transaction amount invalid error',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 123456789012345.6789,
            acquiringBank: 'Dev Bank',
            merchantID: '012345678',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Merchant City length invalid',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siam Reappppppppppppppppppppppppppp',
            currency: CURRENCY.KHR,
            amount: 50000,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.MERCHANT_CITY_LENGTH_INVALID,
        },
    },
    {
        statement: 'Billnumber invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '012345678901234567890123456789',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.BILL_NUMBER_LENGTH_INVALID,
        },
    },
    {
        statement: 'Mobile number invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678901234567890123456789',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.MOBILE_NUMBER_LENGTH_INVALID,
        },
    },
    {
        statement: 'Storelabel invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: '012345678901234567890123456789',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.STORE_LABEL_LENGTH_INVALID,
        },
    },
    {
        statement: 'Terminal invalid length',
        data: {
            tag: TAG.INDIVIDUAL,

            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345678901234567890123456789',
            },
        },
        result: {
            error: ERROR_CODE.TERMINAL_LABEL_LENGTH_INVALID,
        },
    },
    {
        statement: 'Acquiring bank length invalid',
        data: {
            tag: TAG.INDIVIDUAL,

            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            acquiringBank: 'Advanced Bank of Asia Limited Cambodia',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.ACQUIRING_BANK_LENGTH_INVALID,
        },
    },
    {
        statement: 'Account Information invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            merchantID: '012345678901234567890123456789897',
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.ACCOUNT_INFORMATION_LENGTH_INVALID,
        },
    },
    {
        statement: 'Amount 1 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.USD,
            amount: 1.234,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 2 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.USD,
            amount: -1000,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 3 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.USD,
            amount: 100.00111,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 4 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.USD,
            amount: 100.0000000000111,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 5 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.USD,
            amount: 1234567890123.01,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 6 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.USD,
            amount: 999999999999.9999,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 6 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.USD,
            amount: 12345678901234.0,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 7 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 1.12345678901234567,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 8 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: -1000,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 9 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 100.00111,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 10 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 100.0000000000111,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 11 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 999999999999.9999,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 12 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 1.12345678901234567,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 13 invalid length',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 1.1,
            acquiringBank: 'Dev Bank',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const res = KHQR.generate(data.data);
        expect(res.status.errorCode).toBe(data.result.error.code);
    });
});
