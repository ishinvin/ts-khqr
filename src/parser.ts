import { KHQR_SUBTAG, KHQR_TAG } from './constants';
import { ParserType, StringUtils } from './utils';

const cloneObject = (obj: any) => JSON.parse(JSON.stringify(obj));

export function parseQR(qrString: string): ParserType {
    const allTags = KHQR_TAG.map((item) => item.tag);
    const subTags = KHQR_TAG.filter((item) => item.sub === true).map((item) => item.tag);

    const tags: { [key: string]: string } = {};
    let merchantType = null;
    let lastTag = '';
    let isMerchantTag = false;

    while (qrString) {
        const cutQRString = StringUtils.cutString(qrString);
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
        } else if (
            [
                '26',
                '27',
                '28',
                '31',
                '32',
                '33',
                '34',
                '35',
                '36',
                '37',
                '38',
                '39',
                '40',
                '41',
                '42',
                '43',
                '44',
                '45',
                '46',
                '47',
                '48',
                '49',
                '50',
                '51',
            ].includes(tag)
        ) {
            merchantType = tag;
            tag = '29';
        }

        if (allTags.includes(tag)) {
            tags[tag] = value;
        }

        qrString = slicedString;
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

    return decodeValue as ParserType;
}
