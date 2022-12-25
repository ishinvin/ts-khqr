import { BakongKHQR, IndividualInfo, KHQRData } from './..';

const testData = [
    {
        statement: 'Success Generate 1',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'PHNOM PENH',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 1,
                billNumber: 'INV-2021-07-65822',
            },
        },
        result: '00020101021229180014jonhsmith@nbcq520459995303840540115802KH5910Jonh Smith6010PHNOM PENH62210117INV-2021-07-65822',
    },
    {
        statement: 'Success Generate 2',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                mobileNumber: '85512345678',
            },
        },
        result: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6010Phnom Penh6215021185512345678',
    },
    {
        statement: 'Success Generate 3',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
            },
            optional: {
                amount: 50000,
                storeLabel: 'BKK-1',
            },
        },
        result: '00020101021229180014jonhsmith@nbcq5204599953031165405500005802KH5910Jonh Smith6010Phnom Penh62090305BKK-1',
    },
    {
        statement: 'Success Generate 4',
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
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
            },
            optional: {
                currency: KHQRData.currency.khr,
                amount: 50000,
                acquiringBank: 'Dev Bank',
                accountInformation: '012345678',
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
            require: {
                bakongAccountID: 'jonhsmith@nbcq',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
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
        result: '00020101021229300014jonhsmith@nbcq0208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 7',
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
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                acquiringBank: 'Dev Bank',
            },
        },
        result: '00020101021229300014jonhsmith@nbcq0208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 8',
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
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
                terminalLabel: '012345',
                accountInformation: '012345678',
            },
        },
        result: '00020101021229310014jonhsmith@nbcq01090123456785204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
];

testData.forEach((data) => {
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

        expect(result.data?.qr.slice(0, -29)).toBe(data.result);
    });
});
