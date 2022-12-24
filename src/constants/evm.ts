export const EMV = Object.freeze({
    PAYLOAD_FORMAT_INDICATOR: '00',
    DEFAULT_PAYLOAD_FORMAT_INDICATOR: '01',
    POINT_OF_INITIATION_METHOD: '01',
    STATIC_QR: '11',
    DYNAMIC_QR: '12',
    MERCHANT_ACCOUNT_INFORMATION_INDIVIDUAL: '29',
    MERCHANT_ACCOUNT_INFORMATION_MERCHANT: '30',
    BAKONG_ACCOUNT_IDENTIFIER: '00',
    MERCHANT_ACCOUNT_INFORMATION_MERCHANT_ID: '01',
    INDIVIDUAL_ACCOUNT_INFORMATION: '01',
    MERCHANT_ACCOUNT_INFORMATION_ACQUIRING_BANK: '02',
    MERCHANT_CATEGORY_CODE: '52',
    DEFAULT_MERCHANT_CATEGORY_CODE: '5999',
    TRANSACTION_CURRENCY: '53',
    TRANSACTION_AMOUNT: '54',
    DEFAULT_TRANSACTION_AMOUNT: '0',
    COUNTRY_CODE: '58',
    DEFAULT_COUNTRY_CODE: 'KH',
    MERCHANT_NAME: '59',
    MERCHANT_CITY: '60',
    DEFAULT_MERCHANT_CITY: 'Phnom Penh',
    CRC: '63',
    CRC_LENGTH: '04',
    ADDITIONAL_DATA_TAG: '62',
    BILLNUMBER_TAG: '01',
    ADDITIONAL_DATA_FIELD_MOBILE_NUMBER: '02',
    STORELABEL_TAG: '03',
    TERMINAL_TAG: '07',
    TIMESTAMP_TAG: '99',
    INVALID_LENGTH: {
        KHQR: 12,
        MERCHANT_NAME: 25,
        BAKONG_ACCOUNT: 32,
        AMOUNT: 13,
        COUNTRY_CODE: 3,
        MERCHANT_CATEGORY_CODE: 4,
        MERCHANT_CITY: 15,
        TIMESTAMP: 13,
        TRANSACTION_AMOUNT: 14,
        TRANSACTION_CURRENCY: 3,
        BILL_NUMBER: 24,
        STORE_LABEL: 24,
        TERMINAL_LABEL: 24,
        MERCHANT_ID: 32,
        ACQUIRING_BANK: 32,
        MOBILE_NUMBER: 12,
        ACCOUNT_INFORMATION: 32,
    },
});
