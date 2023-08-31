export type ParserType = {
    bakongAccountID: string | null;
    accountInformation: string | null;
    merchantID: string | null;
    acquiringBank: string | null;
    billNumber: string | null;
    mobileNumber: string | null;
    storeLabel: string | null;
    terminalLabel: string | null;
    purposeOfTransaction: string | null;
    languagePreference: string | null;
    merchantNameAlternateLanguage: string | null;
    merchantCityAlternateLanguage: string | null;
    unionPayMerchant: string | null;
    timestamp: string | null;
    merchantType: string | null;
    payloadFormatIndicator: string | null;
    pointofInitiationMethod: string | null;
    merchantCategoryCode: string | null;
    transactionCurrency: string | null;
    transactionAmount: string | null;
    countryCode: string | null;
    merchantName: string | null;
    merchantCity: string | null;
    crc: string | null;
};

export type ReturnType = {
    status: {
        code: number;
        message: string | null;
        errorCode: number | null;
    };
    data: string | null | ParserType;
};

export const response = (data: string | null | ParserType, error?: { code: number; message: string }): ReturnType => ({
    status: {
        code: error ? 1 : 0,
        errorCode: error ? error.code : null,
        message: error ? error.message : null,
    },
    data,
});
