import React, { useState, useEffect } from 'react';
import { Tabs, Checkbox } from 'antd';

import { isEmptyArray, capitilizeWord } from '@/utils';
import mocks from '@/mocks/historial';

import './Diseases.scss';

const DiseasesTabs = ({ dataSource, diseases, onChangeDiseases }) => {
    const [listByFamiliar, setListByFamiliar] = useState([]);

    const { TabPane } = Tabs;

    useEffect(() => {
        if (isEmptyArray(diseases)) return;

        const finalList = [];
        diseases.forEach((item) => {
            const { familiar } = item;
            const index = finalList.findIndex((item) => item.familiar === familiar);
            if (index === -1) {
                finalList.push({
                    familiar,
                    enfermedades: [capitilizeWord(item.enfermedad)],
                });
            } else {
                finalList[index].enfermedades.push(capitilizeWord(item.enfermedad));
            }
        });

        setListByFamiliar(finalList);
    }, [diseases]);

    return (
        <Tabs className='tabsContainer'>
            {Object.entries(dataSource)?.map(([key, familiar], index) => {
                const isDisabled = !familiar;

                const lista = listByFamiliar.find((item) => item.familiar === key);

                return (
                    <TabPane tab={key} key={index} disabled={isDisabled}>
                        {mocks.enfermedades.map(({ value, label }, index) => {
                            const isChecked = lista?.enfermedades.includes(value);

                            return (
                                <Checkbox
                                    key={index}
                                    value={value}
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={() => onChangeDiseases(key, value, isChecked)}>
                                    {label}
                                </Checkbox>
                            );
                        })}
                    </TabPane>
                );
            })}
        </Tabs>
    );
};

export default DiseasesTabs;
