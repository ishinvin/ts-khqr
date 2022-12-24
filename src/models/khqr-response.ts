type KHQRErrorType = {
    code: number;
    message: string;
};

export type KHQRDataType = {
    qr: string;
    md5: string;
};

export type KHQRDecodeType = {
    bakongAccountID: string | null;
    accountInformation: string | null;
    merchantID: string | null;
    acquiringBank: string | null;
    billNumber: string | null;
    mobileNumber: string | null;
    storeLabel: string | null;
    terminalLabel: string | null;
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

export type KHQRResponseType<T> = {
    status: {
        code: number;
        message: string | null;
        errorCode: number | null;
    };
    data: T;
};

export const KHQRResponse = <T>(data: T, error?: KHQRErrorType): KHQRResponseType<T> => ({
    status: {
        code: error ? 1 : 0,
        errorCode: error ? error.code : null,
        message: error ? error.message : null,
    },
    data,
});
