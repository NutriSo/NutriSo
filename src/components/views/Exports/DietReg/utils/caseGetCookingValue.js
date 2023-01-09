import { KG } from '../../constants';

const caseGetCookingValue = (consumption, washing) => {
    return (consumption * washing) / KG;
};

export default caseGetCookingValue;
