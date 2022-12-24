export class StringUtils {
    static isEmpty(value?: any) {
        if (value === undefined || value === null) {
            return true;
        }
        if (typeof value === 'string' && value === '') {
            return true;
        }
        return false;
    }

    static cutString(str: string) {
        const sliceIndex = 2;

        // Get first 2
        const tag = str.slice(0, sliceIndex);
        const length = Number(str.slice(sliceIndex, sliceIndex * 2));
        const value = str.slice(sliceIndex * 2, sliceIndex * 2 + length);
        const slicedString = str.slice(sliceIndex * 2 + length);

        return {
            tag,
            value,
            slicedString,
        };
    }
}
