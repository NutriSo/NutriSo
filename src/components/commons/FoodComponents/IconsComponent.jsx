import React from 'react';
import { useEffect, useState } from 'react';
import { SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons';

import UploadImg from '../UploadImgs';
import { isInvalidElem } from '../../../utils';

const IconsComponent = ({ img, nutricional, ambiental, economia, sociedad, handleImage }) => {
    const [data, setData] = useState([]);

    const hasImage = !isInvalidElem(data?.imagen);

    const nutricionalIcon1Color =
        data?.icono?.iconoNutricional === '1' ? '#27ae60' : '#d4efdf';
    const nutricionalIcon2Color =
        data?.icono?.iconoNutricional === '2' ? '#ffcb00' : '#f7efcd';
    const nutricionalIcon3Color =
        data?.icono?.iconoNutricional === '3' ? '#c0392b' : '#f2d7d5';
    const ambientalIcon1Color = data?.icono?.iconoAmbiental === '1' ? '#27ae60' : '#d4efdf';
    const ambientalIcon2Color = data?.icono?.iconoAmbiental === '2' ? '#ffcb00' : '#f7efcd';
    const ambientalIcon3Color = data?.icono?.iconoAmbiental === '3' ? '#c0392b' : '#f2d7d5';
    const economiaIcon1Color = data?.icono?.iconoEconomia === '1' ? '#27ae60' : '#d4efdf';
    const economiaIcon2Color = data?.icono?.iconoEconomia === '2' ? '#ffcb00' : '#f7efcd';
    const economiaIcon3Color = data?.icono?.iconoEconomia === '3' ? ' #c0392b' : '#f2d7d5';

    useEffect(() => {
        img && setData(img);
        return () => {
            setData([]);
        };
    }, [img]);

    return (
        <>
            <div className='icons'>
                <div className='img_food'>
                    {hasImage && <UploadImg url={data?.imagen} onChange={handleImage} />}
                    {!hasImage && <UploadImg disabled />}
                </div>
                <div className='icon_healty'>
                    <h1 id='healt'>Nutricional</h1>
                    <div id='icons-icons'>
                        <SmileTwoTone
                            twoToneColor={nutricionalIcon1Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => nutricional('1')}
                        />
                        <MehTwoTone
                            twoToneColor={nutricionalIcon2Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => nutricional('2')}
                        />
                        <FrownTwoTone
                            twoToneColor={nutricionalIcon3Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => nutricional('3')}
                        />
                    </div>
                </div>
                <div className='icon_enviroment'>
                    <h1 id='enviro'>Ambiental</h1>
                    <div id='icons-icons'>
                        <SmileTwoTone
                            twoToneColor={ambientalIcon1Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => ambiental('1')}
                        />
                        <MehTwoTone
                            twoToneColor={ambientalIcon2Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => ambiental('2')}
                        />
                        <FrownTwoTone
                            twoToneColor={ambientalIcon3Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => ambiental('3')}
                        />
                    </div>
                </div>
                <div className='icon_economy'>
                    <h1 id='economy'>Economía</h1>
                    <div id='icons-icons'>
                        <SmileTwoTone
                            twoToneColor={economiaIcon1Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => economia('1')}
                        />
                        <MehTwoTone
                            twoToneColor={economiaIcon2Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => economia('2')}
                        />
                        <FrownTwoTone
                            twoToneColor={economiaIcon3Color}
                            style={{ fontSize: '35px' }}
                            onClick={() => economia('3')}
                        />
                    </div>
                </div>
                <div className='icon_culture_society'>
                    <h1 id='culture'>Cultura sociedad</h1>
                    <div id='icons-icons'>
                        <SmileTwoTone
                            twoToneColor={
                                data?.icono?.iconoCulturaSociedad === '1'
                                    ? ' #27ae60'
                                    : '#d4efdf'
                            }
                            style={{ fontSize: '35px' }}
                            onClick={() => sociedad('1')}
                        />
                        <MehTwoTone
                            twoToneColor={
                                data?.icono?.iconoCulturaSociedad === '2'
                                    ? '#ffcb00'
                                    : '#f7efcd'
                            }
                            style={{ fontSize: '35px' }}
                            onClick={() => sociedad('2')}
                        />
                        <FrownTwoTone
                            twoToneColor={
                                data?.icono?.iconoCulturaSociedad === '3'
                                    ? ' #c0392b'
                                    : ' #f2d7d5'
                            }
                            style={{ fontSize: '35px' }}
                            onClick={() => sociedad('3')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default IconsComponent;
