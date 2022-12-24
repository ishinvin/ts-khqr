import { EMV } from './evm';

export const KHQR_SUBTAG = Object.freeze({
    input: [
        {
            tag: '29',
            data: {
                bakongAccountID: null,
                accountInformation: null,
            },
        },
        {
            tag: '30',
            data: {
                bakongAccountID: null,
                merchantID: null,
                acquiringBank: null,
            },
        },
        {
            tag: '62',
            data: {
                billNumber: null,
                mobileNumber: null,
                storeLabel: null,
                terminalLabel: null,
            },
        },
        {
            tag: '99',
            data: {
                timestamp: null,
            },
        },
    ],
    compare: [
        {
            tag: '29',
            subTag: EMV.BAKONG_ACCOUNT_IDENTIFIER,
            name: 'bakongAccountID',
        },
        {
            tag: '29',
            subTag: EMV.MERCHANT_ACCOUNT_INFORMATION_MERCHANT_ID,
            name: 'accountInformation',
        },
        {
            tag: '29',
            subTag: EMV.MERCHANT_ACCOUNT_INFORMATION_ACQUIRING_BANK,
            name: 'acquiringBank',
        },
        {
            tag: '62',
            subTag: EMV.BILLNUMBER_TAG,
            name: 'billNumber',
        },
        {
            tag: '62',
            subTag: EMV.ADDITIONAL_DATA_FIELD_MOBILE_NUMBER,
            name: 'mobileNumber',
        },
        {
            tag: '62',
            subTag: EMV.STORELABEL_TAG,
            name: 'storeLabel',
        },
        {
            tag: '62',
            subTag: EMV.TERMINAL_TAG,
            name: 'terminalLabel',
        },
        {
            tag: '99',
            subTag: '00',
            name: 'timestamp',
        },
    ],
});
