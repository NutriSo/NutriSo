import { isEmptyString, isInvalidElem, isEmptyArray } from '@/utils';

const getValidElements = (group) => {
    return group.filter(
        (elem) => !isEmptyString(elem) && !isInvalidElem(elem) && elem.length > 3
    );
};

const getNormalizedGroupNames = (data) => {
    const result = [];

    if (!isEmptyArray(data)) {
        data.forEach((group) => result.push(getValidElements(group)));
    }

    return result;
};

export default getNormalizedGroupNames;
