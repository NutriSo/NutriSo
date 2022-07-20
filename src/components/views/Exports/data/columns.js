import * as calories from './calories';
import * as vitamins from './vitamins';
import * as minerals from './minerals';
import * as glycemic from './glycemic';
import * as environmental from './environmental';
import * as economic from './economic';
import * as bioactives from './bioactives';
import * as additives from './additives';
import * as extraColumns from './extraColumns';
import * as food from './foodGroups';

export const getColumns = (number) => {
    return {
        ...food[`groupColumns${number}`],
        ...extraColumns[`extraColumns${number}`],
        ...calories[`caloriasMacronutrientes${number}`],
        ...vitamins[`vitaminas${number}`],
        ...minerals[`minerales${number}`],
        ...glycemic[`aspectoGlucemico${number}`],
        ...environmental[`aspectosMedioambientales${number}`],
        ...economic[`aspectosEconomicos2`],
        ...bioactives[`componentesBioactivos${number}`],
        ...additives[`aditivosAlimentarios${number}`],
    };
};
