import { Form, Input, Button, Select, Row, Col, Card, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

import UploadImgs from '../../../commons/UploadImgs';
import InputTags from '../../../commons/InputTags';
import apiURL from '../../../../axios/axiosConfig';

const AddFoodForm = () => {
    const { TextArea } = Input;
    const { Option } = Select;

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [foodOptions, setFoodOptions] = useState([]);
    const [sku, setSku] = useState('');

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
    console.log(foodOptions);
    const onFinish = async (values) => {
        const sku = await submitGet();
        console.log(sku);
        console.log('Received values of form: ', values);
    };

    const submitGet = async () => {
        try {
            const { data } = await apiURL.get('alimentos/obtenerUltimo/Valor');
            return Number(data.sku + 1);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    return (
        <Form
            form={form}
            layout='vertical'
            initialValues={{
                requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
            onFinish={onFinish}
            text>
            <Form.Item name={'nombre'} label={<label style={{ color: 'black' }}>Nombre</label>} required>
                <Input placeholder='Ingrese el nombre del alimento' />
            </Form.Item>
            <Form.Item
                name='image'
                wrapperCol={{ sm: 24 }}
                label={<label style={{ color: 'black' }}>Imagen</label>}
                tooltip={{
                    title: 'Seleccione una imagen del alimento',
                    icon: <InfoCircleOutlined />,
                }}>
                <UploadImgs />
            </Form.Item>

            {/*ÍCONOS*/}
            <Card title='Íconos'>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name={'iconoNutricional'}
                            wrapperCol={{ sm: 24 }}
                            label={<label style={{ color: 'black' }}>Ícono nutricional</label>}
                            tooltip={{
                                title: 'Seleccione el ícono nutricional',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' style={{ width: 120 }}>
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
                            label={<label style={{ color: 'black' }}>Ícono ambiental</label>}
                            tooltip={{
                                title: 'Seleccione el ícono ambiental',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' style={{ width: 120 }}>
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
                            label={<label style={{ color: 'black' }}>Ícono economía</label>}
                            tooltip={{
                                title: 'Seleccione el ícono de economía',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' style={{ width: 120 }}>
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
                            label={<label style={{ color: 'black' }}>Ícono de cultura sociedad</label>}
                            tooltip={{
                                title: 'Seleccione el ícono de cultura sociedad',
                                icon: <InfoCircleOutlined />,
                            }}>
                            <Select defaultValue='1' style={{ width: 120 }}>
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
                    label={<label style={{ color: 'black' }}>Cantidad sugerida</label>}
                    required>
                    <Select defaultValue='1' style={{ width: 120 }}>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <option value={index} key={index}>
                                {index}
                            </option>
                        ))}
                    </Select>
                </Form.Item>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'unidad'} label={<label style={{ color: 'black' }}>Unidad</label>} required>
                            <Input placeholder='Ingrese la unidad' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<label style={{ color: 'black' }}>Peso neto</label>} required>
                            <Input placeholder='Ingrese el peso neto' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <br />

            {/*CALORÍAS MACRONUTRIENTES*/}
            <Card title='Cantidad de alimento'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'cantidadEnergia'}
                            label={<label style={{ color: 'black' }}>Energía</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de energía' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'cantidadProteina'}
                            label={<label style={{ color: 'black' }}>Proteínan</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de proteína' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'cantiadSaturadas'}
                            label={<label style={{ color: 'black' }}>Grasas saturadas</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de grasas saturadas' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'cantidadMono'}
                            label={<label style={{ color: 'black' }}>Grasas monoinsaturados</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de grasas monoinsaturados' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            <Form.Item name={'grupoExp'} label={<label style={{ color: 'black' }}>Grupo exportable</label>} required>
                <Input placeholder='Ingrese el grupo exportable' />
            </Form.Item>
            <Form.Item
                name={'subGrupoExp'}
                label={<label style={{ color: 'black' }}>Sub grupo exportable</label>}
                required>
                <Input placeholder='Ingrese el grupo sub exportable' />
            </Form.Item>
            <Form.Item
                name={'clasificacionExp'}
                label={<label style={{ color: 'black' }}>Clasificación exportable</label>}
                required>
                <Input placeholder='Ingrese la clasificación exportable' />
            </Form.Item>
            <Form.Item
                name={'grupoAlimentos'}
                label={<label style={{ color: 'black' }}>Grupo de alimento</label>}
                required>
                <Input placeholder='Ingrese el grupo de alimento al que pertenece' />
            </Form.Item>
            <Form.Item
                name={'mensajeNutricional'}
                label={<label style={{ color: 'black' }}>Mensaje nutricional </label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'mensajeAmbiental'}
                label={<label style={{ color: 'black' }}>Mensaje ambiental</label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'mensajeEconomico'}
                label={<label style={{ color: 'black' }}>Mensaje económico</label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'mensajeCultural'}
                label={<label style={{ color: 'black' }}>Mensaje cultural</label>}
                required>
                <TextArea rows={2} placeholder='Ingrese el mensaje' />
            </Form.Item>
            <Form.Item
                name={'preparacion'}
                label={<label style={{ color: 'black' }}>Opciones de preparación</label>}
                required>
                <InputTags source={foodOptions} onUpdateOptions={setFoodOptions} onRemoveTag={handleRemoveTag} />
            </Form.Item>

            <Form.Item
                name={'calorias'}
                label={<label style={{ color: 'black' }}>Calorías de alimentos</label>}
                required>
                <Select defaultValue='1' style={{ width: 120 }}>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <option value={index} key={index}>
                            {index}
                        </option>
                    ))}
                </Select>
            </Form.Item>

            {/*CALORÍAS MACRONUTRIENTES*/}
            <Card title='Calorías macronutrientes'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'energiamacro'}
                            label={<label style={{ color: 'black' }}>Energía</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de energía' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'proteinamacro'}
                            label={<label style={{ color: 'black' }}>Proteínan</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de proteína' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'saturadasmacro'}
                            label={<label style={{ color: 'black' }}>Grasas saturadas</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de grasas saturadas' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'monoinsaturadosmacro'}
                            label={<label style={{ color: 'black' }}>Grasas monoinsaturados</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de grasas monoinsaturados' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'lipidosmacro'}
                            label={<label style={{ color: 'black' }}>Lípidos</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de lipidos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'adpoliinsaturadosmacro'}
                            label={<label style={{ color: 'black' }}>Ag Poliinsaturadas</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de poliinsaturadas' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'colestrerolmacro'}
                            label={<label style={{ color: 'black' }}>Colesterol</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de colesterol' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'omega3macro'}
                            label={<label style={{ color: 'black' }}>Ag Poliinsaturadas</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de omega3' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'omega6macro'}
                            label={<label style={{ color: 'black' }}>Omega6</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de omega6' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'adpoliinsaturados'}
                            label={<label style={{ color: 'black' }}>Ag Poliinsaturadas</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de poliinsaturadas' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'lipidosmacro'}
                            label={<label style={{ color: 'black' }}>Lípidos</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de lipidos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'omega9'} label={<label style={{ color: 'black' }}>Omega9</label>} required>
                            <Input placeholder='Ingrese la cantidad de omega9' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'hidratosCarbonomacro'}
                            label={<label style={{ color: 'black' }}>Hidratos de Carbono</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de hidratos de carbono' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'fibramacro'} label={<label style={{ color: 'black' }}>Fibra</label>} required>
                            <Input placeholder='Ingrese la cantidad de fibra' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'fibrasolublemacro'}
                            label={<label style={{ color: 'black' }}>Fibra soluble</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de fibra soluble' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'fibrainsolublemacro'}
                            label={<label style={{ color: 'black' }}>Fibra insoluble</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de fibra insoluble' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'azucarmacro'}
                            label={<label style={{ color: 'black' }}>Azúcar</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de azúcar' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'etanolmacro'}
                            label={<label style={{ color: 'black' }}>Etanol</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de etanol' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/*Minerales*/}
            <Card title='Minerales'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'calcio'} label={<label style={{ color: 'black' }}>Calcio</label>} required>
                            <Input placeholder='Ingrese la cantidad de calcio' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'fosforo'} label={<label style={{ color: 'black' }}>Fósforo</label>} required>
                            <Input placeholder='Ingrese la cantidad de fosforo' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'hierro'} label={<label style={{ color: 'black' }}>Hierro</label>} required>
                            <Input placeholder='Ingrese la cantidad de hierro ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'hierroNoHem'}
                            label={<label style={{ color: 'black' }}>Hierro No Hem</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de hierro no hem ' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'hierroTotal'}
                            label={<label style={{ color: 'black' }}>Hierro total</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de hierroTotal ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'magnesio'}
                            label={<label style={{ color: 'black' }}>Magnesio</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de magnesio' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'sodio'} label={<label style={{ color: 'black' }}>Sodio</label>} required>
                            <Input placeholder='Ingrese la cantidad de sodio' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'potasio'} label={<label style={{ color: 'black' }}>Potasio</label>} required>
                            <Input placeholder='Ingrese la cantidad de potasio' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'zinc'} label={<label style={{ color: 'black' }}>Zinc</label>} required>
                            <Input placeholder='Ingrese la cantidad de zinc' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'selenio'} label={<label style={{ color: 'black' }}>Selenio</label>} required>
                            <Input placeholder='Ingrese la cantidad de selenio' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/*VITAMINAS*/}
            <Card title='Vitaminas'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'tiamina'} label={<label style={{ color: 'black' }}>Tiamina</label>} required>
                            <Input placeholder='Ingrese la cantidad de tiamina' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'riboflavin'}
                            label={<label style={{ color: 'black' }}>Riboflavin</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de riboflavin' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'niacina'} label={<label style={{ color: 'black' }}>Niacina</label>} required>
                            <Input placeholder='Ingrese la cantidad de niacina ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'acidoPantotenico'}
                            label={<label style={{ color: 'black' }}>Ácido pantotenico</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de ácido pantotenico' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'piridoxina'}
                            label={<label style={{ color: 'black' }}>Piridoxina</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de piridoxina' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'biotina'} label={<label style={{ color: 'black' }}>Biotina</label>} required>
                            <Input placeholder='Ingrese la cantidad de biotina' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'cobalmina'}
                            label={<label style={{ color: 'black' }}>Cobalmina</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de cobalmina' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'acidoAscorbico'}
                            label={<label style={{ color: 'black' }}>Ácido ascorbico</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de ácido ascorbico' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'acidoFolico'}
                            label={<label style={{ color: 'black' }}>Ácido folico</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de ácido folico' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaA'}
                            label={<label style={{ color: 'black' }}>Vitamina A</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de vitamina A' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaD'}
                            label={<label style={{ color: 'black' }}>Vitamina D</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de vitamina D' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaK'}
                            label={<label style={{ color: 'black' }}>vitamina K</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de vitamina K' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'vitaminaE'}
                            label={<label style={{ color: 'black' }}>Vitamina E</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de vitamina E' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/*ASPECTO GLUCEMICO*/}
            <Card title='Aspecto glucemico'>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'indiceGlucemico'}
                            label={<label style={{ color: 'black' }}>Índice glucémico</label>}
                            required>
                            <Input placeholder='Ingrese el índice glucémico' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'cargaGlucemica'}
                            label={<label style={{ color: 'black' }}>Carga glucémica</label>}
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
                            label={<label style={{ color: 'black' }}>Factor de corrección para huella</label>}
                            required>
                            <Input
                                type='number'
                                placeholder='Ingrese el factor de corrección para la huella hídrica YEGEI'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={'tipoma'} label={<label style={{ color: 'black' }}>Tipo</label>} required>
                            <Input placeholder='Ingrese el tipo' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={'lugarma'} label={<label style={{ color: 'black' }}>Lugar</label>} required>
                            <Input placeholder='Ingrese el lugar' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaTotal'}
                            label={<label style={{ color: 'black' }}>Huella hídrica total</label>}
                            required>
                            <Input type='number' placeholder='Ingrese la huella hidrica total' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaVerde'}
                            label={<label style={{ color: 'black' }}>HUella hidrica verde</label>}
                            required>
                            <Input placeholder='Ingrese la huella hidrica verde' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaAzul'}
                            label={<label style={{ color: 'black' }}>HUella hidrica azul</label>}
                            required>
                            <Input placeholder='Ingrese la huella hidrica azul' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaHidricaGris'}
                            label={<label style={{ color: 'black' }}>Huella hídrica gris</label>}
                            required>
                            <Input type='number' placeholder='Ingrese la huella hidrica gris' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'aguaParaLavado'}
                            label={<label style={{ color: 'black' }}>Huella hidrica verde</label>}
                            required>
                            <Input placeholder='Ingrese la huella hidrica verde' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'aguaParaCoccion'}
                            label={<label style={{ color: 'black' }}>Agua para coccion</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de agua para coccion' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'lugarEGEI'}
                            label={<label style={{ color: 'black' }}>Lugar EGEI</label>}
                            required>
                            <Input type='number' placeholder='Ingrese el lugar EGEI' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'citaEGEI'}
                            label={<label style={{ color: 'black' }}>CIta EGEI</label>}
                            required>
                            <Input placeholder='Ingrese la cita EGEI' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaCarbono'}
                            label={<label style={{ color: 'black' }}>Huella carbono</label>}
                            required>
                            <Input placeholder='Ingrese la huella carbono' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            name={'huellaEcologica'}
                            label={<label style={{ color: 'black' }}>Huela ecológica</label>}
                            required>
                            <Input type='number' placeholder='Ingrese la huella ecológica' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'energiaFosil'}
                            label={<label style={{ color: 'black' }}>Energía fosil</label>}
                            required>
                            <Input placeholder='Ingrese la energía fósil' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'usoSuelo'}
                            label={<label style={{ color: 'black' }}>Nitrogeno</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de nitrógeno' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'fosforo'} label={<label style={{ color: 'black' }}>Fósforo</label>} required>
                            <Input placeholder='Ingrese la cantidad de fósforo' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'puntajeEcologico'}
                            label={<label style={{ color: 'black' }}>Puntaje ecológico</label>}
                            required>
                            <Input type='number' placeholder='Ingrese el puntaje ecológico' />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/*ASPECTO ECONOMICO*/}
            <Card title='Aspecto económico'>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item name={'precio'} label={<label style={{ color: 'black' }}>Precio</label>} required>
                            <Input type='number' placeholder='Ingrese el precio' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'lugarCompra'}
                            label={<label style={{ color: 'black' }}>Lugar de compra</label>}
                            required>
                            <Input placeholder='Ingrese el lugar de compra' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={'lugarVenta'}
                            label={<label style={{ color: 'black' }}>Lugar de venta</label>}
                            required>
                            <Input placeholder='Ingrese el lugar de venta' />
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
                            label={<label style={{ color: 'black' }}>Fitoquímicos</label>}
                            required>
                            <Input placeholder='Ingrese los fitoquimicos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'polifenoles'}
                            label={<label style={{ color: 'black' }}>Polifenos</label>}
                            required>
                            <Input placeholder='Ingrese los polifenos' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'antocianinas'}
                            label={<label style={{ color: 'black' }}>Antocianinas</label>}
                            required>
                            <Input placeholder='Ingrese las antocianinas ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'taninos'} label={<label style={{ color: 'black' }}>Taninos</label>} required>
                            <Input placeholder='Ingrese los tianinos' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'isoflavonas'}
                            label={<label style={{ color: 'black' }}>Isoflavonas</label>}
                            required>
                            <Input placeholder='Ingrese las insoflavonas' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'resveraterol'}
                            label={<label style={{ color: 'black' }}>Resveratrol</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de resveratrol' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'isotiocinatos'}
                            label={<label style={{ color: 'black' }}>Isotiocinatos</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de isotiocinatos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'caretenoides'}
                            label={<label style={{ color: 'black' }}>Caretenoides</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de caretenoides' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'betacarotenos'}
                            label={<label style={{ color: 'black' }}>Betacarotenos</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de betacarotenos' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'licopeno'}
                            label={<label style={{ color: 'black' }}>Licopeno</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de licopeno' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'luteina'} label={<label style={{ color: 'black' }}>Luteina</label>} required>
                            <Input placeholder='Ingrese la cantidad de luteina' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'alicina'} label={<label style={{ color: 'black' }}>Alicina</label>} required>
                            <Input placeholder='Ingrese la cantidad de Alicina' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name={'cafeina'} label={<label style={{ color: 'black' }}>Cafeína</label>} required>
                            <Input placeholder='Ingrese la cantidad de Cafeína' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={'UFC'} label={<label style={{ color: 'black' }}>UFC</label>} required>
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
                            label={<label style={{ color: 'black' }}>Benzoato de sodio</label>}
                            required>
                            <Input placeholder='Ingrese Benzoato de sodio' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'polisorbato'}
                            label={<label style={{ color: 'black' }}>Polisorbato</label>}
                            required>
                            <Input placeholder='Ingrese polisorbato' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'azulBrillanteFCFoE133'}
                            label={<label style={{ color: 'black' }}>Azul Brillante FCFoE133</label>}
                            required>
                            <Input placeholder='Ingrese azulBrillanteFCFoE133 ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'azurrubinaOE102'}
                            label={<label style={{ color: 'black' }}>AzurrubinaOE102</label>}
                            required>
                            <Input placeholder='Ingrese azurrubinaOE102' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'amarilloOcasoFDFoE110'}
                            label={<label style={{ color: 'black' }}>Amarillo OcasoFDFoE110</label>}
                            required>
                            <Input placeholder='Ingrese amarilloOcasoFDFoE110' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'tartrazinaOE102'}
                            label={<label style={{ color: 'black' }}>Tartrazina OE102</label>}
                            required>
                            <Input placeholder='Ingrese tartrazinaOE102 ' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'verdeSoE142'}
                            label={<label style={{ color: 'black' }}>Verde SoE142</label>}
                            required>
                            <Input placeholder='Ingrese verdeSoE142' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'negroBrillanteBNoE151'}
                            label={<label style={{ color: 'black' }}>Negro Brillante BNoE151</label>}
                            required>
                            <Input placeholder='Ingrese negroBrillanteBNoE151' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'sucralosa'}
                            label={<label style={{ color: 'black' }}>sucralosa</label>}
                            required>
                            <Input placeholder='Ingrese sucralosa' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={'estevia'} label={<label style={{ color: 'black' }}>Estevia</label>} required>
                            <Input placeholder='Ingrese la cantidad de estevia' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'sacarina'}
                            label={<label style={{ color: 'black' }}>Sacarina</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de sacarina' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={'aspartame'}
                            label={<label style={{ color: 'black' }}>Aspartame</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de aspartame' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'acesulfameK'}
                            label={<label style={{ color: 'black' }}>AcesulfameK</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de acesulfameK' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'carboxymethylcellulose'}
                            label={<label style={{ color: 'black' }}>Carboxymethylcellulose</label>}
                            required>
                            <Input placeholder='Ingrese carboxymethylcellulose' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name={'dioxidoDeTitanio'}
                            label={<label style={{ color: 'black' }}>Dióxido De Titanio</label>}
                            required>
                            <Input placeholder='Ingrese la cantidad de dioxidoDeTitanio' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={'monolauratoDeGlicerol'}
                            label={<label style={{ color: 'black' }}>Monolaurato De Glicerol</label>}
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
                                <label style={{ color: 'black' }}>
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
                                <label style={{ color: 'black' }}>
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
