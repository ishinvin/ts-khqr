import { EMV, ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export type MerchantInformationLanguageTemplateParams = {
    languagePreference?: string;
    merchantNameAlternateLanguage?: string;
    merchantCityAlternateLanguage?: string;
};

type MerchantInformationLanguageTemplateType = {
    languagePreference?: LanguagePreference;
    merchantNameAlternateLanguage?: MerchantCityAlternateLanguage;
    merchantCityAlternateLanguage?: MerchantCityAlternateLanguage;
};

export class MerchantInformationLanguageTemplate extends TagLengthString {
    languagePreference?: LanguagePreference;
    merchantNameAlternateLanguage?: MerchantCityAlternateLanguage;
    merchantCityAlternateLanguage?: MerchantCityAlternateLanguage;
    data: MerchantInformationLanguageTemplateType;

    constructor(tag: string, obj: MerchantInformationLanguageTemplateParams = {}) {
        let languagePreference;
        let merchantNameAlternateLanguage;
        let merchantCityAlternateLanguage;

        if (obj.languagePreference && !obj.merchantNameAlternateLanguage) {
            throw response(null, ERROR_CODE.MERCHANT_NAME_ALTERNATE_LANGUAGE_REQUIRED);
        }

        let merchantInformationLanguageTemplateString = '';

        languagePreference = new LanguagePreference(EMV.LANGUAGE_PREFERENCE, obj.languagePreference);
        merchantInformationLanguageTemplateString += languagePreference.toString();

        if (obj.merchantNameAlternateLanguage !== undefined && obj.merchantNameAlternateLanguage !== null) {
            merchantNameAlternateLanguage = new MerchantNameAlternateLanguage(
                EMV.MERCHANT_NAME_ALTERNATE_LANGUAGE,
                obj.merchantNameAlternateLanguage,
            );
            merchantInformationLanguageTemplateString += merchantNameAlternateLanguage.toString();
        }

        if (obj.merchantCityAlternateLanguage !== undefined && obj.merchantCityAlternateLanguage !== null) {
            merchantCityAlternateLanguage = new MerchantCityAlternateLanguage(
                EMV.MERCHANT_CITY_ALTERNATE_LANGUAGE,
                obj.merchantCityAlternateLanguage,
            );
            merchantInformationLanguageTemplateString += merchantCityAlternateLanguage.toString();
        }

        super(tag, merchantInformationLanguageTemplateString);

        this.data = {
            languagePreference,
            merchantNameAlternateLanguage,
            merchantCityAlternateLanguage,
        };
    }
}

class LanguagePreference extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.LANGUAGE_PREFERENCE) {
            throw response(null, ERROR_CODE.LANGUAGE_PREFERENCE_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class MerchantNameAlternateLanguage extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.MERCHANT_NAME_ALTERNATE_LANGUAGE) {
            throw response(null, ERROR_CODE.MERCHANT_NAME_ALTERNATE_LANGUAGE_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}

class MerchantCityAlternateLanguage extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.MERCHANT_CITY_ALTERNATE_LANGUAGE) {
            throw response(null, ERROR_CODE.MERCHANT_CITY_ALTERNATE_LANGUAGE_LENGTH_INVALID);
        }
        super(tag, String(value));
    }
}
