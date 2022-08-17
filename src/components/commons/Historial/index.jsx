import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';

import Diseases from '@/components/commons/Historial/components/molecules/Diseases';
import { isEmptyArray, capitilizeWord } from '@/utils';
import { familiarsInitialState } from './data';

const Familiars = ({ source, updateSource }) => {
    const [familiarsChecked, setFamiliarsChecked] = useState(familiarsInitialState);

    const onChangeFamiliars = (key) => {
        setFamiliarsChecked({
            ...familiarsChecked,
            [key]: !familiarsChecked[key],
        });
    };

    const onChangeDiseases = (familiar, enfermedad, checked) => {
        if (!checked) {
            const obj = {
                familiar,
                enfermedad,
            };

            updateSource((prevState) => (prevState ? [...prevState, obj] : [obj]));
            return;
        }

        const findIndex = source.findIndex((item) => {
            const normalizedFamiliar = capitilizeWord(item.familiar);
            const normalizedEnfermedad = capitilizeWord(item.enfermedad);

            return normalizedFamiliar === familiar && normalizedEnfermedad === enfermedad;
        });

        if (findIndex === -1) return;

        updateSource((prevState) => {
            const newState = [...prevState];
            newState.splice(findIndex, 1);
            return newState;
        });
    };

    const onClean = () => {
        setFamiliarsChecked(familiarsInitialState);
        // updateSource(null);
    };

    useEffect(() => {
        if (isEmptyArray(source)) {
            onClean();
            return;
        }

        const familiares = source.map((item) => item.familiar);

        const newFamiliarsState = { ...familiarsInitialState };
        familiares.forEach((familiar) => {
            newFamiliarsState[familiar] = true;
        });
        setFamiliarsChecked(newFamiliarsState);

        return () => {
            onClean();
        };
    }, [source]);

    return (
        <div>
            {Object.keys(familiarsChecked)?.map((key, index) => (
                <Checkbox
                    key={index}
                    checked={familiarsChecked[key]}
                    onChange={() => onChangeFamiliars(key)}>
                    {key}
                </Checkbox>
            ))}
            <Diseases
                dataSource={familiarsChecked}
                diseases={source}
                onChangeDiseases={onChangeDiseases}
            />
        </div>
    );
};

export default Familiars;
