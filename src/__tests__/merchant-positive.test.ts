import { CURRENCY, KHQR, QRPayload, TAG } from '../index';

const expirationTimestamp = Date.now() + 1 * 60 * 1000;

const testData: { statement: string; data: QRPayload; result: string }[] = [
    {
        statement: 'Success Generate 1',
        data: {
            tag: TAG.MERCHANT,
            accountID: 'jonhsmith@devb',
            merchantName: 'Jonh Smith',
            merchantCity: 'Siem Reap',
            merchantID: '123456',
            acquiringBank: 'Dev Bank',
            currency: CURRENCY.KHR,
            amount: 50000,
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
            },
            expirationTimestamp,
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 2',
        data: {
            tag: TAG.MERCHANT,
            accountID: 'jonhsmith@devb',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            merchantID: '123456',
            acquiringBank: 'Dev Bank',
            currency: CURRENCY.USD,
            amount: 10,
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
            },
            expirationTimestamp,
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh62450117INV-2021-07-658220211855123456780305BKK-1',
    },
    {
        statement: 'Success Generate 3',
        data: {
            tag: TAG.MERCHANT,
            accountID: 'jonhsmith@devb',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            merchantID: '123456',
            acquiringBank: 'Dev Bank',
            currency: CURRENCY.USD,
            amount: 10,
            additionalData: {
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
            },
            expirationTimestamp,
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh62360117INV-2021-07-65822021185512345678',
    },
    {
        statement: 'Success Generate 4',
        data: {
            tag: TAG.MERCHANT,
            accountID: 'jonhsmith@devb',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            merchantID: '123456',
            acquiringBank: 'Dev Bank',
            currency: CURRENCY.USD,
            amount: 10,
            additionalData: {
                mobileNumber: '85512345678',
            },
            expirationTimestamp,
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh6215021185512345678',
    },
    {
        statement: 'Success Generate 5',
        data: {
            tag: TAG.MERCHANT,
            accountID: 'jonhsmith@devb',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            merchantID: '123456',
            acquiringBank: 'Dev Bank',
            currency: CURRENCY.USD,
            amount: 10,
            expirationTimestamp,
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh',
    },
    {
        statement: 'Success Generate 6',
        data: {
            tag: TAG.MERCHANT,
            accountID: 'jonhsmith@devb',
            merchantName: 'Jonh Smith',
            merchantCity: 'Phnom Penh',
            merchantID: '123456',
            acquiringBank: 'Dev Bank',
            currency: CURRENCY.USD,
        },
        result: '00020101021130400014jonhsmith@devb01061234560208Dev Bank5204599953038405802KH5910Jonh Smith6010Phnom Penh',
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const res = KHQR.generate(data.data);
        const sliceIndex = data.data?.amount ? -46 : -8;

        expect(res.data?.qr.slice(0, sliceIndex)).toBe(data.result);
    });
});
