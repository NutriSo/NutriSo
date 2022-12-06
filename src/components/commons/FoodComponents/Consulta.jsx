import { useEffect, useState, useCallback, useRef } from 'react';

import InfiniteScroll from 'react-infinite-scroller';
import { message, Button } from 'antd';
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import ButtonsArea from '@/components/commons/ButtonsArea';
import AddFood from '@/components/views/addfood/AddFoodModal/AddFoodModal';
import Loading from '@/components/commons/Loading';
import { returnArrayToString, isEmptyString } from '@/utils';
import { columns } from '@/components/commons/FoodComponents/data/formData';

import styles from './Consulta.module.scss';

const Consulta = ({ onClick }) => {
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [page, setPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [loadingFile, setLoadingFile] = useState(false);
    const [exportedData, setExportedData] = useState([]);
    const [fileReady, setFileReady] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const scrollRef = useRef();

    const fetchItems = useCallback(async () => {
        if (isLoading || page > 17 || isSearching) {
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

    const hasMoreItems = page < 17 || isSearching;

    useEffect(() => {
        fetchData();
        fetchAllData();
        return () => {
            setPage(1);
            setData([]);
            setAllData([]);
            setFilterData([]);
            setLoadingFile(false);
        };
    }, []);

    const handleButton = () => {
        setLoadingFile(true);
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

    const fetchAllData = async () => {
        try {
            const { data } = await apiURL.get('/alimentos/all');
            setAllData(data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const onSearch = ({ target }) => {
        setIsSearching(true);

        if (isEmptyString(target.value)) {
            setFilterData(allData);
            return;
        }

        const normalizedValue = target.value.toLowerCase().trim();

        const filteredData = allData.filter((alimento) => {
            const normalizedName = alimento.nombreAlimento.toLowerCase().trim();

            return normalizedName.includes(normalizedValue);
        });

        setFilterData(filteredData);
    };

    const getExportData = async () => {
        try {
            console.log('getExportData');
            const foodArrayInfo = await Promise.all(
                allData.map(async (food) => await getFoodData(food.id))
            );

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
                    azulBrillanteFCFoE133: Number(
                        food.aditivosAlimentarios.azulBrillanteFCFoE133
                    ),
                    azurrubinaOE102: Number(food.aditivosAlimentarios.azurrubinaOE102),
                    amarilloOcasoFDFoE110: Number(
                        food.aditivosAlimentarios.amarilloOcasoFDFoE110
                    ),
                    tartrazinaOE102: Number(food.aditivosAlimentarios.tartrazinaOE102),
                    verdeSoE142: Number(food.aditivosAlimentarios.verdeSoE142),
                    negroBrillanteBNoE151: Number(
                        food.aditivosAlimentarios.negroBrillanteBNoE151
                    ),
                    sucralosa: Number(food.aditivosAlimentarios.sucralosa),
                    estevia: Number(food.aditivosAlimentarios.estevia),
                    sacarina: Number(food.aditivosAlimentarios.sacarina),
                    aspartame: Number(food.aditivosAlimentarios.aspartame),
                    acesulfameK: Number(food.aditivosAlimentarios.acesulfameK),
                    carboxymethylcellulose: Number(
                        food.aditivosAlimentarios.carboxymethylcellulose
                    ),
                    dioxidoDeTitanio: Number(food.aditivosAlimentarios.dioxidoDeTitanio),
                    monolauratoDeGlicerol: Number(
                        food.aditivosAlimentarios.monolauratoDeGlicerol
                    ),
                };

                setExportedData((prevState) => [...prevState, newData]);

                if (foodIndex === allData.length - 1) {
                    setFileReady(true);
                }
            });
            setLoadingFile(false);
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
        <>
            {loadingFile && <Loading size={54} />}
            <div className='food'>
                <div className={styles.buttonsContainer}>
                    <div className='exportButton'>
                        <Button onClick={handleButton}>Exportar archivo</Button>
                        <div style={{ display: 'none' }}>
                            <ButtonsArea
                                fileReady={fileReady}
                                xlsxData={{
                                    columns: columns,
                                    data: exportedData,
                                    fileName: `Alimentos ${dayjs(new Date()).format(
                                        'DD-MM-YYYY'
                                    )}`,
                                }}
                            />
                        </div>
                    </div>
                    <AddFood />
                </div>
                <div className='search'>
                    <input
                        id='search_valor'
                        onChange={onSearch}
                        placeholder='Busqueda rápida'
                    />
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
        </>
    );
};

export default Consulta;
