import { Form, Input, Button } from 'antd';

import { Rules } from '../../../utils/formRules';

const Props = ({ dataSource, form, onFinish }) => {
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                form={form}
                layout='vertical'
                name='basic'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                fields={dataSource}>
                <Form.Item label='Nombre' name='pName' rules={[Rules.basicSpanish]}>
                    <Input />
                </Form.Item>
                <Form.Item label='SKU' name='pSku'>
                    <Input disabled />
                </Form.Item>
                <Form.Item label='Grupo exportable' name='pGroupE'>
                    <Input />
                </Form.Item>
                <Form.Item label='Sub grupo exportable' name='pSubGroupE'>
                    <Input />
                </Form.Item>
                <Form.Item label='Clasificación exportable' name='pClasE'>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Grupo de alimento'
                    name='pGroupAli'
                    rules={[Rules.basicSpanish]}>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Mensajes
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Mensaje nutricional' name='mNutri'>
                    <Input />
                </Form.Item>
                <Form.Item label='Mensaje ambiental' name='mAmbien'>
                    <Input />
                </Form.Item>
                <Form.Item label='Mensaje económico' name='mEcono'>
                    <Input />
                </Form.Item>
                <Form.Item label='Mensaje cultura y sociedad' name='mCult_Soci'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Cantidades
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Sugerida' name='sugerida'>
                    <Input />
                </Form.Item>
                <Form.Item label='Unidad' name='unidad'>
                    <Input />
                </Form.Item>
                <Form.Item label='Peso neto' name='pesoneto'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Macronutrientes
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Energía' name='energia'>
                    <Input />
                </Form.Item>
                <Form.Item label='Proteína' name='proteina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Lípidos' name='lipidos'>
                    <Input />
                </Form.Item>
                <Form.Item label='AG Saturados' name='saturados'>
                    <Input />
                </Form.Item>
                <Form.Item label='AG Monoinsaturados' name='monoinsaturados'>
                    <Input />
                </Form.Item>
                <Form.Item label='Polinsaturados' name='polinsaturados'>
                    <Input />
                </Form.Item>
                <Form.Item label='Colesterol' name='colesterol'>
                    <Input />
                </Form.Item>
                <Form.Item label='Omega 3' name='omega3'>
                    <Input />
                </Form.Item>
                <Form.Item label='Omega 6' name='omega6'>
                    <Input />
                </Form.Item>
                <Form.Item label='Omega 9' name='omega9'>
                    <Input />
                </Form.Item>
                <Form.Item label='Hidratos de carbono' name='hdratoscarbono'>
                    <Input />
                </Form.Item>
                <Form.Item label='Fibra' name='fibra'>
                    <Input />
                </Form.Item>
                <Form.Item label='Fibra insoluble' name='fibrainsoluble'>
                    <Input />
                </Form.Item>
                <Form.Item label='Fibra soluble' name='fibrasoluble'>
                    <Input />
                </Form.Item>
                <Form.Item label='Azúcar' name='azucar'>
                    <Input />
                </Form.Item>
                <Form.Item label='Etanol' name='etanol'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Vitaminas
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Tiamina' name='tiamina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Riboflavin' name='riboflavin'>
                    <Input />
                </Form.Item>
                <Form.Item label='Niacina' name='niacina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Ácido pantoténico' name='acidopantotenico'>
                    <Input />
                </Form.Item>
                <Form.Item label='Piridoxina' name='piridoxina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Biotina' name='biotina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Cobalmina' name='cobalmina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Ácido ascórbico' name='acidoascorbico'>
                    <Input />
                </Form.Item>
                <Form.Item label='Ácido fólico' name='acidofolico'>
                    <Input />
                </Form.Item>
                <Form.Item label='Vitamina A' name='vitaminaA'>
                    <Input />
                </Form.Item>
                <Form.Item label='Vitamina D' name='vitaminaD'>
                    <Input />
                </Form.Item>
                <Form.Item label='Vitamina K' name='vitaminaK'>
                    <Input />
                </Form.Item>
                <Form.Item label='Vitamina E' name='vitaminaE'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Minerales
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Calcio' name='calcio'>
                    <Input />
                </Form.Item>
                <Form.Item label='Fósforo' name='fosforo1'>
                    <Input />
                </Form.Item>
                <Form.Item label='Hierro' name='hierro'>
                    <Input />
                </Form.Item>
                <Form.Item label='Hierro no hem' name='hierronohem'>
                    <Input />
                </Form.Item>
                <Form.Item label='Hierro total' name='hierrototal'>
                    <Input />
                </Form.Item>
                <Form.Item label='Magnesio' name='magnesio'>
                    <Input />
                </Form.Item>
                <Form.Item label='Sodio' name='sodio'>
                    <Input />
                </Form.Item>
                <Form.Item label='Potasio' name='potasio'>
                    <Input />
                </Form.Item>
                <Form.Item label='Zinc' name='zinc'>
                    <Input />
                </Form.Item>
                <Form.Item label='Selenio' name='selenio'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Aspecto glucémico
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Índice glicémico' name='indiceglicemico'>
                    <Input />
                </Form.Item>
                <Form.Item label='Carga glicémica' name='cargaglicemica'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Aspecto medioambiental
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Factor de corrección de huella hídrica' name='fchh'>
                    <Input />
                </Form.Item>
                <Form.Item label='Tipo' name='tipo'>
                    <Input />
                </Form.Item>
                <Form.Item label='Lugar' name='lugar'>
                    <Input />
                </Form.Item>
                <Form.Item label='Huella hídrica total' name='hht'>
                    <Input />
                </Form.Item>
                <Form.Item label='Huella hídrica verde' name='hhv'>
                    <Input />
                </Form.Item>
                <Form.Item label='Huella hídrica azul' name='hha'>
                    <Input />
                </Form.Item>
                <Form.Item label='Huella hídrica gris' name='hhg'>
                    <Input />
                </Form.Item>
                <Form.Item label='Agua para lavado' name='agualavado'>
                    <Input />
                </Form.Item>
                <Form.Item label='Agua para cocción' name='aguacoccion'>
                    <Input />
                </Form.Item>
                <Form.Item label='Lugar EGEI' name='lugaregei'>
                    <Input />
                </Form.Item>
                <Form.Item label='Cita EGEI' name='citaegei'>
                    <Input />
                </Form.Item>
                <Form.Item label='Huella de carbono' name='hcarbono'>
                    <Input />
                </Form.Item>
                <Form.Item label='Huella ecológica' name='hecologica'>
                    <Input />
                </Form.Item>
                <Form.Item label='Energia fósil' name='energiafosil'>
                    <Input />
                </Form.Item>
                <Form.Item label='Uso de suelo' name='usosuelo'>
                    <Input />
                </Form.Item>
                <Form.Item label='Nitrógeno' name='nitrogeno'>
                    <Input />
                </Form.Item>
                <Form.Item label='Fósforo' name='fosforo2'>
                    <Input />
                </Form.Item>
                <Form.Item label='Puntaje ecológico' name='puntajeecologico'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Aspecto económico
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Precio' name='precio'>
                    <Input />
                </Form.Item>
                <Form.Item label='Lugar de compra' name='lugarcompra'>
                    <Input />
                </Form.Item>
                <Form.Item label='Lugar de venta' name='lugarventa'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Componentes bioactivos
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Fitoquímicos' name='fitoquimicos'>
                    <Input />
                </Form.Item>
                <Form.Item label='Polifenoles' name='polifenoles'>
                    <Input />
                </Form.Item>
                <Form.Item label='Antocianinas' name='antocianinas'>
                    <Input />
                </Form.Item>
                <Form.Item label='Taninos' name='taninos'>
                    <Input />
                </Form.Item>
                <Form.Item label='Isoflavonas' name='isoflavonas'>
                    <Input />
                </Form.Item>
                <Form.Item label='Reserveratrol' name='reserveratrol'>
                    <Input />
                </Form.Item>
                <Form.Item label='Isotiocinatos' name='isotiocinatos'>
                    <Input />
                </Form.Item>
                <Form.Item label='Caretenoides' name='caretenoides'>
                    <Input />
                </Form.Item>
                <Form.Item label='Betacarotenos' name='betacarotenos'>
                    <Input />
                </Form.Item>
                <Form.Item label='Licopeno' name='licopeno'>
                    <Input />
                </Form.Item>
                <Form.Item label='Luteína' name='luteina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Alicina' name='alicina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Cafeína' name='cafeina'>
                    <Input />
                </Form.Item>
                <Form.Item label='UFC' name='ufc'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Aditivos alimentarios
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Benzoato de sodio' name='benzoatodesodio'>
                    <Input />
                </Form.Item>
                <Form.Item label='Polisorbato' name='polisorbato'>
                    <Input />
                </Form.Item>
                <Form.Item label='Azul brillante FCF o E133' name='fcf'>
                    <Input />
                </Form.Item>
                <Form.Item label='Azorrubina o E102' name='azorrubina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Amarillo ocaso FDF o E110' name='fdf'>
                    <Input />
                </Form.Item>
                <Form.Item label='Tartrazina o E102' name='tartrazina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Verde S o E142' name='e142'>
                    <Input />
                </Form.Item>
                <Form.Item label='Negro brillante BN o E151' name='bn'>
                    <Input />
                </Form.Item>
                <Form.Item label='Sucralosa' name='sucralosa'>
                    <Input />
                </Form.Item>
                <Form.Item label='Stevia' name='stevia'>
                    <Input />
                </Form.Item>
                <Form.Item label='Sacarina' name='sacarina'>
                    <Input />
                </Form.Item>
                <Form.Item label='Aspartame' name='aspartame'>
                    <Input />
                </Form.Item>
                <Form.Item label='Acesulfame K' name='acesulfame'>
                    <Input />
                </Form.Item>
                <Form.Item label='Carboxymethylcellulose' name='carboxy'>
                    <Input />
                </Form.Item>
                <Form.Item label='Dióxido de titanio' name='dioxidodetitanio'>
                    <Input />
                </Form.Item>
                <Form.Item label='Monolaurato de glicerol' name='glicerol'>
                    <Input />
                </Form.Item>
                <div className='property'>
                    <h3 id='atr-titulo'>
                        Marca
                        <hr />
                    </h3>
                </div>
                <Form.Item label='Marca' name='marca'>
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 0,
                    }}>
                    <Button type='primary' htmlType='submit' id='save'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Props;
