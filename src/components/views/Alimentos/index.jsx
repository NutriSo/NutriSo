import { useState } from 'react';

import apiURL from '../../../axios/axiosConfig';
import { message, Form } from 'antd';

import IconsComponent from '../../commons/FoodComponents/IconsComponent.jsx';
import PropertiesComponent from '../../commons/FoodComponents/PropertiesComponent';
import Consulta from '../../commons/FoodComponents/Consulta.jsx';

import { getSku } from '../../../services';
import { isEmptyObject } from '../../../utils';
import { generateIconsDTO, generateFormDTO } from '../../commons/FoodComponents/data/dto';

import './Alimentos.scss';

const Alimentos = () => {
    const [data2, setData] = useState(null);
    const [showAlimento, setShowAlimento] = useState(false);
    const [ID, setId] = useState('');
    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const iconsData = generateIconsDTO(data2);
    const formData = generateFormDTO(data2);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = (value) => {
        const opc = data2.opcionesPreparacion;
        if (validateExist(opc, value)) {
            console.log('Si existe');
        } else {
            opc.push(value);
            console.log(opc);
        }
    };

    const validateExist = (array, value) => {
        try {
            return array.includes(value);
        } catch (error) {
            console.log('Validation exist', error);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const fetchData = async (alimento) => {
        try {
            const { data } = await apiURL.get('/alimentos/' + alimento.id);
            // console.log('ID AL CLICKEAR: ' + alimento.id);
            setId(alimento.id);
            setData(data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const handleNutricional = (value) => {
        if (isEmptyObject(data2)) return;

        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoNutricional: value,
            },
        });
    };

    const handleAmbiental = (value) => {
        if (isEmptyObject(data2)) return;

        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoAmbiental: value,
            },
        });
    };

    const handleEconomia = (value) => {
        if (isEmptyObject(data2)) return;

        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoEconomia: value,
            },
        });
    };

    const handleCulturaSociedad = (value) => {
        if (isEmptyObject(data2)) return;

        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoCulturaSociedad: value,
            },
        });
    };

    const borrar = (value) => {
        try {
            const borrado = data2.opcionesPreparacion.filter(
                (opcion) => opcion.toLowerCase().trim() !== value.toLowerCase().trim()
            );
            console.log(borrado);
            setData({
                ...data2,
                opcionesPreparacion: borrado,
            });
        } catch (error) {
            console.log('Error al borrar', error);
        }
    };

    const sendData = async (values) => {
        const data = {
            sku: await getSku(),
            marca: values?.marca,
            imagen: data2?.imagen,
            nombreAlimento: values?.pName,
            grupoExportable: values?.pGroupE,
            grupoAlimento: values?.pGroupAli,
            subGrupoExportable: values?.pSubGroupE,
            clasificacionExportable: values?.pClasE,
            opcionesPreparacion: data2?.opcionesPreparacion,
            mensaje: {
                nutricional: values?.mNutri,
                ambiental: values?.mAmbien,
                mensajeEconomia: values?.mEcono,
                mensajeCulturaSociedad: values?.mCult_Soci,
            },
            icono: {
                iconoNutricional: data2?.icono?.iconoNutricional,
                iconoAmbiental: data2?.icono?.iconoAmbiental,
                iconoEconomia: data2?.icono?.iconoEconomia,
                iconoCulturaSociedad: data2?.icono?.iconoCulturaSociedad,
            },
            cantidadAlimento: {
                cantidadSugerida: values?.sugerida,
                unidad: values?.unidad,
                pesoNeto: values?.pesoneto,
            },
            caloriasMacronutrientes: {
                energia: values?.energia,
                proteina: values?.proteina,
                lipidos: values?.lipidos,
                agSaturados: values?.saturados,
                agMonoinsaturados: values?.monoinsaturados,
                adPoliinsaturados: values?.polinsaturados,
                colesterol: values?.colesterol,
                omega3: values?.omega3,
                omega6: values?.omega6,
                omega9: values?.omega9,
                hidratosDeCarbono: values?.hdratoscarbono,
                fibra: values?.fibra,
                fibraInsoluble: values?.fibrainsoluble,
                fibraSoluble: values?.fibrasoluble,
                azucar: values?.azucar,
                etanol: values?.etanol,
            },
            vitaminas: {
                tiamina: values?.tiamina,
                riboflavin: values?.riboflavin,
                niacina: values?.niacina,
                acidoPantotenico: values?.acidopantotenico,
                piridoxina: values?.piridoxina,
                biotina: values?.biotina,
                cobalmina: values?.cobalmina,
                acidoAscorbico: values?.acidoascorbico,
                acidoFolico: values?.acidofolico,
                vitaminaA: values?.vitaminaA,
                vitaminaK: values?.vitaminaK,
                vitaminaE: values?.vitaminaE,
                vitaminaD: values?.vitaminaD,
            },
            minerales: {
                calcio: values?.calcio,
                fosforo: values?.fosforo1,
                hierro: values?.hierro,
                hierroNoHem: values?.hierronohem,
                hierroTotal: values?.hierrototal,
                magnesio: values?.magnesio,
                sodio: values?.sodio,
                potasio: values?.potasio,
                zinc: values?.zinc,
                selenio: values?.selenio,
            },
            aspectoGlucemico: {
                indiceGlicemico: values?.indiceglicemico,
                cargaGlicemica: values?.cargaglicemica,
            },
            aspectoMedioambiental: {
                factorDeCorreccionParaHuellaHidricaYEGEI: values?.fchh,
                tipo: values?.tipo,
                lugar: values?.lugar,
                huellaHidricaTotal: values?.hht,
                huellaHidricaVerde: values?.hhv,
                huellaHidricaAzul: values?.hha,
                huellaHidricaGris: values?.hhg,
                aguaParaLavado: values?.agualavado,
                aguaParaCoccion: values?.aguacoccion,
                lugarEGEI: values?.lugaregei,
                citaEGEI: values?.citaegei, // OLVIDE PONERLO YOP
                huellaCarbono: values?.hcarbono, // EGEI.
                huellaEcologica: values?.hecologica,
                usoDeSuelo: values?.usosuelo,
                energiaFosil: values?.energiafosil,
                nitrogeno: values?.nitrogeno,
                fosforo: values?.fosforo2,
                puntajeEcologico: values?.puntajeecologico,
            },
            aspectoEconomico: {
                precio: Number(values?.precio || 0),
                lugarDeCompra: values?.lugarcompra,
                lugarDeVenta: values?.lugarventa,
            },

            componentesBioactivos: {
                fitoquimicos: values?.fitoquimicos,
                polifenoles: values?.polifenoles,
                antocianinas: values?.antocianinas,
                taninos: values?.taninos,
                isoflavonas: values?.isoflavonas,
                resveratrol: values?.reserveratrol,
                isotiocinatos: values?.isotiocinatos,
                caretenoides: values?.caretenoides,
                betacarotenos: values?.betacarotenos,
                licopeno: values?.licopeno,
                luteina: values?.luteina,
                alicina: values?.alicina,
                cafeina: values?.cafeina,
                UFC: values?.ufc,
            },

            aditivosAlimentarios: {
                benzoatoDeSodio: values?.benzoatodesodio,
                polisorbato: values?.polisorbato,
                azulBrillanteFCFoE133: values?.fcf,
                azurrubinaOE102: values?.azorrubina,
                amarilloOcasoFDFoE110: values?.fdf,
                tartrazinaOE102: values?.tartrazina,
                verdeSoE142: values?.e142,
                negroBrillanteBNoE151: values?.bn,
                sucralosa: values?.sucralosa,
                estevia: values?.stevia,
                sacarina: values?.sacarina,
                aspartame: values?.aspartame,
                acesulfameK: values?.acesulfame,
                carboxymethylcellulose: values?.carboxy,
                dioxidoDeTitanio: values?.dioxidodetitanio,
                monolauratoDeGlicerol: values?.glicerol,
            },
        };
        console.log(data);
        console.log('ID AL GUARDAR: ' + ID);
        const res = await apiURL.patch(`alimentos/${ID}`, data);
        if (res.status === 200 || res.status === 204)
            message.success('Alimento actualizado correctamente');
    };

    const handleImage = (response) => {
        setData((prevState) => {
            return { ...prevState, imagen: response.url };
        });
    };

    return (
        <div className='container'>
            <Consulta onClick={(item) => fetchData(item)} />
            <IconsComponent
                dataSource={iconsData}
                nutricional={handleNutricional}
                ambiental={handleAmbiental}
                economia={handleEconomia}
                sociedad={handleCulturaSociedad}
                handleImage={handleImage}
            />
            <PropertiesComponent
                borrar={borrar}
                data={formData}
                form={form}
                onFinish={sendData}
                setShowAlimento={setShowAlimento}
                handleOk={handleOk}
                showModal={showModal}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
            />
        </div>
    );
};

export default Alimentos;
