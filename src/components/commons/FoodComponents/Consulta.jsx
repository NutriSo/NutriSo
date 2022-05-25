import { useEffect, useState, useCallback, useRef } from 'react';

import apiURL from '../../../axios/axiosConfig';
import InfiniteScroll from 'react-infinite-scroller';
import { message, Button } from 'antd';
import dayjs from 'dayjs';

import ButtonsArea from '../ButtonsArea';
import { returnArrayToString } from '../../../utils';

const Consulta = ({ onClick }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [exportedData, setExportedData] = useState([]);
    const [fileReady, setFileReady] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const scrollRef = useRef();

    const fetchItems = useCallback(async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        console.log('fetchMoreData');
        try {
            const currentPage = page + 1;

            const moreData = await apiURL.get(`/alimentos?page=${currentPage}`);

            setData([...data, ...moreData.data]);
            setFilterData([...filterData, ...moreData.data]);

            if (moreData.data) {
                setPage(currentPage);
            } else {
                setPage(page);
            }
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    const hasMoreItems = !!page;

    useEffect(() => {
        fetchData();
        return () => {
            setPage(1);
            setData([]);
            setFilterData([]);
        };
    }, []);

    const handleButton = () => {
        if (data.length > 0) getExportData();
        else
            message.info(
                'Aún no se terminan de obtener todos los alimentos, espere 2 minutos para continuar e intente nuevamaente'
            );
    };

    const fetchData = async () => {
        try {
            const { data } = await apiURL.get('/alimentos');
            setData(data);
            setFilterData(data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const onSearch = ({ target }) => {
        setFilterData(data.filter((alimento) => alimento.nombreAlimento.includes(target.value)));
    };

    const getExportData = async () => {
        try {
            console.log('getExportData');
            const foodArrayInfo = await Promise.all(data.map(async (food) => await getFoodData(food.id)));

            foodArrayInfo.forEach((food, foodIndex) => {
                const newData = {
                    sku: food.sku,
                    id: food.nombreAlimento,
                    grupoExportable: food.grupoExportable,
                    subGrupoExportable: food.subGrupoExportable,
                    grupoAlimento: food.grupoAlimento,
                    nutricional: food.mensaje.nutricional,
                    mensajeEconomia: food.mensaje.mensajeEconomia,
                    mensajeCulturaSociedad: food.mensaje.mensajeCulturaSociedad,
                    ambiental: food.mensaje.ambiental,
                    iconoNutricional: food.icono.iconoNutricional,
                    iconoAmbiental: food.icono.iconoAmbiental,
                    iconoEconomia: food.icono.iconoEconomia,
                    iconoCulturaSociedad: food.icono.iconoCulturaSociedad,
                    imagen: food.imagen,
                    clasificacionExportable: food.clasificacionExportable,
                    opcionesPreparacion: returnArrayToString(food.opcionesPreparacion),
                    cantidadSugerida: food.cantidadAlimento.cantidadSugerida,
                    unidad: food.cantidadAlimento.unidad,
                    pesoNeto: food.cantidadAlimento.pesoNeto,
                    energiaKcal: Number(food.caloriasMacronutrientes.energia),
                    proteina: Number(food.caloriasMacronutrientes.proteina),
                    lipidos: Number(food.caloriasMacronutrientes.lipidos),
                    agSaturados: Number(food.caloriasMacronutrientes.agSaturados),
                    agMonoinsaturados: Number(food.caloriasMacronutrientes.agMonoinsaturados),
                    agPoliinsaturados: Number(food.caloriasMacronutrientes.adPoliinsaturados),
                    colesterol: Number(food.caloriasMacronutrientes.colesterol),
                    omega3: Number(food.caloriasMacronutrientes.omega3),
                    omega6: Number(food.caloriasMacronutrientes.omega6),
                    omega9: Number(food.caloriasMacronutrientes.omega9),
                    hidratosDeCarbono: Number(food.caloriasMacronutrientes.hidratosDeCarbono),
                    fibra: Number(food.caloriasMacronutrientes.fibra),
                    fibraInsoluble: Number(food.caloriasMacronutrientes.fibraInsoluble),
                    fiblaSoluble: Number(food.caloriasMacronutrientes.fiblaSoluble),
                    azucar: Number(food.caloriasMacronutrientes.azucar),
                    etanol: Number(food.caloriasMacronutrientes.etanol),
                    tiamina: Number(food.vitaminas.tiamina),
                    riboflavina: Number(food.vitaminas.riboflavin),
                    niacina: Number(food.vitaminas.niacina),
                    acidoPantotenico: Number(food.vitaminas.acidoPantotenico),
                    piridoxina: Number(food.vitaminas.piridoxina),
                    biotina: Number(food.vitaminas.biotina),
                    cobalamina: Number(food.vitaminas.cobalmina),
                    acidoAscorbico: Number(food.vitaminas.acidoAscorbico),
                    acidoFolico: Number(food.vitaminas.acidoFolico),
                    vitaminaA: Number(food.vitaminas.vitaminaA),
                    vitaminaD: Number(food.vitaminas.vitaminaD),
                    vitaminaK: Number(food.vitaminas.vitaminaK),
                    vitaminaE: Number(food.vitaminas.vitaminaE),
                    calcio: Number(food.minerales.calcio),
                    fosforo: Number(food.minerales.fosforo),
                    hierro: Number(food.minerales.hierro),
                    hierroNoHem: Number(food.minerales.hierroNoHem),
                    hierroTotal: Number(food.minerales.hierroTotal),
                    magnesio: Number(food.minerales.magnesio),
                    sodio: Number(food.minerales.sodio),
                    potasio: Number(food.minerales.potasio),
                    zinc: Number(food.minerales.zinc),
                    selenio: Number(food.minerales.selenio),
                    indiceGlicemico: Number(food.aspectoGlucemico.indiceGlicemico),
                    cargaGlicemica: Number(food.aspectoGlucemico.cargaGlicemica),
                    factorDeCorreccionParaHuellaHidricaYEGEI:
                        food.aspectoMedioambiental.factorDeCorreccionParaHuellaHidricaYEGEI,
                    tipo: food.aspectoMedioambiental.tipo,
                    lugar: food.aspectoMedioambiental.lugar,
                    huellaHidricaTotal: Number(food.aspectoMedioambiental.huellaHidricaTotal),
                    huellaHidricaVerde: Number(food.aspectoMedioambiental.huellaHidricaVerde),
                    huellaHidricaAzul: Number(food.aspectoMedioambiental.huellaHidricaAzul),
                    huellaHidricaGris: Number(food.aspectoMedioambiental.huellaHidricaGris),
                    aguaParaLavado: Number(food.aspectoMedioambiental.aguaParaLavado), // revisar abajo
                    aguaParaCoccion: Number(food.aspectoMedioambiental.aguaParaCoccion),
                    lugarEGEI: food.aspectoMedioambiental.lugarEGEI,
                    citaEGEI: food.aspectoMedioambiental.citaEGEI,
                    huellaDeCarbono: Number(food.aspectoMedioambiental.huellaCarbono),
                    huellaEcologica: Number(food.aspectoMedioambiental.huellaEcologica),
                    usoDeSuelo: Number(food.aspectoMedioambiental.usoDeSuelo),
                    energiaFosil: Number(food.aspectoMedioambiental.energiaFosil),
                    nitrogeno: Number(food.aspectoMedioambiental.nitrogeno),
                    fosforoAmbiental: Number(food.aspectoMedioambiental.fosforo),
                    puntajeEcologico: Number(food.aspectoMedioambiental.puntajeEcologico),
                    precio: food.aspectoEconomico.precio,
                    lugarDeCompra: food.aspectoEconomico.lugarDeCompra,
                    lugarDeVenta: food.aspectoEconomico.lugarDeVenta,
                    fitoquimicos: Number(food.componentesBioactivos.fitoquimicos),
                    polifenoles: Number(food.componentesBioactivos.polifenoles),
                    antocianinas: Number(food.componentesBioactivos.antocianinas),
                    taninos: Number(food.componentesBioactivos.taninos),
                    isoflavonas: Number(food.componentesBioactivos.isoflavonas),
                    resveratrol: Number(food.componentesBioactivos.resveratrol),
                    isotiocianatos: Number(food.componentesBioactivos.isotiocinatos),
                    carotenoides: Number(food.componentesBioactivos.caretenoides),
                    betacarotenos: Number(food.componentesBioactivos.betacarotenos),
                    licopeno: Number(food.componentesBioactivos.licopeno),
                    luteina: Number(food.componentesBioactivos.luteina),
                    alicina: Number(food.componentesBioactivos.alicina),
                    cafeina: Number(food.componentesBioactivos.cafeina),
                    ufc: Number(food.componentesBioactivos.UFC),
                    benzoatoDeSodio: Number(food.aditivosAlimentarios.benzoatoDeSodio),
                    polisorbato: Number(food.aditivosAlimentarios.polisorbato),
                    azulBrillanteFCFoE133: Number(food.aditivosAlimentarios.azulBrillanteFCFoE133),
                    azurrubinaOE102: Number(food.aditivosAlimentarios.azurrubinaOE102),
                    amarilloOcasoFDFoE110: Number(food.aditivosAlimentarios.amarilloOcasoFDFoE110),
                    tartrazinaOE102: Number(food.aditivosAlimentarios.tartrazinaOE102),
                    verdeSoE142: Number(food.aditivosAlimentarios.verdeSoE142),
                    negroBrillanteBNoE151: Number(food.aditivosAlimentarios.negroBrillanteBNoE151),
                    sucralosa: Number(food.aditivosAlimentarios.sucralosa),
                    estevia: Number(food.aditivosAlimentarios.estevia),
                    sacarina: Number(food.aditivosAlimentarios.sacarina),
                    aspartame: Number(food.aditivosAlimentarios.aspartame),
                    acesulfameK: Number(food.aditivosAlimentarios.acesulfameK),
                    carboxymethylcellulose: Number(food.aditivosAlimentarios.carboxymethylcellulose),
                    dioxidoDeTitanio: Number(food.aditivosAlimentarios.dioxidoDeTitanio),
                    monolauratoDeGlicerol: Number(food.aditivosAlimentarios.monolauratoDeGlicerol),
                };

                setExportedData((prevState) => [...prevState, newData]);

                if (foodIndex === data.length - 1) {
                    setFileReady(true);
                }
            });
        } catch (error) {
            console.groupCollapsed('[Consulta.jsx] getExportData');
            console.error(error);
            console.groupEnd();
            message.error('Ocurrió un error al obtener los datos para exportar');
        }
    };

    const getFoodData = async (id) => {
        try {
            const { data } = await apiURL.get(`alimentos/${id}`);

            return data;
        } catch (error) {
            message.error('Error al obtener los datos de alimentos');
            console.groupCollapsed('[Exports] getFoodData');
            console.error(error);
            console.groupEnd();
        }
    };

    const renderItem = (item) => {
        return (
            <div>
                <img
                    src={item.imagen}
                    alt={item.nombreAlimento}
                    onClick={() => onClick(item)}
                    value={item.id}
                    id={item.id}
                    className='img-alimento'
                />
            </div>
        );
    };

    return (
        <div className='food'>
            <div className='exportButton'>
                <Button onClick={handleButton}>Exportar archivo</Button>
                <div style={{ display: 'none' }}>
                    <ButtonsArea
                        fileReady={fileReady}
                        xlsxData={{
                            columns: columns,
                            data: exportedData,
                            fileName: `Alimentos ${dayjs(new Date()).format('DD-MM-YYYY')}`,
                        }}
                    />
                </div>
            </div>
            <div className='search'>
                <input id='search_valor' onChange={onSearch} placeholder='Busqueda rápida' />
            </div>
            <div className='grid_container' ref={scrollRef}>
                <InfiniteScroll
                    className='grid_food'
                    hasMore={hasMoreItems}
                    loadMore={fetchItems}
                    useWindow={false}
                    threshold={150}
                    getScrollParent={(value) => scrollRef.current}
                    loader={<div key={0}>Loading ...</div>}>
                    {filterData.map((alimento) => renderItem(alimento))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Consulta;

export const columns = [
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        width: 60,
    },
    {
        title: 'Alimento',
        dataIndex: 'id',
        key: 'id',
        width: 60,
    },
    {
        title: 'GrupoExportable',
        dataIndex: 'grupoExportable',
        key: 'grupoExportable',
        width: 100,
    },
    {
        title: 'SubGrupoExportable',
        dataIndex: 'subGrupoExportable',
        key: 'subGrupoExportable',
        width: 100,
    },
    {
        title: 'GrupoAlimento',
        dataIndex: 'grupoAlimento',
        key: 'grupoAlimento',
        width: 100,
    },
    {
        title: 'MensajeNutricional',
        dataIndex: 'nutricional',
        key: 'nutricional',
        width: 50,
    },
    {
        title: 'MensajeEconomia',
        dataIndex: 'mensajeEconomia',
        key: 'mensajeEconomia',
        width: 50,
    },
    {
        title: 'MensajeCulturaSociedad',
        dataIndex: 'mensajeCulturaSociedad',
        key: 'mensajeCulturaSociedad',
        width: 50,
    },
    {
        title: 'MensajeAmbiental',
        dataIndex: 'ambiental',
        key: 'ambiental',
        width: 50,
    },
    {
        title: 'IconoNutricional',
        dataIndex: 'iconoNutricional',
        key: 'iconoNutricional',
        width: 50,
    },
    {
        title: 'IconoAmbiental',
        dataIndex: 'iconoAmbiental',
        key: 'iconoAmbiental',
        width: 50,
    },
    {
        title: 'IconoEconomia',
        dataIndex: 'iconoEconomia',
        key: 'iconoEconomia',
        width: 50,
    },
    {
        title: 'IconoCulturaSociedad',
        dataIndex: 'iconoCulturaSociedad',
        key: 'iconoCulturaSociedad',
        width: 50,
    },
    {
        title: 'Imagen',
        dataIndex: 'imagen',
        key: 'imagen',
        width: 120,
    },
    {
        title: 'ClasificacionExportable',
        dataIndex: 'clasificacionExportable',
        key: 'clasificacionExportable',
        width: 50,
    },
    {
        title: 'OpcionesPreparacion',
        dataIndex: 'opcionesPreparacion',
        key: 'opcionesPreparacion',
        width: 120,
    },
    {
        title: 'CantidadSugerida',
        dataIndex: 'cantidadSugerida',
        key: 'cantidadSugerida',
        width: 15,
    },
    {
        title: 'Unidad',
        dataIndex: 'unidad',
        key: 'unidad',
        width: 15,
    },
    {
        title: 'PesoNeto',
        dataIndex: 'pesoNeto',
        key: 'pesoNeto',
        width: 25,
    },
    {
        title: 'Energia',
        dataIndex: 'energiaKcal',
        key: 'energiaKcal',
        width: 30,
    },
    {
        title: 'Proteína',
        dataIndex: 'proteina',
        key: 'proteina',
        width: 30,
    },
    {
        title: 'Lipidos',
        dataIndex: 'lipidos',
        key: 'lipidos',
        width: 30,
    },
    {
        title: 'agSaturados',
        dataIndex: 'agSaturados',
        key: 'agSaturados',
        width: 30,
    },
    {
        title: 'agMonoinsaturados',
        dataIndex: 'agMonoinsaturados',
        key: 'agMonoinsaturados',
        width: 30,
    },
    {
        title: 'adPoliinsaturados',
        dataIndex: 'agPoliinsaturados',
        key: 'agPoliinsaturados',
        width: 30,
    },
    {
        title: 'Colesterol',
        dataIndex: 'colesterol',
        key: 'colesterol',
        width: 30,
    },
    {
        title: 'Omega3',
        dataIndex: 'omega3',
        key: 'omega3',
        width: 30,
    },
    {
        title: 'Omega6',
        dataIndex: 'omega6',
        key: 'omega6',
        width: 30,
    },
    {
        title: 'Omega9',
        dataIndex: 'omega9',
        key: 'omega9',
        width: 30,
    },
    {
        title: 'HidratosDeCarbono',
        dataIndex: 'hidratosDeCarbono',
        key: 'hidratosDeCarbono',
        width: 30,
    },
    {
        title: 'Fibra',
        dataIndex: 'fibra',
        key: 'fibra',
        width: 30,
    },
    {
        title: 'FibraInsoluble',
        dataIndex: 'fibraInsoluble',
        key: 'fibraInsoluble',
        width: 30,
    },
    {
        title: 'FibraSoluble',
        dataIndex: 'fibraSoluble',
        key: 'fibraSoluble',
        width: 30,
    },
    {
        title: 'Azucar',
        dataIndex: 'azucar',
        key: 'azucar',
        width: 30,
    },
    {
        title: 'Etanol',
        dataIndex: 'etanol',
        key: 'etanol',
        width: 30,
    },
    {
        title: 'Tiamina',
        dataIndex: 'tiamina',
        key: 'tiamina',
        width: 30,
    },
    {
        title: 'Riboflavin',
        dataIndex: 'riboflavina',
        key: 'riboflavina',
        width: 30,
    },
    {
        title: 'Niacina',
        dataIndex: 'niacina',
        key: 'niacina',
        width: 30,
    },
    {
        title: 'AcidoPantotenico',
        dataIndex: 'acidoPantotenico',
        key: 'acidoPantotenico',
        width: 30,
    },
    {
        title: 'Piridoxina',
        dataIndex: 'piridoxina',
        key: 'piridoxina',
        width: 30,
    },
    {
        title: 'Biotina',
        dataIndex: 'biotina',
        key: 'biotina',
        width: 30,
    },
    {
        title: 'Cobalmina',
        dataIndex: 'cobalamina',
        key: 'cobalamina',
        width: 30,
    },
    {
        title: 'AcidoAscorbico',
        dataIndex: 'acidoAscorbico',
        key: 'acidoAscorbico',
        width: 30,
    },
    {
        title: 'AcidoFolico',
        dataIndex: 'acidoFolico',
        key: 'acidoFolico',
        width: 30,
    },
    {
        title: 'VitaminaA',
        dataIndex: 'vitaminaA',
        key: 'vitaminaA',
        width: 30,
    },
    {
        title: 'VitaminaD',
        dataIndex: 'vitaminaD',
        key: 'vitaminaD',
        width: 30,
    },
    {
        title: 'VitaminaK',
        dataIndex: 'vitaminaK',
        key: 'vitaminaK',
        width: 30,
    },
    {
        title: 'VitaminaE',
        dataIndex: 'vitaminaE',
        key: 'vitaminaE',
        width: 30,
    },
    {
        title: 'Calcio',
        dataIndex: 'calcio',
        key: 'calcio',
        width: 30,
    },
    {
        title: 'Fósforo',
        dataIndex: 'fosforo',
        key: 'fosforo',
        width: 30,
    },
    {
        title: 'Hierro',
        dataIndex: 'hierro',
        key: 'hierro',
        width: 30,
    },
    {
        title: 'HierroNoHem',
        dataIndex: 'hierroNoHem',
        key: 'hierroNoHem',
        width: 30,
    },
    {
        title: 'Magnesio',
        dataIndex: 'magnesio',
        key: 'magnesio',
        width: 30,
    },
    {
        title: 'Sodio',
        dataIndex: 'sodio',
        key: 'sodio',
        width: 30,
    },
    {
        title: 'Potasio',
        dataIndex: 'potasio',
        key: 'potasio',
        width: 30,
    },
    {
        title: 'Zinc',
        dataIndex: 'zinc',
        key: 'zinc',
        width: 30,
    },
    {
        title: 'Selenio',
        dataIndex: 'selenio',
        key: 'selenio',
        width: 30,
    },
    {
        title: 'IndiceGlicemico',
        dataIndex: 'indiceGlicemico',
        key: 'indiceGlicemico',
        width: 30,
    },
    {
        title: 'CargaGlicemica',
        dataIndex: 'cargaGlicemica',
        key: 'cargaGlicemica',
        width: 30,
    },
    {
        title: 'FactorDeCorreccionParaHuellaHidricaYEGEI',
        dataIndex: 'factorDeCorreccionParaHuellaHidricaYEGEI',
        key: 'factorDeCorreccionParaHuellaHidricaYEGEI',
        width: 30,
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
        width: 30,
    },
    {
        title: 'Lugar',
        dataIndex: 'lugar',
        key: 'lugar',
        width: 30,
    },
    {
        title: 'HuellaHidricaVerde',
        dataIndex: 'huellaHidricaVerde',
        key: 'huellaHidricaVerde',
        width: 30,
    },
    {
        title: 'HuellaHidricaAzul',
        dataIndex: 'huellaHidricaAzul',
        key: 'huellaHidricaAzul',
        width: 30,
    },
    {
        title: 'HuellaHidricaGris',
        dataIndex: 'huellaHidricaGris',
        key: 'huellaHidricaGris',
        width: 30,
    },
    {
        title: 'AguaParaLavado',
        dataIndex: 'aguaParaLavado',
        key: 'aguaParaLavado',
        width: 30,
    },
    {
        title: 'AguaParaCoccion',
        dataIndex: 'aguaParaCoccion',
        key: 'aguaParaCoccion',
        width: 30,
    },
    {
        title: 'LugarEGEI',
        dataIndex: 'lugarEGEI',
        key: 'lugarEGEI',
        width: 30,
    },
    {
        title: 'CitaEGEI',
        dataIndex: 'citaEGEI',
        key: 'citaEGEI',
        width: 30,
    },
    {
        title: 'HuellaCarbono',
        dataIndex: 'huellaDeCarbono',
        key: 'huellaDeCarbono',
        width: 30,
    },
    {
        title: 'HuellaEcologica',
        dataIndex: 'huellaEcologica',
        key: 'huellaEcologica',
        width: 30,
    },
    {
        title: 'UsoDeSuelo',
        dataIndex: 'usoDeSuelo',
        key: 'usoDeSuelo',
        width: 30,
    },
    {
        title: 'EnergiaFosil',
        dataIndex: 'energiaFosil',
        key: 'energiaFosil',
        width: 30,
    },
    {
        title: 'Nitrogeno',
        dataIndex: 'nitrogeno',
        key: 'nitrogeno',
        width: 30,
    },
    {
        title: 'FosforoAmbiental',
        dataIndex: 'fosforoAmbiental',
        key: 'fosforoAmbiental',
        width: 30,
    },
    {
        title: 'PuntajeEcologico',
        dataIndex: 'puntajeEcologico',
        key: 'puntajeEcologico',
        width: 30,
    },
    {
        title: 'Precio',
        dataIndex: 'precio',
        key: 'precio',
        width: 30,
    },
    {
        title: 'LugarDeCompra',
        dataIndex: 'lugarDeCompra',
        key: 'lugarDeCompra',
        width: 30,
    },
    {
        title: 'LugarDeVenta',
        dataIndex: 'lugarDeVenta',
        key: 'lugarDeVenta',
        width: 30,
    },
    {
        title: 'Fitoquimicos',
        dataIndex: 'fitoquimicos',
        key: 'fitoquimicos',
        width: 30,
    },
    {
        title: 'Polifenoles',
        dataIndex: 'polifenoles',
        key: 'polifenoles',
        width: 30,
    },
    {
        title: 'Antocianinas',
        dataIndex: 'antocianinas',
        key: 'antocianinas',
        width: 30,
    },
    {
        title: 'Taninos',
        dataIndex: 'taninos',
        key: 'taninos',
        width: 30,
    },
    {
        title: 'Isoflavonas',
        dataIndex: 'isoflavonas',
        key: 'isoflavonas',
        width: 30,
    },
    {
        title: 'Resveratrol',
        dataIndex: 'resveratrol',
        key: 'resveratrol',
        width: 30,
    },
    {
        title: 'Isotiocinatos',
        dataIndex: 'isotiocianatos',
        key: 'isotiocianatos',
        width: 30,
    },
    {
        title: 'Careteneoides',
        dataIndex: 'carotenoides',
        key: 'carotenoides',
        width: 30,
    },
    {
        title: 'Betacarotenos',
        dataIndex: 'betacarotenos',
        key: 'betacarotenos',
        width: 30,
    },
    {
        title: 'Licopeno',
        dataIndex: 'licopeno',
        key: 'licopeno',
        width: 30,
    },
    {
        title: 'Luteina',
        dataIndex: 'luteina',
        key: 'luteina',
        width: 30,
    },
    {
        title: 'Alicina',
        dataIndex: 'alicina',
        key: 'alicina',
        width: 30,
    },
    {
        title: 'Cafeina',
        dataIndex: 'cafeina',
        key: 'cafeina',
        width: 30,
    },
    {
        title: 'UFC',
        dataIndex: 'ufc',
        key: 'ufc',
        width: 30,
    },
    {
        title: 'BenzoatoDeSodio',
        dataIndex: 'benzoatoDeSodio',
        key: 'benzoatoDeSodio',
        width: 30,
    },
    {
        title: 'Polisorbato',
        dataIndex: 'polisorbato',
        key: 'polisorbato',
        width: 30,
    },
    {
        title: 'AzulBrillanteFCFoE133',
        dataIndex: 'azulBrillanteFCFoE133',
        key: 'azulBrillanteFCFoE133',
        width: 30,
    },
    {
        title: 'AzurrubinaOE102',
        dataIndex: 'azurrubinaOE102',
        key: 'azurrubinaOE102',
        width: 30,
    },
    {
        title: 'AmarilloOcasoFDFoE110',
        dataIndex: 'amarilloOcasoFDFoE110',
        key: 'amarilloOcasoFDFoE110',
        width: 30,
    },
    {
        title: 'TartrazinaOE102',
        dataIndex: 'tartrazinaOE102',
        key: 'tartrazinaOE102',
        width: 30,
    },
    {
        title: 'VerdeSoE142',
        dataIndex: 'verdeSoE142',
        key: 'verdeSoE142',
        width: 30,
    },
    {
        title: 'NegroBrillanteBNoE151',
        dataIndex: 'negroBrillanteBNoE151',
        key: 'negroBrillanteBNoE151',
        width: 30,
    },
    {
        title: 'Sucralosa',
        dataIndex: 'sucralosa',
        key: 'sucralosa',
        width: 30,
    },
    {
        title: 'Estevia',
        dataIndex: 'estevia',
        key: 'estevia',
        width: 30,
    },
    {
        title: 'Sacarina',
        dataIndex: 'sacarina',
        key: 'sacarina',
        width: 30,
    },
    {
        title: 'Aspartame',
        dataIndex: 'aspartame',
        key: 'aspartame',
        width: 30,
    },
    {
        title: 'AcesulfameK',
        dataIndex: 'acesulfameK',
        key: 'acesulfameK',
        width: 30,
    },
    {
        title: 'Carboxymethylcellulose',
        dataIndex: 'carboxymethylcellulose',
        key: 'carboxymethylcellulose',
        width: 30,
    },
    {
        title: 'DioxidoDeTitanio',
        dataIndex: 'dioxidoDeTitanio',
        key: 'dioxidoDeTitanio',
        width: 30,
    },
    {
        title: 'MonolauratoDeGlicerol',
        dataIndex: 'monolauratoDeGlicerol',
        key: 'monolauratoDeGlicerol',
        width: 30,
    },
];
