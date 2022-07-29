import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';

import supplementsInitialState from '../../../data';
import { isEmptyArray } from '../../../../../../../utils';

const Supplements = ({ source, updateSource }) => {
    const [supplementsChecked, setSupplementsChecked] = useState(supplementsInitialState);

    const onChangeSupplements = (key) => {
        const checked = !supplementsChecked[key];

        if (checked) {
            const obj = {
                marca: '',
                suplemento: key,
            };

            updateSource((s) => (s ? [...s, obj] : [obj]));
            return;
        }

        const findIndex = source.findIndex((item) => item.suplemento === key);

        if (findIndex === -1) return;

        updateSource((prevState) => {
            const newState = [...prevState];
            newState.splice(findIndex, 1);
            return newState;
        });
    };

    const onClean = () => {
        setSupplementsChecked(supplementsInitialState);
    };

    useEffect(() => {
        if (isEmptyArray(source)) {
            onClean();
            return;
        }

        const supplements = source.map((item) => item.suplemento);

        const newSupplementsState = { ...supplementsInitialState };
        supplements.forEach((suplemento) => {
            newSupplementsState[suplemento] = true;
        });
        setSupplementsChecked(newSupplementsState);

        return () => {
            onClean();
        };
    }, [source]);

    return (
        <div>
            {Object.keys(supplementsChecked)?.map((key) => {
                return (
                    <Checkbox
                        key={key}
                        onChange={() => onChangeSupplements(key)}
                        checked={supplementsChecked[key]}>
                        {key}
                    </Checkbox>
                );
            })}
        </div>
    );
};

export default Supplements;
