import { useState } from 'react';

import apiURL from '../../../axios/axiosConfig';
import { message } from 'antd';

import IconsComponent from '../../commons/FoodComponents/IconsComponent.jsx';
import PropertiesComponent from '../../commons/FoodComponents/PropertiesComponent';
import Consulta from '../../commons/FoodComponents/Consulta.jsx';
import AddFood from '../addfood/AddFoodModal/AddFoodModal';

import './Alimentos.scss';

const Alimentos = () => {
    const [data2, setData] = useState([]);
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
        /**
         * GUARDARLO EN EL ARREGLO CON SPREAD OPERATOR
         */
        //        document.getElementById('nueva_preparacion').value = "";
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
            console.log('ID AL CLICKEAR: ' + alimento.id);
            setId(alimento.id);
            setData(data);
            //console.log(data2)
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const handleNutricional = (value) => {
        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoNutricional: value,
            },
        });
    };

    const handleAmbiental = (value) => {
        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoAmbiental: value,
            },
        });
    };

    const handleEconomia = (value) => {
        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoEconomia: value,
            },
        });
    };
    const handleCulturaSociedad = (value) => {
        setData({
            ...data2,
            icono: {
                ...data2.icono,
                iconoCulturaSociedad: value,
            },
        });
    };

    /**
     * @description Se encarga de verificar que al menos las siguientes variables contengan un valor.
     * @var nombre es requerida
     * @var SKU es requerida
     * @var grupoAlimento es requerida
     */
    const validateRequireds = () => {
        //console.log(showAlimento)
        if (showAlimento) {
            //Solo si se está mostrando un alimento
            if (nombre.length == 0 || grupoAlimento.length == 0) {
                //Si el tamaño de los textos es mayor a 0, incluye los espacios "  " -> Cadena no vacia por lo tanto entrará al else
                alert('Llene los campos marcados en rojo');
            } else {
                sendData();
            }
        } else {
            /**
             * MESSAGE
             */
            console.log('No se está mostrando un alimento');
        }
    };

    const borrar = (value) => {
        try {
            const borrado = data2.opcionesPreparacion.filter(
                (opcion) =>
                    opcion.toLowerCase().trim() !== value.toLowerCase().trim()
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

    const getData = () => {
        /**  GENERAL  */
        imagen = data2.imagen;
        nombre = document.getElementById('pName').value;
        SKU = document.getElementById('pSku').value;
        grupoE = document.getElementById('pGroupE').value;
        subGrupoE = document.getElementById('pSubGroupE').value;
        clasificacionE = document.getElementById('pClasE').value;
        grupoAlimento = document.getElementById('pGroupAli').value;

        /**  MENSAJES  */
        mNutri = document.getElementById('mNutri').value;
        mAmbiental = document.getElementById('mAmbien').value;
        mEconomico = document.getElementById('mEcono').value;
        mCultuSociedad = document.getElementById('mCult_Soci').value;
        /**  CANTIDADES  */
        sugerida = document.getElementById('sugerida').value;
        unidad = document.getElementById('unidad').value;
        pesoNeto = document.getElementById('pesoneto').value;
        /**  MACRONUTRIENTES  */
        energia = document.getElementById('energia').value;
        proteina = document.getElementById('proteina').value;
        lipidos = document.getElementById('lipidos').value;
        saturados = document.getElementById('saturados').value;
        monoinsaturados = document.getElementById('monoinsaturados').value;
        polinsaturados = document.getElementById('polinsaturados').value;
        colesterol = document.getElementById('colesterol').value;
        omega3 = document.getElementById('omega3').value;
        omega6 = document.getElementById('omega6').value;
        omega9 = document.getElementById('omega9').value;
        hdratoscarbono = document.getElementById('hdratoscarbono').value;
        fibra = document.getElementById('fibra').value;
        fibrainsoluble = document.getElementById('fibrainsoluble').value;
        fibrasoluble = document.getElementById('fibrasoluble').value;
        azucar = document.getElementById('azucar').value;
        etanol = document.getElementById('etanol').value;
        /**  VITAMINAS  */
        tiamina = document.getElementById('tiamina').value;
        riboflavin = document.getElementById('riboflavin').value;
        niacina = document.getElementById('niacina').value;
        acidopantotenico = document.getElementById('acidopantotenico').value;
        piridoxina = document.getElementById('piridoxina').value;
        biotina = document.getElementById('biotina').value;
        cobalmina = document.getElementById('cobalmina').value;
        acidoascorbico = document.getElementById('acidoascorbico').value;
        acidofolico = document.getElementById('acidofolico').value;
        vitaminaA = document.getElementById('vitaminaA').value;
        vitaminaD = document.getElementById('vitaminaD').value;
        vitaminaK = document.getElementById('vitaminaK').value;
        vitaminaE = document.getElementById('vitaminaE').value;
        /**  MINERALES  */
        calcio = document.getElementById('calcio').value;
        fosforo1 = document.getElementById('fosforo1').value;
        hierro = document.getElementById('hierro').value;
        hierronohem = document.getElementById('hierronohem').value;
        hierrototal = document.getElementById('hierrototal').value;
        magnesio = document.getElementById('magnesio').value;
        sodio = document.getElementById('sodio').value;
        potasio = document.getElementById('potasio').value;
        zinc = document.getElementById('zinc').value;
        selenio = document.getElementById('selenio').value;
        /**  ASPECTO GLUCÉMICO  */
        indiceglicemico = document.getElementById('indiceglicemico').value;
        cargaglicemica = document.getElementById('cargaglicemica').value;
        /**  ASPECTO MEDIOAMBIENTAL  */
        fchh = document.getElementById('fchh').value;
        tipo = document.getElementById('tipo').value;
        lugar = document.getElementById('lugar').value;
        hht = document.getElementById('hht').value;
        hhv = document.getElementById('hhv').value;
        hha = document.getElementById('hha').value;
        hhg = document.getElementById('hhg').value;
        agualavado = document.getElementById('agualavado').value;
        aguacoccion = document.getElementById('aguacoccion').value;
        lugaregei = document.getElementById('lugaregei').value;
        citaegei = document.getElementById('citaegei').value;
        hcarbono = document.getElementById('hcarbono').value;
        hecologica = document.getElementById('hecologica').value;
        energiafosil = document.getElementById('energiafosil').value;
        usosuelo = document.getElementById('usosuelo').value;
        nitrogeno = document.getElementById('nitrogeno').value;
        fosforo2 = document.getElementById('fosforo2').value;
        puntajeecologico = document.getElementById('puntajeecologico').value;
        /**  ASPECTO ECONÓMICO  */
        precio = document.getElementById('precio').value;
        lugarcompra = document.getElementById('lugarcompra').value;
        lugarventa = document.getElementById('lugarventa').value;
        /**  COMPONENTES BIOACTIVOS */
        fitoquimicos = document.getElementById('fitoquimicos').value;
        polifenoles = document.getElementById('polifenoles').value;
        antocianinas = document.getElementById('antocianinas').value;
        taninos = document.getElementById('taninos').value;
        isoflavonas = document.getElementById('isoflavonas').value;
        reserveratrol = document.getElementById('reserveratrol').value;
        isotiocinatos = document.getElementById('isotiocinatos').value;
        caretenoides = document.getElementById('caretenoides').value;
        betacarotenos = document.getElementById('betacarotenos').value;
        licopeno = document.getElementById('licopeno').value;
        luteina = document.getElementById('luteina').value;
        alicina = document.getElementById('alicina').value;
        cafeina = document.getElementById('cafeina').value;
        ufc = document.getElementById('ufc').value;
        /**  ADITIVOS ALIMENTARIOS  */
        benzoatodesodio = document.getElementById('benzoatodesodio').value;
        polisorbato = document.getElementById('polisorbato').value;
        fcf = document.getElementById('fcf').value;
        azorrubina = document.getElementById('azorrubina').value;
        fdf = document.getElementById('fdf').value;
        tartrazina = document.getElementById('tartrazina').value;
        e142 = document.getElementById('e142').value;
        bn = document.getElementById('bn').value;
        sucralosa = document.getElementById('sucralosa').value;
        stevia = document.getElementById('stevia').value;
        sacarina = document.getElementById('sacarina').value;
        aspartame = document.getElementById('aspartame').value;
        acesulfame = document.getElementById('acesulfame').value;
        carboxy = document.getElementById('carboxy').value;
        dioxidodetitanio = document.getElementById('dioxidodetitanio').value;
        glicerol = document.getElementById('glicerol').value;
        marca = document.getElementById('marca').value;

        validateRequireds();
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
            /*atributosAdicionales: [
                {
                    atributoAdicional: `${rowValues[109] ?? 'N/A'}`,
                },
            ],*/
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

    return (
        <div className='container'>
            <div style={{ position: 'absolute' }}>
                <AddFood />
            </div>
            <Consulta onClick={(item) => fetchData(item)} />
            <IconsComponent
                img={data2}
                nutricional={handleNutricional}
                ambiental={handleAmbiental}
                economia={handleEconomia}
                sociedad={handleCulturaSociedad}
                handleImage={handleImage}
            />
            <PropertiesComponent
                borrar={borrar}
                item={data2}
                getData={getData}
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
