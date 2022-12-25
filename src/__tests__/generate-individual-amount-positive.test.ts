import { BakongKHQR, IndividualInfo, KHQRData } from './..';

const amountTestData = [
    {
        statement: 'Amount test 1',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 100.0,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '100',
    },
    {
        statement: 'Amount test 2',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 100.0,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '100',
    },
    {
        statement: 'Amount test 3',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 100.0,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '100',
    },
    {
        statement: 'Amount test 4',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 9999999999.0,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '9999999999',
    },
    {
        statement: 'Amount test 5',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 10000,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '10000',
    },
    {
        statement: 'Amount test 6',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 1.12,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '1.12',
    },
    {
        statement: 'Amount test 7',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 1000,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '1000',
    },
    {
        statement: 'Amount test 8',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 100.11,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '100.11',
    },
    {
        statement: 'Amount test 9',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 100.12,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '100.12',
    },
    {
        statement: 'Amount test 10',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 12345678901.0,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '12345678901',
    },
    {
        statement: 'Amount test 11',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 9999999999.99,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '9999999999.99',
    },
    {
        statement: 'Name in UTF-8',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'ចន ស្មីន',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 100.0,
                acquiringBank: 'Dev Bank',
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '100',
    },
];

amountTestData.forEach((data) => {
    test(data.statement, () => {
        const requiredData = data.data.require;
        const optionalData = data.data.optional;

        const individualData = new IndividualInfo(
            requiredData.bakongAccountID,
            requiredData.merchantName,
            requiredData.merchantCity,
            optionalData,
        );

        const khqr = new BakongKHQR();
        const result = khqr.generateIndividual(individualData);
        const decodeValue = BakongKHQR.decode(String(result.data?.qr));

        expect(decodeValue.data?.transactionAmount).toBe(data.result);
    });
});
