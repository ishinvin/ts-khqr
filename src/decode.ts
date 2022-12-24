import { KHQR_SUBTAG, KHQR_TAG, type KHQRTagType } from './constants';
import { type KHQRDecodeType } from './models';
import { StringUtils } from './utils';

const cloneObject = (obj: any) => JSON.parse(JSON.stringify(obj));

/**
 * Verify KHQR
 * @param KHQRString
 */
export function verify(KHQRString: string) {
    const allTags = KHQR_TAG.map((item) => item.tag);
    const subTags = KHQR_TAG.filter((item) => item.sub === true).map((item) => item.tag);
    let requiredTags = KHQR_TAG.filter((item) => item.required === true).map((item) => item.tag);

    const tags = [];
    let lastTag = '';
    let isMerchantTag = false;

    while (KHQRString) {
        const cutQRString = StringUtils.cutString(KHQRString);
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

        KHQRString = slicedString;
        lastTag = tag;
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

    tags.forEach((khqrTag) => {
        const { tag } = khqrTag;
        let { value } = khqrTag;
        const khqr = KHQR_TAG.find((item) => item.tag === tag);
        let inputValue = value;

        if (khqr) {
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
                    new khqr.instance(tag, inputValue);
                }
            } else {
                new khqr.instance(tag, inputValue);
            }
        }
    });
}

/**
 * Decode KHQR
 * @param KHQRString
 * @returns
 */
export function decode(KHQRString: string): KHQRDecodeType {
    const allTags = KHQR_TAG.map((item) => item.tag);
    const subTags = KHQR_TAG.filter((item) => item.sub === true).map((item) => item.tag);

    const tags: { [key: string]: string } = {};
    let merchantType = null;
    let lastTag = '';
    let isMerchantTag = false;

    while (KHQRString) {
        const cutQRString = StringUtils.cutString(KHQRString);
        const { value, slicedString } = cutQRString;
        let { tag } = cutQRString;

        if (tag === lastTag) break;

        const isMerchant = tag === '30';
        if (isMerchant) {
            merchantType = '30';
            tag = '29';
            isMerchantTag = true;
        } else if (tag === '29') {
            merchantType = '29';
        }

        if (allTags.includes(tag)) {
            tags[tag] = value;
        }

        KHQRString = slicedString;
        lastTag = tag;
    }

    let decodeValue: { [key: string]: string | number | null | undefined } = {
        merchantType,
    };

    KHQR_SUBTAG.input.map((item) => item.data).forEach((item) => (decodeValue = { ...decodeValue, ...item }));
    KHQR_TAG.forEach((khqrTag) => {
        const { tag } = khqrTag;
        const khqr = KHQR_TAG.find((item) => item.tag === tag);
        let value = StringUtils.isEmpty(tags[tag]) ? null : tags[tag];

        if (subTags.includes(tag)) {
            const subTagInput = KHQR_SUBTAG.input.find((item) => item.tag === tag);
            if (subTagInput) {
                let inputValue = {};
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
                decodeValue = { ...decodeValue, ...inputValue };
            }
        } else {
            if (khqr) {
                decodeValue[khqr.type] = value;
            }
        }
    });

    return decodeValue as KHQRDecodeType;
}
