type KHQRDataType = {
    qr: string;
    md5: string;
};

type KHQRErrorType = {
    code: number;
    message: string;
};

export type KHQRResponseType = {
    status: {
        code: number;
        message: string | null;
        errorCode: number | null;
    };
    data: KHQRDataType | null;
};

/**
 * A function for returning the KHQR response
 * when error pass KHQRResponse(null, error)
 * when success pass KHQRResponse(data)
 * @param data
 * @param error
 * @returns
 */
export const KHQRResponse = (data: KHQRDataType | null, error?: KHQRErrorType): KHQRResponseType => ({
    status: {
        code: error ? 1 : 0,
        errorCode: error ? error.code : null,
        message: error ? error.message : null,
    },
    data,
});
