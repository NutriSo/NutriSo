import { KG } from '../../constants';

const caseGetWashingValue = (consumption, washing) => {
    return (consumption * washing) / KG;
};

export default caseGetWashingValue;
