import { Button } from 'antd';
// import './ButtonsExport.scss'

const ButtonsExport = ({ meta }) => {
    const [ objetivo, setObjetivo ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ categoriaDeSostenibilidad, setCategoriaDeSostenibilidad ] = useState('');
    const [ metas, setMetas ] = useState([]);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleActualizar = () => {
        postMetas();
        setIsModalVisible(false);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <div className="modalActualizarMeta">
                <Modal
                    title='Editar Meta'
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    onOk={handleActualizar}>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Objetivo:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Input placeholder='Objetivo de la Meta' onChange={(e) => setObjetivo(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Descripción:</p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <TextArea
                                placeholder='Descripción de la Meta'
                                autoSize
                                onChange={(e) => setDescripcion(e.target.value)} />
                            <div style={{ margin: '24px 0' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ padding: 7 }}>
                            <p>Categoria de Sostenibilidad:</p>
                        </Col>
                        <Col span={6} style={{ padding: 16 }}>
                            <Select id="categoriaMeta" defaultValue='cultura' style={{ width: 120 }} onChange={obtenerCategoria}>
                                <Option value='cultura'>Cultura</Option>
                                <Option value='sociedad'>Sociedad</Option>
                                <Option value='Economia'>Economía</Option>
                                <Option value='ambiental'>Ambiental</Option>
                                <Option value='nutricional'>Nutricional</Option>
                            </Select>
                        </Col>
                    </Row>
                </Modal>
            </div>
        </>
    );
};

export default ButtonsExport;