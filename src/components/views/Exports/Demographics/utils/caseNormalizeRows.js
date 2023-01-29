import { isEmptyArray } from '@/utils';

import getRowProperties from './getRowProperties';

const caseNormalizeRows = (data) => {
    if (isEmptyArray(data)) {
        return [];
    }

    const rowsData = data.map((row) => getRowProperties(row));
    return rowsData;
};

export default caseNormalizeRows;
