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
            desayunoAyer.forEach(alimentos => {
                const {id} = alimentos;
    
                //console.log({id});
                normalizeYesterdayByQuantity(id);


                
    
            });
        });

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
      
        
      
        const result = [
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
          indiceGlicemico,
          cargaGlicemica,
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
          usoDeSuelo,
          energiaFosil,
          nitrogeno,
          rest.fosforo,
          puntajeEcologico,
          precio,
          lugarDeCompra,
          lugarDeVenta,
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
        ];
        console.log([result]);
        return result;
      };

    return null;
 };

 export default Yesterday;