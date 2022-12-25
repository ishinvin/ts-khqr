import { BakongKHQR, KHQRData, MerchantInfo } from './..';

const testData = [
    {
        statement: 'Success Generate 1',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@devb',
                merchantName: 'Jonh Smith',
                merchantCity: 'Siem Reap',
                merchantId: '123456',
                acquiringBank: 'Dev Bank',
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
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953031165405500005802KH5910Jonh Smith6009Siem Reap62550117INV-2021-07-658220211855123456780305BKK-10706012345',
    },
    {
        statement: 'Success Generate 2',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@devb',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
                merchantId: '123456',
                acquiringBank: 'Dev Bank',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 10,
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
                storeLabel: 'BKK-1',
            },
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh62450117INV-2021-07-658220211855123456780305BKK-1',
    },
    {
        statement: 'Success Generate 3',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@devb',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
                merchantId: '123456',
                acquiringBank: 'Dev Bank',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 10,
                mobileNumber: '85512345678',
                billNumber: 'INV-2021-07-65822',
            },
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh62360117INV-2021-07-65822021185512345678',
    },
    {
        statement: 'Success Generate 4',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@devb',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
                merchantId: '123456',
                acquiringBank: 'Dev Bank',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 10,
                mobileNumber: '85512345678',
            },
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh6215021185512345678',
    },
    {
        statement: 'Success Generate 5',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@devb',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
                merchantId: '123456',
                acquiringBank: 'Dev Bank',
            },
            optional: {
                currency: KHQRData.currency.usd,
                amount: 10,
            },
        },
        result: '00020101021230400014jonhsmith@devb01061234560208Dev Bank5204599953038405402105802KH5910Jonh Smith6010Phnom Penh',
    },
    {
        statement: 'Success Generate 6',
        data: {
            require: {
                bakongAccountID: 'jonhsmith@devb',
                merchantName: 'Jonh Smith',
                merchantCity: 'Phnom Penh',
                merchantId: '123456',
                acquiringBank: 'Dev Bank',
            },
            optional: {
                currency: KHQRData.currency.usd,
            },
        },
        result: '00020101021130400014jonhsmith@devb01061234560208Dev Bank5204599953038405802KH5910Jonh Smith6010Phnom Penh',
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const requiredData = data.data.require;
        const optionalData = data.data.optional;

        const merchantData = new MerchantInfo(
            requiredData.bakongAccountID,
            requiredData.merchantName,
            requiredData.merchantCity,
            requiredData.merchantId,
            requiredData.acquiringBank,
            optionalData,
        );

        const khqr = new BakongKHQR();
        const result = khqr.generateMerchant(merchantData);

        expect(result.data?.qr.slice(0, -29)).toBe(data.result);
    });
});
