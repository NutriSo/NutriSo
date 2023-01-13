import { isInvalidElem } from '@/utils';

export const flatArray = (array) => {
    if (isInvalidElem(array)) {
        return [];
    }

    return array.flat(2);
};
