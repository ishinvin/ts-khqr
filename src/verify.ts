import { EMV, ERROR_CODE, KHQR_SUBTAG, KHQR_TAG, type KHQRTagType } from './constants';
import { response, StringUtils } from './utils';

const cloneObject = (obj: any) => JSON.parse(JSON.stringify(obj));

export function verifyQR(qrString: string) {
    const allTags = KHQR_TAG.map((item) => item.tag);
    const subTags = KHQR_TAG.filter((item) => item.sub === true).map((item) => item.tag);
    let requiredTags = KHQR_TAG.filter((item) => item.required === true).map((item) => item.tag);

    const tags = [];
    let lastTag = '';
    let isMerchantTag = false;

    while (qrString) {
        const cutQRString = StringUtils.cutString(qrString);
        const { value, slicedString } = cutQRString;
        let { tag } = cutQRString;
        if (tag === lastTag) break;
        const isMerchant = tag === '30';
        if (isMerchant) {
            tag = '29';
            isMerchantTag = true;
        }
        if (allTags.includes(tag)) {
            tags.push({ tag, value });
            requiredTags = requiredTags.filter((item) => item !== tag);
        }

        qrString = slicedString;
        lastTag = tag;
    }

    // tag pointofInitiationMethod 01, dynamic khqr 12
    if (tags.some((item) => item.tag === '01' && item.value === '12')) {
        if (!tags.some((item) => item.tag === '54')) {
            throw response(null, ERROR_CODE.INVALID_DYNAMIC_KHQR);
        }
        if (!tags.some((item) => item.tag === '99')) {
            throw response(null, ERROR_CODE.EXPIRATION_TIMESTAMP_REQUIRED);
        }
    }

    // check required timestamp for dynamic KHQR (tag amount 54, tag timestamp 99)
    if (tags.some((item) => item.tag === '54') && !tags.some((item) => item.tag === '99')) {
        throw response(null, ERROR_CODE.EXPIRATION_TIMESTAMP_REQUIRED);
    }

    // check required tag and throw invalid
    if (requiredTags.length > 0) {
        const requiredTag = requiredTags[0];
        const missingInstance: KHQRTagType | undefined = KHQR_TAG.find((item) => item.tag === requiredTag);
        if (missingInstance) {
            /* tslint:disable:no-unused-expression */
            new missingInstance.instance(requiredTag, null);
        }
    }

    let poi: string | undefined;
    tags.forEach((khqrTag) => {
        const { tag } = khqrTag;
        let { value } = khqrTag;
        const khqr = KHQR_TAG.find((item) => item.tag === tag);
        let inputValue = value;

        if (khqr) {
            if (tag === EMV.POINT_OF_INITIATION_METHOD) {
                poi = value;
            }
            if (subTags.includes(tag)) {
                const subTagInput = KHQR_SUBTAG.input.find((item) => item.tag === tag);
                if (subTagInput) {
                    const inputdata = cloneObject(subTagInput.data);
                    while (value) {
                        const {
                            tag: subtag,
                            value: subtagValue,
                            slicedString: slicedsubtag,
                        } = StringUtils.cutString(value);

                        const nameSubtag = KHQR_SUBTAG.compare
                            .filter((item) => item.tag === tag)
                            .find((item) => item.subTag === subtag);
                        if (nameSubtag) {
                            if (isMerchantTag && nameSubtag.name === 'accountInformation') {
                                const merchantID = 'merchantID';
                                inputdata[merchantID] = subtagValue;
                            } else {
                                inputdata[nameSubtag.name] = subtagValue;
                            }
                            inputValue = inputdata;
                        }
                        value = slicedsubtag;
                    }
                    if (tag === EMV.TIMESTAMP_TAG) {
                        new khqr.instance(tag, inputValue, poi);
                    } else {
                        new khqr.instance(tag, inputValue);
                    }
                }
            } else {
                new khqr.instance(tag, inputValue);
            }
        }
    });
}
