import ESupplements from '../enumerators/ESupplements';

const supplementsInitialState = {
    [ESupplements.MULTIVITAMINIC]: false,
    [ESupplements.VITAMINAD]: false,
    [ESupplements.PROBITICOS]: false,
    [ESupplements.PREBITICOS]: false,
    [ESupplements.VITAMINC]: false,
    [ESupplements.VITAMINE]: false,
    [ESupplements.HIERRO]: false,
    [ESupplements.CALCIO]: false,
    [ESupplements.OMEGA3]: false,
    [ESupplements.PROTEINAENPOLVO]: false,
};

Object.freeze(supplementsInitialState);

export default supplementsInitialState;
