import EFamiliars from '../enumerators/EFamiliars';

const familiarsInitialState = {
    [EFamiliars.PADRE]: false,
    [EFamiliars.MADRE]: false,
    [EFamiliars.HERMANO]: false,
    [EFamiliars.HERMANA]: false,
    [EFamiliars.ABUELO_PATERNO]: false,
    [EFamiliars.ABUELA_PATERNA]: false,
    [EFamiliars.ABUELO_MATERNO]: false,
    [EFamiliars.ABUELA_MATERNA]: false,
    [EFamiliars.TIO_PATERNO]: false,
    [EFamiliars.TIA_PATERNA]: false,
    [EFamiliars.TIO_MATERNO]: false,
    [EFamiliars.TIA_MATERNA]: false,
};

Object.freeze(familiarsInitialState);

export { familiarsInitialState };
