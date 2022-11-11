import React, { useState, useEffect } from 'react';
import apiURL from '@/axios/axiosConfig';
import { isEmptyObject } from '@/utils';

const Yesterday = ({selected = false, setLoading}) => {
  
    const onFileReady = () => {
        setFileReady(true);
        setLoading(false);
    };

    const handleCancel = () => {
        setFileReady(false);
        setExportData(null);
        setLoading(false);
    };

    useEffect(() => {
        selected && getExportData();
        return () => {
            setLoading(false);
        };
    }, [selected]);


    const getExportData = async () => {
        const { data } = await apiURL.get('alimentacionUsuarios/yesterday');
        //console.log({data});
        const rows = [];
        data.forEach(row => {
            const {cenaAyer, colacion1Ayer,colacion2Ayer, comidaAyer, desayunoAyer} = row;
            
            
            const objPush = {
                cenaAyer,
                colacion1Ayer,
                colacion2Ayer,
                comidaAyer,
                desayunoAyer,
            }

            rows.push(objPush);
            
        });
        console.log({rows});
        desayunoAyer.forEach(alimentos => {
            const {alimento} = alimentos;

            console.log({alimento});
            

        });
        normalizeYesterdayByQuantity(rows.desayunoAyer);


    };

    const normalizeYesterdayByQuantity = (data) => {
        if (isEmptyObject(data)) return {};
      
        const {
          id,
          sku,
          nombreAlimento,
          grupoExportable,
          subGrupoExportable,
          grupoAlimento,
          clasificacionExportable,
          subGrupoAdecuada,
          opcionesPreparacion,
          icono,
          mensaje,
          cantidadAlimento,
          caloriasMacronutrientes,
          vitaminas,
          minerales,
          aspectoGlucemico,
          aspectoEconomico,
          aspectoMedioambiental,
          componentesBioactivos,
          aditivosAlimentarios,
          cantidad,
        } = data;
      
        const {
          energia,
          proteina,
          lipidos,
          agSaturados,
          agMonoinsaturados,
          adPoliinsaturados,
          colesterol,
          omega3,
          omega6,
          omega9,
          hidratosDeCarbono,
          fibra,
          fibraSoluble,
          fibraInsoluble,
          azucar,
          etanol,
        } = caloriasMacronutrientes;
      
        const {
          tiamina,
          riboflavin,
          niacina,
          acidoPantotenico,
          piridoxina,
          biotina,
          cobalmina,
          acidoAscorbico,
          acidoFolico,
          vitaminaA,
          vitaminaD,
          vitaminaK,
          vitaminaE,
        } = vitaminas;
      
        const {
          calcio,
          fosforo,
          hierro,
          hierroNoHem,
          hierroTotal,
          magnesio,
          sodio,
          potasio,
          zinc,
          selenio,
        } = minerales;
      
        const { indiceGlicemico, cargaGlicemica } = aspectoGlucemico;
      
        const {
          factorDeCorreccionParaHuellaHidricaYEGEI,
          tipo,
          lugar,
          huellaHidricaTotal,
          huellaHidricaVerde,
          huellaHidricaAzul,
          huellaHidricaGris,
          aguaParaLavado,
          aguaParaCoccion,
          lugarEGEI,
          citaEGEI,
          huellaCarbono,
          huellaEcologica,
          energiaFosil,
          usoDeSuelo,
          nitrogeno,
          puntajeEcologico,
          ...rest
        } = aspectoMedioambiental;
      
        const { precio, lugarDeCompra, lugarDeVenta } = aspectoEconomico;
      
        const {
          fitoquimicos,
          polifenoles,
          antocianinas,
          taninos,
          isoflavonas,
          resveratrol,
          isotiocinatos,
          caretenoides,
          betacarotenos,
          licopeno,
          luteina,
          alicina,
          cafeina,
          UFC,
        } = componentesBioactivos;
      
        const {
          benzoatoDeSodio,
          polisorbato,
          azulBrillanteFCFoE133,
          azurrubinaOE102,
          amarilloOcasoFDFoE110,
          tartrazinaOE102,
          verdeSoE142,
          negroBrillanteBNoE151,
          sucralosa,
          estevia,
          sacarina,
          aspartame,
          acesulfameK,
          carboxymethylcellulose,
          dioxidoDeTitanio,
          monolauratoDeGlicerol,
        } = aditivosAlimentarios;
      
        
      
        const result = {
          energiaKcal: (energia),
          proteina: (proteina),
          lipidos: (lipidos),
          agSaturados: (agSaturados),
          agMonoinsaturados: (agMonoinsaturados),
          agPoliinsaturados: (adPoliinsaturados),
          colesterol: (colesterol),
          omega3: (omega3),
          omega6: (omega6),
          omega9: (omega9),
          hidratosDeCarbono: (hidratosDeCarbono),
          fibra: (fibra),
          fibraSoluble: (fibraSoluble),
          fibraInsoluble: (fibraInsoluble),
          azucar: (azucar),
          etanol: (etanol),
          tiamina: (tiamina),
          riboflavina: (riboflavin),
          niacina: (niacina),
          acidoPantotenico: (acidoPantotenico),
          piridoxina: (piridoxina),
          biotina: (biotina),
          cobalamina: (cobalmina),
          acidoAscorbico: (acidoAscorbico),
          acidoFolico: (acidoFolico),
          vitaminaA: (vitaminaA),
          vitaminaD: (vitaminaD),
          vitaminaK: (vitaminaK),
          vitaminaE: (vitaminaE),
          calcio: (calcio),
          fosforo: (fosforo),
          hierro: (hierro),
          hierroNoHem: (hierroNoHem),
          hierroTotal: (hierroTotal),
          magnesio: (magnesio),
          sodio: (sodio),
          potasio: (potasio),
          zinc: (zinc),
          selenio: (selenio),
          indiceGlicemico: (indiceGlicemico),
          cargaGlicemica: (cargaGlicemica),
          factorDeCorreccionParaHuellaHidricaYEGEI,
          tipo: tipo,
          lugar: lugar,
          huellaHidricaTotal: (huellaHidricaTotal),
          huellaHidricaVerde: (huellaHidricaVerde),
          huellaHidricaAzul: (huellaHidricaAzul),
          huellaHidricaGris: (huellaHidricaGris),
          aguaParaLavado: (aguaParaLavado),
          aguaParaCoccion: (aguaParaCoccion),
          lugarEGEI: lugarEGEI,
          citaEGEI: citaEGEI,
          huellaDeCarbono: (huellaCarbono),
          huellaEcologica: (huellaEcologica),
          usoDeSuelo: (usoDeSuelo),
          energiaFosil: (energiaFosil),
          nitrogeno: (nitrogeno),
          fosforoAmbiental: (rest.fosforo),
          puntajeEcologico: (puntajeEcologico),
          precio: (precio),
          lugarDeCompra: lugarDeCompra,
          lugarDeVenta: lugarDeVenta,
          fitoquimicos: (fitoquimicos),
          polifenoles: (polifenoles),
          antocianinas: (antocianinas),
          taninos: (taninos),
          isoflavonas: (isoflavonas),
          resveratrol: (resveratrol),
          isotiocianatos: (isotiocinatos),
          carotenoides: (caretenoides),
          betacarotenos: (betacarotenos),
          licopeno: (licopeno),
          luteina: (luteina),
          alicina: (alicina),
          cafeina: (cafeina),
          ufc: (UFC),
          benzoatoDeSodio: (benzoatoDeSodio),
          polisorbato: (polisorbato),
          azulBrillanteFCFoE133: (azulBrillanteFCFoE133),
          azurrubinaOE102: (azurrubinaOE102),
          amarilloOcasoFDFoE110: (amarilloOcasoFDFoE110),
          tartrazinaOE102: (tartrazinaOE102),
          verdeSoE142: (verdeSoE142),
          negroBrillanteBNoE151: (negroBrillanteBNoE151),
          sucralosa: (sucralosa),
          estevia: (estevia),
          sacarina: (sacarina),
          aspartame: (aspartame),
          acesulfameK: (acesulfameK),
          carboxymethylcellulose: (carboxymethylcellulose),
          dioxidoDeTitanio: (dioxidoDeTitanio),
          monolauratoDeGlicerol: (monolauratoDeGlicerol),
        };
        console.log(result);
        return result;
      };

    return null;
 };

 export default Yesterday;