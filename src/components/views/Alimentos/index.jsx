import { useState } from 'react';

import apiURL from '../../../axios/axiosConfig';
import { message } from 'antd';

import IconsComponent from '../../commons/FoodComponents/IconsComponent.jsx';
import PropertiesComponent from '../../commons/FoodComponents/PropertiesComponent';
import Consulta from '../../commons/FoodComponents/Consulta.jsx';

import { isEmptyObject } from '../../../utils';
import { generateIconsDTO } from '../../commons/FoodComponents/data/dto';

import './Alimentos.scss';

const Alimentos = () => {
    const [data2, setData] = useState(null);
    const [showAlimento, setShowAlimento] = useState(false);
    const [ID, setId] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);

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

    let nombre = ''; // -----> REQUIRED
    let SKU = ''; // -----> REQUIRED
    let grupoAlimento = ''; // -----> REQUIRED
    let imagen = '';
    let grupoE = '';
    let subGrupoE = '';
    let clasificacionE = '';
    let mNutri = '';
    let mAmbiental = '';
    let mEconomico = '';
    let mCultuSociedad = '';
    let sugerida = '';
    let unidad = '';
    let pesoNeto = '';
    let energia = '';
    let proteina = '';
    let lipidos = '';
    let saturados = '';
    let monoinsaturados = '';
    let polinsaturados = '';
    let colesterol = '';
    let omega3 = '';
    let omega6 = '';
    let omega9 = '';
    let hdratoscarbono = '';
    let fibra = '';
    let fibrainsoluble = '';
    let fibrasoluble = '';
    let azucar = '';
    let etanol = '';
    let tiamina = '';
    let riboflavin = '';
    let niacina = '';
    let acidopantotenico = '';
    let piridoxina = '';
    let biotina = '';
    let cobalmina = '';
    let acidoascorbico = '';
    let acidofolico = '';
    let vitaminaA = '';
    let vitaminaD = '';
    let vitaminaK = '';
    let vitaminaE = '';
    let calcio = '';
    let fosforo1 = '';
    let hierro = '';
    let hierronohem = '';
    let hierrototal = '';
    let magnesio = '';
    let sodio = '';
    let potasio = '';
    let zinc = '';
    let selenio = '';
    let indiceglicemico = '';
    let cargaglicemica = '';
    let fchh = '';
    let tipo = '';
    let lugar = '';
    let hht = '';
    let hhv = '';
    let hha = '';
    let hhg = '';
    let agualavado = '';
    let aguacoccion = '';
    let lugaregei = '';
    let citaegei = '';
    let hcarbono = '';
    let hecologica = '';
    let energiafosil = '';
    let usosuelo = '';
    let nitrogeno = '';
    let fosforo2 = '';
    let puntajeecologico = '';
    let precio = '';
    let lugarcompra = '';
    let lugarventa = '';
    let fitoquimicos = '';
    let polifenoles = '';
    let antocianinas = '';
    let taninos = '';
    let isoflavonas = '';
    let reserveratrol = '';
    let isotiocinatos = '';
    let caretenoides = '';
    let betacarotenos = '';
    let licopeno = '';
    let luteina = '';
    let alicina = '';
    let cafeina = '';
    let ufc = '';
    let benzoatodesodio = '';
    let polisorbato = '';
    let fcf = '';
    let azorrubina = '';
    let fdf = '';
    let tartrazina = '';
    let e142 = '';
    let bn = '';
    let sucralosa = '';
    let stevia = '';
    let sacarina = '';
    let aspartame = '';
    let acesulfame = '';
    let carboxy = '';
    let dioxidodetitanio = '';
    let glicerol = '';
    let marca = '';

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
        console.log('valid', isEmptyObject(data2), data2);
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

    const sendData = async () => {
        const data = {
            //sku: SKU,
            nombreAlimento: nombre,
            grupoExportable: grupoE,
            subGrupoExportable: subGrupoE,
            grupoAlimento: grupoAlimento,
            mensaje: [
                {
                    nutricional: mNutri,
                    ambiental: mAmbiental,
                    mensajeEconomia: mEconomico,
                    mensajeCulturaSociedad: mCultuSociedad,
                },
            ],
            icono: {
                iconoNutricional: data2?.icono?.iconoNutricional,
                iconoAmbiental: data2?.icono?.iconoAmbiental,
                iconoEconomia: data2?.icono?.iconoEconomia,
                iconoCulturaSociedad: data2?.icono?.iconoCulturaSociedad,
            },
            imagen: imagen,
            clasificacionExportable: clasificacionE,
            opcionesPreparacion: data2?.opcionesPreparacion, //             ME FALTA ENVIAR ESTO
            cantidadAlimento: [
                {
                    cantidadSugerida: sugerida,
                    unidad: unidad,
                    pesoNeto: pesoNeto.split('(')[0].trim(),
                },
            ],
            caloriasMacronutrientes: [
                {
                    energia: energia.split('(')[0].trim(),
                    proteina: proteina.split('(')[0].trim(),
                    lipidos: lipidos.split('(')[0].trim(),
                    agSaturados: saturados.split('(')[0].trim(),
                    agMonoinsaturados: monoinsaturados.split('(')[0].trim(),
                    adPoliinsaturados: polinsaturados.split('(')[0].trim(),
                    colesterol: colesterol.split('(')[0].trim(),
                    omega3: omega3.split('(')[0].trim(),
                    omega6: omega6.split('(')[0].trim(),
                    omega9: omega9.split('(')[0].trim(),
                    hidratosDeCarbono: hdratoscarbono.split('(')[0].trim(),
                    fibra: fibra.split('(')[0].trim(),
                    fibraInsoluble: fibrainsoluble.split('(')[0].trim(),
                    fibraSoluble: fibrasoluble.split('(')[0].trim(), //NO VIENE EN MI OBJETO LO PONDRÁ GAMA
                    azucar: azucar.split('(')[0].trim(),
                    etanol: etanol.split('(')[0].trim(),
                },
            ],
            vitaminas: [
                {
                    tiamina: tiamina.split('(')[0].trim(),
                    riboflavin: riboflavin.split('(')[0].trim(),
                    niacina: niacina.split('(')[0].trim(),
                    acidoPantotenico: acidopantotenico.split('(')[0].trim(),
                    piridoxina: piridoxina.split('(')[0].trim(),
                    biotina: biotina.split('(')[0].trim(),
                    cobalmina: cobalmina.split('(')[0].trim(),
                    acidoAscorbico: acidoascorbico.split('(')[0].trim(),
                    acidoFolico: acidofolico.split('(')[0].trim(),
                    vitaminaA: vitaminaA,
                    vitaminaK: vitaminaK,
                    vitaminaE: vitaminaE,
                    vitaminaD: vitaminaD, // NO ESTABA EN ESTE OBJETO ASI QUE LO AGREGUÉ
                },
            ],
            minerales: [
                {
                    calcio: calcio,
                    fosforo: fosforo1,
                    hierro: hierro,
                    hierroNoHem: hierronohem,
                    hierroTotal: hierrototal,
                    magnesio: magnesio,
                    sodio: sodio,
                    potasio: potasio,
                    zinc: zinc,
                    selenio: selenio,
                },
            ],
            aspectoGlucemico: [
                {
                    indiceGlicemico: indiceglicemico,
                    cargaGlicemica: cargaglicemica,
                },
            ],
            aspectoMedioambiental: [
                {
                    factorDeCorreccionParaHuellaHidricaYEGEI: fchh,
                    tipo: tipo,
                    lugar: lugar,
                    huellaHidricaTotal: hht,
                    huellaHidricaVerde: hhv,
                    huellaHidricaAzul: hha,
                    huellaHidricaGris: hhg,
                    aguaParaLavado: agualavado,
                    aguaParaCoccion: aguacoccion,
                    lugarEGEI: lugaregei,
                    citaEGEI: citaegei, // OLVIDE PONERLO YOP
                    huellaCarbono: hcarbono, // EGEI.
                    huellaEcologica: hecologica,
                    usoDeSuelo: usosuelo,
                    energiaFosil: energiafosil,
                    nitrogeno: nitrogeno,
                    fosforo: fosforo2,
                    puntajeEcologico: puntajeecologico,
                },
            ],
            aspectoEconomico: [
                {
                    precio: Number(precio),
                    lugarDeCompra: lugarcompra,
                    lugarDeVenta: lugarventa,
                },
            ],
            componentesBioactivos: [
                {
                    fitoquimicos: fitoquimicos,
                    polifenoles: polifenoles,
                    antocianinas: antocianinas,
                    taninos: taninos,
                    isoflavonas: isoflavonas,
                    resveratrol: reserveratrol,
                    isotiocinatos: isotiocinatos,
                    caretenoides: caretenoides,
                    betacarotenos: betacarotenos,
                    licopeno: licopeno,
                    luteina: luteina,
                    alicina: alicina,
                    cafeina: cafeina,
                    UFC: ufc,
                },
            ],
            aditivosAlimentarios: [
                {
                    benzoatoDeSodio: benzoatodesodio,
                    polisorbato: polisorbato,
                    azulBrillanteFCFoE133: fcf,
                    azurrubinaOE102: azorrubina,
                    amarilloOcasoFDFoE110: fdf,
                    tartrazinaOE102: tartrazina,
                    verdeSoE142: e142,
                    negroBrillanteBNoE151: bn,
                    sucralosa: sucralosa,
                    estevia: stevia,
                    sacarina: sacarina,
                    aspartame: aspartame,
                    acesulfameK: acesulfame,
                    carboxymethylcellulose: carboxy,
                    dioxidoDeTitanio: dioxidodetitanio,
                    monolauratoDeGlicerol: glicerol,
                },
            ],
            marca: marca,
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

    const iconsData = generateIconsDTO(data2);

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
                item={data2}
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
