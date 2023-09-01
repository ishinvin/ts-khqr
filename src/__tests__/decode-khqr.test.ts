import { KHQR, CURRENCY } from '../index';

const testData = [
    {
        statement: 'Decode 1',
        data: '00020101021229180014jonhsmith@nbcq520459995303840540115802KH5910Jonh Smith6010PHNOM PENH62210117INV-2021-07-65822',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'PHNOM PENH',
            transactionCurrency: CURRENCY.USD,
            transactionAmount: '1',
            billNumber: 'INV-2021-07-65822',
        },
    },
    {
        statement: 'Decode 2',
        data: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6010Phnom Penh6215021185512345678',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            transactionCurrency: CURRENCY.KHR,
            transactionAmount: '50000',
            mobileNumber: '85512345678',
        },
    },
    {
        statement: 'Decode 3',
        data: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6010Phnom Penh62090305BKK-1',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            transactionAmount: '50000',
            storeLabel: 'BKK-1',
        },
    },
    {
        statement: 'Decode 4',
        data: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            transactionCurrency: CURRENCY.KHR,
            transactionAmount: '50000',
            mobileNumber: '85512345678',
            billNumber: 'INV-2021-07-65822',
            storeLabel: 'BKK-1',
            terminalLabel: '012345',
        },
    },
    {
        statement: 'Decode 5',
        data: '00020101021229430014jonhsmith@nbcq01090123456780208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            transactionCurrency: CURRENCY.KHR,
            transactionAmount: '50000',
            acquiringBank: 'Dev Bank',
            accountInformation: '012345678',
            mobileNumber: '85512345678',
            billNumber: 'INV-2021-07-65822',
            storeLabel: 'BKK-1',
            terminalLabel: '012345',
        },
    },
    {
        statement: 'Decode 6',
        data: '00020101021229300014jonhsmith@nbcq0208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            transactionCurrency: CURRENCY.KHR,
            transactionAmount: '50000',
            mobileNumber: '85512345678',
            billNumber: 'INV-2021-07-65822',
            storeLabel: 'BKK-1',
            terminalLabel: '012345',
            acquiringBank: 'Dev Bank',
        },
    },
    {
        statement: 'Decode 7',
        data: '00020101021229300014jonhsmith@nbcq0208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            transactionCurrency: CURRENCY.KHR,
            transactionAmount: '50000',
            mobileNumber: '85512345678',
            billNumber: 'INV-2021-07-65822',
            storeLabel: 'BKK-1',
            terminalLabel: '012345',
            acquiringBank: 'Dev Bank',
        },
    },
    {
        statement: 'Decode 8',
        data: '00020101021229310014jonhsmith@nbcq01090123456785204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
        result: {
            bakongAccountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            transactionCurrency: CURRENCY.KHR,
            transactionAmount: '50000',
            mobileNumber: '85512345678',
            billNumber: 'INV-2021-07-65822',
            storeLabel: 'BKK-1',
            terminalLabel: '012345',
            accountInformation: '012345678',
        },
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const result = KHQR.parse(data.data);
        const received: { [key: string]: string } = {};
        Object.keys(data.result).forEach((i) => {
            if (result.data) {
                received[i] = (result.data as any)[i];
            }
        });
        expect(JSON.stringify(received)).toBe(JSON.stringify(data.result));
    });
});
