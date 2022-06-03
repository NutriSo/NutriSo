import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Card, message, InputNumber } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import UploadImgs from '../../../commons/UploadImgs';
import InputTags from '../../../commons/InputTags';
import apiURL from '../../../../axios/axiosConfig';
import { getSku } from '../../../../services';

import styles from './AddFoodForm.module.scss';

const AddFoodForm = () => {
    const { TextArea } = Input;
    const { Option } = Select;

    const [form] = Form.useForm();
    const [url, setUrl] = useState('');
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [foodOptions, setFoodOptions] = useState([]);

    const afterG = '(g)';
    const afterMG = '(mg)';
    const afterUG = '(µg)';
    const afterUG_RE = '(µg RE)';
    const afterKCAL = '(kcal)';

    const selectAddOnAfter = (
        <Select defaultValue='g'>
            <Option value='g'>{afterG}</Option>
            <Option value='mg'>{afterMG}</Option>
            <Option value='ug'>{afterUG}</Option>
            <Option value='ug_re'>{afterUG_RE}</Option>
            <Option value='kcal'>{afterKCAL}</Option>
        </Select>
    );
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const handleRemoveTag = (tag) => {
        console.log(tag);
        const newState = foodOptions.filter((elem) => {
            const normalizedElem = elem.toLowerCase().trim();
            const normalizedTag = tag.toLowerCase().trim();

            if (normalizedElem !== normalizedTag) return true;

            return false;
        });

        setFoodOptions(newState);
    };

    const handleUploadImg = (values) => {
        setUrl(values?.url);
    };

    const onFinish = async (values) => {
        const sku = await getSku();

        console.log('Received values of form: ', values);

        const data = {
            sku: sku,
            nombreAlimento: `${rowValues[1] ?? 'N/A'}`,
            grupoExportable: `${rowValues[2] ?? 'N/A'}`,
            subGrupoExportable: `${rowValues[3] ?? 'N/A'}`,
            grupoAlimento: `${rowValues[4] ?? 'N/A'}`,
            mensaje: {
                nutricional: `${rowValues[5] ?? 'N/A'}`,
                ambiental: `${rowValues[6] ?? 'N/A'}`,
                mensajeEconomia: `${rowValues[7] ?? 'N/A'}`,
                mensajeCulturaSociedad: `${rowValues[8] ?? 'N/A'}`,
            },

            icono: {
                iconoNutricional: `${rowValues[9] ?? '4'}`,
                iconoAmbiental: `${rowValues[10] ?? '4'}`,
                iconoEconomia: `${rowValues[11] ?? '4'}`,
                iconoCulturaSociedad: `${rowValues[12] ?? '4'}`,
            },
            imagen: url,
            clasificacionExportable: `${rowValues[14] ?? 'N/A'}`,
            opcionesPreparacion: opciones,
            cantidadAlimento: {
                cantidadSugerida: rowValues[16] ?? 0,
                unidad: `${rowValues[17] ?? 'N/A'}`,
                pesoNeto: `${rowValues[18] ?? '0'}`,
            },
            caloriasMacronutrientes: {
                energia: `${rowValues[19] ?? '0'}`,
                proteina: `${rowValues[20] ?? '0'}`,
                lipidos: `${rowValues[21] ?? '0'}`,
                agSaturados: `${rowValues[22] ?? '0'}`,
                agMonoinsaturados: `${rowValues[23] ?? '0'}`,
                adPoliinsaturados: `${rowValues[24] ?? '0'}`,
                colesterol: `${rowValues[25] ?? '0'}`,
                omega3: `${rowValues[26] ?? '0'}`,
                omega6: `${rowValues[27] ?? '0'}`,
                omega9: `${rowValues[28] ?? '0'}`,
                hidratosDeCarbono: `${rowValues[29] ?? '0'}`,
                fibra: `${rowValues[30] ?? '0'}`,
                fibraInsoluble: `${rowValues[31] ?? '0'}`,
                fibraSoluble: `${rowValues[32] ?? '0'}`,
                azucar: `${rowValues[33] ?? '0'}`,
                etanol: `${rowValues[34] ?? '0'}`,
            },
            vitaminas: {
                tiamina: `${rowValues[35] ?? '0'}`,
                riboflavin: `${rowValues[36] ?? '0'}`,
                niacina: `${rowValues[37] ?? '0'}`,
                acidoPantotenico: `${rowValues[38] ?? '0'}`,
                piridoxina: `${rowValues[39] ?? '0'}`,
                biotina: `${rowValues[40] ?? '0'}`,
                cobalmina: `${rowValues[41] ?? '0'}`,
                acidoAscorbico: `${rowValues[42] ?? '0'}`,
                acidoFolico: `${rowValues[43] ?? '0'}`,
                vitaminaA: `${rowValues[44] ?? '0'}`,
                vitaminaD: `${rowValues[45] ?? '0'}`,
                vitaminaK: `${rowValues[46] ?? '0'}`,
                vitaminaE: `${rowValues[47] ?? '0'}`,
            },
            minerales: {
                calcio: `${rowValues[48] ?? '0'}`,
                fosforo: `${rowValues[49] ?? '0'}`,
                hierro: `${rowValues[50] ?? '0'}`,
                hierroNoHem: `${rowValues[51] ?? '0'}`,
                hierroTotal: `${Number(rowValues[50] + rowValues[51]) ?? '0'}`,
                magnesio: `${rowValues[52] ?? '0'}`,
                sodio: `${rowValues[53] ?? '0'}`,
                potasio: `${rowValues[54] ?? '0'}`,
                zinc: `${rowValues[55] ?? '0'}`,
                selenio: `${rowValues[56] ?? '0'}`,
            },
            aspectoGlucemico: {
                indiceGlicemico: `${rowValues[57] ?? '0'}`,
                cargaGlicemica: `${rowValues[58] ?? '0'}`,
            },
            aspectoMedioambiental: {
                factorDeCorreccionParaHuellaHidricaYEGEI: rowValues[59] ?? 0,
                tipo: `${rowValues[60] ?? 'N/A'}`,
                lugar: `${rowValues[61] ?? 'N/A'}`,
                huellaHidricaTotal: `${
                    Number(rowValues[62]) + Number(rowValues[63]) + Number(rowValues[64])
                }`,
                huellaHidricaVerde: `${rowValues[62] ?? '0'}`,
                huellaHidricaAzul: `${rowValues[63] ?? '0'}`,
                huellaHidricaGris: `${rowValues[64] ?? '0'}`,
                aguaParaLavado: `${rowValues[65] ?? '0'}`,
                aguaParaCoccion: `${rowValues[66] ?? '0'}`,
                lugarEGEI: `${rowValues[67] ?? '0'}`,
                citaEGEI: `${rowValues[68] ?? '0'}`,
                huellaCarbono: `${rowValues[69] ?? '0'}`, // EGEI.
                huellaEcologica: `${rowValues[70] ?? '0'}`,
                usoDeSuelo: `${rowValues[71] ?? '0'}`,
                energiaFosil: `${rowValues[72] ?? '0'}`,
                nitrogeno: `${rowValues[73] ?? '0'}`,
                fosforo: `${rowValues[74] ?? '0'}`,
                puntajeEcologico: rowValues[75] ?? 0,
            },
            aspectoEconomico: {
                precio: rowValues[76] ?? 0,
                lugarDeCompra: `${rowValues[77] ?? 'N/A'}`,
                lugarDeVenta: `${rowValues[78] ?? 'N/A'}`,
            },
            componentesBioactivos: {
                fitoquimicos: `${rowValues[79] ?? '0'}`,
                polifenoles: `${rowValues[80] ?? '0'}`,
                antocianinas: `${rowValues[81] ?? '0'}`,
                taninos: `${rowValues[82] ?? '0'}`,
                isoflavonas: `${rowValues[83] ?? '0'}`,
                resveratrol: `${rowValues[84] ?? '0'}`,
                isotiocinatos: `${rowValues[85] ?? '0'}`,
                caretenoides: `${rowValues[86] ?? '0'}`,
                betacarotenos: `${rowValues[87] ?? '0'}`,
                licopeno: `${rowValues[88] ?? '0'}`,
                luteina: `${rowValues[89] ?? '0'}`,
                alicina: `${rowValues[90] ?? '0'}`,
                cafeina: `${rowValues[91] ?? '0'}`,
                UFC: `${rowValues[92] ?? '0'}`,
            },
            aditivosAlimentarios: {
                benzoatoDeSodio: `${rowValues[93] ?? '0'}`,
                polisorbato: `${rowValues[94] ?? '0'}`,
                azulBrillanteFCFoE133: `${rowValues[95] ?? '0'}`,
                azurrubinaOE102: `${rowValues[96] ?? '0'}`,
                amarilloOcasoFDFoE110: `${rowValues[97] ?? '0'}`,
                tartrazinaOE102: `${rowValues[98] ?? '0'}`,
                verdeSoE142: `${rowValues[99] ?? '0'}`,
                negroBrillanteBNoE151: `${rowValues[100] ?? '0'}`,
                sucralosa: `${rowValues[101] ?? '0'}`,
                estevia: `${rowValues[102] ?? '0'}`,
                sacarina: `${rowValues[103] ?? '0'}`,
                aspartame: `${rowValues[104] ?? '0'}`,
                acesulfameK: `${rowValues[105] ?? '0'}`,
                carboxymethylcellulose: `${rowValues[106] ?? '0'}`,
                dioxidoDeTitanio: `${rowValues[107] ?? '0'}`,
                monolauratoDeGlicerol: `${rowValues[108] ?? '0'}`,
            },
            atributosAdicionales: [
                {
                    atributoAdicional: `${rowValues[109] ?? 'N/A'}`,
                },
            ],
            marca: `${rowValues[108] ?? ''}`,
        };
    };

    return (
        <Form
            className={styles.addFoodFormContainer}
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}>
            <Col xs={12}>
                <Form.Item
                    name={'nombre'}
                    label={<label className={styles.formItem}>Nombre</label>}
                    required>
                    <Input placeholder='Ingrese el nombre del alimento' />
                </Form.Item>
                <Form.Item
                    name='image'
                    wrapperCol={{ sm: 24 }}
                    label={<label className={styles.formItem}>Imagen</label>}
                    tooltip={{
                        title: 'Seleccione una imagen del alimento',
                        icon: <InfoCircleOutlined />,
                    }}>
                    <UploadImgs onChange={handleUploadImg} />
                </Form.Item>
            </Col>
            <Card title='Íconos'>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name={'iconoNutricional'}
                            label={
                                <label className={styles.formItem}>Ícono nutricional</label>
                            }
                            tooltip={{
                                title: 'Seleccione el ícono nutricional',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' className={styles.selectItem}>
                                <Option key={1} value={'1'}>
                                    Bueno
                                </Option>
                                <Option key={2} value={'2'}>
                                    Regular
                                </Option>
                                <Option key={3} value={'3'}>
                                    Malo
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'iconoAmbiental'}
                            wrapperCol={{ sm: 24 }}
                            label={<label className={styles.formItem}>Ícono ambiental</label>}
                            tooltip={{
                                title: 'Seleccione el ícono ambiental',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' className={styles.selectItem}>
                                <Option key={1} value={'1'}>
                                    Bueno
                                </Option>
                                <Option key={2} value={'2'}>
                                    Regular
                                </Option>
                                <Option key={3} value={'3'}>
                                    Malo
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name={'iconoEconomia'}
                            wrapperCol={{ sm: 24 }}
                            label={<label className={styles.formItem}>Ícono economía</label>}
                            tooltip={{
                                title: 'Seleccione el ícono de economía',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' className={styles.selectItem}>
                                <Option key={1} value={'1'}>
                                    Bueno
                                </Option>
                                <Option key={2} value={'2'}>
                                    Regular
                                </Option>
                                <Option key={3} value={'3'}>
                                    Malo
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'iconoCultura'}
                            wrapperCol={{ sm: 24 }}
                            label={
                                <label className={styles.formItem}>
                                    Ícono de cultura sociedad
                                </label>
                            }
                            tooltip={{
                                title: 'Seleccione el ícono de cultura sociedad',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' className={styles.selectItem}>
                                <Option key={1} value={'1'}>
                                    Bueno
                                </Option>
                                <Option key={2} value={'2'}>
                                    Regular
                                </Option>
                                <Option key={3} value={'3'}>
                                    Malo
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            {/*OPCIONES DE PREPARACIÓN AQUÍ*/}
            <br />
            {/*CANTIDAD DE ALIMENTOS*/}
            <Card title='Cantidad de alimento'>
                <Form.Item
                    name={'cantidadAlimento'}
                    label={<label className={styles.formItem}>Cantidad sugerida</label>}
                    required>
                    <Select defaultValue='1' className={styles.selectItem}>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <option value={index} key={index}>
                                {index}
                            </option>
                        ))}
                    </Select>
                </Form.Item>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'unidad'}
                            label={<label className={styles.formItem}>Unidad</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={selectAddOnAfter}
                                placeholder='Ingrese la unidad'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={<label className={styles.formItem}>Peso neto</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese el peso neto'
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <br />
            <Form.Item
                name={'grupoExp'}
                label={<label className={styles.formItem}>Grupo exportable</label>}
                required>
                <Input placeholder='Ingrese el grupo exportable' />
            </Form.Item>
            <Form.Item
                name={'subGrupoExp'}
                label={<label className={styles.formItem}>Sub grupo exportable</label>}
                required>
                <Input placeholder='Ingrese el grupo sub exportable' />
            </Form.Item>
            <Form.Item
                name={'clasificacionExp'}
                label={<label className={styles.formItem}>Clasificación exportable</label>}
                required>
                <Input placeholder='Ingrese la clasificación exportable' />
            </Form.Item>
            <Form.Item
                name={'grupoAlimentos'}
                label={<label className={styles.formItem}>Grupo de alimento</label>}
                required>
                <Input placeholder='Ingrese el grupo de alimento al que pertenece' />
            </Form.Item>
            <Form.Item
                name={'mensajeNutricional'}
                label={<label className={styles.formItem}>Mensaje nutricional </label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'mensajeAmbiental'}
                label={<label className={styles.formItem}>Mensaje ambiental</label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'mensajeEconomico'}
                label={<label className={styles.formItem}>Mensaje económico</label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'mensajeCultural'}
                label={<label className={styles.formItem}>Mensaje cultural</label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'preparacion'}
                label={<label className={styles.formItem}>Opciones de preparación</label>}
                required>
                <InputTags
                    source={foodOptions}
                    onUpdateOptions={setFoodOptions}
                    onRemoveTag={handleRemoveTag}
                />
            </Form.Item>

            <Form.Item
                name={'calorias'}
                label={<label className={styles.formItem}>Calorías de alimentos</label>}
                required>
                <Select defaultValue='1' className={styles.selectItem}>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <option value={index} key={index}>
                            {index}
                        </option>
                    ))}
                </Select>
            </Form.Item>
            <Card title='Calorías macronutrientes'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'energiamacro'}
                            label={<label className={styles.formItem}>Energía</label>}
                            required>
                            <InputNumber
                                addonAfter={afterKCAL}
                                type='number'
                                placeholder='Ingrese la cantidad de energía'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'proteinamacro'}
                            label={<label className={styles.formItem}>Proteína</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de proteína'
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'saturadasmacro'}
                            label={<label className={styles.formItem}>AG Saturados</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de grasas saturadas'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'monoinsaturadosmacro'}
                            label={
                                <label className={styles.formItem}>AG Monoinsaturados</label>
                            }
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de grasas monoinsaturados'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'adpoliinsaturadosmacro'}
                            label={
                                <label className={styles.formItem}>AG Poliinsaturadas</label>
                            }
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de poliinsaturadas'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'lipidosmacro'}
                            label={<label className={styles.formItem}>Lípidos</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de lipidos'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'colestrerolmacro'}
                            label={<label className={styles.formItem}>Colesterol</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de colesterol'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'omega3macro'}
                            label={<label className={styles.formItem}>Omega 3</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de omega3'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'omega6macro'}
                            label={<label className={styles.formItem}>Omega6</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de omega6'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'omega9'}
                            label={<label className={styles.formItem}>Omega9</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de omega9'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'hidratosCarbonomacro'}
                            label={
                                <label className={styles.formItem}>Hidratos de Carbono</label>
                            }
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de hidratos de carbono'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'fibramacro'}
                            label={<label className={styles.formItem}>Fibra</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de fibra'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'fibrasolublemacro'}
                            label={<label className={styles.formItem}>Fibra soluble</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de fibra soluble'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'fibrainsolublemacro'}
                            label={<label className={styles.formItem}>Fibra insoluble</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de fibra insoluble'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'azucarmacro'}
                            label={<label className={styles.formItem}>Azúcar</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de azúcar'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'etanolmacro'}
                            label={<label className={styles.formItem}>Etanol</label>}
                            required>
                            <InputNumber
                                addonAfter={afterG}
                                type='number'
                                placeholder='Ingrese la cantidad de etanol'
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <Card title='Minerales'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'calcio'}
                            label={<label className={styles.formItem}>Calcio</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de calcio'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'fosforo'}
                            label={<label className={styles.formItem}>Fósforo</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de fosforo'
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'hierro'}
                            label={<label className={styles.formItem}>Hierro</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de hierro '
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'hierroNoHem'}
                            label={<label className={styles.formItem}>Hierro No Hem</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de hierro no hem '
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'hierroTotal'}
                            label={<label className={styles.formItem}>Hierro total</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de hierroTotal '
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'magnesio'}
                            label={<label className={styles.formItem}>Magnesio</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de magnesio'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'sodio'}
                            label={<label className={styles.formItem}>Sodio</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de sodio'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'potasio'}
                            label={<label className={styles.formItem}>Potasio</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de potasio'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'zinc'}
                            label={<label className={styles.formItem}>Zinc</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de zinc'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'selenio'}
                            label={<label className={styles.formItem}>Selenio</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de selenio'
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <Card title='Vitaminas'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'tiamina'}
                            label={<label className={styles.formItem}>Tiamina</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de tiamina'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'riboflavin'}
                            label={<label className={styles.formItem}>Riboflavin</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de riboflavin'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'niacina'}
                            label={<label className={styles.formItem}>Niacina</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de niacina '
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'acidoPantotenico'}
                            label={
                                <label className={styles.formItem}>Ácido pantotenico</label>
                            }
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de ácido pantotenico'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'piridoxina'}
                            label={<label className={styles.formItem}>Piridoxina</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de piridoxina'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'biotina'}
                            label={<label className={styles.formItem}>Biotina</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de biotina'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'cobalmina'}
                            label={<label className={styles.formItem}>Cobalmina</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de cobalmina'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'acidoAscorbico'}
                            label={<label className={styles.formItem}>Ácido ascorbico</label>}
                            required>
                            <InputNumber
                                addonAfter={afterMG}
                                type='number'
                                placeholder='Ingrese la cantidad de ácido ascorbico'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'acidoFolico'}
                            label={<label className={styles.formItem}>Ácido folico</label>}
                            required>
                            <InputNumber
                                addonAfter={afterUG}
                                type='number'
                                placeholder='Ingrese la cantidad de ácido folico'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaA'}
                            label={<label className={styles.formItem}>Vitamina A</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterUG_RE}
                                placeholder='Ingrese la cantidad de vitamina A'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaD'}
                            label={<label className={styles.formItem}>Vitamina D</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterUG_RE}
                                placeholder='Ingrese la cantidad de vitamina D'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaK'}
                            label={<label className={styles.formItem}>vitamina K</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de vitamina K'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaE'}
                            label={<label className={styles.formItem}>Vitamina E</label>}
                            required>
                            <InputNumber
                                type='number'
                                addonAfter={afterMG}
                                placeholder='Ingrese la cantidad de vitamina E'
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <Card title='Aspecto glucemico'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'indiceGlucemico'}
                            label={
                                <label className={styles.formItem}>Índice glucémico</label>
                            }
                            required>
                            <Input placeholder='Ingrese el índice glucémico' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'cargaGlucemica'}
                            label={<label className={styles.formItem}>Carga glucémica</label>}
                            required>
                            <Input placeholder='Ingrese la carga glucemica' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/*ASPECTO MEDIOAMBIENTAL*/}
            <Card title='Aspecto medioambiental'>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'factorCoreccion'}
                            label={
                                <label className={styles.formItem}>
                                    Factor de corrección para huella
                                </label>
                            }
                            required>
                            <Input
                                type='number'
                                placeholder='Ingrese el factor de corrección para la huella hídrica YEGEI'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'tipoma'}
                            label={<label className={styles.formItem}>Tipo</label>}
                            required>
                            <Input placeholder='Ingrese el tipo' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'lugarma'}
                            label={<label className={styles.formItem}>Lugar</label>}
                            required>
                            <Input placeholder='Ingrese el lugar' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaTotal'}
                            label={
                                <label className={styles.formItem}>
                                    Huella hídrica total
                                </label>
                            }
                            required>
                            <Input
                                type='number'
                                placeholder='Ingrese la huella hidrica total'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaVerde'}
                            label={
                                <label className={styles.formItem}>
                                    HUella hidrica verde
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese la huella hidrica verde' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaAzul'}
                            label={
                                <label className={styles.formItem}>HUella hidrica azul</label>
                            }
                            required>
                            <Input placeholder='Ingrese la huella hidrica azul' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaGris'}
                            label={
                                <label className={styles.formItem}>Huella hídrica gris</label>
                            }
                            required>
                            <Input
                                type='number'
                                placeholder='Ingrese la huella hidrica gris'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'aguaParaLavado'}
                            label={
                                <label className={styles.formItem}>
                                    Huella hidrica verde
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese la huella hidrica verde' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'aguaParaCoccion'}
                            label={
                                <label className={styles.formItem}>Agua para coccion</label>
                            }
                            required>
                            <Input placeholder='Ingrese la cantidad de agua para coccion' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'lugarEGEI'}
                            label={<label className={styles.formItem}>Lugar EGEI</label>}
                            required>
                            <Input type='number' placeholder='Ingrese el lugar EGEI' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'citaEGEI'}
                            label={<label className={styles.formItem}>CIta EGEI</label>}
                            required>
                            <Input placeholder='Ingrese la cita EGEI' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaCarbono'}
                            label={<label className={styles.formItem}>Huella carbono</label>}
                            required>
                            <Input placeholder='Ingrese la huella carbono' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaEcologica'}
                            label={<label className={styles.formItem}>Huela ecológica</label>}
                            required>
                            <Input type='number' placeholder='Ingrese la huella ecológica' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'energiaFosil'}
                            label={<label className={styles.formItem}>Energía fosil</label>}
                            required>
                            <Input placeholder='Ingrese la energía fósil' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'usoSuelo'}
                            label={<label className={styles.formItem}>Nitrogeno</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de nitrógeno' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'fosforo'}
                            label={<label className={styles.formItem}>Fósforo</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de fósforo' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'puntajeEcologico'}
                            label={
                                <label className={styles.formItem}>Puntaje ecológico</label>
                            }
                            required>
                            <Input type='number' placeholder='Ingrese el puntaje ecológico' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <Card title='Aspecto económico'>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'precio'}
                            label={<label className={styles.formItem}>Precio</label>}
                            required>
                            <InputNumber
                                addonAfter='MXN'
                                decimalSeparator='.'
                                type='number'
                                prefix='$'
                                placeholder='Ingrese el precio'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'lugarCompra'}
                            label={<label className={styles.formItem}>Lugar de compra</label>}
                            required>
                            <Select defaultValue='Mercado'>
                                <Option key={1} value='Tianguis'>
                                    Tianguis
                                </Option>
                                <Option key={2} value='Mercado'>
                                    Mercado
                                </Option>
                                <Option key={3} value='Supermercado Menudeo'>
                                    Supermercado Menudeo
                                </Option>
                                <Option key={4} value='Supermercado Mayoreo'>
                                    Supermercado Mayoreo
                                </Option>
                                <Option key={5} value='Carniceria'>
                                    Carniceria
                                </Option>
                                <Option key={6} value='Cremeria'>
                                    Cremeria
                                </Option>
                                <Option key={7} value='Fruteria'>
                                    Fruteria
                                </Option>
                                <Option key={8} value='Otros'>
                                    Otros
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'lugarVenta'}
                            label={<label className={styles.formItem}>Lugar de venta</label>}
                            required>
                            <Select defaultValue='Mercado'>
                                <Option key={1} value='Tianguis'>
                                    Tianguis
                                </Option>
                                <Option key={2} value='Mercado'>
                                    Mercado
                                </Option>
                                <Option key={3} value='Supermercado Menudeo'>
                                    Supermercado Menudeo
                                </Option>
                                <Option key={4} value='Supermercado Mayoreo'>
                                    Supermercado Mayoreo
                                </Option>
                                <Option key={5} value='Carniceria'>
                                    Carniceria
                                </Option>
                                <Option key={6} value='Cremeria'>
                                    Cremeria
                                </Option>
                                <Option key={7} value='Fruteria'>
                                    Fruteria
                                </Option>
                                <Option key={8} value='Otros'>
                                    Otros
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/*COMPONENTES BIOACTIVOS*/}
            <Card title='Componentes Bioactivos'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'fitoquimicos'}
                            label={<label className={styles.formItem}>Fitoquímicos</label>}
                            required>
                            <Input placeholder='Ingrese los fitoquimicos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'polifenoles'}
                            label={<label className={styles.formItem}>Polifenos</label>}
                            required>
                            <Input placeholder='Ingrese los polifenos' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'antocianinas'}
                            label={<label className={styles.formItem}>Antocianinas</label>}
                            required>
                            <Input placeholder='Ingrese las antocianinas ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'taninos'}
                            label={<label className={styles.formItem}>Taninos</label>}
                            required>
                            <Input placeholder='Ingrese los tianinos' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'isoflavonas'}
                            label={<label className={styles.formItem}>Isoflavonas</label>}
                            required>
                            <Input placeholder='Ingrese las insoflavonas' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'resveraterol'}
                            label={<label className={styles.formItem}>Resveratrol</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de resveratrol' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'isotiocinatos'}
                            label={<label className={styles.formItem}>Isotiocinatos</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de isotiocinatos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'caretenoides'}
                            label={<label className={styles.formItem}>Caretenoides</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de caretenoides' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'betacarotenos'}
                            label={<label className={styles.formItem}>Betacarotenos</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de betacarotenos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'licopeno'}
                            label={<label className={styles.formItem}>Licopeno</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de licopeno' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'luteina'}
                            label={<label className={styles.formItem}>Luteina</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de luteina' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'alicina'}
                            label={<label className={styles.formItem}>Alicina</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de Alicina' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'cafeina'}
                            label={<label className={styles.formItem}>Cafeína</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de Cafeína' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'UFC'}
                            label={<label className={styles.formItem}>UFC</label>}
                            required>
                            <Input placeholder='Ingrese UFC' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/*ADITIVOS ALIMENTARIOS*/}
            <Card title='Aditivos alimentarios'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'benzoatoDeSodio'}
                            label={
                                <label className={styles.formItem}>Benzoato de sodio</label>
                            }
                            required>
                            <Input placeholder='Ingrese Benzoato de sodio' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'polisorbato'}
                            label={<label className={styles.formItem}>Polisorbato</label>}
                            required>
                            <Input placeholder='Ingrese polisorbato' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'azulBrillanteFCFoE133'}
                            label={
                                <label className={styles.formItem}>
                                    Azul Brillante FCFoE133
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese azulBrillanteFCFoE133 ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'azurrubinaOE102'}
                            label={<label className={styles.formItem}>AzurrubinaOE102</label>}
                            required>
                            <Input placeholder='Ingrese azurrubinaOE102' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'amarilloOcasoFDFoE110'}
                            label={
                                <label className={styles.formItem}>
                                    Amarillo OcasoFDFoE110
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese amarilloOcasoFDFoE110' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'tartrazinaOE102'}
                            label={
                                <label className={styles.formItem}>Tartrazina OE102</label>
                            }
                            required>
                            <Input placeholder='Ingrese tartrazinaOE102 ' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'verdeSoE142'}
                            label={<label className={styles.formItem}>Verde SoE142</label>}
                            required>
                            <Input placeholder='Ingrese verdeSoE142' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'negroBrillanteBNoE151'}
                            label={
                                <label className={styles.formItem}>
                                    Negro Brillante BNoE151
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese negroBrillanteBNoE151' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'sucralosa'}
                            label={<label className={styles.formItem}>sucralosa</label>}
                            required>
                            <Input placeholder='Ingrese sucralosa' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'estevia'}
                            label={<label className={styles.formItem}>Estevia</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de estevia' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'sacarina'}
                            label={<label className={styles.formItem}>Sacarina</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de sacarina' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'aspartame'}
                            label={<label className={styles.formItem}>Aspartame</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de aspartame' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'acesulfameK'}
                            label={<label className={styles.formItem}>AcesulfameK</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de acesulfameK' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'carboxymethylcellulose'}
                            label={
                                <label className={styles.formItem}>
                                    Carboxymethylcellulose
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese carboxymethylcellulose' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'dioxidoDeTitanio'}
                            label={
                                <label className={styles.formItem}>Dióxido De Titanio</label>
                            }
                            required>
                            <Input placeholder='Ingrese la cantidad de dioxidoDeTitanio' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'monolauratoDeGlicerol'}
                            label={
                                <label className={styles.formItem}>
                                    Monolaurato De Glicerol
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese monolauratoDeGlicerol' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            {/*
            ATRIBUTOS ADICIONALES 

            <Card title="Atributos adicionales">
            <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            name={"atributoadicional"}
                            label={
                                <label className={styles.formItem}>
                                    Atributo adicional
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese el atributo adicional' />
                        </Form.Item>
                    </Col>
                    
                </Row>
            </Card>
            <Card title="">
            <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            name={"marca"}
                            label={
                                <label className={styles.formItem}>
                                    Marca
                                </label>
                            }
                            required>
                            <Input placeholder='Ingrese la marca' />
                        </Form.Item>
                    </Col>
                    
                </Row>
            </Card>
            */}

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddFoodForm;
