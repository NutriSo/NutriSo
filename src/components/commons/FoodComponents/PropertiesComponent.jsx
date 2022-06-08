import { useState } from 'react';

import { PlusCircleTwoTone } from '@ant-design/icons';
import { Modal, Button } from 'antd';

import Props from './Props';
import Tags from './Tags';
import { generateFormDTO } from './data/dto';

const PropertiesComponent = ({
    item,
    getData,
    setShowAlimento,
    handleOk,
    showModal,
    isModalVisible,
    handleCancel,
    borrar,
}) => {
    const [nuevaOpcion, setNuevaOpcion] = useState('');

    return (
        <>
            <div className='props'>
                <div className='head_props'>
                    <h1 id='title'>Propiedades</h1>
                </div>
                <div className='data_props'>
                    <Props dataSource={generateFormDTO(item)}/>
                </div>                
                <div className='preparaciones'>
                    <div className='tags'>
                        <Tags borrar={borrar} itm={item?.opcionesPreparacion}/>
                    </div>
                    <div className='add_tag'>
                        <PlusCircleTwoTone
                            twoToneColor='#3467B9'
                            style={{ fontSize: '26px' }}
                            onClick={showModal}
                        />
                    </div>
                </div>
            </div>
            <Modal
                title='Nueva preparación'
                visible={isModalVisible}
                onOk={() => handleOk(nuevaOpcion)}
                onCancel={handleCancel}>
                <p id='sub'>Tip de preparación</p>
                <input onChange={({ target }) => setNuevaOpcion(target.value)} />
            </Modal>
        </>
    );
};

export default PropertiesComponent;
