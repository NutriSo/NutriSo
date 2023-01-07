import { isInvalidElem } from '@/utils';

export const normalizeResponse = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    const { users, registers } = data;
    console.log({ users, registers });
    const result = [];

    return result;
};
