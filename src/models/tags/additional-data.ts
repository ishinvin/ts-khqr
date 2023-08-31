import { EMV, ERROR_CODE } from '../../constants';
import { KHQRResponse } from '../khqr-response';
import { TagLengthString } from './base/tag-length-string';
import { StringUtils } from '../../utils';

export type AdditionalDataParamType = {
    billNumber?: string;
    mobileNumber?: string;
    storeLabel?: string;
    terminalLabel?: string;
    purposeOfTransaction?: string;
};

type AdditionalDataType = {
    billNumber?: BillNumber;
    mobileNumber?: MobileNumber;
    storeLabel?: StoreLabel;
    terminalLabel?: TerminalLabel;
    purposeOfTransaction?: PurposeOfTransaction;
};

export class AdditionalData extends TagLengthString {
    billNumber?: BillNumber;
    mobileNumber?: MobileNumber;
    storeLabel?: StoreLabel;
    terminalLabel?: TerminalLabel;
    purposeOfTransaction?: PurposeOfTransaction;
    data: AdditionalDataType;

    constructor(tag: string, additionalData: AdditionalDataParamType = {}) {
        let billNumber;
        let mobileNumber;
        let storeLabel;
        let terminalLabel;
        let purposeOfTransaction;

        // Create additional data tag by combine all three sub tags
        let additionalDataString = '';

        // note: check like this for compatible with bakong-khqr sdk
        if (additionalData.billNumber !== undefined && additionalData.billNumber !== null) {
            billNumber = new BillNumber(EMV.BILLNUMBER_TAG, additionalData.billNumber);
            additionalDataString += billNumber.toString();
        }
        if (additionalData.mobileNumber !== undefined && additionalData.mobileNumber !== null) {
            mobileNumber = new MobileNumber(EMV.ADDITIONAL_DATA_FIELD_MOBILE_NUMBER, additionalData.mobileNumber);
            additionalDataString += mobileNumber.toString();
        }
        if (additionalData.storeLabel !== undefined && additionalData.storeLabel !== null) {
            storeLabel = new StoreLabel(EMV.STORELABEL_TAG, additionalData.storeLabel);
            additionalDataString += storeLabel.toString();
        }
        if (additionalData.terminalLabel !== undefined && additionalData.terminalLabel !== null) {
            terminalLabel = new TerminalLabel(EMV.TERMINAL_TAG, additionalData.terminalLabel);
            additionalDataString += terminalLabel.toString();
        }
        if (additionalData.purposeOfTransaction !== undefined && additionalData.purposeOfTransaction !== null) {
            purposeOfTransaction = new PurposeOfTransaction(
                EMV.PURPOSE_OF_TRANSACTION,
                additionalData.purposeOfTransaction,
            );
            additionalDataString += purposeOfTransaction.toString();
        }

        super(tag, additionalDataString);

        // class inherit the billNumber, storeLabel, terminalLabel
        this.billNumber = billNumber;
        this.mobileNumber = mobileNumber;
        this.storeLabel = storeLabel;
        this.terminalLabel = terminalLabel;
        this.purposeOfTransaction = purposeOfTransaction;
        this.data = {
            billNumber,
            mobileNumber,
            storeLabel,
            terminalLabel,
            purposeOfTransaction,
        };
    }
}

class BillNumber extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.BILL_NUMBER) {
            throw KHQRResponse(null, ERROR_CODE.BILL_NUMBER_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class StoreLabel extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.STORE_LABEL) {
            throw KHQRResponse(null, ERROR_CODE.STORE_LABEL_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class TerminalLabel extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.TERMINAL_LABEL) {
            throw KHQRResponse(null, ERROR_CODE.TERMINAL_LABEL_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class MobileNumber extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.MOBILE_NUMBER) {
            throw KHQRResponse(null, ERROR_CODE.MOBILE_NUMBER_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class PurposeOfTransaction extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.PURPOSE_OF_TRANSACTION)
            throw KHQRResponse(null, ERROR_CODE.PURPOSE_OF_TRANSACTION_LENGTH_INVALID);
        super(tag, String(value));
    }
}
