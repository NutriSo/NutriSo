import React, { useState, useEffect } from 'react';
import { Col, Input, Row, Button, Modal, Select } from 'antd';
import apiURL from '../../../axios/axiosConfig';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import RecipesCard from '../../commons/RecipeCard';
import UploadImgs from '../../commons/UploadImgs';
import Loading from '../../commons/Loading';

import './Recetas.scss';

const Recetas = () => {
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('desayuno');
    const [url, setUrl] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [foto, setFoto] = useState('');
    const [loading, setLoading] = useState(true);

    const [destacado, setDestacado] = useState(true);

    const [recetas, setRecetas] = useState([]);
    //MODAL
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalActVisible, setIsModalActVisible] = useState(false);
    const [idReceta, setIdReceta] = useState('');
    const categories = ['desayuno', 'colacion1', 'comida', 'colacion2', 'cena'];
    const cat0 = recetas.filter((receta) => receta.destacado == true);
    const cat1 = recetas.filter((receta) => receta.categoria === categories[0]);
    const cat2 = recetas.filter((receta) => receta.categoria === categories[1]);
    const cat3 = recetas.filter((receta) => receta.categoria === categories[2]);
    const cat4 = recetas.filter((receta) => receta.categoria === categories[3]);
    const cat5 = recetas.filter((receta) => receta.categoria === categories[4]);

    //ADVERT
    const { confirm } = Modal;
    //TEXTAREA
    const { TextArea } = Input;
    //SELECT
    const { Option } = Select;

    useEffect(() => {
        getRecetas();
        return () => {
            setRecetas([]);
            setLoading(true);
        };
    }, []);

    const getRecetas = async () => {
        try {
            const { data } = await apiURL.get('/Recetas');
            setRecetas(data);
            setLoading(false);
        } catch (error) {
            console.groupCollapsed('Error xd');
            console.error(error);
            console.groupEnd();
            setLoading(false);
        }
    };
    function obtenerDestacada(destacado) {
        setDestacado(destacado);
    }

    function obtenerCategoria(categoria) {
        setCategoria(categoria);
    }

    const handleDescription = (e) => {
        setDescripcion(e.target.value);
    };

    const handleUploadImg = (values) => {
        console.log(values);
        setFoto(values?.url);
    };

    const postRecetas = async () => {
        setLoading(true);
        try {
            const recetas = {
                titulo,
                categoria,
                url,
                destacado,
                descripcion,
                foto,
            };

            await apiURL.post('/Recetas', recetas);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const patchRecetas = async () => {
        setLoading(true);
        try {
            const receta = { titulo, categoria, url, destacado, descripcion, foto };

            await apiURL.patch(`/recetas/${idReceta}`, receta);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        handleCancelAct();
    };
    const deleteRecetas = async (receta) => {
        setLoading(true);
        try {
            await apiURL.delete(`/recetas/${receta._id}`);

            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    function showDeleteConfirm(receta) {
        confirm({
            title: '¿Estás seguro de que quieres eliminar?',
            icon: <ExclamationCircleOutlined />,
            content: 'Los cambios no serán reversibles',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteRecetas(receta);
            },
        });
    }

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModalAct = (receta) => {
        setTitulo(receta.titulo);
        setCategoria(receta.categoria);
        setUrl(receta.url);
        setDescripcion(receta?.descripcion ?? '');
        setDestacado(receta.destacado);
        setIsModalActVisible(true);
    };

    const handleOk = () => {
        postRecetas();
        setIsModalVisible(false);
    };
    const handleOkAct = () => {
        patchRecetas();
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancelAct = () => {
        setIsModalActVisible(false);
    };

    const handleEditButton = (receta) => {
        setFoto(receta?.foto ?? '');
        showModalAct(receta);
        setIdReceta(receta._id);
    };

    const handleDeleteButton = (receta) => {
        showDeleteConfirm(receta);
    };

    return (
        <div className='main-Recetas'>
            {loading && <Loading size={50} variant='full' />}
            <Row>
                <Col span={22} style={{ padding: 16 }}>
                    <h1> Recetas </h1>
                </Col>
                <Col span={2} style={{ padding: 16 }}>
                    <Button onClick={showModal} type='primary' shape='circle' icon={<PlusOutlined />} />
                </Col>
            </Row>
            <div className='grid_recetas'>
                <div className='items'>
                    {cat0.length > 0 && <h2 className='tituloR'>Recetas Destacadas</h2>}
                    <div className='sc_receta_destacada'>
                        {recetas.length > 0 &&
                            cat0.map((receta) => (
                                <RecipesCard
                                    recipe={receta}
                                    onEdit={handleEditButton}
                                    onDelete={handleDeleteButton}
                                    onUploadImg={handleUploadImg}
                                />
                            ))}
                    </div>
                </div>
                <div className='items'>
                    {cat1.length > 0 && <h2 className='tituloR'>Desayuno</h2>}
                    <div className='sc_receta_desayuno'>
                        {recetas.length > 0 &&
                            cat1.map((receta) => (
                                <RecipesCard
                                    recipe={receta}
                                    onEdit={handleEditButton}
                                    onDelete={handleDeleteButton}
                                    onUploadImg={handleUploadImg}
                                />
                            ))}
                    </div>
                </div>
                <div className='items'>
                    {cat2.length > 0 && <h2 className='tituloR'>Colacion 1</h2>}
                    <div className='sc_receta_colacion1'>
                        {recetas.length > 0 &&
                            cat2.map((receta) => (
                                <RecipesCard
                                    recipe={receta}
                                    onEdit={handleEditButton}
                                    onDelete={handleDeleteButton}
                                    onUploadImg={handleUploadImg}
                                />
                            ))}
                    </div>
                </div>
                <div className='items'>
                    {cat3.length > 0 && <h2 className='tituloR'>Comida</h2>}
                    <div className='sc_receta_comida'>
                        {recetas.length > 0 &&
                            cat3.map((receta) => (
                                <RecipesCard
                                    recipe={receta}
                                    onEdit={handleEditButton}
                                    onDelete={handleDeleteButton}
                                    onUploadImg={handleUploadImg}
                                />
                            ))}
                    </div>
                </div>
                <div className='items'>
                    {cat4.length > 0 && <h2 className='tituloR'>Colacion 2</h2>}
                    <div className='sc_receta_colacion2'>
                        {recetas.length > 0 &&
                            cat4.map((receta) => (
                                <RecipesCard
                                    recipe={receta}
                                    onEdit={handleEditButton}
                                    onDelete={handleDeleteButton}
                                    onUploadImg={handleUploadImg}
                                />
                            ))}
                    </div>
                </div>
                <div className='items'>
                    {cat5.length > 0 && <h2 className='tituloR'>Cena</h2>}
                    <div className='sc_receta_cena'>
                        {recetas.length > 0 &&
                            cat5.map((receta) => (
                                <RecipesCard
                                    recipe={receta}
                                    onEdit={handleEditButton}
                                    onDelete={handleDeleteButton}
                                    onUploadImg={handleUploadImg}
                                />
                            ))}
                    </div>
                </div>
                <Modal
                    title='Agregar una nueva Receta'
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    onOk={handleOk}>
                    <UploadImgs onChange={handleUploadImg} url={foto ?? ''} />
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Titulo:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Input placeholder='Titulo de la Receta' onChange={(e) => setTitulo(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 7 }}>
                            <p>Categoria:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Select
                                id='categoria'
                                style={{ width: 120 }}
                                defaultValue='desayuno'
                                onChange={obtenerCategoria}>
                                <Option value='desayuno' selected>
                                    Desayuno
                                </Option>
                                <Option value='colacion1'>Colacion 1</Option>
                                <Option value='comida'>Comida</Option>
                                <Option value='colacion2'>Colacion 2</Option>
                                <Option value='cena'>Cena</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>URL:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Input placeholder='URL del video' onChange={(e) => setUrl(e.target.value)} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Destacado:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Select
                                id='recetaDestacada'
                                defaultValue={false}
                                style={{ width: 140 }}
                                onChange={obtenerDestacada}>
                                <Option value={true}>Destacada</Option>
                                <Option value={false}>No Destacada</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Descripción: </p>
                        </Col>
                        <TextArea
                            placeholder='Descripcion de la Receta'
                            rows={5}
                            onChange={handleDescription}
                            value={descripcion !== '' && descripcion}
                        />
                    </Row>
                </Modal>
                <Modal title='Editar Receta' visible={isModalActVisible} onCancel={handleCancelAct} onOk={handleOkAct}>
                    <UploadImgs onChange={handleUploadImg} url={foto ?? ''} />
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Titulo:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Input
                                placeholder='Titulo de la Receta'
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} style={{ padding: 7 }}>
                            <p>Categoria:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Select
                                id='categoria'
                                defaultValue='desayuno'
                                style={{ width: 120 }}
                                onChange={obtenerCategoria}>
                                <Option value='desayuno'>Desayuno</Option>
                                <Option value='colacion1'>Colacion 1</Option>
                                <Option value='comida'>Comida</Option>
                                <Option value='colacion2'>Colacion 2</Option>
                                <Option value='cena'>Cena</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>URL:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Input value={url} placeholder='URL del video' onChange={(e) => setUrl(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Destacado:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Select
                                id='recetaDestacada'
                                value={destacado}
                                defaultValue='true'
                                style={{ width: 120 }}
                                onChange={obtenerDestacada}>
                                <Option value={true}>Destacada</Option>
                                <Option value={false}>No Destacada</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Descripción: </p>
                        </Col>
                        <TextArea
                            placeholder='Descripcion de la Receta'
                            rows={5}
                            value={descripcion !== '' && descripcion}
                        />
                    </Row>
                </Modal>
            </div>
        </div>
    );
};

export default Recetas;
