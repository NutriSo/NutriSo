import { KG } from '../../constants';

const caseGetCookingValue = (consumption, cooking) => {
    return (consumption * cooking) / KG;
};

export default caseGetCookingValue;
