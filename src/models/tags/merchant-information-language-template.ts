import { EMV, ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export type MerchantInformationLanguageTemplateParams = {
    languagePreference?: string;
    merchantNameAlternateLanguage?: string;
    merchantCityAlternateLanguage?: string;
};

export class MerchantInformationLanguageTemplate extends TagLengthString {
    constructor(tag: string, obj: MerchantInformationLanguageTemplateParams = {}) {
        if (obj.languagePreference && !obj.merchantNameAlternateLanguage) {
            throw response(null, ERROR_CODE.MERCHANT_NAME_ALTERNATE_LANGUAGE_REQUIRED);
        }

        let merchantInformationLanguageTemplateString = '';

        const languagePreference = new LanguagePreference(EMV.LANGUAGE_PREFERENCE, obj.languagePreference);
        merchantInformationLanguageTemplateString += languagePreference.toString();

        if (obj.merchantNameAlternateLanguage !== undefined && obj.merchantNameAlternateLanguage !== null) {
            const merchantNameAlternateLanguage = new MerchantNameAlternateLanguage(
                EMV.MERCHANT_NAME_ALTERNATE_LANGUAGE,
                obj.merchantNameAlternateLanguage,
            );
            merchantInformationLanguageTemplateString += merchantNameAlternateLanguage.toString();
        }

        if (obj.merchantCityAlternateLanguage !== undefined && obj.merchantCityAlternateLanguage !== null) {
            const merchantCityAlternateLanguage = new MerchantCityAlternateLanguage(
                EMV.MERCHANT_CITY_ALTERNATE_LANGUAGE,
                obj.merchantCityAlternateLanguage,
            );
            merchantInformationLanguageTemplateString += merchantCityAlternateLanguage.toString();
        }

        super(tag, merchantInformationLanguageTemplateString);
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
