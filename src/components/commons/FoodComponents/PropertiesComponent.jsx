import { useEffect, useState } from 'react';

import { PlusCircleTwoTone } from '@ant-design/icons';
import { Modal, Button } from 'antd';

import Props from './Props';
import Tags from './Tags';

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

    useEffect(() => {
        establecerValores();
        return () => {};
    }, [item]);

    const establecerValores = () => {
        if (item.nombreAlimento != null) {
            setShowAlimento(true);

            /**  GENERAL  */
            document.getElementById('pName').value = item?.nombreAlimento;
            document.getElementById('pSku').value = item?.sku;
            document.getElementById('pGroupE').value = item?.grupoExportable;
            document.getElementById('pSubGroupE').value =
                item?.subGrupoExportable;
            document.getElementById('pClasE').value =
                item?.clasificacionExportable;
            document.getElementById('pGroupAli').value = item?.grupoAlimento;

            /**  MENSAJES  */
            document.getElementById('mNutri').value =
                item?.mensaje?.nutricional;
            document.getElementById('mAmbien').value = item?.mensaje?.ambiental;
            document.getElementById('mEcono').value =
                item?.mensaje?.mensajeEconomia;
            document.getElementById('mCult_Soci').value =
                item?.mensaje?.mensajeCulturaSociedad;
            /**  CANTIDADES  */
            document.getElementById('sugerida').value =
                item?.cantidadAlimento?.cantidadSugerida;
            document.getElementById('unidad').value =
                item?.cantidadAlimento?.unidad;
            document.getElementById('pesoneto').value =
                item?.cantidadAlimento?.pesoNeto + ' (g)';
            /**  MACRONUTRIENTES  */
            document.getElementById('energia').value =
                item?.caloriasMacronutrientes?.energia + ' (Kcal)';
            document.getElementById('proteina').value =
                item?.caloriasMacronutrientes?.proteina + ' (g)';
            document.getElementById('lipidos').value =
                item?.caloriasMacronutrientes?.lipidos + ' (g)';
            document.getElementById('saturados').value =
                item?.caloriasMacronutrientes?.agSaturados + ' (g)';
            document.getElementById('monoinsaturados').value =
                item?.caloriasMacronutrientes?.agMonoinsaturados + ' (g)';
            document.getElementById('polinsaturados').value =
                item?.caloriasMacronutrientes?.adPoliinsaturados + ' (g)';
            document.getElementById('colesterol').value =
                item?.caloriasMacronutrientes?.colesterol + ' (mg)';
            document.getElementById('omega3').value =
                item?.caloriasMacronutrientes?.omega3 + ' (mg)';
            document.getElementById('omega6').value =
                item?.caloriasMacronutrientes?.omega6 + ' (mg)';
            document.getElementById('omega9').value =
                item?.caloriasMacronutrientes?.omega9 + ' (mg)';
            document.getElementById('hdratoscarbono').value =
                item?.caloriasMacronutrientes?.hidratosDeCarbono + ' (g)';
            document.getElementById('fibra').value =
                item?.caloriasMacronutrientes?.fibra + ' (g)';
            document.getElementById('fibrainsoluble').value =
                item?.caloriasMacronutrientes?.fibraInsoluble + ' (g)';
            document.getElementById('fibrasoluble').value =
                item?.caloriasMacronutrientes?.fibraSoluble + ' (g)';
            document.getElementById('azucar').value =
                item?.caloriasMacronutrientes?.azucar + ' (g)';
            document.getElementById('etanol').value =
                item?.caloriasMacronutrientes?.etanol + ' (g)';
            /**  VITAMINAS  */
            document.getElementById('tiamina').value =
                item?.vitaminas?.tiamina + ' (mg)';
            document.getElementById('riboflavin').value =
                item?.vitaminas?.riboflavin + ' (mg)';
            document.getElementById('niacina').value =
                item?.vitaminas?.niacina + ' (mg)';
            document.getElementById('acidopantotenico').value =
                item?.vitaminas?.acidoPantotenico + ' (mg)';
            document.getElementById('piridoxina').value =
                item?.vitaminas?.piridoxina + ' (mg)';
            document.getElementById('biotina').value =
                item?.vitaminas?.biotina + ' (mg)';
            document.getElementById('cobalmina').value =
                item?.vitaminas?.cobalmina + ' (mg)';
            document.getElementById('acidoascorbico').value =
                item?.vitaminas?.acidoAscorbico + ' (mg)';
            document.getElementById('acidofolico').value =
                item?.vitaminas?.acidoFolico + ' (mg)';
            document.getElementById('vitaminaA').value =
                item?.vitaminas?.vitaminaA;
            document.getElementById('vitaminaD').value =
                item?.vitaminas?.vitaminaD;
            document.getElementById('vitaminaK').value =
                item?.vitaminas?.vitaminaK;
            document.getElementById('vitaminaE').value =
                item?.vitaminas?.vitaminaE;
            /**  MINERALES  */
            document.getElementById('calcio').value = item?.minerales?.calcio;
            document.getElementById('fosforo1').value =
                item?.minerales?.fosforo;
            document.getElementById('hierro').value = item?.minerales?.hierro;
            document.getElementById('hierronohem').value =
                item?.minerales?.hierroNoHem;
            document.getElementById('hierrototal').value =
                item?.minerales?.hierroTotal;
            document.getElementById('magnesio').value =
                item?.minerales?.magnesio;
            document.getElementById('sodio').value = item?.minerales?.sodio;
            document.getElementById('potasio').value = item?.minerales?.potasio;
            document.getElementById('zinc').value = item?.minerales?.zinc;
            document.getElementById('selenio').value = item?.minerales?.selenio;
            /**  ASPECTO GLUCÉMICO  */
            document.getElementById('indiceglicemico').value =
                item?.aspectoGlucemico?.indiceGlicemico;
            document.getElementById('cargaglicemica').value =
                item?.aspectoGlucemico?.cargaGlicemica;
            /**  ASPECTO MEDIOAMBIENTAL  */
            document.getElementById('fchh').value =
                item?.aspectoMedioambiental?.factorDeCorreccionParaHuellaHidricaYEGEI;
            document.getElementById('tipo').value =
                item?.aspectoMedioambiental?.tipo;
            document.getElementById('lugar').value =
                item?.aspectoMedioambiental?.lugar;
            document.getElementById('hht').value =
                item?.aspectoMedioambiental?.huellaHidricaTotal;
            document.getElementById('hhv').value =
                item?.aspectoMedioambiental?.huellaHidricaVerde;
            document.getElementById('hha').value =
                item?.aspectoMedioambiental?.huellaHidricaAzul;
            document.getElementById('hhg').value =
                item?.aspectoMedioambiental?.huellaHidricaGris;
            document.getElementById('agualavado').value =
                item?.aspectoMedioambiental?.aguaParaLavado;
            document.getElementById('aguacoccion').value =
                item?.aspectoMedioambiental?.aguaParaCoccion;
            document.getElementById('lugaregei').value =
                item?.aspectoMedioambiental?.lugarEGEI;
            document.getElementById('citaegei').value =
                item?.aspectoMedioambiental?.citaEGEI;
            document.getElementById('hcarbono').value =
                item?.aspectoMedioambiental?.huellaCarbono;
            document.getElementById('hecologica').value =
                item?.aspectoMedioambiental?.huellaEcologica;
            document.getElementById('energiafosil').value =
                item?.aspectoMedioambiental?.energiaFosil;
            document.getElementById('usosuelo').value =
                item?.aspectoMedioambiental?.usoDeSuelo;
            document.getElementById('nitrogeno').value =
                item?.aspectoMedioambiental?.nitrogeno;
            document.getElementById('fosforo2').value =
                item?.aspectoMedioambiental?.fosforo;
            document.getElementById('puntajeecologico').value =
                item?.aspectoMedioambiental?.puntajeEcologico;
            /**  ASPECTO ECONÓMICO  */
            document.getElementById('precio').value =
                item?.aspectoEconomico?.precio;
            document.getElementById('lugarcompra').value =
                item?.aspectoEconomico?.lugarDeCompra;
            document.getElementById('lugarventa').value =
                item?.aspectoEconomico?.lugarDeVenta;
            /**  COMPONENTES BIOACTIVOS */
            document.getElementById('fitoquimicos').value =
                item?.componentesBioactivos?.fitoquimicos;
            document.getElementById('polifenoles').value =
                item?.componentesBioactivos?.polifenoles;
            document.getElementById('antocianinas').value =
                item?.componentesBioactivos?.antocianinas;
            document.getElementById('taninos').value =
                item?.componentesBioactivos?.taninos;
            document.getElementById('isoflavonas').value =
                item?.componentesBioactivos?.isoflavonas;
            document.getElementById('reserveratrol').value =
                item?.componentesBioactivos?.resveratrol;
            document.getElementById('isotiocinatos').value =
                item?.componentesBioactivos?.isotiocinatos;
            document.getElementById('caretenoides').value =
                item?.componentesBioactivos?.caretenoides;
            document.getElementById('betacarotenos').value =
                item?.componentesBioactivos?.betacarotenos;
            document.getElementById('licopeno').value =
                item?.componentesBioactivos?.licopeno;
            document.getElementById('luteina').value =
                item?.componentesBioactivos?.luteina;
            document.getElementById('alicina').value =
                item?.componentesBioactivos?.alicina;
            document.getElementById('cafeina').value =
                item?.componentesBioactivos?.cafeina;
            document.getElementById('ufc').value =
                item?.componentesBioactivos?.UFC;
            /**  ADITIVOS ALIMENTARIOS  */
            document.getElementById('benzoatodesodio').value =
                item?.aditivosAlimentarios?.benzoatoDeSodio;
            document.getElementById('polisorbato').value =
                item?.aditivosAlimentarios?.polisorbato;
            document.getElementById('fcf').value =
                item?.aditivosAlimentarios?.azulBrillanteFCFoE133;
            document.getElementById('azorrubina').value =
                item?.aditivosAlimentarios?.azurrubinaOE102;
            document.getElementById('fdf').value =
                item?.aditivosAlimentarios?.amarilloOcasoFDFoE110;
            document.getElementById('tartrazina').value =
                item?.aditivosAlimentarios?.tartrazinaOE102;
            document.getElementById('e142').value =
                item?.aditivosAlimentarios?.verdeSoE142;
            document.getElementById('bn').value =
                item?.aditivosAlimentarios?.negroBrillanteBNoE151;
            document.getElementById('sucralosa').value =
                item?.aditivosAlimentarios?.sucralosa;
            document.getElementById('stevia').value =
                item?.aditivosAlimentarios?.estevia;
            document.getElementById('sacarina').value =
                item?.aditivosAlimentarios?.sacarina;
            document.getElementById('aspartame').value =
                item?.aditivosAlimentarios?.aspartame;
            document.getElementById('acesulfame').value =
                item?.aditivosAlimentarios?.acesulfameK;
            document.getElementById('carboxy').value =
                item?.aditivosAlimentarios?.carboxymethylcellulose;
            document.getElementById('dioxidodetitanio').value =
                item?.aditivosAlimentarios?.dioxidoDeTitanio;
            document.getElementById('glicerol').value =
                item?.aditivosAlimentarios?.monolauratoDeGlicerol;

            /**  ATRIBUTOS ADICIONALES  PUEDEN SER VARIOS*/
            //document.getElementById("idAlimento").value = item?.atributosAdicionales?._id;
            //document.getElementById("atr-adicional").value = item?.atributosAdicionales?.atributoAdicional;
            //console.log(item?.atributosAdicionales.atributoAdicional)
            //document.getElementById("idAlimento").value = "(UNDEFINED), CUÁL ID TOMO? XQ SON DISTINTOS"
            //document.getElementById("atr-adicional").value = "(UNDEFINED),  SON VARIOS?"

            /**  MARCA  */
            document.getElementById('marca').value = item?.marca;
        } else {
        }
    };

    return (
        <>
            <div className='props'>
                {/** CONTENEDOR PRINCIPAL FONDO BLANCO_GRISOSO */}
                <div className='head_props'>
                    {/** DEFINE EL CONTENDOR DEL TITULO PROPIEDADES */}
                    <h1 id='title'>Propiedades</h1>
                </div>
                <div className='data_props'>
                    {/** DEFINE EL FORMULARIO DONDE APARECERÁN TODAS LAS PROPIEDADES DE LOS ALIMENTOS */}
                    <Props />
                </div>
                <div id='save'>
                    <Button id='save' onClick={() => getData()} type='primary'>
                        <strong>Guardar</strong>
                    </Button>
                </div>
                <div className='preparaciones'>
                    <div className='tags'>
                        <Tags borrar={borrar} itm={item?.opcionesPreparacion} />
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
                <input
                    onChange={({ target }) => setNuevaOpcion(target.value)}
                />
            </Modal>
        </>
    );
};

export default PropertiesComponent;
