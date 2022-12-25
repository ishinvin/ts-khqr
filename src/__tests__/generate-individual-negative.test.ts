import { ERROR_CODE } from '../constants';
import { BakongKHQR, IndividualInfo, KHQRData } from './..';

const testData = [
    {
        statement: 'Bakong account ID length error',
        data: {
            require: {
                bakongAccountID: 'johnsmith00123456789012345678912345@devb',
                merchantName: 'Jonh Smith',
                merchantCity: 'PHNOM PENH',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 1,
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
            require: {
                bakongAccountID: 'jonhsmithnbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
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
            require: {
                bakongAccountID: null,
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
            },
            optional: {
                amount: 50000,
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
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: '012345678901234567890123456789',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
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
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 123456789012345.6789,
                acquiringBank: 'Dev Bank',
                accountInformation: '012345678',
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
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siam Reappppppppppppppppppppppppppp',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.MERCHANT_CITY_LENGTH_INVALID,
        },
    },
    {
        statement: 'Billnumber invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                mobileNumber: '85512345678',
                billNumber: '012345678901234567890123456789',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.BILL_NUMBER_LENGTH_INVALID,
        },
    },
    {
        statement: 'Mobile number invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                mobileNumber: '85512345678901234567890123456789',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.MOBILE_NUMBER_LENGTH_INVALID,
        },
    },
    {
        statement: 'Storelabel invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: '012345678901234567890123456789',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.STORE_LABEL_LENGTH_INVALID,
        },
    },
    {
        statement: 'Terminal invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345678901234567890123456789',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TERMINAL_LABEL_LENGTH_INVALID,
        },
    },
    {
        statement: 'Acquiring bank length invalid',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                mobileNumber: '85512345678',
                acquiringBank: 'Advanced Bank of Asia Limited Cambodia',
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
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                accountInformation: '012345678901234567890123456789897',
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.ACCOUNT_INFORMATION_LENGTH_INVALID,
        },
    },
    {
        statement: 'Amount 1 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 1.234,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 2 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: -1000,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 3 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 100.00111,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 4 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 100.0000000000111,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 5 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 1234567890123.01,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 6 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 999999999999.9999,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 6 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 12345678901234.0,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 7 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 1.12345678901234567,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 8 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: -1000,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 9 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 100.00111,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 10 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 100.0000000000111,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 11 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 999999999999.9999,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 12 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 1.12345678901234567,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
    {
        statement: 'Amount 13 invalid length',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 1.1,
                mobileNumber: '85512345678',
                billNumber: '1234',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: {
            error: ERROR_CODE.TRANSACTION_AMOUNT_INVALID,
        },
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const requiredData = data.data.require;
        const optionalData = data.data.optional;

        const individualData = new IndividualInfo(
            requiredData.bakongAccountID!,
            requiredData.merchantName,
            requiredData.merchantCity,
            optionalData,
        );

        const khqr = new BakongKHQR();

        const result = khqr.generateIndividual(individualData);

        expect(result.status.errorCode).toBe(data.result.error.code);
    });
});
