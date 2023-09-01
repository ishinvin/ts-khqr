import { CURRENCY, KHQR, QRPayload, TAG } from '../index';

const testData: { statement: string; data: QRPayload; result: string }[] = [
    {
        statement: 'Success Generate 1',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'PHNOM PENH',
            currency: CURRENCY.USD,
            amount: 1,
            additionalData: {
                billNumber: 'INV-2021-07-65822',
            },
        },
        result: '00020101021229180014jonhsmith@nbcq520459995303840540115802KH5910Jonh Smith6010PHNOM PENH62210117INV-2021-07-65822',
    },
    {
        statement: 'Success Generate 2',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            currency: CURRENCY.KHR,
            amount: 50000,
            additionalData: {
                mobileNumber: '85512345678',
            },
        },
        result: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6010Phnom Penh6215021185512345678',
    },
    {
        statement: 'Success Generate 3',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            amount: 50000,
            additionalData: {
                storeLabel: 'BKK-1',
            },
        },
        result: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6010Phnom Penh62090305BKK-1',
    },
    {
        statement: 'Success Generate 4',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
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
        result: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 5',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            acquiringBank: 'Dev Bank',
            merchantID: '012345678',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: '00020101021229430014jonhsmith@nbcq01090123456780208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 6',
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
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: '00020101021229300014jonhsmith@nbcq0208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 7',
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
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: '00020101021229300014jonhsmith@nbcq0208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 8',
        data: {
            tag: TAG.INDIVIDUAL,
            accountID: 'jonhsmith@nbcq',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            currency: CURRENCY.KHR,
            amount: 50000,
            merchantID: '012345678',
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
        },
        result: '00020101021229310014jonhsmith@nbcq01090123456785204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const res = KHQR.generate(data.data);
        expect(res.data?.slice(0, -29)).toBe(data.result);
    });
});
