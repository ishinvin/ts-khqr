import { EMV, ERROR_CODE } from '../constants';
import { KHQRResponse, TagLengthString } from '../models';
import { StringUtils } from '../utils';

export type GlobalUniqueIdObjectType = {
    bakongAccountID: string;
    acquiringBank?: string;
    merchantID?: string;
    accountInformation?: string;
    isMerchant: boolean;
};

type GlobalUniqueIdDataType = {
    bakongAccountID: BakongAccountID;
    merchantID?: MerchantID;
    acquiringBank?: AcquiringBank;
    accountInformation?: string;
};

export class GlobalUniqueIdentifier extends TagLengthString {
    merchantID?: MerchantID;
    acquiringBank?: AcquiringBank;
    accountInformation?: string;
    bakongAccountID: BakongAccountID;
    data: GlobalUniqueIdDataType;

    constructor(tag: string, obj: GlobalUniqueIdObjectType) {
        if (!obj || typeof obj !== 'object') {
            throw KHQRResponse(null, ERROR_CODE.MERCHANT_TYPE_REQUIRED);
        }

        // Creating 3 instances
        // BakongAccountID: 00
        // MerchantID: 01
        // AcquiringBankName: 02
        const bakongAccountID = new BakongAccountID(EMV.BAKONG_ACCOUNT_IDENTIFIER, obj.bakongAccountID);

        let globalUniqueIdentifier = bakongAccountID.toString();

        if (obj.isMerchant) {
            const merchantID = new MerchantID(EMV.MERCHANT_ACCOUNT_INFORMATION_MERCHANT_ID, obj.merchantID);
            const acquiringBank = new AcquiringBank(EMV.MERCHANT_ACCOUNT_INFORMATION_ACQUIRING_BANK, obj.acquiringBank);

            if (obj.merchantID) {
                globalUniqueIdentifier += merchantID.toString();
            }
            if (obj.acquiringBank) {
                globalUniqueIdentifier += acquiringBank.toString();
            }

            super(tag, globalUniqueIdentifier);

            this.merchantID = merchantID;
            this.acquiringBank = acquiringBank;
            this.data = {
                bakongAccountID,
                merchantID,
                acquiringBank,
            };
        } else {
            if (!StringUtils.isEmpty(obj.accountInformation)) {
                const accInformation = new AccountInformation(
                    EMV.INDIVIDUAL_ACCOUNT_INFORMATION,
                    String(obj.accountInformation),
                );
                globalUniqueIdentifier += accInformation.toString();
            }

            if (!StringUtils.isEmpty(obj.acquiringBank)) {
                const acquiringBank = new AcquiringBank(
                    EMV.MERCHANT_ACCOUNT_INFORMATION_ACQUIRING_BANK,
                    obj.acquiringBank,
                );
                globalUniqueIdentifier += acquiringBank.toString();
            }

            super(tag, globalUniqueIdentifier);

            this.accountInformation = obj.accountInformation;
            this.data = {
                bakongAccountID,
                accountInformation: obj.accountInformation,
            };
        }
        this.bakongAccountID = bakongAccountID;
    }
}

class BakongAccountID extends TagLengthString {
    constructor(tag: string, bakongAccountID?: string) {
        // Throw validation if there is
        // 1. No tag
        // 2. empty value of bakong account
        if (StringUtils.isEmpty(bakongAccountID)) {
            throw KHQRResponse(null, ERROR_CODE.BAKONG_ACCOUNT_ID_REQUIRED);
        }

        // Validating the bakong account is it is correct
        // name@bank_domain
        const bakongAccountDivide = String(bakongAccountID).split('@');

        // Validate on length of the bakong account
        if (String(bakongAccountID).length > EMV.INVALID_LENGTH.BAKONG_ACCOUNT) {
            throw KHQRResponse(null, ERROR_CODE.BAKONG_ACCOUNT_ID_LENGTH_INVALID);
        } else if (bakongAccountDivide.length < 2) {
            throw KHQRResponse(null, ERROR_CODE.BAKONG_ACCOUNT_ID_INVALID);
        }

        super(tag, String(bakongAccountID));
    }
}

class MerchantID extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw KHQRResponse(null, ERROR_CODE.MERCHANT_ID_REQUIRED);
        } else if (String(value).length > EMV.INVALID_LENGTH.MERCHANT_ID) {
            throw KHQRResponse(null, ERROR_CODE.MERCHANT_ID_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class AcquiringBank extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw KHQRResponse(null, ERROR_CODE.ACQUIRING_BANK_REQUIRED);
        } else if (String(value).length > EMV.INVALID_LENGTH.ACQUIRING_BANK) {
            throw KHQRResponse(null, ERROR_CODE.ACQUIRING_BANK_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class AccountInformation extends TagLengthString {
    constructor(tag: string, value: string) {
        if (value.length > EMV.INVALID_LENGTH.ACCOUNT_INFORMATION) {
            throw KHQRResponse(null, ERROR_CODE.ACCOUNT_INFORMATION_LENGTH_INVALID);
        }

        super(tag, value);
    }
}
